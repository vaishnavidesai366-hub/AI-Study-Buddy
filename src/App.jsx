import { useState } from "react";
import "./App.css";
import {
  generateSummary,
  generateQuiz,
  generateFlashcards,
  askAI,
} from "./services/groq";

function App() {
  const [notes, setNotes] = useState("");
  const [summary, setSummary] = useState("");
  const [quiz, setQuiz] = useState("");
  const [flashcards, setFlashcards] = useState("");

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSummary() {
    if (!notes.trim()) {
      alert("Please paste your notes.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateSummary(notes);
      setSummary(result);
    } catch (err) {
      console.log(err);
      alert("Failed to generate summary.");
    }

    setLoading(false);
  }

  async function handleQuiz() {
    if (!notes.trim()) {
      alert("Please paste your notes.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateQuiz(notes);
      setQuiz(result);
    } catch (err) {
      console.log(err);
      alert("Failed to generate quiz.");
    }

    setLoading(false);
  }

  async function handleFlashcards() {
    if (!notes.trim()) {
      alert("Please paste your notes.");
      return;
    }

    setLoading(true);

    try {
      const result = await generateFlashcards(notes);
      setFlashcards(result);
    } catch (err) {
      console.log(err);
      alert("Failed to generate flashcards.");
    }

    setLoading(false);
  }

  async function handleAskAI() {
    if (!notes.trim()) {
      alert("Paste notes first.");
      return;
    }

    if (!question.trim()) {
      alert("Enter your question.");
      return;
    }

    setLoading(true);

    try {
      const result = await askAI(notes, question);
      setAnswer(result);
    } catch (err) {
      console.log(err);
      alert("Failed to get answer.");
    }

    setLoading(false);
  }

  function copyText(text) {
    navigator.clipboard.writeText(text);
    alert("Copied!");
  }
  function downloadFile(filename, content) {
  const element = document.createElement("a");

  const file = new Blob([content], {
    type: "text/plain",
  });

  element.href = URL.createObjectURL(file);
  element.download = filename;

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

  function clearAll() {
    setSummary("");
    setQuiz("");
    setFlashcards("");
    setQuestion("");
    setAnswer("");
  }

  return (
    <div className="container">

      <div className="hero">

  <h1>📚 AI Study Buddy</h1>

  <p className="subtitle">
    Your Personal AI Learning Companion
  </p>

  <p className="description">
    Upload your notes, generate smart summaries, practice with quizzes,
    create flashcards, and ask AI questions—all in one place.
  </p>

</div>

<div className="feature-grid">

  <div className="feature-card">
    📄
    <h3>AI Summary</h3>
    <p>Turn lengthy notes into concise bullet points.</p>
  </div>

  <div className="feature-card">
    📝
    <h3>Quiz Generator</h3>
    <p>Create practice MCQs instantly.</p>
  </div>

  <div className="feature-card">
    🃏
    <h3>Flashcards</h3>
    <p>Revise faster using AI-generated flashcards.</p>
  </div>

  <div className="feature-card">
    💬
    <h3>Ask AI</h3>
    <p>Get answers based on your uploaded notes.</p>
  </div>

</div>

      <textarea
        placeholder="Paste your study notes here..."
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <div className="button-row">

        <button onClick={handleSummary}>
          📄 Summary
        </button>

        <button onClick={handleQuiz}>
          📝 Quiz
        </button>

        <button onClick={handleFlashcards}>
          🃏 Flashcards
        </button>

        <button onClick={clearAll}>
          🗑 Clear
        </button>

      </div>

      {loading && (
        <div className="loading">
          🤖 Analyzing your notes...

████████░░
        </div>
      )}

      {summary && (
        <div className="card">

          <div className="titleRow">

  <h2>📄 Summary</h2>

  <div>

    <button
      className="copyBtn"
      onClick={() => copyText(summary)}
    >
      Copy
    </button>

    <button
      className="copyBtn"
      onClick={() => downloadFile("summary.txt", summary)}
    >
      Download
    </button>

  </div>

</div>

          <pre>{summary}</pre>

        </div>
      )}

      {quiz && (
        <div className="card">

          <div className="titleRow">

  <h2>📝 Quiz</h2>

  <div>

    <button
      className="copyBtn"
      onClick={() => copyText(quiz)}
    >
      Copy
    </button>

    <button
      className="copyBtn"
      onClick={() => downloadFile("quiz.txt", quiz)}
    >
      Download
    </button>

  </div>

</div>

          <pre>{quiz}</pre>

        </div>
      )}
            {flashcards && (
        <div className="card">

          <div className="titleRow">

  <h2>🃏 Flashcards</h2>

  <div>

    <button
      className="copyBtn"
      onClick={() => copyText(flashcards)}
    >
      Copy
    </button>

    <button
      className="copyBtn"
      onClick={() => downloadFile("flashcards.txt", flashcards)}
    >
      Download
    </button>

  </div>

</div>

          <pre>{flashcards}</pre>

        </div>
      )}

      <div className="card">

        <h2>💬 Ask AI</h2>

        <input
          type="text"
          placeholder="Ask a question about your notes..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <button
          className="askBtn"
          onClick={handleAskAI}
        >
          Ask AI
        </button>

        {answer && (
          <div className="answerBox">
            <h3>Answer</h3>
            <pre>{answer}</pre>
          </div>
        )}

      </div>

      <footer>
  <h3>📚 AI Study Buddy</h3>

  <p>
    Built by <strong>Vaishnavi Desai</strong>
  </p>

  <p>
    Powered by React • Vite • Groq AI
  </p>

</footer>

    </div>
  );
}

export default App;