import express from "express";
import { registerRoutes } from "./routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

await registerRoutes(undefined as any, app);

export default app;