import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        isbn: { type: String, required: true, unique: true },
        description: { type: String },
        copies: { type: Number, required: true },
        available: { type: Number, required: true, default: 0 },
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const book = model<IBook>("Book", bookSchema);
