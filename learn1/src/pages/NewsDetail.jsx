import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function NewsDetail() {
  const { id } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/news/${id}`);
        setNews(res.data);
        console.log(res.data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchNews();
  }, [id]);

  if (!news) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {news.urlToImage && (
        <img
          src={news.urlToImage}
          alt={news.title}
          className="w-full h-80 object-cover rounded-lg mb-4"
          onError={(e) => (e.target.src = "/no-image.jpg")}
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{news.title}</h1>
      <p className="text-gray-500 mb-4">
        {news.author || "Unknown Author"} • {new Date(news.publishedAt).toLocaleDateString()}
      </p>
      <p className="text-lg text-gray-700 leading-relaxed">{news.content || news.description}</p>
    </div>
  );
}
