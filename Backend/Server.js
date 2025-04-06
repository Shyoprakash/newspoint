
import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cron from 'node-cron';
import admin from 'firebase-admin';
import serviceAccount from './Key/newspoint-ec222-firebase-adminsdk-fbsvc-5134074668.json' with { type: "json" };

import userRoutes from './routes/UserRoutes.js';
import bookmarksRoutes from './routes/bookmarksRoutes.js';
import readingHistoryRoutes from './routes/readingHistoryRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import { fetchNewsAndStore } from "./utils/fetchNews.js";
import newRoutes from './routes/newsRoutes.js';

dotenv.config();
const app = express();

// ✅ Firebase Admin SDK Init
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// ✅ Middleware
app.use(cors({
  credentials: true,
  origin: "http://localhost:5173"
}));
app.use(cookieParser());
app.use(express.json());

// ✅ Connect to DB
dbConnect();

// ✅ Cron Job
cron.schedule("*/15 * * * *", fetchNewsAndStore);
console.log("✅ News fetch cron job scheduled every 15 minutes.");

// ✅ Routes
app.use('/auth', userRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', bookmarksRoutes);
app.use('/api', readingHistoryRoutes); // ✅ Correct route
app.use('/api', newRoutes);

// ✅ Error Handling
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ 404 Handling
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start Server
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on port ${process.env.PORT}`);
});
