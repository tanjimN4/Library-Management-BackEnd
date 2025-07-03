import { Request, Response } from "express";
import { book} from "../models/book.model";

//createBook
export const createBook = async (req: Request, res: Response) => {
    try {
        const bookData = await book.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: bookData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create book",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}

//getAllBooks
export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await book.find();
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve books",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
//getBookById
export const getBookById = async (req: Request, res: Response): Promise<any> => {
    try {
        const bookId = req.params.bookId;
        const bookData = await book.findById(bookId);
        if (!bookData) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: bookData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve book",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
//updateBook
export const updateBook = async (req: Request, res: Response): Promise<any> => {
  const { bookId } = req.params;
  try {
    const bookUpdate = await book.findByIdAndUpdate(
      { _id: bookId },
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!bookUpdate) {
      return res.status(404).json({ success: false, message: 'Book not found' });
    }
    res.status(200).json({ success: true, message: 'Book updated successfully', data : bookUpdate });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to update book', error });
  }
};
//deleteBook
export const deleteBook = async (req: Request, res: Response) => {
    const bookId = req.params.bookId;
    try {
        const deletedBook = await book.findByIdAndDelete(bookId, { new: true });
        if(deletedBook) {
            res.json({
                success: true,
                message: 'Book deleted successfully',
                data: null
            });
        }else {
            res.status(404).json({
                success: false,
                message: 'Book not found',
                data: null
            });
        }
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete book',
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}