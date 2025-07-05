import { Request, Response, NextFunction } from "express";
import { borrowBook } from "../models/borrowBook.model";
import { book } from "../models/book.model";

export const createBorrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;

    console.log("📥 Borrow Request Payload:", req.body);

    const bookData = await book.findById(bookId);
    if (!bookData) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    if (bookData.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough copies available",
      });
    }

    const updatedBook = await book.findByIdAndUpdate(
      bookId,
      { $inc: { copies: -quantity } },
      { new: true }
    );
    if (updatedBook?.copies === 0 && updatedBook.available !== false) {
      await book.findByIdAndUpdate(bookId, { available: false });
    }

    const borrowRecord = await borrowBook.create({
      book: bookId,
      quantity,
      dueDate,
    });

    return res.status(201).json({
      success: true,
      message: "Borrow record created successfully",
      data: borrowRecord,
    });
  } catch (error) {
    next(error); 
  }
};

export const getBorrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const borrows = await borrowBook.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrows,
    });
  } catch (error) {
    next(error); 
  }
};
