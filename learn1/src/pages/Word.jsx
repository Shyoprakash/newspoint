import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorldNews } from "../redux/slice/worldNewsSlice";
import { Skeleton } from "@mantine/core";

const NewsSkeleton = () => (
  <div className="bg-white border rounded-xl p-4 mb-5 flex gap-4">
    <Skeleton height={120} width={160} radius="lg" />

    <div className="flex-1 space-y-3">
      <Skeleton height={20} radius="sm" />
      <Skeleton height={14} width="80%" radius="sm" />
      <Skeleton height={12} width="50%" radius="sm" />
    </div>
  </div>
);

const WorldNews = () => {
  const dispatch = useDispatch();

  const { news, loading, totalPages } = useSelector((state) => state.worldNews);

  const [page, setPage] = useState(1);
  const [country, setCountry] = useState("us");
  const [lang, setLang] = useState("en");
  const [search, setSearch] = useState("");
  
  const filteredNews = news.filter((n) =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchWorldNews({ page, country, lang }));
  }, [dispatch, page, country, lang]);
  console.log("WORLD NEWS DATA 👉", news);
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex flex-col gap-4 mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          🌍 World News
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <input
            type="text"
            placeholder="Search world news..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border px-4 py-3 rounded-lg w-full sm:max-w-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="flex gap-3">
            <select
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setPage(1);
              }}
              className="border px-3 py-3 rounded-lg bg-white"
            >
              <option value="us">USA</option>
              <option value="in">India</option>
              <option value="gb">UK</option>
              <option value="ca">Canada</option>
              <option value="au">Australia</option>
            </select>

            <select
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
                setPage(1);
              }}
              className="border px-3 py-3 rounded-lg bg-white"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🔹 Loading */}
      {loading && [...Array(5)].map((_, i) => <NewsSkeleton key={i} />)}

      {/* 🔹 News List */}
      {!loading &&
        news?.map((n, i) => (
          <div
            key={i}
            className="bg-white border rounded-xl p-4 sm:p-5 mb-5 flex flex-col sm:flex-row gap-4
             hover:shadow-md transition-shadow"
          >
            {n.image && (
              <img
                src={n.image}
                alt="news"
                className="w-full sm:w-40 h-48 sm:h-28 object-cover rounded-lg"
              />
            )}

            <div className="flex flex-col gap-2">
              <a
                href={n.url}
                target="_blank"
                rel="noreferrer"
                className="text-lg sm:text-xl font-semibold text-gray-900 hover:text-blue-600"
              >
                {n.title}
              </a>

              {n.description && (
                <p className="text-sm text-gray-600 line-clamp-3">
                  {n.description}
                </p>
              )}

              <div className="text-xs text-gray-500 mt-1">
                {n.source?.name} •{" "}
                {new Date(n.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}

      {/* 🔹 Pagination */}
      <div className="flex gap-3 justify-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2">
          Page {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorldNews;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Skeleton, Badge, Pagination } from '@mantine/core';
// import { fetchAllNews, addReadingHistory } from '../redux/slice/newsSlice';

// function Word() {
//   const dispatch = useDispatch();
//   const { news, loading, totalCount, totalPages } = useSelector((state) => state.news);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [search, setSearch] = useState('');
//   const [country, setCountry] = useState('us');

//   // 🔁 Debounced Search Effect
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       dispatch(fetchAllNews({ currentPage, search, country }));
//     }, 500); // 500ms debounce

//     return () => clearTimeout(delayDebounce);
//   }, [search, currentPage, country]);

//   const handleAddHistory = (n) => {
//     const data = {
//       article: {
//         articleId: n._id,
//         title: n.title,
//         source: n.source.name,
//         url: n.url,
//         imageUrl: n.urlToImage,
//         publishedAt: n.publishedAt,
//       },
//     };
//     dispatch(addReadingHistory(data));
//   };

//   const countries = ['us', 'in', 'ca', 'au', 'gb'];

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar for country selection */}
//       <aside className="w-64 p-6 sticky top-0 h-screen border-l border-gray-100 bg-white">
//         <h2 className="text-lg font-semibold mb-4">🌍 Select Country</h2>
//         <div className="space-y-3">
//           {countries.map((c) => (
//             <button
//               key={c}
//               onClick={() => setCountry(c)}
//               className={`w-full flex items-center text-sm gap-3 px-4 py-2 rounded-lg transition ${
//                 country === c
//                   ? 'bg-sky-500 text-white'
//                   : 'bg-gray-100 hover:bg-sky-500 hover:text-white'
//               }`}
//             >
//               {c.toUpperCase()}
//             </button>
//           ))}
//         </div>
//       </aside>

//       <main className="flex-1 overflow-y-auto p-8">
//         <h1 className="text-4xl font-bold mb-2">📰 World News</h1>
//         <input
//           type="text"
//           placeholder="Search news..."
//           onChange={(e) => setSearch(e.target.value)}
//           className="w-80 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4"
//         />

//         <div>
//           {loading
//             ? [...Array(5)].map((_, i) => <Skeleton key={i} height={100} radius="md" />)
//             : news?.map((n, i) => (
//                 <div key={i} className="p-4 flex border border-gray-100 rounded-lg bg-white mb-4">
//                   <div className="flex flex-col flex-1 gap-2">
//                     <a
//                       href={n.url}
//                       onClick={() => handleAddHistory(n)}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-xl text-gray-800 font-semibold hover:underline"
//                     >
//                       {n.title}
//                     </a>
//                     <p className="text-gray-700 text-md">{n.description}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Badge color="blue" variant="light">
//                         {n.source?.name || 'Unknown'}
//                       </Badge>
//                       <Badge color="green" variant="light">
//                         {n.author || 'Unknown'}
//                       </Badge>
//                       <Badge color="gray" variant="light">
//                         {new Date(n.publishedAt).toLocaleDateString()}
//                       </Badge>
//                     </div>
//                   </div>
//                   {n.urlToImage && (
//                     <img
//                       className="h-32 w-32 object-cover rounded-md ml-4"
//                       src={n.urlToImage}
//                       alt="news"
//                     />
//                   )}
//                 </div>
//               ))}
//         </div>

//         <div className="mt-6 flex justify-center">
//           <Pagination
//             value={currentPage}
//             total={totalPages}
//             onChange={setCurrentPage}
//             color="blue"
//             radius="sm"
//           />
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Word;
