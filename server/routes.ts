import { sendArticleEmail } from "./gmail";
import { sendNewArticleEmail } from "./emailoctopus";
import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function addSubscriberToEmailOctopus(email: string) {
  const apiKey = process.env.EMAILOCTOPUS_API_KEY;
  const listId = process.env.EMAILOCTOPUS_LIST_ID;

  if (!apiKey || !listId) {
    console.warn("EmailOctopus env vars missing");
    return;
  }

  try {
    const res = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${listId}/contacts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: apiKey,
          email_address: email,
          status: "SUBSCRIBED",
        }),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("EmailOctopus error:", text);
    }
  } catch (err) {
    console.error("EmailOctopus request failed:", err);
  }
}

export async function registerRoutes(
  _httpServer: any,
  app: Express
) {
  // Articles
  app.get(api.articles.list.path, async (req, res) => {
    const articles = await storage.getArticles();
    res.json(articles);
  });

  app.get(api.articles.getBySlug.path, async (req, res) => {
    const article = await storage.getArticleBySlug(req.params.slug);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(article);
  });

  app.post(api.articles.create.path, async (req, res) => {
    try {
      const input = api.articles.create.input.parse(req.body);
      const article = await storage.createArticle(input);
  
      // SEND EMAILS (non-blocking)
      const subscribers = await storage.getSubscribers();
  
      subscribers.forEach((subscriber) => {
        sendArticleEmail(subscriber.email, {
          title: article.title,
          description: article.description,
          slug: article.slug,
        }).catch(console.error);
      });
  
      res.status(201).json(article);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }
      throw err;
    }
  });

  // Subscribers
  app.post(api.subscribers.create.path, async (req, res) => {
    try {
      const input = api.subscribers.create.input.parse(req.body);
      
      const existing = await storage.getSubscriberByEmail(input.email);
      if (existing) {
        return res.status(409).json({ message: 'Email already subscribed' });
      }

      const subscriber = await storage.createSubscriber(input);
      addSubscriberToEmailOctopus(input.email);
      res.status(201).json(subscriber);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();
}

async function seedDatabase() {
  const existingArticles = await storage.getArticles();
  if (existingArticles.length === 0) {
    await storage.createArticle({
      title: "The Art of Doing Nothing (Efficiently)",
      slug: "art-of-doing-nothing",
      description: "Why automation isn't about being lazy, but about being smart with your finite time.",
      content: `
        <p>In a world obsessed with hustle, the idea of doing nothing seems counterintuitive. But when we talk about automation in technology, "doing nothing" is often the goal.</p>
        <h2>The Automation Paradox</h2>
        <p>We spend hours setting up systems to save us minutes. Is it worth it? The answer lies not in the time saved, but in the mental energy preserved.</p>
        <p>When you automate a repetitive task in Excel or using a Python script, you aren't just saving 5 minutes of clicking. You are saving your brain from the context-switching tax that kills deep work.</p>
        <h2>Where to Start</h2>
        <ul>
          <li>Identify tasks you do more than 3 times a week.</li>
          <li>Look for patterns. Inputs, processing, outputs.</li>
          <li>Start small. A simple macro is better than a complex system you never build.</li>
        </ul>
        <p>Technology should serve us, not the other way around. Let the machines do the boring work.</p>
      `,
    });
    
    await storage.createArticle({
      title: "Excel Formulas That Changed How I Think",
      slug: "excel-formulas-mindset",
      description: "It’s not just about calculation; it’s about logic structure and problem-solving.",
      content: `
        <p>Most people treat Excel like a calculator. Power users treat it like a programming language. But the real magic happens when you treat it like a logic engine.</p>
        <h2>IF, THEN, ELSE</h2>
        <p>The humble IF statement is the building block of all logic. Understanding nested IFs teaches you decision trees.</p>
        <h2>VLOOKUP vs XLOOKUP</h2>
        <p>Moving from VLOOKUP to XLOOKUP isn't just a feature upgrade; it's a lesson in robustness. Hard references break. Dynamic references adapt.</p>
        <p>Mastering these tools changes how you approach problems outside of spreadsheets. You start seeing the world in terms of data structures and logical flows.</p>
      `,
    });

    await storage.createArticle({
      title: "AI as a Thinking Partner, Not a Replacement",
      slug: "ai-thinking-partner",
      description: "How to use LLMs to expand your cognitive range rather than outsourcing your creativity.",
      content: `
        <p>The fear that AI will replace us is widespread. But the immediate opportunity is for AI to augment us.</p>
        <h2>The Blank Page Problem</h2>
        <p>AI is terrible at finishing masterpieces but excellent at starting rough drafts. Use it to break the inertia of the blank page.</p>
        <h2>Socratic Dialogue</h2>
        <p>Don't just ask AI for answers. Ask it to challenge your assumptions. "Here is my plan. What are three ways this could fail?"</p>
        <p>By treating AI as a tireless junior partner, you can iterate faster and reach higher quality outputs than you could alone.</p>
      `,
    });
  }
}
