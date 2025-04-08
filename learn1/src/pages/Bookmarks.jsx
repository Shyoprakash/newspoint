import React from 'react';
import { useSelector } from 'react-redux';
import ArticleCard from '../Componets/ArticleCard';

const Bookmarks = () => {
  const bookmarks = useSelector((state) => state.bookmarks?.bookmarks || []);

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Bookmarked Articles</h1>

      {bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {bookmarks.map((article, index) => (
            <ArticleCard key={index} article={{
              ...article,
              urlToImage: article.imageUrl, // map imageUrl to expected prop
              source: { name: article.source } // wrap source as object
            }} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No bookmarks yet.</p>
      )}
    </div>
  );
};

export default Bookmarks;
