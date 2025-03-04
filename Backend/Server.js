// import express from 'express';
// import dotenv from 'dotenv';
// import dbConnect from './config/db.js';
// import userRoutes from './routes/UserRoutes.js';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import bookmarksRoutes from './routes/bookmarksRoutes.js';
// import readingHistoryRoutes from './routes/readingHistoryRoutes.js';
// import newRoutes from './routes/newsRoutes.js';
// import aiRoutes from './routes/aiRoutes.js';
// import cron from 'node-cron';
// import { fetchNewsAndStore } from "./utils/fetchNews.js";

// dotenv.config();
// const app = express();

// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:5173" // ✅ Correct origin with colon
// }));

// app.use(cookieParser());
// app.use(express.json());
// dbConnect();

// cron.schedule("*/15 * * * *", fetchNewsAndStore);
// console.log("✅ News fetch cron job scheduled every 15 minutes.");

// app.use('/auth', userRoutes);
// app.use('/api',newRoutes);
// app.use('/api', aiRoutes);
// app.use('/api', bookmarksRoutes)
// app.use('/api',readingHistoryRoutes)

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`);
// });


import express from 'express';
import dotenv from 'dotenv';
import dbConnect from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cron from 'node-cron';
import admin from 'firebase-admin';
import serviceAccount from './Key/newspoint-ec222-firebase-adminsdk-fbsvc-ef7c83aba3.json'with { type: "json" };

// ✅ Import Routes
import userRoutes from './routes/UserRoutes.js';
import bookmarksRoutes from './routes/bookmarksRoutes.js';
import readingHistoryRoutes from './routes/readingHistoryRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import newsRoutesBackend from './routes/newsRoutesBackend.js'; // ✅ Updated News Routes

// ✅ Import News Fetching Utility
import { fetchNewsAndStore } from "./utils/fetchNews.js";

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
app.use('/api/news', newsRoutesBackend);  // ✅ News Backend Routes
app.use('/api/ai', aiRoutes);
app.use('/api/bookmarks', bookmarksRoutes);
app.use('/api/reading-history', readingHistoryRoutes);

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
