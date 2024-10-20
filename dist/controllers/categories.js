"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("../db_config");
const categories = (req, res) => {
    try {
        const sql = `SELECT * FROM categories;`;
        db_config_1.database.getConnection((error, connection) => {
            if (error)
                return res.status(500).send(error);
            connection.query(sql, null, (error, result) => {
                if (error)
                    res.status(500).send(error);
                const categories = result;
                const r = {
                    status: "ok",
                    total_categories: categories.length,
                    categories: categories,
                };
                return res.send(r);
            });
        });
    }
    catch (error) {
        res.status(500).send(error);
    }
};
exports.default = categories;
