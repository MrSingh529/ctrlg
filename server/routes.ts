import type { Express } from "express";
import { z } from "zod";
import { storage } from "./storage.js";
import { api } from "@shared/routes";
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
            // Don't throw - continue with other emails
          })
        );
        
        Promise.all(emailPromises).then(() => {
          console.log(`Mailjet emails sent to ${subscribers.length} subscribers`);
        });
        
      } catch (emailError) {
        console.error("Mailjet setup error:", emailError);
        // Don't fail article creation
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

  // CREATE SUBSCRIBER
  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      const existing = await storage.getSubscriberByEmail(input.email);

      if (existing) {
        return res.status(409).json({ message: "Already subscribed" });
      }

      const subscriber = await storage.createSubscriber(input);
      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
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

/* ---------------- SEED ---------------- */

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