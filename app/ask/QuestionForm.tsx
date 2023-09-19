"use client";

import { useState } from "react";

export default function QuestionForm() {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    setLoading(false);
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset disabled={loading}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="rounded-xl border-gray-200 w-full h-32 resize-none placeholder:text-gray-400"
          placeholder="Ask anything that you’re curious about..."
          required
        />

        <div className="mt-1 flex justify-end">
          <button className="bg-blue-600 font-semibold rounded-full px-3 py-1 text-white block text-center">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
