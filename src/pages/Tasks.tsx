import { useState } from "react";
import { TaskCard } from "@/components/TaskCard";
import { Navigation } from "@/components/Navigation";

const Tasks = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Research Project Management Tools",
      description: "Evaluate and compare different project management tools for team collaboration",
      completed: false,
    },
    {
      id: 2,
      title: "Create Project Timeline",
      description: "Develop a detailed timeline for the next quarter's objectives",
      completed: false,
    },
    {
      id: 3,
      title: "Team Meeting Preparation",
      description: "Prepare agenda and materials for tomorrow's team meeting",
      completed: false,
    },
  ]);

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen p-4 pb-32">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8">
          <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
            Daily Tasks
          </span>
          <h1 className="text-3xl font-bold">Your Progress</h1>
        </header>
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onComplete={() => toggleTask(task.id)}
            />
          ))}
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Tasks;