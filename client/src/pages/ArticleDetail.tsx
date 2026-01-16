import { useArticle } from "@/hooks/use-articles";
import { Layout } from "@/components/Layout";
import { useParams, Link } from "wouter";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { RelatedArticles } from "@/components/RelatedArticles";

export default function ArticleDetail() {
  const { slug } = useParams();
  const { data: article, isLoading, error } = useArticle(slug || "");
  const { toast } = useToast();

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied",
      description: "Article URL copied to your clipboard.",
    });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto space-y-8 mt-8">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-12 w-3/4" />
          <div className="space-y-4 pt-8">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !article) {
    return (
      <Layout>
        <div className="py-20 text-center">
          <h1 className="text-3xl font-bold mb-4">Article not found</h1>
          <p className="text-muted-foreground mb-8">
            The article you are looking for doesn't exist or has been moved.
          </p>
          <Link href="/articles">
            <Button variant="outline">Browse all articles</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <footer className="mt-8 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* MAIN ARTICLE */}
          <div className="lg:col-span-2">
            <article>
              <header className="mb-12 text-center">
                <div className="flex items-center justify-center gap-2 mb-8">
                  <Link
                    href="/articles"
                    className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back to articles
                  </Link>
                </div>

                <time className="block text-sm font-medium text-muted-foreground mb-4 uppercase tracking-widest">
                  {article.publishedAt
                    ? format(new Date(article.publishedAt), "MMMM d, yyyy")
                    : "Draft"}
                </time>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.15] text-pretty">
                  {article.title}
                </h1>

                <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
                  {article.description}
                </p>
              </header>

              <div className="prose-custom prose-lg mx-auto">
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                <Link href="/articles" className="text-sm font-semibold hover:underline">
                  ← More articles
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="gap-2"
                >
                  <Share2 className="w-4 h-4" /> Share
                </Button>
              </div>
            </article>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {article && (
                <RelatedArticles
                  currentArticleId={article.id}
                  excludeSlug={article.slug}
                />
              )}

              {/* Newsletter signup */}
              <div className="mt-12 p-6 bg-secondary/30 rounded-xl">
                <h4 className="font-semibold text-lg mb-3">Stay Updated</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get notified when new articles are published.
                </p>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Subscribe to Newsletter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
}