import express from 'express';
import axios from 'axios';

const router = express.Router();

// Ideally use dotenv for this:
const GROQ_API_KEY = process.env.GROQ_API_KEY;

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-8b-8192', // or 'llama3-70b-8192'
        messages: [
          {
            role: 'system',
            content: 'You are a legal expert. Respond in a helpful and professional tone.'
          },
          {
            role: 'user',
            content: message
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      } 
    );

    res.status(200).json({ response: groqResponse.data.choices[0].message.content });

  } catch (err) {
    console.error('Groq error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to connect to Groq API' });
  }
});

export default router;
