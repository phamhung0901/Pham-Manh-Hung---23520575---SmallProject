import { NextResponse } from "next/server";
import { pool } from "../../../lib/db";

export async function POST(req: Request) {
  const { question } = await req.json();
  if (!question || typeof question !== "string" || question.trim().length < 4) {
    return NextResponse.json({ message: "Câu hỏi quá ngắn" }, { status: 400 });
  }

  const q = `%${question}%`;
  const [rows] = await pool.query(
    "SELECT title, body FROM league_news WHERE title LIKE ? OR body LIKE ? ORDER BY published_at DESC LIMIT 3",
    [q, q]
  );
  const news = rows as any[];
  if (news.length === 0) {
    return NextResponse.json({ answer: "Không tìm thấy thông tin liên quan trong tin tức." });
  }

  const snippets = news.map((n) => `${n.title}: ${typeof n.body === "string" ? n.body.slice(0, 160) : ""}`);
  const answer = `Tìm thấy ${news.length} nội dung liên quan: ${snippets.join(" | ")}`;
  return NextResponse.json({ answer });
}
