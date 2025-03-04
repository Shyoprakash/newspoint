// import User from '../model/User.js';
// import axios from 'axios';
// export const Preferences = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { preferences } = req.body;

//     const user = await User.findById(id);
//     console.log(user);
//     // console.log([...preferences]);
//     console.log(user.preferences);
//     user.preferences = [...user.preferences, ...preferences];
//     await user.save();

//     res.status(200).json({
//       message: 'preferences save successfully',
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };

// export const fetchNewsByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;
//     const { page = 1 } = req.query;
//     const pageSize = 10;

//     const response = await axios.get(
//       `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
//     );

//     if (!response.data.articles.length) {
//       return res
//         .status(404)
//         .json({ message: 'No news found for this category.' });
//     }

//     res.status(200).json({
//       news: response.data.articles,
//       nextPage:
//         response.data.articles.length === pageSize ? Number(page) + 1 : null,
//     });
//   } catch (error) {
//     console.error(
//       'Error fetching news:',
//       error.response?.data || error.message
//     );
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };





import User from '../model/User.js';
import axios from 'axios';
import News from '../model/News.js'; // 🔴 Import MongoDB Model

export const Preferences = async (req, res) => {
  try {
    const { id } = req.params;
    const { preferences } = req.body;

    const user = await User.findById(id);
    console.log(user);
    console.log(user.preferences);

    user.preferences = [...user.preferences, ...preferences];
    await user.save();

    res.status(200).json({
      message: 'Preferences saved successfully',
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// export const fetchNewsByCategory = async (req, res) => {
//   try {
//     const { category } = req.params;  // 🟢 Category ko define karo
//     const { page = 1 } = req.query;
//     const pageSize = 10;

//     const response = await axios.get(
//       `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
//     );

//     if (!response.data.articles.length) {
//       return res.status(404).json({ message: 'No news found for this category.' });
//     }

//     res.status(200).json({
//       news: response.data.articles,
//       nextPage: response.data.articles.length === pageSize ? Number(page) + 1 : null,
//     });
//   } catch (error) {
//     console.error('Error fetching news:', error.response?.data || error.message);

//     // 🛑 API Rate Limit Exceeded: Serve Cached News from MongoDB
//     if (error.response?.status === 429) {
//       console.log('⚠️ Rate Limit Exceeded! Showing cached news...');

//       const { category } = req.params;  // 🟢 Ensure category is defined again
//       const fallbackNews = await News.find({ category }) // 🔴 Error ye tha!
//         .sort({ publishedAt: -1 })
//         .limit(10);

//       return res.status(200).json({ news: fallbackNews, nextPage: null });
//     }

//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


export const fetchNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { page = 1 } = req.query;
    const pageSize = 10;

    // Pehle database se news fetch karo
    const cachedNews = await News.find({ category })
      .sort({ publishedAt: -1 })
      .limit(pageSize);

    // Agar database me news milti hai to wahi bhejo
    if (cachedNews.length) {
      return res.status(200).json({ news: cachedNews, nextPage: null });
    }

    // Agar database me nahi mili to API se fetch karo
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
    );

    if (!response.data.articles.length) {
      return res.status(404).json({ message: "No news found for this category." });
    }

    res.status(200).json({
      news: response.data.articles,
      nextPage: response.data.articles.length === pageSize ? Number(page) + 1 : null,
    });

  } catch (error) {
    console.error("Error fetching news:", error.response?.data || error.message);

    // ✅ Fix: `category` ko req.params se access karo
    const { category } = req.params; 

    // Rate limit error aane par cached news show karo
    if (error.response?.status === 429) {
      console.log("⚠️ Rate Limit Exceeded! Showing cached news...");
      const fallbackNews = await News.find({ category })
        .sort({ publishedAt: -1 })
        .limit(10);

      return res.status(200).json({ news: fallbackNews, nextPage: null });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};

