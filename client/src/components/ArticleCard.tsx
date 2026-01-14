import { Link } from "wouter";
import { Article } from "@shared/schema";
import { format } from "date-fns";
import { motion } from "framer-motion";

interface ArticleCardProps {
  article: Article;
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/articles/${article.slug}`}>
        <div className="py-8 border-b border-border/40 cursor-pointer group-last:border-0 hover:bg-slate-50/50 -mx-6 px-6 rounded-xl transition-colors duration-200">
          <div className="flex flex-col gap-2 mb-2">
            <span className="text-xs font-medium text-muted-foreground tracking-wide uppercase">
              {article.publishedAt ? format(new Date(article.publishedAt), "MMMM d, yyyy") : "Draft"}
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary/80 transition-colors">
              {article.title}
            </h3>
          </div>
          <p className="text-muted-foreground leading-relaxed max-w-2xl line-clamp-2">
            {article.description}
          </p>
          <div className="mt-4 flex items-center text-sm font-medium text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
            Read article &rarr;
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
