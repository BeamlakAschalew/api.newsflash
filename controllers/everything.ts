import { Request, Response } from "express";
import { database } from "../db_config";
import he from "he";
import { ResponseModel, Article, Source } from "../types";

const escapeLike = (str: string) => `%${str.replace(/([%_])/g, "\\$1")}%`;

const everything = async (req: Request, res: Response) => {
  try {
    const {
      q,
      searchIn = "title,description",
      sources,
      categories,
      domains,
      excludeDomains,
      from,
      to,
      sortBy = "published_at",
      pageSize = "20",
      page = "1",
    } = req.query;

    let sql = `SELECT * FROM articles JOIN sources ON articles.source_id = sources.id WHERE 1=1`;
    const params: (string | number)[] = [];

    if (typeof q === "string") {
      const searchFields =
        typeof searchIn === "string" ? searchIn.split(",") : [];
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

    const offset =
      (parseInt(page as string) - 1) * parseInt(pageSize as string);
    sql += ` LIMIT ? OFFSET ?`;
    params.push(parseInt(pageSize as string), offset);

    database.getConnection((error, connection) => {
      if (error) {
        return res.status(500).send({
          status: "failed",
          total_results: 0,
          articles: null,
        } as ResponseModel);
      }
      if (!error)
        connection.query(sql, params, (error, result) => {
          if (error) {
            console.log(error);
            return res.status(500).send({
              status: "failed",
              total_results: 0,
              articles: null,
            } as ResponseModel);
          }
          const r = result as any;
          const sanitizedResults = r.map((row: any) => {
            if (row.description) {
              row.description = he.escape(row.description);
            }
            return row;
          });
          const articles: Article[] = [];
          // test
          sanitizedResults.forEach((article: any) => {
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
  } catch (error) {
    res.status(500).send({
      status: "failed",
      total_results: 0,
      articles: null,
    } as ResponseModel);
  }
};

export default everything;
