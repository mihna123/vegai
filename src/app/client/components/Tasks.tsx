import { TaskApiPutResponse } from "@/app/api/tasks/[id]/route";
import { TasksApiGetResponse } from "@/app/api/tasks/route";
import { Task } from "@/types";
import { useEffect, useState } from "react";

export default function Tasks({
  userId,
  clientId,
}: {
  userId: string;
  clientId: string | null;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/tasks?user=${userId}`);
      const data = (await res.json()) as TasksApiGetResponse;
      const sorted = data.tasks?.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
      );
      setTasks(sorted ?? []);
    })();
  }, [userId]);

  const clientTasksFiltered = clientId
    ? tasks.filter((task) => task.clientId.toString() === clientId)
    : [];

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const task = tasks.find((t) => t._id.toString() === taskId);
      if (!task) {
        console.error("Couldn't find task with id ", taskId);
        return;
      }
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: "PUT",
        body: JSON.stringify({
          update: {
            completed: !task.completed,
          },
        }),
      });
      if (!res.ok) {
        console.error(
          "There has been an error with task update:",
          await res.text(),
        );
      }
      const data = (await res.json()) as TaskApiPutResponse;
      setTasks((prev) => {
        const newTasks = prev.filter((t) => t._id !== data.task._id);
        return [...newTasks, data.task].sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
        );
      });
    } catch (error) {
      console.error("Error while updating task status:", error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Tasks</h3>
        <button className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md text-sm">
          Add Task
        </button>
      </div>
      <ul className="divide-y divide-gray-200">
        {clientTasksFiltered.length > 0 ? (
          clientTasksFiltered.map((task) => (
            <li key={task._id.toString()} className="px-4 py-4 sm:px-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task._id.toString())}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <div className="ml-3 flex-1">
                  <p
                    className={`text-sm font-medium ${task.completed ? "line-through text-gray-500" : "text-gray-900"}`}
                  >
                    {task.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Due {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className="px-4 py-4 sm:px-6 text-center text-gray-500">
            No tasks for this client
          </li>
        )}
      </ul>
    </div>
  );
}
