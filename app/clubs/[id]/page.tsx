import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { getClub } from "../../../lib/clubs";

export default async function ClubDetail({ params }: { params: { id: string } }) {
  const club = await getClub(params.id);
  if (!club) return notFound();
  return (
    <main className="card">
      <h1>{club.name}</h1>
      {club.logo_url ? (
        <Image src={club.logo_url} alt={club.name} width={120} height={120} />
      ) : null}
      <p>Thành phố: {club.city}</p>
      <p>Sân nhà: {club.stadium}</p>
      <p>Năm thành lập: {club.founded_year}</p>
    </main>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const club = await getClub(params.id);
  if (!club) return { title: "CLB không tồn tại" };
  return {
    title: `${club.name} | V-League Portal`,
    description: `${club.name} - ${club.city} (${club.stadium})`,
  };
}
