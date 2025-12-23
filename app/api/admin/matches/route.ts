import { NextResponse } from "next/server";
import { getRecentMatches } from "../../../../lib/matches";
import { pool } from "../../../../lib/db";
import { revalidatePath } from "next/cache";

async function authorize(req: Request) {
  const apiKey = process.env.ADMIN_API_KEY;
  const headerKey = req.headers.get("x-api-key");
  if (!apiKey || headerKey !== apiKey) {
    return false;
  }
  return true;
}

export async function GET(req: Request) {
  if (!(await authorize(req))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const data = await getRecentMatches();
  return NextResponse.json({ success: true, data });
}

export async function POST(req: Request) {
  if (!(await authorize(req))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { home_club_id, away_club_id, home_score, away_score, match_date, stadium } = body || {};
  if (!home_club_id || !away_club_id || match_date === undefined || home_score === undefined || away_score === undefined) {
    return NextResponse.json({ success: false, message: "Thiếu dữ liệu trận" }, { status: 400 });
  }

  await pool.query(
    "INSERT INTO matches(home_club_id, away_club_id, home_score, away_score, match_date, stadium) VALUES(?,?,?,?,?,?)",
    [home_club_id, away_club_id, home_score, away_score, match_date, stadium || ""]
  );

  // Refresh dashboard cache
  revalidatePath("/dashboard");

  return NextResponse.json({ success: true, message: "Đã thêm trận đấu" });
}
