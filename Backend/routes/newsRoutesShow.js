
import express from "express";
import {
  fetchAllNews,
  fetchNewsByCategory,
  Preferences,
} from "../controllers/newsController.js"; // ✅ use single correct controller file
import { getNewsById } from "../controllers/newsControllerShow.js"; // ✅ fixed 'from'

const router = express.Router();

// ✅ GET all news
router.get("/all", fetchAllNews);

// ✅ GET by category
router.get("/category/:category", fetchNewsByCategory);

// ✅ GET single news by ID (Detail Page)
router.get("/:id", getNewsById);

// ✅ POST preferences
router.post("/:id/preferences", Preferences);

export default router;
