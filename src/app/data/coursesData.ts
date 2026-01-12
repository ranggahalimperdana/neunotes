export interface Course {
  code: string;
  title: string;
  description: string;
  notes: number;
  prodi: string;
  semester: number;
}

export interface FacultyWithCourses {
  faculty: string;
  prodi: string[];
  courses: Course[];
}

export const facultiesWithCoursesData: FacultyWithCourses[] = [
  {
    faculty: "Fakultas Teknik (FT)",
    prodi: ["Teknik Informatika", "Teknik Sipil", "Teknik Perminyakan", "Teknik Mesin", "Perencanaan Wilayah & Kota", "Teknik Geologi"],
    courses: [
      {
        code: "IF101",
        title: "Dasar Pemrograman",
        description: "Pengenalan logika pemrograman dan algoritma dasar menggunakan Python.",
        notes: 2,
        prodi: "Teknik Informatika",
        semester: 1
      },
      {
        code: "IF201",
        title: "Struktur Data",
        description: "Pendalaman tentang array, linked list, tree, dan graph.",
        notes: 18,
        prodi: "Teknik Informatika",
        semester: 3
      },
      {
        code: "IF301",
        title: "Basis Data",
        description: "Perancangan dan implementasi database relasional.",
        notes: 15,
        prodi: "Teknik Informatika",
        semester: 4
      },
      {
        code: "SI201",
        title: "Mekanika Bahan",
        description: "Analisis tegangan dan regangan pada material konstruksi.",
        notes: 12,
        prodi: "Teknik Sipil",
        semester: 3
      },
      {
        code: "SI101",
        title: "Matematika Teknik",
        description: "Kalkulus dan aljabar linear untuk teknik sipil.",
        notes: 10,
        prodi: "Teknik Sipil",
        semester: 1
      },
      {
        code: "PE301",
        title: "Geologi Minyak Bumi",
        description: "Pembentukan dan eksplorasi cadangan minyak bumi.",
        notes: 8,
        prodi: "Teknik Perminyakan",
        semester: 5
      },
      {
        code: "MS401",
        title: "Termodinamika",
        description: "Hukum dasar termodinamika dan aplikasinya pada mesin.",
        notes: 14,
        prodi: "Teknik Mesin",
        semester: 4
      },
      {
        code: "PWK501",
        title: "Perencanaan Tata Ruang",
        description: "Pengantar perencanaan tata ruang kota dan wilayah.",
        notes: 6,
        prodi: "Perencanaan Wilayah & Kota",
        semester: 5
      },
      {
        code: "GL601",
        title: "Petrologi",
        description: "Studi tentang batuan dan proses pembentukannya.",
        notes: 9,
        prodi: "Teknik Geologi",
        semester: 6
      }
    ]
  },
  {
    faculty: "Fakultas Hukum",
    prodi: ["Ilmu Hukum"],
    courses: [
      {
        code: "HK101",
        title: "Pengantar Ilmu Hukum",
        description: "Konsep dasar, asas, dan sistem hukum Indonesia.",
        notes: 15,
        prodi: "Ilmu Hukum",
        semester: 1
      },
      {
        code: "HK201",
        title: "Hukum Pidana",
        description: "Studi tentang tindak pidana dan sanksinya.",
        notes: 12,
        prodi: "Ilmu Hukum",
        semester: 3
      },
      {
        code: "HK301",
        title: "Hukum Perdata",
        description: "Prinsip-prinsip hukum perdata dan penerapannya.",
        notes: 18,
        prodi: "Ilmu Hukum",
        semester: 4
      },
      {
        code: "HK401",
        title: "Hukum Tata Negara",
        description: "Struktur pemerintahan dan konstitusi Indonesia.",
        notes: 10,
        prodi: "Ilmu Hukum",
        semester: 5
      }
    ]
  },
  {
    faculty: "Fakultas Agama Islam (FAI)",
    prodi: ["Pendidikan Agama Islam", "Hukum Keluarga Islam"],
    courses: [
      {
        code: "FAI101",
        title: "Tafsir Al-Qur'an",
        description: "Metode dan prinsip penafsiran Al-Qur'an.",
        notes: 18,
        prodi: "Pendidikan Agama Islam",
        semester: 2
      },
      {
        code: "FAI201",
        title: "Hadits dan Ilmu Hadits",
        description: "Studi hadits dan metodologi kritik hadits.",
        notes: 14,
        prodi: "Pendidikan Agama Islam",
        semester: 3
      },
      {
        code: "FAI301",
        title: "Fiqih Muamalah",
        description: "Hukum Islam dalam transaksi ekonomi dan sosial.",
        notes: 16,
        prodi: "Hukum Keluarga Islam",
        semester: 4
      },
      {
        code: "FAI401",
        title: "Ushul Fiqih",
        description: "Metodologi penetapan hukum Islam.",
        notes: 11,
        prodi: "Hukum Keluarga Islam",
        semester: 5
      }
    ]
  },
  {
    faculty: "Fakultas Ekonomi dan Bisnis (FEB)",
    prodi: ["Akuntansi", "Manajemen", "Ekonomi Pembangunan"],
    courses: [
      {
        code: "AKT101",
        title: "Pengantar Akuntansi",
        description: "Dasar-dasar pencatatan dan pelaporan keuangan.",
        notes: 22,
        prodi: "Akuntansi",
        semester: 1
      },
      {
        code: "AKT201",
        title: "Akuntansi Keuangan Menengah",
        description: "Teknik pencatatan transaksi keuangan kompleks.",
        notes: 19,
        prodi: "Akuntansi",
        semester: 3
      },
      {
        code: "MNJ201",
        title: "Manajemen Keuangan",
        description: "Pengelolaan keuangan perusahaan dan investasi.",
        notes: 16,
        prodi: "Manajemen",
        semester: 3
      },
      {
        code: "MNJ101",
        title: "Pengantar Manajemen",
        description: "Konsep dasar manajemen organisasi.",
        notes: 20,
        prodi: "Manajemen",
        semester: 1
      },
      {
        code: "EKP201",
        title: "Ekonomi Mikro",
        description: "Perilaku konsumen dan produsen dalam pasar.",
        notes: 13,
        prodi: "Ekonomi Pembangunan",
        semester: 2
      },
      {
        code: "EKP301",
        title: "Ekonomi Makro",
        description: "Analisis ekonomi agregat dan kebijakan fiskal.",
        notes: 15,
        prodi: "Ekonomi Pembangunan",
        semester: 4
      }
    ]
  },
  {
    faculty: "Fakultas Psikologi",
    prodi: ["Psikologi"],
    courses: [
      {
        code: "PSI101",
        title: "Psikologi Umum",
        description: "Pengantar dasar perilaku dan proses mental manusia.",
        notes: 20,
        prodi: "Psikologi",
        semester: 1
      },
      {
        code: "PSI201",
        title: "Psikologi Perkembangan",
        description: "Pertumbuhan manusia dari masa kanak-kanak hingga lansia.",
        notes: 17,
        prodi: "Psikologi",
        semester: 3
      },
      {
        code: "PSI301",
        title: "Psikologi Sosial",
        description: "Interaksi individu dalam konteks sosial.",
        notes: 14,
        prodi: "Psikologi",
        semester: 4
      },
      {
        code: "PSI401",
        title: "Psikologi Klinis",
        description: "Diagnosis dan terapi gangguan psikologis.",
        notes: 12,
        prodi: "Psikologi",
        semester: 6
      }
    ]
  },
  {
    faculty: "Fakultas Ilmu Komunikasi (Fikom)",
    prodi: ["Ilmu Komunikasi", "Jurnalistik", "Public Relations"],
    courses: [
      {
        code: "KOM101",
        title: "Dasar-Dasar Komunikasi",
        description: "Teori dan model komunikasi antar manusia.",
        notes: 19,
        prodi: "Ilmu Komunikasi",
        semester: 1
      },
      {
        code: "JUR201",
        title: "Jurnalistik Dasar",
        description: "Teknik peliputan dan penulisan berita.",
        notes: 13,
        prodi: "Jurnalistik",
        semester: 2
      },
      {
        code: "JUR301",
        title: "Jurnalistik Online",
        description: "Teknik penulisan dan pengelolaan media online.",
        notes: 16,
        prodi: "Jurnalistik",
        semester: 5
      },
      {
        code: "PR201",
        title: "Dasar Public Relations",
        description: "Strategi komunikasi organisasi dengan publik.",
        notes: 15,
        prodi: "Public Relations",
        semester: 3
      }
    ]
  },
  {
    faculty: "Fakultas Ilmu Sosial dan Ilmu Politik (FISIPOL)",
    prodi: ["Ilmu Politik", "Sosiologi", "Hubungan Internasional"],
    courses: [
      {
        code: "IP101",
        title: "Pengantar Ilmu Politik",
        description: "Konsep kekuasaan, negara, dan sistem pemerintahan.",
        notes: 11,
        prodi: "Ilmu Politik",
        semester: 1
      },
      {
        code: "IP301",
        title: "Politik Indonesia",
        description: "Sistem politik dan pemerintahan Indonesia.",
        notes: 14,
        prodi: "Ilmu Politik",
        semester: 5
      },
      {
        code: "SOS201",
        title: "Sosiologi Pedesaan",
        description: "Struktur sosial dan perubahan di masyarakat desa.",
        notes: 9,
        prodi: "Sosiologi",
        semester: 3
      },
      {
        code: "HI201",
        title: "Pengantar Hubungan Internasional",
        description: "Teori dan konsep dalam hubungan antar negara.",
        notes: 17,
        prodi: "Hubungan Internasional",
        semester: 2
      }
    ]
  },
  {
    faculty: "Fakultas Pertanian",
    prodi: ["Agronomi", "Ilmu Tanah", "Teknologi Hasil Pertanian"],
    courses: [
      {
        code: "AGR101",
        title: "Dasar Agronomi",
        description: "Prinsip budidaya tanaman pertanian.",
        notes: 14,
        prodi: "Agronomi",
        semester: 1
      },
      {
        code: "AGR301",
        title: "Teknologi Benih",
        description: "Produksi dan pengelolaan benih berkualitas.",
        notes: 10,
        prodi: "Agronomi",
        semester: 5
      },
      {
        code: "TAN201",
        title: "Ilmu Tanah",
        description: "Sifat fisik dan kimia tanah untuk pertanian.",
        notes: 10,
        prodi: "Ilmu Tanah",
        semester: 3
      },
      {
        code: "THP201",
        title: "Teknologi Pasca Panen",
        description: "Pengolahan dan penyimpanan hasil pertanian.",
        notes: 12,
        prodi: "Teknologi Hasil Pertanian",
        semester: 4
      }
    ]
  },
  {
    faculty: "Fakultas Kedokteran Gigi (FKG)",
    prodi: ["Kedokteran Gigi"],
    courses: [
      {
        code: "KG101",
        title: "Anatomi Gigi",
        description: "Struktur dan morfologi gigi manusia.",
        notes: 16,
        prodi: "Kedokteran Gigi",
        semester: 1
      },
      {
        code: "KG201",
        title: "Konservasi Gigi",
        description: "Teknik pemeliharaan dan perawatan gigi.",
        notes: 13,
        prodi: "Kedokteran Gigi",
        semester: 4
      },
      {
        code: "KG301",
        title: "Ortodonti",
        description: "Koreksi posisi gigi dan rahang.",
        notes: 11,
        prodi: "Kedokteran Gigi",
        semester: 6
      },
      {
        code: "PROF201",
        title: "Etika Profesi Dokter Gigi",
        description: "Kode etik dan standar profesionalisme dokter gigi.",
        notes: 8,
        prodi: "Kedokteran Gigi",
        semester: 3
      }
    ]
  }
];

export const facultiesData = facultiesWithCoursesData.map(f => ({
  name: f.faculty,
  prodi: f.prodi
}));
