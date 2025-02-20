import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import userRoutes from './routes/UserRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173" // ✅ Correct origin with colon
}));

app.use(cookieParser());
app.use(express.json());
dbConnect();

app.use('/auth', userRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
