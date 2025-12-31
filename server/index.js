import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Configure CORS to handle preflight requests
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow all origins in development/production
    callback(null, true);
  },
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: false, // Set to false when allowing all origins
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Explicitly handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());

const conversations = {}; // session memory

app.post("/chat", async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({ error: "sessionId and message are required" });
    }

    if (!conversations[sessionId]) {
      conversations[sessionId] = [];
    }

    conversations[sessionId].push({
      role: "user",
      content: message
    });

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are a helpful AI support assistant."
            },
            ...conversations[sessionId]
          ]
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Groq API error:", error);
      return res.status(500).json({ error: "Failed to get response from AI" });
    }

    const data = await response.json();
    const reply = data.choices[0].message.content;

    conversations[sessionId].push({
      role: "assistant",
      content: reply
    });

    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/", (_, res) => res.send("AI Chat API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
