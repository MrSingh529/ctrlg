import { useArticles } from "@/hooks/use-articles";
import { Layout } from "@/components/Layout";
import { ArticleCard } from "@/components/ArticleCard";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: articles, isLoading } = useArticles();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-24 mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="space-y-6 max-w-2xl"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium text-secondary-foreground mb-4">
            Updated weekly
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter text-foreground leading-[1.1]">
            From Ctrl+V <br/> to <span className="text-muted-foreground">Growth.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
            Practical writing on technology, Excel, AI, and automation — for people who want smarter work, not more work.
          </p>
        </motion.div>
      </section>

      {/* Latest Articles */}
      <section>
        <div className="flex items-end justify-between mb-12 border-b border-border pb-4">
          <h2 className="text-2xl font-bold tracking-tight">Latest Writing</h2>
          <Link href="/articles" className="text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
            View all <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-2">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="py-8 border-b border-border/40">
                <Skeleton className="h-4 w-24 mb-4" />
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-full max-w-2xl" />
              </div>
            ))
          ) : articles && articles.length > 0 ? (
            articles.slice(0, 5).map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))
          ) : (
            <div className="py-12 text-center bg-secondary/30 rounded-xl">
              <p className="text-muted-foreground">No articles published yet.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
