import Image from "next/image";
import Link from "next/link";
import { getClubs } from "../../lib/clubs";

export const revalidate = 600;

export default async function ClubsPage() {
  const clubs = await getClubs();
  return (
    <main>
      <h1>Các câu lạc bộ</h1>
      <div className="news-grid">
        {clubs.map((club: any) => (
          <article key={club.id} className="card">
            <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
              {club.logo_url ? (
                <Image src={club.logo_url} alt={club.name} width={64} height={64} />
              ) : (
                <div className="avatar-fallback">{club.name.slice(0, 2).toUpperCase()}</div>
              )}
              <div>
                <h3><Link href={`/clubs/${club.id}`}>{club.name}</Link></h3>
                <p className="muted">{club.city}</p>
              </div>
            </div>
            <p className="muted">Sân: {club.stadium} · Thành lập: {club.founded_year}</p>
          </article>
        ))}
        {clubs.length === 0 ? <div className="card alert-empty">Chưa có câu lạc bộ.</div> : null}
      </div>
    </main>
  );
}
