import "dotenv/config";
import express from "express";
import { registerRoutes } from "./routes";
import axios from "axios";

const app = express();

// CORS middleware
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://www.ctrlg.in",
    "https://ctrlg.in",
    "https://ctrlgtech.vercel.app",
    "http://localhost:3000"
  ];

  const origin = req.headers.origin as string | undefined;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

registerRoutes(null as any, app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
  
  // This prevents Render from sleeping after 15 minutes of inactivity  
  setTimeout(() => {
    const SELF_URL = process.env.RENDER_EXTERNAL_URL || 'https://ctrlg-backend.onrender.com';
    const PING_INTERVAL = 12 * 60 * 1000; // 12 minutes
    
    function pingSelf() {
      const urlToPing = `${SELF_URL}/api/articles`;
      console.log(`[Keep-Alive] Pinging: ${urlToPing}`);
      
      axios.get(urlToPing)
        .then(response => {
          console.log(`[Keep-Alive] Ping successful. Status: ${response.status}`);
        })
        .catch(error => {
          console.log(`[Keep-Alive] Ping triggered server wake-up. Message: ${error.message}`);
        });
    }
    
    // Start the interval
    setInterval(pingSelf, PING_INTERVAL);
    console.log(`[Keep-Alive] Timer set to ping every 12 minutes`);
    
    // Ping once immediately to ensure it's awake
    pingSelf();
  }, 5000); // Wait 5 seconds before starting
});
