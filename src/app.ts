import express from 'express'
import cors from 'cors'
import bookRoutes from './app/routes/book.route'
import borrowBook from './app/routes/borrowBook.routes'
import allErrorHandel from './app/middleware/allErrorHandel'

const app = express()

app.use(express.json())


app.use(cors(
  {
    origin: "http://localhost:5173"
  }
))


app.use('/api/books',bookRoutes)
app.use('/api/borrow',borrowBook)

app.get('/', (req, res) => {
    res.send('Library Management API is running')
})
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Route not found',
    success: false,
    error: {}
  });
});


// Error handling middleware
app.use(allErrorHandel)

export default app