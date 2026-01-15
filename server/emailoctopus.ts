const EMAILOCTOPUS_API_KEY = process.env.EMAILOCTOPUS_API_KEY!;
const EMAILOCTOPUS_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID!;

export async function sendNewArticleEmail(article: {
  title: string;
  description: string;
  slug: string;
}) {
  console.log("Creating EmailOctopus campaign:", article.title);

  const body = new URLSearchParams({
    subject: `New article: ${article.title}`,
    from_name: "Ctrl + G",
    from_email: "harpindersingh529@gmail.com",
    "list_ids[]": EMAILOCTOPUS_LIST_ID,
    "content[html]": `
      <p>${article.description}</p>
      <p>
        <a href="https://ctrlgtech.vercel.app/articles/${article.slug}">
          Read here →
        </a>
      </p>
    `,
  });

  const createRes = await fetch(
    `https://api.emailoctopus.com/1.6/campaigns?api_key=${EMAILOCTOPUS_API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    }
  );

  const createText = await createRes.text();

  if (!createRes.ok) {
    console.error("EmailOctopus create failed:", createText);
    throw new Error("Failed to create campaign");
  }

  const campaign = JSON.parse(createText);
  console.log("Campaign created:", campaign.id);

  // SEND
  const sendRes = await fetch(
    `https://api.emailoctopus.com/1.6/campaigns/${campaign.id}/send?api_key=${EMAILOCTOPUS_API_KEY}`,
    { method: "POST" }
  );

  if (!sendRes.ok) {
    const errText = await sendRes.text();
    console.error("EmailOctopus send failed:", errText);
    throw new Error("Failed to send campaign");
  }

  console.log("Campaign sent successfully");
}