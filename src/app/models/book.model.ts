import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";


const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        isbn: { type: String, required: true, unique: true },
        description: { type: String ,trim:true },
        copies: { type: Number, required: true },
        available: { type: Boolean, required: true, },
        image:{type:String,required:true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export const book = model<IBook>("Book", bookSchema);
