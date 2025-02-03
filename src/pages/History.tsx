import { Card } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { format, startOfToday, subDays, addDays } from "date-fns";
import { History as HistoryIcon } from "lucide-react";

const History = () => {
  // Using the same tasks data structure from Tasks.tsx
  const today = startOfToday();
  const tasks = [
    // Today
    {
      id: 1,
      title: "Research Project Management Tools",
      description: "Evaluate and compare different project management tools for team collaboration",
      completed: false,
      date: today,
    },
    {
      id: 2,
      title: "Create Project Timeline",
      description: "Develop a detailed timeline for the next quarter's objectives",
      completed: true,
      date: today,
    },
    // Tomorrow
    {
      id: 3,
      title: "Team Meeting Preparation",
      description: "Prepare agenda and materials for tomorrow's team meeting",
      completed: false,
      date: addDays(today, 1),
    },
    {
      id: 4,
      title: "Client Presentation",
      description: "Finalize slides for the upcoming client presentation",
      completed: false,
      date: addDays(today, 1),
    },
    // Day 3
    {
      id: 5,
      title: "Code Review",
      description: "Review pull requests and provide feedback to team members",
      completed: false,
      date: addDays(today, 2),
    },
    {
      id: 6,
      title: "Documentation Update",
      description: "Update project documentation with recent changes",
      completed: false,
      date: addDays(today, 2),
    },
    // Day 4
    {
      id: 7,
      title: "Sprint Planning",
      description: "Plan next sprint tasks and objectives with the team",
      completed: false,
      date: addDays(today, 3),
    },
    // Day 5
    {
      id: 8,
      title: "Performance Reviews",
      description: "Conduct quarterly performance reviews with team members",
      completed: false,
      date: addDays(today, 4),
    },
    // Day 6
    {
      id: 9,
      title: "Budget Analysis",
      description: "Review and analyze project budget allocation",
      completed: false,
      date: addDays(today, 5),
    },
    // Day 7
    {
      id: 10,
      title: "Weekly Report",
      description: "Compile and send weekly progress report to stakeholders",
      completed: false,
      date: addDays(today, 6),
    },
  ];

  // Calculate metrics
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = subDays(today, 6 - i);
    const dayTasks = tasks.filter(
      (task) => format(task.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
    );
    const completed = dayTasks.filter((task) => task.completed).length;
    const total = dayTasks.length;

    return {
      date: format(date, "MMM d"),
      completed,
      total,
      completion: total > 0 ? (completed / total) * 100 : 0,
    };
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen p-4 pb-32">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            <HistoryIcon className="h-4 w-4" />
            Task History
          </span>
          <h1 className="text-3xl font-bold">Your Progress Overview</h1>
        </header>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Total Tasks
            </h3>
            <p className="mt-2 text-3xl font-bold">{totalTasks}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Completed Tasks
            </h3>
            <p className="mt-2 text-3xl font-bold">{completedTasks}</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">
              Completion Rate
            </h3>
            <p className="mt-2 text-3xl font-bold">
              {completionRate.toFixed(1)}%
            </p>
          </Card>
        </div>

        <Card className="mt-6 p-6">
          <h3 className="mb-4 text-lg font-medium">Last 7 Days Progress</h3>
          <div className="h-[300px]">
            <ChartContainer
              className="h-full w-full"
              config={{
                completed: {
                  theme: {
                    light: "hsl(var(--primary))",
                    dark: "hsl(var(--primary))",
                  },
                },
                total: {
                  theme: {
                    light: "hsl(var(--muted))",
                    dark: "hsl(var(--muted))",
                  },
                },
              }}
            >
              <BarChart data={last7Days}>
                <XAxis
                  dataKey="date"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Bar dataKey="total" fill="var(--color-total)" />
                <Bar dataKey="completed" fill="var(--color-completed)" />
                <ChartTooltip>
                  <ChartTooltipContent />
                </ChartTooltip>
              </BarChart>
            </ChartContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default History;