import { Request, Response, NextFunction } from "express";
import { book } from "../models/book.model";
import QueryBuilder from "./../middleware/QueryBuilder";
import { IBook } from "../interfaces/book.interface";

// createBook
export const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bookData = await book.create(req.body);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: bookData,
    });
  } catch (error) {
    next(error); 
  }
};

// getAllBooks
export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryBuilder = new QueryBuilder<IBook>(book.find(), req.query);

    queryBuilder
      .search(["title", "author", "genre"])
      .filter()
      .sort()
      .paginate()
      .fields();

    const books = await queryBuilder.modelQuery;
    const pagination = await queryBuilder.countTotal();

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
      pagination,
    });
  } catch (error) {
    next(error); 
  }
};

// getBookById
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const bookId = req.params.bookId;
    const bookData = await book.findById(bookId);
    if (!bookData) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: bookData,
    });
  } catch (error) {
    next(error); 
  }
};

// updateBook
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;
  try {
    const bookUpdate = await book.findByIdAndUpdate(
      { _id: bookId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!bookUpdate) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: bookUpdate,
    });
  } catch (error) {
    next(error); 
  }
};

// deleteBook
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookId = req.params.bookId;
  try {
    const deletedBook = await book.findByIdAndDelete(bookId);
    if (deletedBook) {
      res.json({
        success: true,
        message: "Book deleted successfully",
        data: null,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Book not found",
        data: null,
      });
    }
  } catch (error) {
    next(error); 
  }
};
