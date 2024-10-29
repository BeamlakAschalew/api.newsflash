import { Request, Response } from "express";
import { database } from "../db_config";
import { Source, Sources } from "../types";

const headlineSources = (req: Request, res: Response) => {
  try {
    const sql = `SELECT sources.id, name, url, created_at, updated_at, source_image_url, category FROM headline_sources as hs JOIN sources ON hs.source_id = sources.id;`;
    database.getConnection((error, connection) => {
      if (error) res.status(500).send(error);
      connection.query(sql, null, (error, result) => {
        if (error) return res.status(500).send(error);
        const sources = result as Source[];
        const r: Sources = {
          status: "ok",
          total_sources: sources.length,
          sources: result as Source[],
        };
        res.send(r);
      });
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export default headlineSources;
