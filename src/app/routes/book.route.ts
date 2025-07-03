import express from 'express'
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from '../controllers/book.controller';


const router =express.Router();

router.get('/', getAllBooks);
router.post('/',createBook);
router.get('/:bookId', getBookById);
router.put('/:bookId', updateBook);
router.delete('/:bookId', deleteBook);

export default router;