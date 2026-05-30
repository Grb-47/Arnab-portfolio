import mongoose, { Schema, Document } from "mongoose";

export interface IResearchItem {
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
}

export interface IResearch extends Document {
  sectionTitle: string;
  ongoing: IResearchItem[];
  published: IResearchItem[];
  proposal: IResearchItem[];
}

const ResearchItemSchema = new Schema(
  {
    image: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    category: { type: String, default: "" },
    title: { type: String, required: true },
    shortDescription: { type: String, default: "" },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const ResearchSchema = new Schema<IResearch>(
  {
    sectionTitle: { type: String, required: true },
    ongoing: { type: [ResearchItemSchema], default: [] },
    published: { type: [ResearchItemSchema], default: [] },
    proposal: { type: [ResearchItemSchema], default: [] },
  },
  { timestamps: true }
);

export const Research =
  mongoose.models.Research ||
  mongoose.model<IResearch>("Research", ResearchSchema);
