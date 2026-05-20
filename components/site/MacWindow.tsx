import type { ReactNode, HTMLAttributes } from "react";

interface MacWindowProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: ReactNode;
}

export function MacWindow({
  title = "flexichoice.app",
  children,
  className = "",
  ...props
}: MacWindowProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-float ${className}`}
      {...props}
    >
      <div className="flex items-center gap-2 border-b border-hairline bg-muted/60 px-3.5 py-2.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-medium text-muted-foreground">
          {title}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
