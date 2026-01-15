import "dotenv/config";
import express from "express";
import { registerRoutes } from "../server/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register API routes ONLY
registerRoutes(null as any, app);

export default app;