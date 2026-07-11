import axios from "axios";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const client = axios.create({
  baseURL: "https://api.groq.com/openai/v1",
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  },
});

async function askGroq(systemPrompt, userPrompt) {
  const response = await client.post("/chat/completions", {
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    temperature: 0.5,
  });

  return response.data.choices[0].message.content;
}

export async function generateSummary(notes) {
  return askGroq(
    "Summarize the following notes into short and clear bullet points.",
    notes
  );
}

export async function generateQuiz(notes) {
  return askGroq(
    "Generate 5 multiple-choice questions with 4 options and clearly mention the correct answer.",
    notes
  );
}

export async function generateFlashcards(notes) {
  return askGroq(
    "Create 5 flashcards. Format:\nQuestion:\nAnswer:",
    notes
  );
}

export async function askAI(notes, question) {
  return askGroq(
    "You are an intelligent study assistant. Answer only using the provided notes if possible.",
    `Notes:\n${notes}\n\nQuestion:\n${question}`
  );
}