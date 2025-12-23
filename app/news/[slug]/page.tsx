import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getNewsBySlug, getNewsList } from "../../../lib/news";

export const revalidate = 300;

export default async function NewsDetail({ params }: { params: { slug: string } }) {
  const article = await getNewsBySlug(params.slug);
  if (!article) return notFound();
  const published = article.published_at instanceof Date
    ? article.published_at.toISOString()
    : String(article.published_at);
  return (
    <main className="card">
      <h1>{article.title}</h1>
      <p>
        {new Date(published).toLocaleString("vi-VN")}
        {article.author ? ` – ${article.author}` : ""}
      </p>
      <div>{article.body}</div>
    </main>
  );
}

export async function generateStaticParams() {
  const news = await getNewsList(20);
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getNewsBySlug(params.slug);
  if (!article) {
    return { title: "Tin không tồn tại" };
  }
  const description = typeof article.body === "string" ? article.body.slice(0, 150) : "";
  return {
    title: `${article.title} | V-League Portal`,
    description,
  };
}
