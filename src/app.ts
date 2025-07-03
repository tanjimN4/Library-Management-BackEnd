import express from 'express'
import cors from 'cors'
import bookRoutes from './app/routes/book.route'

const app = express()

app.use(express.json())


app.use(cors(
  {
    origin: "http://localhost:5173"
  }
))


app.use('/api/books',bookRoutes)

app.get('/', (req, res) => {
    res.send('Library Management API is running')
})

export default app