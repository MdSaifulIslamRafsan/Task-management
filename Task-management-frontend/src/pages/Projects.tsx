import { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectModal from "../components/projects/ProjectModal";
import { Button } from "../components/ui/button";
import { Plus } from "lucide-react";

import type { TProject } from "../Types/ProjectTypes";
import { useGetProjectsQuery } from "../redux/features/Projects/projectApi";

const ProjectsPage = () => {
  const { data } = useGetProjectsQuery(undefined);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="py-6 lg:p-6 space-y-8">
      {/* Header */}
      <div className="flex gap-5 flex-col items-center md:flex-row  justify-between">
        <div className="text-center md:text-start">
          <h1 className="text-3xl  font-bold">Projects</h1>
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data?.data?.map((project: TProject) => (
          <ProjectCard key={project?._id} project={project} />
        ))}
      </div>

      {/* Modal */}
      <ProjectModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProjectsPage;
