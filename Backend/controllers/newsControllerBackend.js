import axios from "axios";
import News from "../models/News.js";

// ✅ News Fetch with Caching
export const fetchNewsByCategory = async (req, res) => {
    try {
      const { category } = req.params; // 🔴 Ensure category is extracted correctly
      const { page = 1 } = req.query;
      const pageSize = 10;
  
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
      );
  
      if (!response.data.articles.length) {
        return res
          .status(404)
          .json({ message: "No news found for this category." });
      }
  
      res.status(200).json({
        news: response.data.articles,
        nextPage:
          response.data.articles.length === pageSize ? Number(page) + 1 : null,
      });
    } catch (error) {
      console.error("Error fetching news:", error.response?.data || error.message);
  
      // 🔴 Fix: Ensure category is still accessible
      const { category } = req.params; 
  
      if (error.response?.status === 429) {
        console.log("⚠️ Rate Limit Exceeded! Showing cached news...");
  
        try {
          const fallbackNews = await News.find({ category: category.toLowerCase() })
            .sort({ publishedAt: -1 })
            .limit(10);
  
          return res.status(200).json({ news: fallbackNews, nextPage: null });
        } catch (dbError) {
          console.error("Error fetching cached news:", dbError.message);
          return res.status(500).json({ message: "Error fetching cached news." });
        }
      }
  
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  