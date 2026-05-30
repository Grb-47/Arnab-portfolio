import mongoose, { Schema, Document } from "mongoose";

export interface IRecentWorkItem {
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  description: string;
}

export interface IRecentWork extends Document {
  sectionTitle: string;
  items: IRecentWorkItem[];
}

const RecentWorkItemSchema = new Schema(
  {
    image: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    category: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const RecentWorkSchema = new Schema<IRecentWork>(
  {
    sectionTitle: { type: String, required: true },
    items: { type: [RecentWorkItemSchema], default: [] },
  },
  { timestamps: true }
);

export const RecentWork =
  mongoose.models.RecentWork ||
  mongoose.model<IRecentWork>("RecentWork", RecentWorkSchema);
