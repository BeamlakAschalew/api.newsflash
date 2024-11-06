"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readability_1 = require("@mozilla/readability");
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const lightReader = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    const mode = req.query.mode;
    if (!url) {
        res.status(400).send({ error: "URL is required" });
        return;
    }
    try {
        const response = yield axios_1.default.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                Connection: "keep-alive",
            },
        });
        const html = response.data;
        const dom = new jsdom_1.JSDOM(html, { url });
        const reader = new readability_1.Readability(dom.window.document);
        const article = reader.parse();
        if (!article)
            res.status(404).send({ error: "No article found" });
        const baseUrl = new URL(url);
        const contentWithAbsoluteUrls = article.content.replace(/<img[^>]+src="([^">]+)"/g, (match, imgSrc) => {
            const absoluteSrc = imgSrc.startsWith("http")
                ? imgSrc
                : new URL(imgSrc, baseUrl).href;
            return match.replace(imgSrc, absoluteSrc);
        });
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
        <title>${article.title}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
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
        <h1>${article.title}</h1>
        ${contentWithAbsoluteUrls}
        </body>
</html>
        `);
    }
    catch (error) {
        console.error("Error fetching article:", error);
        res.status(500).send("Failed to load article.");
    }
});
exports.default = lightReader;
