import mongoose, { Schema } from "mongoose";
import { TProject, ProjectModel } from "./project.interface";

const projectSchema = new Schema<TProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Soft delete filter
projectSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
projectSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Static Method
projectSchema.statics.isProjectExist = async function (id: string) {
  return await Project.findById(id);
};

export const Project = mongoose.model<TProject, ProjectModel>(
  "Project",
  projectSchema
);
