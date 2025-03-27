
import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cron from 'node-cron';
import admin from 'firebase-admin';
import serviceAccount from './Key/newspoint-ec222-firebase-adminsdk-fbsvc-5134074668.json'with { type: "json" };
import userRoutes from './routes/UserRoutes.js';
import bookmarksRoutes from './routes/bookmarksRoutes.js';
import readingHistoryRoutes from './routes/readingHistoryRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { fetchNewsAndStore } from "./utils/fetchNews.js";
import newRoutes from './routes/newsRoutes.js';


dotenv.config();
const app = express();
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
// ✅ Middleware Configuration
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173" // ✅ Correct origin
}));
app.use(cookieParser());
app.use(express.json());

// ✅ Connect to Database
dbConnect();

// ✅ Schedule News Fetching Every 15 Minutes
cron.schedule("*/15 * * * *", fetchNewsAndStore);
console.log("✅ News fetch cron job scheduled every 15 minutes.");

// ✅ Define API Routes
app.use('/auth', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/bookmarks', bookmarksRoutes);
app.use('/api/reading-history', readingHistoryRoutes);
app.use('/api', newRoutes);

// ✅ Global Error Handling Middleware (Agar koi route na mile ya error aaye)
app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Handle 404 Not Found Routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// ✅ Start Server
app.listen(process.env.PORT, () => {
    console.log(`🚀 Server is running on port ${process.env.PORT}`);
});


