const EMAILOCTOPUS_API_KEY = process.env.EMAILOCTOPUS_API_KEY!;
const EMAILOCTOPUS_LIST_ID = process.env.EMAILOCTOPUS_LIST_ID!;

export async function addSubscriberToEmailOctopus(email: string) {
  console.log("Adding subscriber to EmailOctopus:", email);

  try {
    const response = await fetch(
      `https://emailoctopus.com/api/1.6/lists/${EMAILOCTOPUS_LIST_ID}/contacts?api_key=${EMAILOCTOPUS_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address: email,
          status: "SUBSCRIBED"
        }),
      }
    );

    const responseText = await response.text();
    console.log("EmailOctopus subscribe response:", responseText);

    if (!response.ok) {
      throw new Error(`EmailOctopus subscribe failed: ${responseText}`);
    }

    console.log(`Subscriber ${email} added to EmailOctopus`);
    return JSON.parse(responseText);
  } catch (error) {
    console.error("EmailOctopus subscribe error:", error);
    throw error;
  }
}