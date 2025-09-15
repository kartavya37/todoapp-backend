import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
import taskRouter from './routes/Task.route.js'
import authRouter from './routes/User.route.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
dotenv.config()
connectDB()
app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true
}));
app.use(cookieParser());

const port = process.env.PORT

app.use('/tasks', taskRouter)
app.use('/auth', authRouter)

app.listen(port, (req, res) => {
    console.log(`server is running at http://localhost:${port}`)
})
