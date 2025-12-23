import Link from "next/link";

export default function NotFound() {
  return (
    <main className="card">
      <h1>Không tìm thấy nội dung</h1>
      <p className="muted">Trang bạn yêu cầu không tồn tại hoặc đã bị xoá.</p>
      <Link href="/">Quay về trang chủ</Link>
    </main>
  );
}
