import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import everything from "./controllers/everything";
import sources from "./controllers/sources";
import categories from "./controllers/categories";

//For env File
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Newsflash api");
});

app.get("/api/everything", everything);
app.get("/api/sources", sources);
app.get("/api/categories", categories);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
