"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../db_config");
const headlineSources = (req, res) => {
    try {
        const sql = `SELECT sources.id, name, url, created_at, updated_at, source_image_url, category FROM headline_sources as hs JOIN sources ON hs.source_id = sources.id;`;
        db_config_1.database.getConnection((error, connection) => {
            if (error)
                res.status(500).send(error);
            connection.query(sql, null, (error, result) => {
                if (error)
                    return res.status(500).send(error);
                const sources = result;
                const r = {
                    status: "ok",
                    total_sources: sources.length,
                    sources: result,
                };
                res.send(r);
            });
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.default = headlineSources;
