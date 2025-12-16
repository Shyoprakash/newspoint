import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReadingHistory, deleteSingleHistory } from "../redux/slice/newsSlice"; 
import { formatDistanceToNow } from "date-fns";

const ReadingHistory = () => {
  const dispatch = useDispatch();
  const { readingHistory, loading } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getReadingHistory());
  }, [dispatch]);

  // ✅ Filter only valid articles with title & url
  const filteredHistory = readingHistory.filter(
    (item) => item.title && item.url
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Reading History</h1>

      {loading && <p>Loading...</p>}

      {!loading && filteredHistory.length === 0 && (
        <p className="text-gray-600">No valid reading history available.</p>
      )}

      <div className="space-y-6">
        {filteredHistory.map((item, index) => (
          <div
            key={item._id || index}
            className="p-4 border rounded-lg shadow hover:shadow-md transition flex gap-4"
          >
            <div className="flex gap-4">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-32 h-24 object-cover rounded"
                />
              )}

              <div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-blue-600 hover:underline"
                >
                  {item.title}
                </a>
                <p className="text-sm text-gray-500 mt-1">{item.source}</p>

                <p className="text-sm text-gray-500 mt-1">
                  Published:{" "}
                  {item.publishedAt
                    ? new Date(item.publishedAt).toLocaleString()
                    : "Unknown"}
                </p>

                <p className="text-sm text-gray-500">
                  Read:{" "}
                  {item.readAt
                    ? formatDistanceToNow(new Date(item.readAt), {
                        addSuffix: true,
                      })
                    : "N/A"}
                </p>
              </div>
            </div>
            {/* RIGHT SIDE DELETE BUTTON */}
            <button
              className="text-red-600 hover:text-red-800 font-semibold"
              onClick={() => dispatch(deleteSingleHistory(item._id))}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingHistory;
