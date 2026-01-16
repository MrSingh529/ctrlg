import { useParams } from "wouter";
import { Layout } from "@/components/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Article, Category } from "@shared/schema";
import { motion } from "framer-motion";
import { apiUrl } from "@/lib/api";

export default function CategoryArticles() {
  const { slug } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchCategoryData();
    }
  }, [slug]);

  const fetchCategoryData = async () => {
    setIsLoading(true);
    try {
      // Fetch category info
      const categoryRes = await fetch(apiUrl(`/api/categories/${slug}`));
      if (categoryRes.ok) {
        const categoryData = await categoryRes.json();
        setCategory(categoryData);
      }

      // Fetch articles for this category
      const articlesRes = await fetch(apiUrl(`/api/categories/${slug}/articles`));
      if (articlesRes.ok) {
        const articlesData = await articlesRes.json();
        setArticles(articlesData);
      }
    } catch (error) {
      console.error("Failed to fetch category data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-8">
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="py-8 border-b border-border/40">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full max-w-2xl" />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  if (!category) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Category not found</h1>
          <p className="text-muted-foreground">The category you are looking for doesn't exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">{category.name}</h1>
        <p className="text-xl text-muted-foreground">
          {category.description || `Articles about ${category.name}`}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          {articles.length} article{articles.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      <div className="space-y-2">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))
        ) : (
          <div className="py-20 text-center border border-dashed rounded-xl">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}