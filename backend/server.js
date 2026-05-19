import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Gemini API setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat route
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    // Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });

    // Generate response
    const result = await model.generateContent(message);

    // Extract text response
    const response = result.response.text();

    // Send response to frontend
    res.json({
      reply: response,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      reply: "Something went wrong",
    });
  }
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});