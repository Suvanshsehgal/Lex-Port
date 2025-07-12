import express from 'express';
import axios from 'axios';

const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const ollamaResponse = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3',
      prompt: `You are a legal expert. Answer this: ${message}`,
      stream: false
    });

    res.status(200).json({ response: ollamaResponse.data.response });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to connect to Ollama' });
  }
});

export default router;
