import mongoose, { Schema, Document } from "mongoose";

export interface IServiceItem {
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface IService extends Document {
  sectionTitle: string;
  graphics: IServiceItem[];
  video: IServiceItem[];
  photography: IServiceItem[];
  research: IServiceItem[];
}

const ServiceItemSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    link: { type: String, default: "" },
    image: { type: String, default: "" },
  },
  { _id: false }
);

const ServiceSchema = new Schema<IService>(
  {
    sectionTitle: { type: String, required: true },
    graphics: { type: [ServiceItemSchema], default: [] },
    video: { type: [ServiceItemSchema], default: [] },
    photography: { type: [ServiceItemSchema], default: [] },
    research: { type: [ServiceItemSchema], default: [] },
  },
  { timestamps: true }
);

export const Service =
  mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);
