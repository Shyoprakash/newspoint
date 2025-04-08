import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Badge, Pagination } from '@mantine/core';
import { fetchAllNews, addReadingHistory } from '../redux/slice/newsSlice';

function Word() {
  const dispatch = useDispatch();
  const { news, loading, totalCount, totalPages } = useSelector((state) => state.news);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('us');

  // 🔁 Debounced Search Effect
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchAllNews({ currentPage, search, country }));
    }, 500); // 500ms debounce

    return () => clearTimeout(delayDebounce);
  }, [search, currentPage, country]);

  const handleAddHistory = (n) => {
    const data = {
      article: {
        articleId: n._id,
        title: n.title,
        source: n.source.name,
        url: n.url,
        imageUrl: n.urlToImage,
        publishedAt: n.publishedAt,
      },
    };
    dispatch(addReadingHistory(data));
  };

  const countries = ['us', 'in', 'ca', 'au', 'gb'];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for country selection */}
      <aside className="w-64 p-6 sticky top-0 h-screen border-l border-gray-100 bg-white">
        <h2 className="text-lg font-semibold mb-4">🌍 Select Country</h2>
        <div className="space-y-3">
          {countries.map((c) => (
            <button
              key={c}
              onClick={() => setCountry(c)}
              className={`w-full flex items-center text-sm gap-3 px-4 py-2 rounded-lg transition ${
                country === c
                  ? 'bg-sky-500 text-white'
                  : 'bg-gray-100 hover:bg-sky-500 hover:text-white'
              }`}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-4xl font-bold mb-2">📰 World News</h1>
        <input
          type="text"
          placeholder="Search news..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4"
        />

        <div>
          {loading
            ? [...Array(5)].map((_, i) => <Skeleton key={i} height={100} radius="md" />)
            : news?.map((n, i) => (
                <div key={i} className="p-4 flex border border-gray-100 rounded-lg bg-white mb-4">
                  <div className="flex flex-col flex-1 gap-2">
                    <a
                      href={n.url}
                      onClick={() => handleAddHistory(n)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl text-gray-800 font-semibold hover:underline"
                    >
                      {n.title}
                    </a>
                    <p className="text-gray-700 text-md">{n.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge color="blue" variant="light">
                        {n.source?.name || 'Unknown'}
                      </Badge>
                      <Badge color="green" variant="light">
                        {n.author || 'Unknown'}
                      </Badge>
                      <Badge color="gray" variant="light">
                        {new Date(n.publishedAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  {n.urlToImage && (
                    <img
                      className="h-32 w-32 object-cover rounded-md ml-4"
                      src={n.urlToImage}
                      alt="news"
                    />
                  )}
                </div>
              ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Pagination
            value={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
            color="blue"
            radius="sm"
          />
        </div>
      </main>
    </div>
  );
}

export default Word;
