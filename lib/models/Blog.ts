import mongoose, { Schema, Document } from "mongoose";

export interface IBlogPost {
  image: string;
  thumbnail: string;
  category: string;
  title: string;
  shortDescription: string;
  description: string;
}

export interface IBlog extends Document {
  sectionTitle: string;
  posts: IBlogPost[];
}

const BlogPostSchema = new Schema(
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

const BlogSchema = new Schema<IBlog>(
  {
    sectionTitle: { type: String, required: true },
    posts: { type: [BlogPostSchema], default: [] },
  },
  { timestamps: true }
);

export const Blog =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
