import { pgTable, text, serial, timestamp, varchar, integer, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// CATEGORIES
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
  slug: varchar("slug", { length: 50 }).notNull().unique(),
  description: text("description"),
});

// ARTICLES
export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  author: varchar("author", { length: 100 }).default("Harpinder Singh"),
  publishedAt: timestamp("published_at").defaultNow(),
});

// ARTICLE_CATEGORIES (JUNCTION)
export const articleCategories = pgTable("article_categories", {
  articleId: integer("article_id").references(() => articles.id, { onDelete: "cascade" }),
  categoryId: integer("category_id").references(() => categories.id, { onDelete: "cascade" }),
}, (table) => ({
  pk: primaryKey({ columns: [table.articleId, table.categoryId] })
}));

// SUBSCRIBERS
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});

// RELATIONS
export const articlesRelations = relations(articles, ({ many }) => ({
  articleCategories: many(articleCategories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  articleCategories: many(articleCategories),
}));

export const articleCategoriesRelations = relations(articleCategories, ({ one }) => ({
  article: one(articles, {
    fields: [articleCategories.articleId],
    references: [articles.id],
  }),
  category: one(categories, {
    fields: [articleCategories.categoryId],
    references: [categories.id],
  }),
}));

// SCHEMAS 
export const insertArticleSchema = createInsertSchema(articles)
  .omit({ id: true, publishedAt: true })
  .extend({
    categoryIds: z.array(z.number()).optional(),
  });

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertSubscriberSchema = createInsertSchema(subscribers).omit({ id: true, createdAt: true });

// TYPES
export type Article = typeof articles.$inferSelect & {
  categories?: Category[];
};
export type InsertArticle = z.infer<typeof insertArticleSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;

// Contract types
export type CreateArticleRequest = InsertArticle;