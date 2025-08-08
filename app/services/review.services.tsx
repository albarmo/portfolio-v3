import qs from "~/utils/querystring";

type PaginationParams = {
  page?: number;
  limit?: number;
};

export type Review = {
  id: string;
  reviewText: string;
  name: string;
  jobTitle: string;
  location: string;
  linkedinUrl: string;
  createdAt: Date | string;
  updatedAt: Date | string;
};

export const BACKUP_REVIEWS: Review[] = [
  {
    id: "d4ba1c26-27c1-419f-9108-f4b61e5e0e89",
    linkedinUrl: "#",
    location: "Jakarta, Indonesia",
    jobTitle: "Senior Backend Engineer",
    name: "Angeng Nugroho",
    reviewText:
      "Skill teknisnya kuat dan komunikasi lancar. Proyek berjalan mulus tanpa hambatan berarti. Sangat direkomendasikan untuk kerja sama jangka panjang.",
    createdAt: "2025-08-07T09:00:20.299Z",
    updatedAt: "2025-08-07T09:00:20.299Z",
  },
  {
    id: "c2f0c065-0ab5-4853-8292-82c7b287c656",
    linkedinUrl: "#",
    location: "Jakarta, Indonesia",
    jobTitle: "Golang Backend Developer",
    name: "Asto Miwanda",
    reviewText:
      "Kontribusi yang diberikan sangat signifikan dalam pengembangan produk kami. Selalu proaktif dalam memberikan solusi dan ide-ide baru. Mantap!",
    createdAt: "2025-08-07T09:00:20.299Z",
    updatedAt: "2025-08-07T09:00:20.299Z",
  },
  {
    id: "3d898f62-701b-4afb-bfe5-934ac4f20a29",
    linkedinUrl: "#",
    location: "Jakarta, Indonesia",
    jobTitle: "Senior Frontend Engineer",
    name: "Romie Agung Nugraha",
    reviewText:
      "Sangat profesional dan hasilnya melebihi ekspektasi. Albar mampu bekerja dengan baik dalam tim maupun secara mandiri. Kualitas kodenya bersih dan terstruktur.",
    createdAt: "2025-08-07T09:00:20.299Z",
    updatedAt: "2025-08-07T09:00:20.299Z",
  },
  {
    id: "44104e0d-5d4c-4739-879b-e3def2cf200c",
    linkedinUrl: "#",
    location: "Jakarta, Indonesia",
    jobTitle: "Frontend Engineer",
    name: "Amilio Ardha",
    reviewText:
      "Kerja sama yang luar biasa! Cepat beradaptasi dengan alur kerja tim kami dan selalu memberikan hasil yang memuaskan tepat waktu.",
    createdAt: "2025-08-07T09:00:20.299Z",
    updatedAt: "2025-08-07T09:00:20.299Z",
  },
  {
    id: "774abfb1-3119-4ed0-aadd-b602f9317b56",
    linkedinUrl: "#",
    location: "Jakarta, Indonesia",
    jobTitle: "Project Manager",
    name: "Lala Dinda Pratiwi",
    reviewText:
      "Selalu memberikan ide-ide segar dan eksekusinya cepat. Kemampuannya dalam memecahkan masalah kompleks sangat membantu progres tim.",
    createdAt: "2025-08-07T09:00:20.299Z",
    updatedAt: "2025-08-07T09:00:20.299Z",
  },
  {
    id: "ab376223-30ac-4af8-806b-ad04eed24f69",
    linkedinUrl: "https://www.linkedin.com/in/ariel-arliyanus/",
    location: "Jakarta, Indonesia",
    jobTitle: "Senior Frontend Engineer",
    name: "Ariel Arliyanus",
    reviewText:
      "Selalu mau belajar hal baru dan teknologi baru yang membuat project semakin optimal. Albar mempunyai skill komunikasi yang baik antar tim. Kualitas kodenya sangat baik, sangat mementingkan kode yang terstruktur dan rapih",
    createdAt: "2025-08-07T09:00:20.299Z",
    updatedAt: "2025-08-07T09:00:20.299Z",
  },
];

export async function getReviews({ page, limit }: PaginationParams) {
  const queryString = qs({ page, limit });
  try {
    const response = await fetch(
      "http://localhost:8081/api/v1/reviews" + queryString
    );

    return response?.json();
  } catch (error) {
    return {code: 200, data: BACKUP_REVIEWS}
  }
}

export async function getReview(id: string) {
  try {
    const response = await fetch(`http://localhost:8081/api/v1/reviews/${id}`);

    return response?.json();
  } catch (error) {
    const project = BACKUP_REVIEWS.find((review) => String(review.id) === String(id));
    return project;
  }
}
