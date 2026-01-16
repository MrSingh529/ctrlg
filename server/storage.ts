import { getDb } from "./db.js";
import { articles, subscribers, categories, articleCategories } from "@shared/schema";
import { eq, desc, and, inArray } from "drizzle-orm";

const db = getDb();

export class DatabaseStorage {
  // ========== ARTICLES ==========
  async getArticles() {
    const articlesList = await db.select().from(articles).orderBy(desc(articles.publishedAt));
    
    // Get categories for each article
    const articlesWithCategories = await Promise.all(
      articlesList.map(async (article) => {
        const articleCats = await db
          .select()
          .from(articleCategories)
          .leftJoin(categories, eq(articleCategories.categoryId, categories.id))
          .where(eq(articleCategories.articleId, article.id));
        
        return {
          ...article,
          categories: articleCats.map(ac => ac.categories).filter(Boolean),
        };
      })
    );
    
    return articlesWithCategories;
  }

  async getArticleBySlug(slug: string) {
    const [row] = await db.select().from(articles).where(eq(articles.slug, slug));
    
    if (!row) return null;
    
    // Get categories for this article
    const articleCats = await db
      .select()
      .from(articleCategories)
      .leftJoin(categories, eq(articleCategories.categoryId, categories.id))
      .where(eq(articleCategories.articleId, row.id));
    
    return {
      ...row,
      categories: articleCats.map(ac => ac.categories).filter(Boolean),
    };
  }

  async createArticle(data: any) {
    const { categoryIds, ...articleData } = data;
    
    // Create article
    const [article] = await db.insert(articles).values(articleData).returning();
    
    // Add categories if provided
    if (categoryIds && categoryIds.length > 0) {
      const articleCatValues = categoryIds.map((catId: number) => ({
        articleId: article.id,
        categoryId: catId,
      }));
      
      await db.insert(articleCategories).values(articleCatValues);
    }
    
    // Get categories for response
    const articleCats = await db
      .select()
      .from(articleCategories)
      .leftJoin(categories, eq(articleCategories.categoryId, categories.id))
      .where(eq(articleCategories.articleId, article.id));
    
    return {
      ...article,
      categories: articleCats.map(ac => ac.categories).filter(Boolean),
    };
  }

  // ========== CATEGORIES ==========
  async getCategories() {
    return db.select().from(categories).orderBy(categories.name);
  }

  async getCategoryBySlug(slug: string) {
    const [row] = await db.select().from(categories).where(eq(categories.slug, slug));
    return row;
  }

  async getArticlesByCategory(categorySlug: string) {
    const category = await this.getCategoryBySlug(categorySlug);
    if (!category) return [];
    
    const articlesList = await db
      .select()
      .from(articles)
      .leftJoin(articleCategories, eq(articles.id, articleCategories.articleId))
      .where(eq(articleCategories.categoryId, category.id))
      .orderBy(desc(articles.publishedAt));
    
    return articlesList.map(a => a.articles);
  }

  // ========== SUBSCRIBERS ==========
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