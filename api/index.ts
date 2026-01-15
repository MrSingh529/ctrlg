import "dotenv/config";
import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Test route
app.get("/api/articles", async (_req, res) => {
  try {
    res.json([
      {
        id: 1,
        title: "The Art of Doing Nothing (Efficiently)",
        slug: "art-of-doing-nothing",
        description: "Automation is about saving mental energy.",
        content: "<p>Let machines do boring work.</p>",
        publishedAt: new Date().toISOString()
      },
      {
        id: 2,
        title: "Excel Formulas That Changed How I Think",
        slug: "excel-formulas-mindset",
        description: "Excel is logic, not math.",
        content: "<p>IF, THEN, ELSE mindset.</p>",
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
    
    console.log("New subscriber:", email);
    
    res.status(201).json({ 
      id: Date.now(),
      email,
      subscribedAt: new Date().toISOString(),
      message: "Thank you for subscribing!"
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;