import express from "express";
import { fetchNewsByCategory } from "../controllers/newsController.js";

const router = express.Router();

// ✅ News Fetch Route
router.get("/:category", fetchNewsByCategory);
export default router;
