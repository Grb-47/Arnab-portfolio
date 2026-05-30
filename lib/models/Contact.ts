import mongoose, { Schema, Document } from "mongoose";

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "whatsapp"
  | "gmail"
  | "twitter"
  | "youtube";

export interface ISocialLink {
  name: string;
  platform: SocialPlatform;
  url: string;
}

export interface IContact extends Document {
  sectionTitle: string;
  subtitle: string;
  email: string;
  cvPath: string;
  bookMeetingUrl: string;
  socials: ISocialLink[];
  footerText: string;
}

const SocialLinkSchema = new Schema(
  {
    name: { type: String, required: true },
    platform: {
      type: String,
      enum: [
        "facebook",
        "instagram",
        "linkedin",
        "whatsapp",
        "gmail",
        "twitter",
        "youtube",
      ],
      required: true,
    },
    url: { type: String, required: true },
  },
  { _id: false }
);

const ContactSchema = new Schema<IContact>(
  {
    sectionTitle: { type: String, required: true },
    subtitle: { type: String, default: "" },
    email: { type: String, default: "" },
    cvPath: { type: String, default: "" },
    bookMeetingUrl: { type: String, default: "" },
    socials: { type: [SocialLinkSchema], default: [] },
    footerText: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Contact =
  mongoose.models.Contact ||
  mongoose.model<IContact>("Contact", ContactSchema);
