import type { TProject } from "../../Types/ProjectTypes";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Folder } from "lucide-react";

const ProjectCard = ({ project }: { project: TProject }) => {
  return (
    <Card>
      <CardHeader>
        <Folder className="w-10 h-10 text-gray-500" />
        <CardTitle className="flex items-center gap-2">
          {project?.name}
        </CardTitle>
        <p className="text-sm text-gray-500">
          {project?.description || "No description"}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Team</span>
          <span className="font-medium">
            {project?.teamName || "Unassigned"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
