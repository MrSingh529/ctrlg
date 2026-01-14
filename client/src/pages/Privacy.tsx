import { Layout } from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        
        <div className="prose-custom prose-slate">
          <p>Last updated: June 1, 2026</p>
          
          <h3>Data Collection</h3>
          <p>
            We respect your inbox. We collect email addresses solely for the purpose of sending our newsletter notifications when new articles are published.
          </p>

          <h3>Usage</h3>
          <p>
            Your email address is never sold, shared, or rented to third parties. We use it strictly to communicate with you about content from Ctrl + G.
          </p>

          <h3>Unsubscribe</h3>
          <p>
            You can unsubscribe at any time by clicking the link in the footer of any email we send.
          </p>
          
          <h3>Cookies</h3>
          <p>
            This site uses minimal cookies necessary for basic analytics to understand which articles are most popular. No personal tracking data is stored.
          </p>
        </div>
      </div>
    </Layout>
  );
}
