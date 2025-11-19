import { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";
import { useTaskState } from "../hooks/useTaskState";
import { teams } from "../lib/rawData";

const ProjectsPage = () => {
  const { projects } = useTaskState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-500">
            Track ongoing initiatives and progress.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            teams={teams}
          />
        ))}
      </div>

      {/* Modal */}
      <ProjectModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        teams={teams}
      />
    </div>
  );
};

export default ProjectsPage;
