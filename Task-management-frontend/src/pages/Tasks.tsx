import { useState } from "react";
import TaskModal from "../components/tasks/TaskModal";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

const rawTasks = [
  {
    _id: "1",
    title: "Homepage UI Update",
    description: "Fix alignment issues on the hero section",
    project: { name: "ShopSphere" },
    assignedMemberName: "Saiful Islam",
    priority: "High",
    status: "In Progress",
  },
  {
    _id: "2",
    title: "Add Category Filter",
    description: "Implement sidebar category filtering",
    project: { name: "Product Review Portal" },
    assignedMemberName: "Rafi",
    priority: "Medium",
    status: "Pending",
  },
  {
    _id: "3",
    title: "Fix Login Bug",
    description: "404 error when logging in with Gmail",
    project: { name: "Soulmate" },
    assignedMemberName: "Hasan",
    priority: "Low",
    status: "Completed",
  },
];

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [tasks] = useState(rawTasks);

  return (
    <main className="p-6 space-y-8">

      {/* Add Task Button */}
      <div className="flex gap-5 justify-between">
         <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-gray-500">
            Track ongoing initiatives and progress.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="rounded-lg shadow-lg border overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Task
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Assigned To
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>

          <tbody className=" divide-y divide-border">
            {tasks.map((task) => (
              <tr key={task._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {task.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {task.description}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {task.project?.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {task.assignedMemberName}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {task.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </main>
  );
};

export default Tasks;
