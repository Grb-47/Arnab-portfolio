import mongoose, { Schema, Document } from "mongoose";

export interface IProjectItem {
  image: string;
  shortDescription: string;
  title: string;
  description: string;
  tags: string[];
}

export interface IProject extends Document {
  sectionTitle: string;
  items: IProjectItem[];
}

const ProjectItemSchema = new Schema(
  {
    image: { type: String, default: "" },
    shortDescription: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    tags: { type: [String], default: [] },
  },
  { _id: false }
);

const ProjectSchema = new Schema<IProject>(
  {
    sectionTitle: { type: String, required: true },
    items: { type: [ProjectItemSchema], default: [] },
  },
  { timestamps: true }
);

export const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
