import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Target, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

const initialTasks = [
  {
    id: 1,
    title: "Research Project Management Tools",
    description: "Evaluate and compare different project management tools for team collaboration",
    completed: false,
    date: new Date(),
  },
  {
    id: 2,
    title: "Create Project Timeline",
    description: "Develop a detailed timeline for the next quarter's objectives",
    completed: true,
    date: new Date(),
  },
  {
    id: 3,
    title: "Team Meeting Preparation",
    description: "Prepare agenda and materials for tomorrow's team meeting",
    completed: false,
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
  {
    id: 4,
    title: "Client Presentation",
    description: "Finalize slides for the upcoming client presentation",
    completed: false,
    date: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  const toggleTaskCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(
    (task) => format(task.date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd")
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = filteredTasks.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen p-4 pb-32">
      <div className="mx-auto max-w-4xl">
        <header className="mb-8">
          <span className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            <Target className="h-4 w-4" />
            Tasks
          </span>
          <h1 className="text-3xl font-bold">Task Management</h1>
        </header>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-medium">
              Tasks for {format(selectedDate, "MMMM d, yyyy")}
            </h2>
            <div className="space-y-4">
              {currentTasks.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground">
                  No tasks for this day
                </p>
              ) : (
                currentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-start gap-3 rounded-lg border p-4"
                  >
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="mt-1 h-4 w-4 rounded-sm border border-primary"
                    />
                    <div>
                      <h3
                        className={`font-medium ${
                          task.completed ? "text-muted-foreground line-through" : ""
                        }`}
                      >
                        {task.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          task.completed
                            ? "text-muted-foreground/60 line-through"
                            : "text-muted-foreground"
                        }`}
                      >
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {filteredTasks.length > tasksPerPage && (
              <div className="mt-4 flex items-center justify-center gap-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="w-full"
            />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;