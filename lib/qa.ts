import { pool } from "./db";
import { docs } from "../data/docs";

export type QAResult = {
  title: string;
  snippet: string;
  source: string;
};

function tokenize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9à-ỹ\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function score(content: string, keywords: string[]): number {
  const tokens = tokenize(content);
  const set = new Set(tokens);
  let hit = 0;
  for (const k of keywords) {
    if (set.has(k)) hit += 1;
  }
  return hit;
}

export async function qaSearch(question: string, topK = 3): Promise<QAResult[]> {
  const keywords = tokenize(question).filter((w) => w.length > 2);

  // Static docs
  const docCandidates = docs.map((d) => ({
    title: d.title,
    snippet: d.content.slice(0, 220),
    score: score(d.content, keywords),
    source: `doc:${d.slug}`,
  }));

  // Latest news from DB
  const [newsRows] = await pool.query(
    "SELECT title, body, slug FROM league_news ORDER BY published_at DESC LIMIT 20"
  );
  const newsCandidates = (newsRows as any[]).map((n) => ({
    title: n.title,
    snippet: typeof n.body === "string" ? n.body.slice(0, 220) : "",
    score: score(`${n.title} ${n.body || ""}`, keywords),
    source: `news:${n.slug}`,
  }));

  const combined = [...docCandidates, ...newsCandidates]
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ title, snippet, source }) => ({ title, snippet, source }));

  // Fallback when no keyword hit
  if (combined.length === 0) {
    return docCandidates
      .slice(0, Math.min(topK, docCandidates.length))
      .map(({ title, snippet, source }) => ({ title, snippet, source }));
  }

  return combined;
}
