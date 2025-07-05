import { model, Schema } from "mongoose";
import { IBorrow } from "../interfaces/borrowBook.interface";

const borrowBookSchema =new Schema<IBorrow>({
    book:{
        type:Schema.Types.ObjectId,
        ref:'BOOK',
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    dueDate: {
        type: Date,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export const borrowBook = model<IBorrow>("BorrowBook", borrowBookSchema);