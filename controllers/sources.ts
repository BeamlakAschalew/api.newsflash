import { Request, Response } from "express";
import { database } from "../db_config";
import { Source, Sources } from "../types";

const sources = (req: Request, res: Response) => {
  try {
    const sql = `SELECT * FROM sources;`;
    database.getConnection((error, connection) => {
      if (error) res.status(500).send(error);
      connection.query(sql, null, (error, result) => {
        if (error) res.status(500).send(error);
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

export default sources;
