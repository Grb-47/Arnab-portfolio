import { connectToDatabase } from "./db";
import type { Model } from "mongoose";

export async function getDocument<T>(model: Model<T>, fallback: () => T): Promise<T> {
  const db = await connectToDatabase();
  if (db) {
    const doc = await model.findOne({}).lean().exec();
    if (doc) return doc as unknown as T;
  }
  return fallback();
}

export async function upsertDocument<T>(
  model: Model<T>,
  data: Record<string, unknown>,
  fallback: () => T
): Promise<T> {
  const db = await connectToDatabase();
  if (db) {
    const doc = await model
      .findOneAndUpdate({}, data as any, { upsert: true, new: true })
      .lean()
      .exec();
    return doc as unknown as T;
  }
  return fallback();
}
