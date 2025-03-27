
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import NewsSummary from "../model/NewsSummary.js";

dotenv.config();
console.log(process.env.GEMINI_API_KEY);

puppeteer.use(StealthPlugin());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateSummary = async (content) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const response = await model.generateContent(
    `please summarize these content ${content}`
  );
  return response.response.text();
};

// export const newsSummarize = async (req, res) => {
//   const { url } = req.body;
//   try {
//     if (!url) return res.status(400).json({ error: "URL is required" });

//     const exist = await NewsSummary.findOne({ url });
//     if (exist) return res.status(200).json({ summary: exist.summary });

//     const browser = await puppeteer.launch({ headless: "new", args: ["--disable-http2"] });
//     const page = await browser.newPage();

//     await page.setUserAgent(
//       "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36"
//     );

//     await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });

//     const extractedText = await page.evaluate(() =>
//       Array.from(document.querySelectorAll("p"))
//         .map((p) => p.innerText)
//         .join(" ")
//     );
//     await browser.close();

//     const summary = await generateSummary(extractedText);
//     const newSummary = new NewsSummary({ url, summary });
//     await newSummary.save();

//     res.status(200).json({ summary });
//   } catch (error) {
//     console.error("Error in summarization:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// };


export const newsSummarize = async (req, res) => {
  const { url } = req.body;
  try {
    if (!url) return res.status(400).json({ error: "URL is required" });

    const exist = await NewsSummary.findOne({ url });
    if (exist) return res.status(200).json({ summary: exist.summary });

    // ✅ Launch Puppeteer
    const browser = await puppeteer.launch({ headless: true, args: ["--disable-http2"] });
    const page = await browser.newPage();

    // ✅ Block Unnecessary Requests (CSS, images, fonts)
    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (["image", "stylesheet", "font"].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // ✅ Visit the URL
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });

    // ✅ Extract only first 5000 characters to speed up Gemini request
    const extractedText = await page.evaluate(() =>
      Array.from(document.querySelectorAll("p"))
        .map((p) => p.innerText)
        .join(" ")
        .slice(0, 5000)
    );

    await browser.close(); // ✅ Close browser after scraping

    // ✅ Generate Summary
    const summary = await generateSummary(extractedText);
    
    // ✅ Save summary to DB
    const newSummary = new NewsSummary({ url, summary });
    await newSummary.save();

    res.status(200).json({ summary });
  } catch (error) {
    console.error("Error in summarization:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
