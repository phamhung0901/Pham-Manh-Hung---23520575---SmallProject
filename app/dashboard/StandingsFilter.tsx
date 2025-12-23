"use client";
import { useRouter } from "next/navigation";

export default function StandingsFilter({ season }: { season: string }) {
  const router = useRouter();
  const seasons = ["2022", "2023", "2024"];
  return (
    <div style={{ marginBottom: "0.75rem" }}>
      <select
        value={season}
        onChange={(e) => router.push(`/dashboard?season=${e.target.value}`)}
      >
        {seasons.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}
