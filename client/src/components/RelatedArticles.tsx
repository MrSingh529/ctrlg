import { useState, useEffect } from "react";
import { Article } from "@shared/schema";
import { Link } from "wouter";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { apiUrl } from "@/lib/api";

interface RelatedArticlesProps {
  currentArticleId: number;
  excludeSlug?: string;
}

export function RelatedArticles({ currentArticleId, excludeSlug }: RelatedArticlesProps) {
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRelatedArticles();
  }, [currentArticleId]);

  const fetchRelatedArticles = async () => {
    try {
      const response = await fetch(apiUrl(`/api/articles/${currentArticleId}/related`));
      const data = await response.json();
      
      const filtered = data.filter((article: Article) => 
        article.slug !== excludeSlug
      );
      
      setRelatedArticles(filtered.slice(0, 3));
    } catch (error) {
      console.error("Failed to fetch related articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-lg" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {relatedArticles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`}>
            <div className="group cursor-pointer space-y-3">
              <div className="aspect-video bg-secondary/50 rounded-lg overflow-hidden">
                {/* Optional: Add article image if available */}
                <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-secondary/10" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {article.publishedAt ? format(new Date(article.publishedAt), "MMM d, yyyy") : "Draft"}
                  </span>
                  {article.author && (
                    <span className="text-muted-foreground">
                      {article.author}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Read article <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}