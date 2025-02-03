import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  title: string;
  description: string;
  completed: boolean;
  onComplete: () => void;
}

export const TaskCard = ({ title, description, completed, onComplete }: TaskCardProps) => {
  return (
    <div className="glass-card hover-lift rounded-xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className={cn(
            "text-lg font-semibold",
            completed && "text-foreground/60 line-through"
          )}>
            {title}
          </h3>
          <p className={cn(
            "mt-1 text-sm text-foreground/80",
            completed && "text-foreground/60"
          )}>
            {description}
          </p>
        </div>
        <button
          onClick={onComplete}
          className={cn(
            "rounded-full p-2 transition-colors",
            completed ? "bg-primary/20 text-primary" : "bg-secondary hover:bg-secondary/80"
          )}
        >
          <Check className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};