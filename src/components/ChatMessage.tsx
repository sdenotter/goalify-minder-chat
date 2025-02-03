import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isAI: boolean;
  timestamp: string;
}

export const ChatMessage = ({ content, isAI, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "animate-in flex w-full gap-4 p-4",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "glass-card max-w-[80%] rounded-2xl p-4",
          isAI ? "rounded-tl-sm" : "rounded-tr-sm"
        )}
      >
        <p className="text-sm text-foreground/90">{content}</p>
        <span className="mt-2 block text-xs text-foreground/60">{timestamp}</span>
      </div>
    </div>
  );
};