import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple test route
app.get("/api/articles", async (_req, res) => {
  try {
    // For now, return dummy data
    res.json([
      {
        id: 1,
        title: "The Art of Doing Nothing (Efficiently)",
        slug: "art-of-doing-nothing",
        description: "Automation is about saving mental energy.",
        content: "<p>Let machines do boring work.</p>",
        publishedAt: new Date().toISOString()
      }
    ]);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/subscribers", async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email required" });
    }
    
    // For now, just return success
    res.status(201).json({ 
      id: Date.now(),
      email,
      subscribedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;