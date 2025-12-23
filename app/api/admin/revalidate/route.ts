import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const apiKey = process.env.ADMIN_API_KEY;
  const headerKey = req.headers.get("x-api-key");
  if (!apiKey || headerKey !== apiKey) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { path } = await req.json();
  if (!path || typeof path !== "string") {
    return NextResponse.json({ success: false, message: "Thiếu path" }, { status: 400 });
  }
  revalidatePath(path);
  return NextResponse.json({ success: true, revalidated: path });
}
