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
      
      // Filter out the current article if it somehow appears
      const filtered = data.filter((article: Article) => 
        article.slug !== excludeSlug
      );
      
      setRelatedArticles(filtered.slice(0, 3)); // Show max 3
    } catch (error) {
      console.error("Failed to fetch related articles:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Related Articles</h3>
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (relatedArticles.length === 0) {
    return null; // Don't show if no related articles
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold border-b pb-2">Related Articles</h3>
      <div className="space-y-6">
        {relatedArticles.map((article) => (
          <Link key={article.id} href={`/articles/${article.slug}`}>
            <div className="group cursor-pointer p-4 rounded-lg hover:bg-secondary/50 transition-colors">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {article.publishedAt ? format(new Date(article.publishedAt), "MMM d, yyyy") : "Draft"}
                  </span>
                  {article.author && (
                    <span className="text-xs text-muted-foreground">
                      {article.author}
                    </span>
                  )}
                </div>
                <h4 className="font-medium group-hover:text-primary transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {article.description}
                </p>
                <div className="flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Read <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}