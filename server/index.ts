import "dotenv/config";
import express from "express";
import { registerRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(null as any, app);

const port = 5000;
app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});