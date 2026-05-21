import { GoogleGenerativeAI } from '@google/generative-ai';
import { findFaqMatch, normalizeQuery, detectIntent } from '@/lib/ai/orchestrator';
import { SYSTEM_PROMPT } from '@/lib/ai/faq-knowledge';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'AIzaSyDd4nKb2QQEaSqzc5ytJXfP1akAfJmd8_A');

// Lightweight in-memory cache for prompt optimizations
const MAX_CACHE_SIZE = 500;
const promptCache = new Map<string, string>();

function getCacheKey(history: any[], query: string) {
  if (history.length === 0) return normalizeQuery(query);
  const lastContext = history[history.length - 1]?.content || "";
  return normalizeQuery(lastContext + " | " + query);
}

function addToCache(key: string, response: string) {
  if (promptCache.size >= MAX_CACHE_SIZE) {
    const firstKey = promptCache.keys().next().value;
    if (firstKey) promptCache.delete(firstKey);
  }
  promptCache.set(key, response);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const latestMessage = messages[messages.length - 1]?.content;

    // 1. Detect Intent
    const intent = latestMessage ? detectIntent(latestMessage) : 'unknown';

    // 2. Handle Out of Scope Instantly
    if (intent === 'out_of_scope') {
      const outOfScopeResponse = "I'd love to chat about that, but I'm primarily here to help you with FlexiChoice's loan and insurance services! How can I assist you with your financial needs today?";
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(outOfScopeResponse)}\n`));
          controller.close();
        }
      });
      return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' } });
    }

    // 3. Check FAQ Knowledge Base (Only for business queries or unknowns)
    if (latestMessage && (intent === 'business_query' || intent === 'unknown')) {
      const faqResponse = findFaqMatch(latestMessage);
      if (faqResponse) {
        const stream = new ReadableStream({
          start(controller) {
            controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(faqResponse)}\n`));
            controller.close();
          }
        });
        return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'x-vercel-ai-data-stream': 'v1' } });
      }
    }

    // 4. Check Intelligent Prompt Cache
    const rawHistory = messages.slice(0, -1);
    const cacheKey = getCacheKey(rawHistory, latestMessage || "");

    if (promptCache.has(cacheKey)) {
      const cachedResponse = promptCache.get(cacheKey)!;
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(cachedResponse)}\n`));
          controller.close();
        }
      });
      return new Response(stream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'x-vercel-ai-data-stream': 'v1'
        }
      });
    }

    // 5. Fallback to Gemini with streaming
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash-lite', // Using flash for low latency
      systemInstruction: SYSTEM_PROMPT
    });

    // Format history for Gemini, ensuring it starts with a 'user' message
    let history = messages.slice(0, -1);
    while (history.length > 0 && history[0].role !== 'user') {
      history.shift();
    }

    const formattedHistory = history.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
    });

    const result = await chat.sendMessageStream(latestMessage || "");

    const stream = new ReadableStream({
      async start(controller) {
        let fullResponse = "";
        try {
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            fullResponse += chunkText;
            // Format output as a Vercel AI SDK text part chunk
            controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(chunkText)}\n`));
          }
          // After success, cache the full response
          if (fullResponse.trim()) {
            addToCache(cacheKey, fullResponse);
          }
        } catch (e) {
          console.error("Streaming error", e);
        } finally {
          controller.close();
        }
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'x-vercel-ai-data-stream': 'v1'
      }
    });

  } catch (error) {
    console.error('Chat API Error:', error);

    // Fallback response for rate limits (429) or other Gemini crashes
    const fallbackText = "Our agent is currently busy helping other customers right now. Please try again later or contact our support team at +91-98928-70455.";
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(`0:${JSON.stringify(fallbackText)}\n`));
        controller.close();
      }
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'x-vercel-ai-data-stream': 'v1'
      }
    });
  }
}
