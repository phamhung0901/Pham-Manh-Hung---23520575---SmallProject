export type Doc = {
  id: string;
  title: string;
  slug: string;
  content: string;
};

export const docs: Doc[] = [
  {
    id: "getting-started",
    title: "Giới thiệu V-League Portal",
    slug: "gioi-thieu",
    content:
      "V-League Portal cung cấp tin tức, bảng xếp hạng và kết quả cho người hâm mộ. Mọi nội dung được cập nhật từ nguồn chính thức và hiển thị cô đọng.",
  },
  {
    id: "data-model",
    title: "Mô hình dữ liệu",
    slug: "data-model",
    content:
      "Hệ thống quản lý câu lạc bộ, trận đấu, bảng xếp hạng theo mùa giải và bài viết tin tức (dựa trên slug). Các mục dữ liệu được liên kết để tra cứu kết quả và tin nhanh.",
  },
  {
    id: "rendering",
    title: "Chiến lược render",
    slug: "rendering",
    content:
      "Trang chủ, tin tức, trang câu lạc bộ và bảng điều khiển đều lấy dữ liệu mới nhất và hiển thị ngay khi cập nhật. Khu vực quản trị có thể thêm trận đấu và làm mới số liệu khi cần.",
  },
  {
    id: "security",
    title: "Bảo mật API",
    slug: "security",
    content:
      "Các mục quản trị yêu cầu mã truy cập hợp lệ; yêu cầu sai sẽ bị từ chối.",
  },
  {
    id: "ask-widget",
    title: "Hỏi đáp nhanh",
    slug: "ask-widget",
    content:
      "Tiện ích hỏi đáp nhanh tìm trong tin tức và tài liệu để đưa ra câu trả lời tóm tắt, có thể thay đổi nguồn dữ liệu tùy nhu cầu.",
  },
];
