export const WordingErrors = {
  ECONNRESET: "Wah, ada gangguan jaringan nih, Coba cek internetnya ya!",
  INTERNAL_SERVER_ERROR:
    "Server mengalami kendala, Mohon coba kembali dalam beberapa saat.",
  UNAUTHORIZED:
    "Akses ditolak, Pastikan Anda sudah login dengan akun yang benar.",
  INVALID_VALIDATION:
    "Validasi gagal. Periksa kembali apakah informasi yang dimasukkan sudah sesuai.",
  NOT_MATCH: "Konfirmasi gagal, Pastikan input yang dimasukkan sudah benar.",
  INVALID_USER:
    "Oops! Kami tidak menemukan akun dengan informasi tersebut, Coba cek lagi ya!",
  FORBIDDEN:
    "Ups! Kamu nggak punya akses buat ke sini. Coba hubungi admin, ya!",
};

export const GetErrorText = (error: string) => {
  switch (error) {
    case "read ECONNRESET":
      return WordingErrors.ECONNRESET;
    case "INTERNAL_SERVER_ERROR":
      return WordingErrors.INTERNAL_SERVER_ERROR;
    case "UNAUTHORIZED":
      return WordingErrors.UNAUTHORIZED;
    case "INVALID_VALIDATION":
      return WordingErrors.INVALID_VALIDATION;
    case "NOT_MATCH":
      return WordingErrors.NOT_MATCH;
    case "INVALID_USER":
      return WordingErrors.INVALID_USER;
    case "FORBIDDEN":
      return WordingErrors.FORBIDDEN;
    case "400":
      return WordingErrors.INVALID_VALIDATION;
    case "401":
      return WordingErrors.UNAUTHORIZED;
    case "403":
      return WordingErrors.FORBIDDEN;
    case "500":
      return WordingErrors.INTERNAL_SERVER_ERROR;
    default:
      return error;
  }
};
