import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Layout } from "@/components/Layout";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="w-full max-w-md mx-4 shadow-lg border-2">
          <CardContent className="pt-6">
            <div className="flex mb-4 gap-2">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
            </div>

            <p className="mt-4 text-sm text-gray-600">
              The page you are looking for does not exist or has been moved.
            </p>

            <div className="mt-8 flex justify-end">
              <Link href="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors">
                Return Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
