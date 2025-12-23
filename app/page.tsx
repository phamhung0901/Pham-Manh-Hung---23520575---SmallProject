import Link from "next/link";
import { getNewsList } from "../lib/news";
import dynamic from "next/dynamic";

export const revalidate = 300; // ISR 5 minutes

const AskWidget = dynamic(() => import("./AskWidget"), { ssr: false });

export default async function HomePage() {
  const news = await getNewsList(12);
  return (
    <main>
      <section className="hero">
        <span className="pill">V-League 2024</span>
        <h1>Thông tin nhanh về giải V-League</h1>
        <p className="muted">Tin tức, bảng xếp hạng và kết quả mới nhất. Dữ liệu từ MySQL và render bằng ISR/SSR.</p>
      </section>

      <h2 className="section-title">Tin nổi bật</h2>
      <div className="news-grid">
        {news.map((n) => (
          <article key={n.id} className="card">
            <h3><Link href={`/news/${n.slug}`}>{n.title}</Link></h3>
            <p className="muted">{new Date(n.published_at).toLocaleString("vi-VN")}</p>
            <Link href={`/news/${n.slug}`}>Đọc tiếp →</Link>
          </article>
        ))}
      </div>

      <AskWidget />
    </main>
  );
}
