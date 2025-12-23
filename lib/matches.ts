import { pool } from "./db";

export async function getRecentMatches(limit = 100) {
  const [rows] = await pool.query(
    `SELECT m.*, hc.name as home_name, ac.name as away_name
     FROM matches m
     JOIN clubs hc ON m.home_club_id = hc.id
     JOIN clubs ac ON m.away_club_id = ac.id
     ORDER BY match_date DESC
     LIMIT ?`,
    [limit]
  );
  return rows as any[];
}
