import Link from "next/link";
import posts from "../data.json";

export default function BlogIndex() {
  return (
    <main style={{ padding: "1.5rem", maxWidth: 960, margin: "0 auto" }}>
      <h1>Blog (Pages Router)</h1>
      <p>SSG with fallback: true enabled on dynamic route.</p>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <Link href={`/blog/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
