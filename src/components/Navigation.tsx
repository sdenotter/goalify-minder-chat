import { MessageSquare, Target } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();

  const links = [
    { to: "/", icon: MessageSquare, label: "Chat" },
    { to: "/tasks", icon: Target, label: "Tasks" },
  ];

  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2">
      <div className="glass-card flex items-center gap-2 rounded-full p-2">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 transition-colors",
              location.pathname === to
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            )}
          >
            <Icon className="h-5 w-5" />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};