"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const everything_1 = __importDefault(require("./controllers/everything"));
//For env File
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
    res.send("Newsflash api");
});
app.get("/everything", everything_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
