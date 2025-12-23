'use client';

import { useState } from "react";

export default function AskClient() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ask = async () => {
    setLoading(true);
    setError(null);
    setAnswer("");
    try {
      const res = await fetch("/api/ai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        setError(data.message || "Không hỏi được");
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
    <div className="card" style={{ marginTop: "1rem" }}>
      <h3>Ask AI (stream)</h3>
      <p className="muted">Streaming câu trả lời tóm tắt từ tin tức + docs nội bộ.</p>
      <input
        className="ask-input"
        value={question}
        placeholder="Ví dụ: bảng xếp hạng render thế nào?"
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="ask-button" onClick={ask} disabled={!question.trim() || loading}>
        {loading ? "Đang trả lời..." : "Hỏi"}
      </button>
      {error ? <div className="alert alert-error" style={{ marginTop: "0.5rem" }}>{error}</div> : null}
      {answer ? <pre className="ask-answer" style={{ whiteSpace: "pre-wrap" }}>{answer}</pre> : null}
    </div>
  );
}
