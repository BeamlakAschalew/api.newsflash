"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const everything_1 = __importDefault(require("./controllers/everything"));
const sources_1 = __importDefault(require("./controllers/sources"));
const categories_1 = __importDefault(require("./controllers/categories"));
const light_reader_1 = __importDefault(require("./controllers/light_reader"));
const headline_sources_1 = __importDefault(require("./controllers/headline_sources"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get("/", (_, res) => {
    res.send("Newsflash api");
});
app.get("/api/everything", everything_1.default);
app.get("/api/sources", sources_1.default);
app.get("/api/categories", categories_1.default);
app.get("/api/light-reader", light_reader_1.default);
app.get("/api/top-headlines/sources", headline_sources_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
