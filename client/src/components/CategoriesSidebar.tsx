import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Category } from "@shared/schema";
import { Tag } from "lucide-react";
import { apiUrl } from "@/lib/api";

export function CategoriesSidebar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [location] = useLocation();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(apiUrl("/api/categories"));
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-8 bg-gray-100 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Categories
        </h3>
        <div className="space-y-2">
          <Link href="/articles">
            <button
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                location === "/articles"
                  ? "bg-primary text-primary-foreground font-medium"
                  : "hover:bg-secondary text-muted-foreground"
              }`}
            >
              All Articles
            </button>
          </Link>
          {categories.map((category) => (
            <Link key={category.id} href={`/categories/${category.slug}`}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  location === `/categories/${category.slug}`
                    ? "bg-primary text-primary-foreground font-medium"
                    : "hover:bg-secondary text-muted-foreground"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{category.name}</span>
                  {/* Remove the empty parentheses for now */}
                  {/* <span className="text-xs opacity-60">()</span> */}
                </div>
              </button>
            </Link>
          ))}
        </div>
      </div>
      
      {/* Popular Tags/Info */}
      <div className="pt-6 border-t">
        <h4 className="font-semibold text-sm mb-3 text-muted-foreground">ABOUT</h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Practical writing on technology, Excel, AI, and automation — for people who want smarter work, not more work.
        </p>
      </div>
    </div>
  );
}