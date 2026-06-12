import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests allowed",
    });
  }

  try {
    const { messages } = req.body;

    const latestMessage =
      messages?.[messages.length - 1]?.content || "";

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: latestMessage,
        },
      ],
    });

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);

    return res.status(500).json({
      error: "AI failed",
      details: error.message,
    });
  }
}
