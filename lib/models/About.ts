import mongoose, { Schema, Document } from "mongoose";

export interface IDesignation {
  title: string;
  year: string;
}

export interface IOrganization {
  name: string;
  logo: string;
  designations: IDesignation[];
  description: string;
}

export interface IEducation {
  institution: string;
  degree: string;
  year: string;
}

export interface IAbout extends Document {
  sectionTitle: string;
  intro: string;
  photo: string;
  photoAlt: string;
  organizations: IOrganization[];
  education: IEducation[];
  bio: string;
}

const DesignationSchema = new Schema(
  {
    title: { type: String, required: true },
    year: { type: String, required: true },
  },
  { _id: false }
);

const OrganizationSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, required: true },
    designations: { type: [DesignationSchema], default: [] },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    year: { type: String, required: true },
  },
  { _id: false }
);

const AboutSchema = new Schema<IAbout>(
  {
    sectionTitle: { type: String, required: true },
    intro: { type: String, default: "" },
    photo: { type: String, default: "" },
    photoAlt: { type: String, default: "" },
    organizations: { type: [OrganizationSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export const About =
  mongoose.models.About || mongoose.model<IAbout>("About", AboutSchema);
