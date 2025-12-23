'use client';

import { useState } from "react";

export default function AskWidget() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = async () =>
  {
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Hỏi không thành công");
        return;
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let text = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        text += decoder.decode(value, { stream: true });
        setAnswer(text);
      }
      setAnswer(text);
    } catch (e: any) {
      setError(e.message || "Lỗi không xác định");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ask-card">
      <h3>Hỏi nhanh V-League</h3>
      <input
        className="ask-input"
        value={question}
        placeholder="Ví dụ: Ai ghi bàn nhiều nhất?"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="ask-button" onClick={ask} disabled={!question.trim() || loading}>
        {loading ? "Đang trả lời..." : "Hỏi"}
      </button>
      {error ? <div className="alert alert-error" style={{ marginTop: "0.5rem" }}>{error}</div> : null}
      {answer ? <div className="ask-answer">{answer}</div> : null}
    </div>
  );
}
