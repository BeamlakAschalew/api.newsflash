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
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../db_config");
const utils_1 = require("../utils");
const escapeLike = (str) => `%${str.replace(/([%_])/g, "\\$1")}%`;
const everything = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { q, searchIn = "title,description", sources, categories, domains, excludeDomains, from, to, sortBy = "published_at", pageSize = "20", page = "1", } = req.query;
        let sql = `SELECT * FROM articles JOIN sources ON articles.source_id = sources.id WHERE 1=1`;
        const params = [];
        if (typeof q === "string") {
            const searchFields = typeof searchIn === "string" ? searchIn.split(",") : [];
            const searchConditions = searchFields
                .map((field) => `${field} LIKE ?`)
                .join(" OR ");
            params.push(...Array(searchFields.length).fill(escapeLike(q)));
            sql += ` AND (${searchConditions})`;
        }
        if (typeof from === "string") {
            sql += ` AND published_at >= ?`;
            params.push(`${from} 00:00:00`);
        }
        if (typeof to === "string") {
            sql += ` AND published_at <= ?`;
            params.push(`${to} 23:59:59`);
        }
        if (typeof sortBy === "string") {
            sql += ` ORDER BY ${sortBy} DESC`;
        }
        const offset = (parseInt(page) - 1) * parseInt(pageSize);
        sql += ` LIMIT ? OFFSET ?`;
        params.push(parseInt(pageSize), offset);
        db_config_1.database.getConnection((error, connection) => {
            if (error) {
                return res.status(500).send({
                    status: "failed",
                    total_results: 0,
                    articles: null,
                });
            }
            if (!error)
                connection.query(sql, params, (error, result) => {
                    if (error) {
                        console.log(error);
                        return res.status(500).send({
                            status: "failed",
                            total_results: 0,
                            articles: null,
                        });
                    }
                    const r = result;
                    const sanitizedResults = r.map((row) => {
                        if (row.description) {
                            row.description = (0, utils_1.removeHtmlTags)(row.description);
                        }
                        return row;
                    });
                    const articles = [];
                    sanitizedResults.forEach((article) => {
                        articles.push({
                            source: {
                                id: article.source_id,
                                name: article.name,
                                source_image_url: article.source_image_url,
                            },
                            id: article.id,
                            category_id: article.category_id,
                            title: article.title,
                            description: article.description,
                            url: article.article_url,
                            image_url: article.image_url,
                            published_at: article.published_at,
                            scraped_at: article.scraped_at,
                        });
                    });
                    const modifiedResults = {
                        status: "ok",
                        total_results: articles.length,
                        articles: articles,
                    };
                    return res.json(modifiedResults);
                });
        });
    }
    catch (error) {
        res.status(500).send({
            status: "failed",
            total_results: 0,
            articles: null,
        });
    }
});
exports.default = everything;
