import { Readability } from "@mozilla/readability";
import axios from "axios";
import { Request, Response } from "express";
import { JSDOM } from "jsdom";

const lightReader = async (req: Request, res: Response) => {
  const url = req.query.url as string;
  const mode = req.query.mode;

  if (!url) {
    res.status(400).send({ error: "URL is required" });
    return;
  }

  try {
    const response = await axios.get(url as string, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        Connection: "keep-alive",
      },
    });
    const html = response.data;

    const dom = new JSDOM(html, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (!article) res.status(404).send({ error: "No article found" });

    const baseUrl = new URL(url);
    const contentWithAbsoluteUrls = article!.content.replace(
      /<img[^>]+src="([^">]+)"/g,
      (match, imgSrc) => {
        const absoluteSrc = imgSrc.startsWith("http")
          ? imgSrc
          : new URL(imgSrc, baseUrl).href;
        return match.replace(imgSrc, absoluteSrc);
      }
    );

    const isDarkMode = mode === "dark";
    const backgroundColor = isDarkMode ? "#121212" : "#fafafa";
    const textColor = isDarkMode ? "#e0e0e0" : "#333";
    const linkColor = isDarkMode ? "#bb86fc" : "#0066cc";

    res.send(`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${article!.title}</title>
        <style>
            body {
                font-family: Geist, Arial, sans-serif;
                line-height: 1.6;
                color: ${textColor};
                padding: 16px;
                max-width: 800px;
                margin: 0 auto;
                background-color: ${backgroundColor};
            }
            h1 {
                font-size: 24px;
                color: ${textColor};
                margin-bottom: 0.5em;
            }
            p {
                margin: 1em 0;
            }
            img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
            }
            a {
                color: ${linkColor};
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <h1>${article!.title}</h1>
        ${contentWithAbsoluteUrls}
        </body>
</html>
        `);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).send("Failed to load article.");
  }
};

export default lightReader;
