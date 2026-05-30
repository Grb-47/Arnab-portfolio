import mongoose, { Schema, Document } from "mongoose";

export interface IHero extends Document {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  profileImage: string;
  profileImageAlt: string;
  logosLabel: string;
  logos: { src: string; alt: string }[];
}

const LogoSchema = new Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false }
);

const HeroSchema = new Schema<IHero>(
  {
    titleLine1: { type: String, required: true },
    titleLine2: { type: String, required: true },
    subtitle: { type: String, required: true },
    profileImage: { type: String, required: true },
    profileImageAlt: { type: String, required: true },
    logosLabel: { type: String, required: true },
    logos: { type: [LogoSchema], default: [] },
  },
  { timestamps: true }
);

export const Hero = mongoose.models.Hero || mongoose.model<IHero>("Hero", HeroSchema);
