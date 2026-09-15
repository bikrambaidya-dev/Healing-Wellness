import mongoose, { Schema } from "mongoose";

const CollectionDocSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    items: { type: [Schema.Types.Mixed], default: [] },
  },
  { timestamps: true }
);

export type CollectionDocument = {
  key: string;
  items: unknown[];
};

export const CollectionDoc =
  mongoose.models.CollectionDoc ??
  mongoose.model<CollectionDocument>("CollectionDoc", CollectionDocSchema, "collections");
