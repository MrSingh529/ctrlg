import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { apiUrl } from "@/lib/api";

export function useArticles() {
  return useQuery({
    queryKey: [api.articles.list.path],
    queryFn: async () => {
      const res = await fetch(apiUrl(api.articles.list.path));
      if (!res.ok) throw new Error("Failed to fetch articles");
      return api.articles.list.responses[200].parse(await res.json());
    },
  });
}

export function useArticle(slug: string) {
  return useQuery({
    queryKey: [api.articles.getBySlug.path, slug],
    queryFn: async () => {
      const path = buildUrl(api.articles.getBySlug.path, { slug });
      const res = await fetch(apiUrl(path));
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch article");
      return api.articles.getBySlug.responses[200].parse(await res.json());
    },
  });
}