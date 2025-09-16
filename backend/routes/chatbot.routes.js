import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const GROQ_API_KEY = process.env.GROQ_API_KEY;

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const groqResponse = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are a legal expert chatbot. Only answer questions that are strictly related to law, legal advice, regulations, rights, or judiciary matters. 
                      If a question is unrelated to law, respond with:
                      "I'm sorry, I can only assist with legal-related queries."`,
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res
      .status(200)
      .json({ response: groqResponse.data.choices[0].message.content });
  } catch (err) {
    console.error("Groq error:", err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

export default router;
