import { getStandings } from "../../lib/standings";
import { getRecentMatches } from "../../lib/matches";
import StandingsFilter from "./StandingsFilter";

export default async function DashboardPage({ searchParams }: { searchParams: { season?: string } }) {
  const season = searchParams?.season || "2024";
  const [standings, matches] = await Promise.all([
    getStandings(season),
    getRecentMatches(6),
  ]);

  return (
    <main>
      <h1>Bảng xếp hạng {season}</h1>
      <StandingsFilter season={season} />
      <div className="card">
        <table className="table">
          <thead>
            <tr><th>CLB</th><th>Điểm</th><th>BT</th><th>BB</th></tr>
          </thead>
          <tbody>
            {standings.map((row: any) => (
              <tr key={`${row.season}-${row.club_id}`}>
                <td>{row.name}</td>
                <td>{row.points}</td>
                <td>{row.goals_for}</td>
                <td>{row.goals_against}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {standings.length === 0 ? <div className="alert alert-empty">Chưa có dữ liệu cho mùa giải này.</div> : null}
      </div>

      <h2 className="section-title">Kết quả gần đây</h2>
      <div className="grid-2">
        {matches.map((m: any) => (
          <div key={m.id} className="card">
            <div className="muted">{new Date(m.match_date).toLocaleDateString("vi-VN")}</div>
            <h3>{m.home_name} {m.home_score} - {m.away_score} {m.away_name}</h3>
            <div className="muted">Sân: {m.stadium}</div>
          </div>
        ))}
        {matches.length === 0 ? <div className="card alert-empty">Chưa có trận đấu.</div> : null}
      </div>
    </main>
  );
}
