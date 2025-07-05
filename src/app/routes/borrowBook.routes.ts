import express from 'express'
import { createBorrowBook, getBorrowBook } from '../controllers/borrowBook.controller';
const router =express.Router();

router.post('/',createBorrowBook)
router.get('/',getBorrowBook)


export default router;