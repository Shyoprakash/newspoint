import axios from "axios";
import News from "../model/News.js"; // ✅ Ensure correct path
import fs from "fs";  // ✅ File System Module Import karo

const countries = ["us", "uk", "fr", "in", "it"];
const categories = [
  "general",
  "sports",
  "politics",
  "business",
  "entertainment",
  "health",
  "science",
];

export const fetchNewsAndStore = async () => {
  try {
    let logMessage = `\n[${new Date().toLocaleString()}] Fetching news...\n`;

    for (let country of countries) {
      for (let category of categories) {
        console.log(`Fetching news for ${category} - ${country}`);

        try {
          const { data } = await axios.get(
            `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`
          );

          if (data.articles && data.articles.length > 0) {
            for (let d of data.articles) {
              const exist = await News.findOne({ title: d.title });

              if (!exist) {
                await News.create({
                  content: d.content || "",
                  title: d.title || "No Title",
                  author: d.author || "Unknown",
                  description: d.description || "",
                  url: d.url || "#",
                  urlToImage: d.urlToImage || "",
                  category: category, // ✅ Corrected
                  publishedAt: d.publishedAt || new Date(),
                  country: country, // ✅ Corrected
                  source: {
                    id: d.source?.id || "unknown",
                    name: d.source?.name || "Unknown Source",
                  },
                });

                logMessage += `Inserted: ${d.title} [${category}-${country}]\n`;
              } else {
                logMessage += `Already Exists: ${d.title}\n`;
              }
            }
          } else {
            logMessage += `No data found for ${category}-${country}\n`;
          }
        } catch (apiError) {
          console.error(`⚠️ API Error for ${category}-${country}:`, apiError.message);
          logMessage += `API Error: ${apiError.message}\n`;
        }

        // ✅ Prevent API rate limit (2 sec delay)
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }

    // ✅ Logs को file में लिखो
    fs.appendFileSync("news_fetch.log", logMessage);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    fs.appendFileSync("news_fetch.log", `Error: ${error.message}\n`);
  }
};




// export const fetchNewsAndStore = async () => {
//   try {
//     for (let country of countries) {
//       for (let category of categories) {
//         const { data } = await axios.get(
//           `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=${process.env.NEWS_API_KEY}`
//         );

//         if (data.articles && data.articles.length > 0) {
//           for (let d of data.articles) {
//             const exist = await News.findOne({ title: d.title });

//             if (!exist) {
//               await News.create({
//                 content: d.content,
//                 title: d.title,
//                 author: d.author,
//                 description: d.description,
//                 url: d.url,
//                 urlToImage: d.urlToImage,
//                 category, // ✅ Fix: Use `category` from loop
//                 publishedAt: d.publishedAt,
//                 country, // ✅ Fix: Use `country` from loop
//                 source: {
//                   id: d.source.id,
//                   name: d.source.name,
//                 },
//               });
//               console.log(`Inserted ${d.title} [${category}-${country}]`);
//             } else {
//               console.log(`Already exists ${d.title}`);
//             }
//           }
//         } else {
//           console.log(`No data found for ${category}-${country}`);
//         }
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching news:", error.message);
//   }
// };