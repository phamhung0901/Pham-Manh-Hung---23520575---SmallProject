import Link from "next/link";
import { docs } from "../../data/docs";
import { askAction } from "./actions";
import AskClient from "./AskClient";

export const revalidate = 600;

export default async function AIPage() {
  return (
    <main>
      <h1>AI Knowledge Base (lite)</h1>
      <p className="muted">Trang tài liệu tĩnh phục vụ SEO + form Server Action + widget streaming.</p>

      <section className="card">
        <h2>Tài liệu</h2>
        <ul>
          {docs.map((d) => (
            <li key={d.id} style={{ marginBottom: "0.35rem" }}>
              <strong>{d.title}</strong> – {d.content.slice(0, 120)}...
            </li>
          ))}
        </ul>
      </section>

      <section className="card" style={{ marginTop: "1rem" }}>
        <h2>Hỏi bằng Server Action</h2>
        <form action={askAction} style={{ display: "grid", gap: "0.5rem" }}>
          <input name="question" className="ask-input" placeholder="Hỏi về kiến trúc, render, API..." />
          <button className="ask-button" type="submit">Hỏi</button>
        </form>
        <p className="muted" style={{ marginTop: "0.5rem" }}>Kết quả render server-side, không stream.</p>
      </section>

      <AskClient />

      <p className="muted" style={{ marginTop: "1rem" }}>
        Bạn cũng có thể dùng widget hỏi nhanh ở trang chủ. Nếu có OpenAI + pgvector, thay đoạn tìm kiếm nội bộ bằng embedding thực tế.
        Tài liệu trong MySQL (news) + docs tĩnh đang được dùng làm nguồn RAG.
      </p>

      <Link href="/">← Về trang chủ</Link>
    </main>
  );
}
