import nodemailer from "nodemailer";
import { google } from "googleapis";

const {
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  GMAIL_REFRESH_TOKEN,
} = process.env;

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: GMAIL_REFRESH_TOKEN,
});

export async function sendArticleEmail(
  to: string,
  article: {
    title: string;
    description: string;
    slug: string;
  }
) {
  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "harpindersingh529@gmail.com",
      clientId: GMAIL_CLIENT_ID,
      clientSecret: GMAIL_CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
      accessToken: accessToken.token!,
    },
  });

  const articleUrl = `https://ctrlg.in/articles/${article.slug}`;

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
                color:#0a0a0a; line-height:1.6; max-width:600px; margin:0 auto; padding:24px;">

      <h2 style="font-size:22px; margin-bottom:8px;">
        New article is live on Ctrl + G:
      </h2>

      <h1 style="font-size:26px; line-height:1.25; margin:0 0 12px 0;">
        ${article.title}
      </h1>

      <p style="font-size:16px; color:#444; margin-bottom:20px;">
        ${article.description}
      </p>

      <a href="${articleUrl}"
         style="display:inline-block; margin:16px 0 28px;
                padding:10px 16px; background:#111; color:#fff;
                text-decoration:none; border-radius:6px;
                font-size:14px; font-weight:500;">
        Read the article →
      </a>

      <hr style="border:none; border-top:1px solid #eee; margin:32px 0;" />

      <p style="font-size:14px; color:#555; margin-bottom:12px;">
        Ctrl + G is about moving from shortcuts to systems —
        from <strong>Ctrl+V</strong> to <strong>Growth</strong>.
      </p>

      <p style="font-size:14px; color:#555; margin-bottom:20px;">
        Writing on technology, Excel, AI, and automation —
        for people who want smarter work, not more work.
      </p>

      <p style="font-size:14px; margin-bottom:6px;">Let’s connect:</p>

      <a href="https://www.linkedin.com/in/harpindersingh99bab81a1/"
         style="font-size:14px; color:#0a66c2; text-decoration:none;">
        LinkedIn →
      </a>

      <p style="font-size:12px; color:#888; margin-top:32px;">
        You’re receiving this because you subscribed on Ctrl + G.
        <br />
        You can unsubscribe anytime.
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Ctrl + G" <harpindersingh529@gmail.com>`,
    to,
    subject: `New article: ${article.title}`,
    html,
  });
}