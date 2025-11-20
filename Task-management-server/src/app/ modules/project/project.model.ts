import mongoose from "mongoose";
import { TProject, ProjectModel } from "./project.interface";

const projectSchema = new mongoose.Schema<TProject>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: true,
    }
  },
  { timestamps: true }
);

projectSchema.static(
  "isProjectExistByName",
  async function isProjectExistByName(name: string) {
    const existingProject = await Project.findOne({ name });
    return existingProject;
  }
);

export const Project = mongoose.model<TProject, ProjectModel>("Project", projectSchema);