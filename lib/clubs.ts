import { pool } from "./db";

export async function getClub(id: string) {
  const [rows] = await pool.query("SELECT * FROM clubs WHERE id = ? LIMIT 1", [id]);
  return (rows as any[])[0] || null;
}

export async function getClubs(limit = 50) {
  const [rows] = await pool.query("SELECT * FROM clubs ORDER BY name LIMIT ?", [limit]);
  return rows as any[];
}
