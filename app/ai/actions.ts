'use server';

import { qaSearch } from "../../lib/qa";

export async function askAction(formData: FormData) {
  const question = String(formData.get("question") || "").trim();
  if (!question || question.length < 4) {
    return "Câu hỏi quá ngắn";
  }
  const hits = await qaSearch(question);
  if (hits.length === 0) return "Không tìm thấy thông tin liên quan.";
  return hits.map((h, i) => `${i + 1}. ${h.title}: ${h.snippet}`).join("\n");
}
