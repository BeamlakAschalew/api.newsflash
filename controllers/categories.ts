import { Request, Response } from "express";
import { database } from "../db_config";
import { Categories, Category } from "../types";

const categories = (req: Request, res: Response) => {
  try {
    const sql = `SELECT * FROM categories;`;
    database.getConnection((error, connection) => {
      if (error) return res.status(500).send(error);
      connection.query(sql, null, (error, result) => {
        if (error) res.status(500).send(error);
        const categories = result as Category[];
        const r: Categories = {
          status: "ok",
          total_categories: categories.length,
          categories: categories,
        };
        return res.send(r);
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default categories;
