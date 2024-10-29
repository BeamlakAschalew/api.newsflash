"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../db_config");
const utils_1 = require("../utils");
const escapeLike = (str) => `%${str.replace(/([%_])/g, "\\$1")}%`;
const topHeadlines = (req, res) => {
    try {
        const { q, searchIn = "title,description", logic = "or", source, category, excludeSource, excludeCategory, sortBy = "published_at", pageSize = "20", page = "1", strict = "false", } = req.query;
        let sql = `SELECT sources.id AS source_id, sources.name, sources.source_image_url, articles.id, articles.category_id, categories.name AS category_name, articles.title, articles.description, articles.article_url, articles.image_url, articles.published_at, articles.scraped_at FROM articles JOIN sources ON articles.source_id = sources.id JOIN categories ON articles.category_id = categories.id WHERE 1=1`;
        const params = [];
        sql += ` AND published_at >= ?`;
        const threeHoursAgo = new Date();
        threeHoursAgo.setHours(threeHoursAgo.getHours() - 3);
        params.push(threeHoursAgo.toISOString());
        if (strict === "true") {
            sql += ` AND category_id = ?`;
            params.push("2");
        }
        const queries = typeof q === "string" ? q.split(",") : [];
        if (queries.length > 0) {
            const searchFields = typeof searchIn === "string" ? searchIn.split(",") : [];
            const queryConditions = queries.map((term) => {
                const searchConditions = searchFields
                    .map((field) => `${field} LIKE ?`)
                    .join(" OR ");
                params.push(...Array(searchFields.length).fill(escapeLike(term.trim())));
                return `(${searchConditions})`;
            });
            sql += ` AND (${queryConditions.join(` ${logic.toString().toUpperCase()} `)})`;
        }
        const categories = typeof category === "string" ? category.split(",") : [];
        if (categories.length > 0) {
            const categoryConditions = categories
                .map(() => `category_id = ?`)
                .join(` OR `);
            params.push(...categories.map((id) => parseInt(id.trim(), 10)));
            sql += ` AND (${categoryConditions})`;
        }
        const sources = typeof source === "string" ? source.split(",") : [];
        if (sources.length > 0) {
            const sourceConditions = sources.map(() => `source_id = ?`).join(` OR `);
            params.push(...sources.map((id) => parseInt(id.trim(), 10)));
            sql += ` AND (${sourceConditions})`;
        }
        const excludeCategoryIds = typeof excludeCategory === "string" ? excludeCategory.split(",") : [];
        if (excludeCategoryIds.length > 0) {
            const excludeCategoryConditions = excludeCategoryIds
                .map(() => `category_id <> ?`)
                .join(" AND ");
            params.push(...excludeCategoryIds.map((id) => parseInt(id.trim(), 10)));
            sql += ` AND (${excludeCategoryConditions})`;
        }
        const excludeSourceIds = typeof excludeSource === "string" ? excludeSource.split(",") : [];
        if (excludeSourceIds.length > 0) {
            const excludeSourceConditions = excludeSourceIds
                .map(() => `source_id <> ?`)
                .join(" AND ");
            params.push(...excludeSourceIds.map((id) => parseInt(id.trim(), 10)));
            sql += ` AND (${excludeSourceConditions})`;
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
                        if (row.title) {
                            row.title = (0, utils_1.removeHtmlTags)(row.title);
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
                            category_name: article.category_name,
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
        res.status(500).send(error);
    }
};
exports.default = topHeadlines;
