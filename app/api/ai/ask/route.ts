import { NextResponse } from "next/server";
import { qaSearch } from "../../../../lib/qa";

const RATE_LIMIT = 10; // requests per 60s per IP
const windowMs = 60_000;
const buckets = new Map<string, { count: number; resetAt: number }>();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count += 1;
  return true;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "local";
  if (!rateLimit(ip)) {
    return NextResponse.json({ message: "Rate limited" }, { status: 429 });
  }

  const { question } = await req.json();
  if (!question || typeof question !== "string" || question.trim().length < 4) {
    return NextResponse.json({ message: "Câu hỏi quá ngắn" }, { status: 400 });
  }

  const hits = await qaSearch(question);
  const fallbackText = hits
    .map((h, i) => `${i + 1}. ${h.title}: ${h.snippet}`)
    .join("\n");

  let answer = fallbackText;

  if (OPENAI_API_KEY) {
    const context = hits
      .map((h, i) => `${i + 1}. ${h.title}\n${h.snippet}`)
      .join("\n\n");

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content:
              "Bạn là trợ lý bóng đá V-League. Trả lời ngắn gọn bằng tiếng Việt, dựa trên ngữ cảnh cung cấp. Nếu thiếu dữ liệu, hãy nói bạn không chắc.",
          },
          {
            role: "user",
            content: `Câu hỏi: ${question}\n\nNgữ cảnh:\n${context}\n\nTrả lời ngắn gọn, tập trung vào số liệu hoặc thông tin từ ngữ cảnh.`,
          },
        ],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const aiAnswer = data?.choices?.[0]?.message?.content?.trim();
      if (aiAnswer) {
        answer = aiAnswer;
      }
    }
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const chunks = answer.split(/(?<=\.)\s|\n/);
      let idx = 0;
      const push = () => {
        if (idx >= chunks.length) {
          controller.close();
          return;
        }
        controller.enqueue(encoder.encode(chunks[idx] + " "));
        idx += 1;
        setTimeout(push, 80);
      };
      push();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
