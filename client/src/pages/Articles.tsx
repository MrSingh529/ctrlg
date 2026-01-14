import { useArticles } from "@/hooks/use-articles";
import { Layout } from "@/components/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Articles() {
  const { data: articles, isLoading } = useArticles();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-4xl font-bold tracking-tight mb-4">All Articles</h1>
        <p className="text-xl text-muted-foreground">
          A complete archive of thoughts on automation, productivity, and modern work.
        </p>
      </motion.div>

      <div className="space-y-2">
        {isLoading ? (
           Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="py-8 border-b border-border/40">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full max-w-2xl" />
              </div>
            ))
        ) : articles?.length ? (
          articles.map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))
        ) : (
           <div className="py-20 text-center border border-dashed rounded-xl">
              <p className="text-muted-foreground">No articles found.</p>
            </div>
        )}
      </div>
    </Layout>
  );
}
