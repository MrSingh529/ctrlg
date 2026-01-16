import type { Express } from "express";
import { z } from "zod";
import { storage } from "./storage.js";
import { api } from "@shared/routes";
import { addSubscriberToEmailOctopus } from "./emailoctopus-subscribe.js";
import { sendArticleEmailMailjet } from "./mailjet.js";

export async function registerRoutes(_httpServer: any, app: Express) {

  // LIST ARTICLES
  app.get(api.articles.list.path, async (_req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  // GET ARTICLE BY SLUG
  app.get(api.articles.getBySlug.path, async (req, res) => {
    const article = await storage.getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  });

  // CREATE ARTICLE
  app.post(api.articles.create.path, async (req, res) => {
    try {
      const input = api.articles.create.input.parse(req.body);
      const article = await storage.createArticle(input);

      // Send emails via Mailjet
      try {
        const subscribers = await storage.getSubscribers();
        
        // Send emails but don't block article creation
        const emailPromises = subscribers.map(s => 
          sendArticleEmailMailjet(s.email, {
            title: article.title,
            description: article.description,
            slug: article.slug,
          }).catch(err => {
            console.error(`Failed to send email to ${s.email}:`, err.message);
          })
        );
        
        Promise.all(emailPromises).then(() => {
          console.log(`Mailjet emails sent to ${subscribers.length} subscribers`);
        });
        
      } catch (emailError) {
        console.error("Mailjet setup error:", emailError);
      }

      res.status(201).json(article);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      console.error("Article creation error:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/categories", async (_req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/api/categories/:slug/articles", async (req, res) => {
    try {
      const articles = await storage.getArticlesByCategory(req.params.slug);
      res.json(articles);
    } catch (error) {
      console.error("Error fetching category articles:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // CREATE SUBSCRIBER
app.post(api.subscribers.create.path, async (req, res) => {
  try {
    const input = api.subscribers.create.input.parse(req.body);
    const existing = await storage.getSubscriberByEmail(input.email);

    if (existing) {
      return res.status(409).json({ message: "Already subscribed" });
    }

    // 1. Save to your database
    const subscriber = await storage.createSubscriber(input);
    
    // 2. Add to EmailOctopus (for welcome email and list management)
    try {
      await addSubscriberToEmailOctopus(input.email);
    } catch (emailOctopusError) {
      console.error("Failed to add to EmailOctopus:", emailOctopusError);
      // Don't fail - still save to database
    }
    
    // 3. Send welcome email via Mailjet (optional backup)
    try {
      await sendArticleEmailMailjet(input.email, {
        title: "Welcome to Ctrl + G!",
        description: "You'll receive practical insights on technology, Excel, AI, and automation.",
        slug: "welcome",
      });
      console.log(`Welcome email sent to ${input.email}`);
    } catch (mailjetError) {
      console.error("Welcome email failed:", mailjetError);
    }

    res.status(201).json(subscriber);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join("."),
      });
    }
    console.error("Subscriber creation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

  await seedDatabase();
}

/* SEED */

async function seedDatabase() {
  const existing = await storage.getArticles();
  if (existing.length > 0) return;

  await storage.createArticle({
    title: "The Art of Doing Nothing (Efficiently)",
    slug: "art-of-doing-nothing",
    description: "Automation is about saving mental energy.",
    content: "<p>Let machines do boring work.</p>",
  });

  await storage.createArticle({
    title: "Excel Formulas That Changed How I Think",
    slug: "excel-formulas-mindset",
    description: "Excel is logic, not math.",
    content: "<p>IF, THEN, ELSE mindset.</p>",
  });

  await storage.createArticle({
    title: "AI as a Thinking Partner",
    slug: "ai-thinking-partner",
    description: "Use AI to think better.",
    content: "<p>AI is a collaborator.</p>",
  });
}