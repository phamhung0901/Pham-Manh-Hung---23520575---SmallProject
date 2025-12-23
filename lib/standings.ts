import { pool } from "./db";

export async function getStandings(season: string) {
  const [rows] = await pool.query(
    "SELECT s.*, c.name FROM standings s JOIN clubs c ON s.club_id = c.id WHERE season = ? ORDER BY points DESC, goals_for - goals_against DESC",
    [season]
  );
  return rows as any[];
}
