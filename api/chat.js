import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Only POST requests allowed",
    });
  }

  try {
    const { system, messages } = req.body;

    const latestMessage =
      messages && messages.length > 0
        ? messages[messages.length - 1].content
        : "";

    const prompt = `
${system || ""}

User: ${latestMessage}
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return res.status(200).json({
      reply: response,
    });
  } catch (error) {
    console.error("Gemini Error:", error);

    return res.status(500).json({
      error: "AI failed",
      details: error.message,
    });
  }
}
