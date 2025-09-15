import { TaskPriority } from "@/types";
import { useState } from "react";

const allPriorities: TaskPriority[] = ["low", "medium", "high"];

export default function TaskForm({
  edit,
  onTaskSubmit,
}: {
  edit: boolean;
  onTaskSubmit: (task: {
    title: string;
    dueDate: string;
    priority: string;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0, 16));
  const [priority, setPriority] = useState<TaskPriority>("low");

  const resetValues = () => {
    setTitle("");
    setDueDate(new Date().toISOString().slice(0, 16));
    setPriority("low");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTaskSubmit({ title, dueDate, priority });
    resetValues();
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-slate-200 sm:rounded-lg sm:p-4"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg">{edit ? "Edit Task" : "New Task"}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="h-10 w-full bg-white border rounded-lg px-2"
          placeholder="Task text"
          required
        />
        <input
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="h-10 w-full bg-white border rounded-lg px-2"
          placeholder="Due date"
          required
        />
        <label className="text-xs text-gray-400">Priority</label>
        <select
          value={priority}
          className="h-10 w-full bg-white border rounded-lg px-2"
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          {allPriorities.map((p, ind) => (
            <option key={ind} value={p}>
              {p}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 transition-all hover:scale-105 border border-black cursor-pointer text-white font-medium py-2 px-4 rounded-md text-sm"
        >
          {edit ? "Edit task" : "Save task"}
        </button>
      </form>
    </div>
  );
}
