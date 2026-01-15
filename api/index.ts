import "dotenv/config";
import express from "express";
import { registerRoutes } from "../server/routes";
import path from "path";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes
registerRoutes(null as any, app);

// Serve static files from dist folder (for Vercel)
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));

// For any other route, serve index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

export default app;