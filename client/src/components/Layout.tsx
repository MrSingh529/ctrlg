import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { NewsletterForm } from "./NewsletterForm";

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/articles", label: "Articles" },
    { href: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tighter hover:opacity-80 transition-opacity">
            Ctrl + G
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  location === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto px-6 py-12 md:py-20">
        {children}
      </main>

      <footer className="border-t border-border/40 py-12 bg-secondary/30">
        <div className="container max-w-4xl mx-auto px-6 grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h4 className="font-semibold text-lg tracking-tight">Stay updated</h4>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Get notified when new articles are published. No spam, just practical insights on growth and automation.
            </p>
            <NewsletterForm />
          </div>
          
          <div className="flex flex-col md:items-end justify-between gap-6">
             <div className="text-sm text-muted-foreground space-y-1 md:text-right">
              <p>© 2026 Ctrl + G</p>
              <p>From Ctrl+V to Growth</p>
            </div>
            <div className="flex gap-6 text-sm font-medium">
               <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                 Privacy Policy
               </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
