import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  urlToImage: String,
  publishedAt: Date,
  category: String,
});

const News = mongoose.model("News", newsSchema);
export default News;
