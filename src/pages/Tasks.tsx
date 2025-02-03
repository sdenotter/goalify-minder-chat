import { useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import { Navigation } from "@/components/Navigation";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfToday } from "date-fns";

const Tasks = () => {
  const today = startOfToday();
  const [selectedDate, setSelectedDate] = useState(today);

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

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    setSelectedDate(current => 
      direction === 'next' ? addDays(current, 1) : addDays(current, -1)
    );
  };

  const filteredTasks = tasks.filter(task => 
    format(task.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  const completedTasks = filteredTasks.filter(task => task.completed).length;
  const totalTasks = filteredTasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen p-4 pb-32">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            <Calendar className="h-4 w-4" />
            Daily Tasks
          </span>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Your Progress</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigateDay('prev')}
                className="rounded-full p-2 hover:bg-secondary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="min-w-32 text-center font-medium">
                {format(selectedDate, 'EEEE, MMM d')}
              </span>
              <button
                onClick={() => navigateDay('next')}
                className="rounded-full p-2 hover:bg-secondary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <div className="flex-1">
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span className="text-sm text-foreground/80">
              {completedTasks} of {totalTasks} tasks
            </span>
          </div>
        </header>
        <div className="space-y-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                description={task.description}
                completed={task.completed}
                onComplete={() => toggleTask(task.id)}
              />
            ))
          ) : (
            <div className="glass-card rounded-xl p-8 text-center">
              <p className="text-foreground/60">No tasks scheduled for this day</p>
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Tasks;
