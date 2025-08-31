import { Schema, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: Schema.ObjectId, ref: "Author", required: true },
    categories: [
      {
        type: Schema.ObjectId,
        ref: "Category",
      },
    ],
    coverImage: { type: String },
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);
export default Book;
