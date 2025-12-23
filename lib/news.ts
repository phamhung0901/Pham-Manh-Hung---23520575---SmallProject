import { pool } from "./db";

export async function getNewsList(limit = 50) {
  const [rows] = await pool.query(
    "SELECT id, title, slug, published_at FROM league_news ORDER BY published_at DESC LIMIT ?",
    [limit]
  );
  return (rows as any[]).map((r) => ({
    id: r.id,
    title: r.title,
    slug: r.slug,
    // normalize to ISO date string to avoid rendering Date objects in React
    published_at: r.published_at instanceof Date ? r.published_at.toISOString() : String(r.published_at),
  }));
}

export async function getNewsBySlug(slug: string) {
  const [rows] = await pool.query(
    "SELECT id, title, body, published_at, author FROM league_news WHERE slug = ? LIMIT 1",
    [slug]
  );
  return (rows as any[])[0] || null;
}
