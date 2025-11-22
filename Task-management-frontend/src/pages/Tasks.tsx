import { useState } from "react";
import TaskModal from "../components/tasks/TaskModal";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useGetTaskQuery } from "../redux/features/task/taskApi";
import type { TTask } from "../Types/TaskTypes";
import { useGetProjectsQuery } from "../redux/features/Projects/projectApi";
import type { TProject } from "../Types/ProjectTypes";
import ConfirmModal from "../components/tasks/ConfirmModal";

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  

  const { data } = useGetTaskQuery(selectedProject);
  const { data: projectsData } = useGetProjectsQuery(undefined);

  const handleProjectChange = (projectId: string) => {
    setSelectedProject(projectId);
  };

  const clearFilter = () => {
    setSelectedProject("");
  };

  const handleDeleteClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setDeleteModalOpen(true);
  };

  return (
    <main className="py-6 lg:p-6 space-y-8">
      {/* Add Task Button */}
      <div className="flex gap-5 flex-col items-center md:flex-row  justify-between">
        <div className="text-center md:text-start">
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-gray-500">
            Track ongoing initiatives and progress.
          </p>
        </div>
        <div className="flex gap-5 items-center flex-col md:flex-row justify-between">
          <div>
            <select
              value={selectedProject}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="p-2 border rounded-md bg-background w-64"
            >
              <option value="">All Projects</option>
              {projectsData?.data?.map((project: TProject) => (
                <option key={project?._id} value={project?._id}>
                  {project.name}
                </option>
              ))}
            </select>

            {selectedProject && (
              <Button variant="outline" size="sm" onClick={clearFilter}>
                Clear Filter
              </Button>
            )}
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>
        </div>
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
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className=" divide-y divide-border">
            {data?.data?.map((task: TTask) => (
              <tr key={task?._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-foreground">
                    {task?.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {task?.description}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {task?.project?.name}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {task?.assigneeMember?.name || "Unassigned"}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task?.priority === "High"
                        ? "bg-red-100 text-red-800"
                        : task?.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task?.priority}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {task?.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button variant="destructive" size="sm" onClick={() => {handleDeleteClick(task?._id)}}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
      {deleteModalOpen && (
        <ConfirmModal
          isOpen={deleteModalOpen}
          onCancel={() => setDeleteModalOpen(false)}
          selectedTaskId={selectedTaskId}
        />
      )}
    </main>
  );
};

export default Tasks;
