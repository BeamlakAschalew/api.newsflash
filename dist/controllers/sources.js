"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../db_config");
const sources = (req, res) => {
    try {
        const sql = `SELECT * FROM sources;`;
        db_config_1.database.getConnection((error, connection) => {
            if (error)
                res.status(500).send(error);
            connection.query(sql, null, (error, result) => {
                if (error)
                    res.status(500).send(error);
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
exports.default = sources;
