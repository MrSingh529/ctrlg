import "dotenv/config";
import express from "express";
import { registerRoutes } from "./routes";

const app = express();

// CORS middleware - FIXED
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://ctrlgtech.vercel.app",
    "http://localhost:3000"
  ];
  
  const origin = req.headers.origin;
  
  // Set CORS headers for ALL responses
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  // Handle preflight
  if (req.method === "OPTIONS") {
    // Send proper headers for OPTIONS
    return res.status(204).header({
      "Content-Length": "0",
      "Access-Control-Max-Age": "86400"
    }).end();
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