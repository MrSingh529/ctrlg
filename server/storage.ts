import { getDb } from "./db.js";
import { articles, subscribers } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const db = getDb();

export class DatabaseStorage {

  async getArticles() {
    return db.select().from(articles).orderBy(desc(articles.publishedAt));
  }

  async getArticleBySlug(slug: string) {
    const [row] = await db.select().from(articles).where(eq(articles.slug, slug));
    return row;
  }

  async createArticle(data: any) {
    const [row] = await db.insert(articles).values(data).returning();
    return row;
  }

  async getSubscribers() {
    return db.select().from(subscribers);
  }

  async createSubscriber(data: any) {
    const [row] = await db.insert(subscribers).values(data).returning();
    return row;
  }

  async getSubscriberByEmail(email: string) {
    const [row] = await db.select().from(subscribers).where(eq(subscribers.email, email));
    return row;
  }
}

export const storage = new DatabaseStorage();