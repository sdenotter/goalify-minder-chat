import { useState } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  const [messages, setMessages] = useState([
    {
      content: "Hello! I'm here to help you set and achieve your goals. What would you like to work on?",
      isAI: true,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      content: input,
      isAI: false,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        content: "That's a great goal! Let's break it down into smaller, manageable steps. What's your timeline for achieving this?",
        isAI: true,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 overflow-y-auto p-4 pb-32">
        <div className="mx-auto max-w-2xl space-y-4">
          {messages.map((message, index) => (
            <ChatMessage key={index} {...message} />
          ))}
        </div>
      </main>
      <form
        onSubmit={handleSubmit}
        className="fixed bottom-32 left-4 right-4 mx-auto max-w-2xl"
      >
        <div className="glass-card flex items-center gap-2 rounded-full p-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent px-4 py-2 text-foreground placeholder:text-foreground/60 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Send
          </button>
        </div>
      </form>
      <Navigation />
    </div>
  );
};

export default Index;