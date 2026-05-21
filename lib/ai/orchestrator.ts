import { FAQ_KNOWLEDGE } from './faq-knowledge';

/**
 * Normalizes a string for better matching
 */
export function normalizeQuery(str: string): string {
  return str.toLowerCase().replace(/[^\w\s]/gi, '').trim();
}

export type IntentCategory = 'greeting' | 'small_talk' | 'out_of_scope' | 'business_query' | 'unknown';

/**
 * Detects the core intent of the user's message using lightweight keyword heuristics.
 */
export function detectIntent(userMessage: string): IntentCategory {
  const normalized = normalizeQuery(userMessage);
  const words = normalized.split(/\s+/);

  const outOfScopeKeywords = ['coffee', 'food', 'movie', 'crypto', 'stock', 'trading', 'weather', 'sports', 'joke'];
  const greetingKeywords = ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening'];
  const smallTalkKeywords = ['how are you', 'who are you', 'what is your name', 'your name', 'are you human', 'are you a bot'];
  const businessKeywords = ['loan', 'insurance', 'fee', 'cost', 'price', 'pricing', 'charge', 'apply', 'bank', 'cibil', 'score', 'interest', 'rate'];

  // Check out of scope first
  if (words.some(w => outOfScopeKeywords.includes(w))) return 'out_of_scope';

  // Check small talk exact phrases
  if (smallTalkKeywords.some(phrase => normalized.includes(phrase))) return 'small_talk';

  // Check greetings (if it's a very short message mostly containing greetings)
  if (words.length <= 3 && words.some(w => greetingKeywords.includes(w))) return 'greeting';

  // Check business queries
  if (words.some(w => businessKeywords.includes(w))) return 'business_query';

  return 'unknown';
}

/**
 * Checks if the user's message matches any of our predefined FAQs.
 * Uses a rigorous word-matching scoring system to prevent false positives.
 */
export function findFaqMatch(userMessage: string): string | null {
  const normalizedMessage = normalizeQuery(userMessage);
  if (!normalizedMessage) return null;

  const words = normalizedMessage.split(/\s+/);
  
  let bestMatch = null;
  let highestScore = 0;

  for (const faq of FAQ_KNOWLEDGE) {
    let score = 0;
    
    // Check exact phrase matches first (highest priority)
    for (const keyword of faq.keywords) {
      // Create word boundaries to prevent substring matching
      const regex = new RegExp(`\\b${keyword.toLowerCase()}\\b`, 'i');
      if (regex.test(normalizedMessage)) {
        score += 10; // Heavy weight for exact phrase matches
      }
    }

    // Check individual word matches
    for (const word of words) {
      if (['is', 'are', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'and', 'i', 'want', 'do', 'you'].includes(word)) continue;
      
      for (const keyword of faq.keywords) {
        // Only match full words or phrases
        const regex = new RegExp(`\\b${word}\\b`, 'i');
        if (regex.test(keyword.toLowerCase())) {
          score += 1;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq.response;
    }
  }

  // VERY HIGH Threshold for confidence to prevent forcing FAQs on conversational text
  if (highestScore >= 10) {
    return bestMatch;
  }

  return null;
}
