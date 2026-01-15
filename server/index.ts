import "dotenv/config";
import express from "express";
import { registerRoutes } from "./routes";

const app = express();

// Manual CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://ctrlgtech.vercel.app",
    "http://localhost:3000"
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin as string)) {
    res.setHeader("Access-Control-Allow-Origin", origin as string);
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(null as any, app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});