import "dotenv/config";
import express from "express";
import cors from "cors";
import { registerRoutes } from "./routes";

const app = express();

// CORS configuration
const corsOptions = {
  origin: [
    "https://ctrlgtech.vercel.app",
    "http://localhost:3000"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Apply CORS middleware
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(null as any, app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});