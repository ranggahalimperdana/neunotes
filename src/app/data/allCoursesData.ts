/**
 * UniNotes - Course Data
 * 
 * File ini berisi data lengkap mata kuliah untuk semua program studi.
 * Data digunakan untuk sistem filter cascade di form upload catatan.
 * 
 * 🔄 SUPABASE INTEGRATION:
 * ============================================================================
 * Data ini akan dipindahkan ke tabel 'courses' di Supabase
 * 
 * Database Schema:
 * CREATE TABLE courses (
 *   id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *   code TEXT UNIQUE NOT NULL,
 *   name TEXT NOT NULL,
 *   semester TEXT NOT NULL,
 *   prodi TEXT NOT NULL,
 *   faculty TEXT NOT NULL,
 *   created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 * );
 * 
 * Query Example:
 * const { data, error } = await supabase
 *   .from('courses')
 *   .select('*')
 *   .eq('prodi', 'Informatika')
 *   .eq('semester', '1')
 *   .order('code');
 * ============================================================================
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Course {
  no: number;
  kode: string;
  nama: string;
  semester: string;
  prodi: string;
}

// ============================================================================
// COURSE DATA
// ============================================================================

export const allCourses: Course[] = [
  // --- INFORMATIKA ---
  { no: 1, kode: "TI210101", nama: "Pendidikan Agama Islam", semester: "1", prodi: "Informatika" },
  { no: 2, kode: "TI210102", nama: "Pendidikan Pancasila", semester: "1", prodi: "Informatika" },
  { no: 3, kode: "TI210104", nama: "Bahasa Indonesia", semester: "1", prodi: "Informatika" },
  { no: 4, kode: "TI210107", nama: "Bahasa Inggris", semester: "1", prodi: "Informatika" },
  { no: 5, kode: "TI210108", nama: "Literasi Data dan Teknologi", semester: "1", prodi: "Informatika" },
  { no: 6, kode: "TI211294", nama: "Pengenalan Pemrograman", semester: "1", prodi: "Informatika" },
  { no: 7, kode: "TI211295", nama: "Basis Data I", semester: "1", prodi: "Informatika" },
  { no: 8, kode: "TI211105", nama: "Kalkulus", semester: "1", prodi: "Informatika" },
  { no: 1, kode: "TI210103", nama: "Pendidikan Kewarganegaraan", semester: "2", prodi: "Informatika" },
  { no: 2, kode: "TI210105", nama: "Ibadah dan Mu'amalah", semester: "2", prodi: "Informatika" },
  { no: 3, kode: "TI210109", nama: "Dasar-dasar Kewirausahaan", semester: "2", prodi: "Informatika" },
  { no: 4, kode: "TI212296", nama: "Organisasi dan Arsitektur Komputer", semester: "2", prodi: "Informatika" },
  { no: 5, kode: "TI212297", nama: "Algoritma dan Pemrograman", semester: "2", prodi: "Informatika" },
  { no: 6, kode: "TI212298", nama: "Basis Data II", semester: "2", prodi: "Informatika" },
  { no: 7, kode: "TI212112", nama: "Aljabar Linear", semester: "2", prodi: "Informatika" },
  { no: 1, kode: "TI210106", nama: "Islam dan Keilmuan", semester: "3", prodi: "Informatika" },
  { no: 2, kode: "TI213299", nama: "Sistem Operasi", semester: "3", prodi: "Informatika" },
  { no: 3, kode: "TI213300", nama: "Pemrograman Web", semester: "3", prodi: "Informatika" },
  { no: 4, kode: "TI213117", nama: "Teori Bahasa dan Automata", semester: "3", prodi: "Informatika" },
  { no: 5, kode: "TI213301", nama: "Struktur Data", semester: "3", prodi: "Informatika" },
  { no: 6, kode: "TI213120", nama: "Rekayasa Perangkat Lunak", semester: "3", prodi: "Informatika" },
  { no: 7, kode: "TI213121", nama: "Metode Numerik", semester: "3", prodi: "Informatika" },
  { no: 1, kode: "TI214302", nama: "Elektronika Digital", semester: "4", prodi: "Informatika" },
  { no: 2, kode: "TI214303", nama: "Jaringan Komputer", semester: "4", prodi: "Informatika" },
  { no: 3, kode: "TI214304", nama: "Pemrograman Berorientasi Objek", semester: "4", prodi: "Informatika" },
  { no: 4, kode: "TI214305", nama: "Grafik Komputer", semester: "4", prodi: "Informatika" },
  { no: 5, kode: "TI214306", nama: "Desain dan Analisis Algoritma", semester: "4", prodi: "Informatika" },
  { no: 6, kode: "TI214132", nama: "Matematika Diskrit Informatika", semester: "4", prodi: "Informatika" },
  { no: 7, kode: "TI214307", nama: "Pemrograman Berbasis Komponen", semester: "4", prodi: "Informatika" },
  { no: 1, kode: "TI215308", nama: "Keamanan Komputer dan Jaringan", semester: "5", prodi: "Informatika" },
  { no: 2, kode: "TI215309", nama: "Pengenalan Kecerdasan Buatan", semester: "5", prodi: "Informatika" },
  { no: 3, kode: "TI215310", nama: "Dasar Pemrograman Mobile", semester: "5", prodi: "Informatika" },
  { no: 4, kode: "TI210141", nama: "Metodologi Penelitian", semester: "5", prodi: "Informatika" },
  { no: 5, kode: "TI215142", nama: "Keahlian Berkomunikasi", semester: "5", prodi: "Informatika" },
  { no: 6, kode: "TI215143", nama: "Kecakapan Antar Personal", semester: "5", prodi: "Informatika" },
  { no: 7, kode: "TI215144", nama: "Etika dan Profesionalisme", semester: "5", prodi: "Informatika" },
  { no: 1, kode: "TI216311", nama: "Switching, Routing and Wireless Essentials", semester: "6", prodi: "Informatika" },
  { no: 2, kode: "TI210147", nama: "Kerja Praktek", semester: "6", prodi: "Informatika" },
  { no: 3, kode: "TI216148", nama: "Interaksi Manusia dan Komputer", semester: "6", prodi: "Informatika" },
  { no: 4, kode: "TI216312", nama: "Statistik dan Probabilitas Informatika", semester: "6", prodi: "Informatika" },
  { no: 5, kode: "TI216313", nama: "Pembelajaran Mesin", semester: "6", prodi: "Informatika" },
  { no: 6, kode: "TI216314", nama: "Basis Data Grafik", semester: "6", prodi: "Informatika" },
  { no: 1, kode: "STI2547147", nama: "Manajemen Proyek Teknologi Informasi", semester: "7", prodi: "Informatika" },
  { no: 2, kode: "STI2547148", nama: "Pengolahan Citra", semester: "7", prodi: "Informatika" },
  { no: 3, kode: "STI2547146", nama: "Internet of Things", semester: "7", prodi: "Informatika" },
  { no: 4, kode: "STI2544130", nama: "Pengenalan Pemrograman Platform", semester: "7", prodi: "Informatika" },
  { no: 5, kode: "STI2545136", nama: "Sains Data", semester: "7", prodi: "Informatika" },
  { no: 6, kode: "STI2545133", nama: "Mata Kuliah Pilihan", semester: "7", prodi: "Informatika" },
  { no: 1, kode: "TI210320", nama: "Logika Samar", semester: "Pilihan", prodi: "Informatika" },
  { no: 2, kode: "TI210321", nama: "Pemrosesan Bahasa Alamiah", semester: "Pilihan", prodi: "Informatika" },
  { no: 3, kode: "TI210322", nama: "Mesin Penerjemah", semester: "Pilihan", prodi: "Informatika" },
  { no: 4, kode: "TI210323", nama: "Penglihatan Komputer", semester: "Pilihan", prodi: "Informatika" },
  { no: 5, kode: "TI210324", nama: "Pemrograman Berbasis Constraint", semester: "Pilihan", prodi: "Informatika" },
  { no: 6, kode: "TI210325", nama: "Forensik Digital", semester: "Pilihan", prodi: "Informatika" },
  { no: 7, kode: "TI210326", nama: "Jaringan Perusahaan, Keamanan dan Otomasi", semester: "Pilihan", prodi: "Informatika" },
  { no: 8, kode: "TI210327", nama: "Komputasi Paralel & Terdistribusi", semester: "Pilihan", prodi: "Informatika" },
  { no: 9, kode: "TI210328", nama: "Keamanan Siber", semester: "Pilihan", prodi: "Informatika" },
  { no: 10, kode: "TI210329", nama: "Sistem Komunikasi dan Telekomunikasi Data", semester: "Pilihan", prodi: "Informatika" },
  { no: 11, kode: "TI210330", nama: "Pemrograman Game", semester: "Pilihan", prodi: "Informatika" },
  { no: 12, kode: "TI210331", nama: "Basis Data Dokumen", semester: "Pilihan", prodi: "Informatika" },
  { no: 13, kode: "TI210332", nama: "Pembangunan Aplikasi Seluler Native", semester: "Pilihan", prodi: "Informatika" },
  { no: 14, kode: "TI210333", nama: "Teknologi yang Dapat Dikenakan", semester: "Pilihan", prodi: "Informatika" },
  { no: 15, kode: "TI210334", nama: "Pemrograman Multi Platform", semester: "Pilihan", prodi: "Informatika" },

  // --- SIPIL ---
  { no: 1, kode: "TS210101", nama: "Pendidikan Agama Islam", semester: "1", prodi: "Sipil" },
  { no: 2, kode: "TS210107", nama: "Bahasa Inggris", semester: "1", prodi: "Sipil" },
  { no: 3, kode: "TS210102", nama: "Pendidikan Pancasila", semester: "1", prodi: "Sipil" },
  { no: 4, kode: "TS211101", nama: "Kalkulus I", semester: "1", prodi: "Sipil" },
  { no: 5, kode: "TS211102", nama: "Fisika Mekanika dan Termodinamika", semester: "1", prodi: "Sipil" },
  { no: 6, kode: "TS211103", nama: "Kimia Teknik", semester: "1", prodi: "Sipil" },
  { no: 7, kode: "TS211104", nama: "Menggambar Struktur Bangunan", semester: "1", prodi: "Sipil" },
  { no: 8, kode: "TS211105", nama: "Pengantar Sistem Rekayasa Sipil", semester: "1", prodi: "Sipil" },
  { no: 1, kode: "TS210106", nama: "Islam dan Keilmuwan", semester: "2", prodi: "Sipil" },
  { no: 2, kode: "TS210104", nama: "Bahasa Indonesia", semester: "2", prodi: "Sipil" },
  { no: 3, kode: "TS210105", nama: "Ibadah dan Muamalah", semester: "2", prodi: "Sipil" },
  { no: 4, kode: "TS210103", nama: "Pendidikan Kewarganegaraan", semester: "2", prodi: "Sipil" },
  { no: 5, kode: "TS212106", nama: "Kalkulus II", semester: "2", prodi: "Sipil" },
  { no: 6, kode: "TS212107", nama: "Statistik dan Probabilitas", semester: "2", prodi: "Sipil" },
  { no: 7, kode: "TS212108", nama: "Analisis Struktur I", semester: "2", prodi: "Sipil" },
  { no: 8, kode: "TS212109", nama: "Teknologi Bahan", semester: "2", prodi: "Sipil" },
  { no: 9, kode: "TS212110", nama: "Praktikum Teknologi Bahan", semester: "2", prodi: "Sipil" },
  { no: 1, kode: "TS213111", nama: "Aljabar Linear", semester: "3", prodi: "Sipil" },
  { no: 2, kode: "TS213112", nama: "Fisika Listrik, Magnet, Gelombang dan Optik", semester: "3", prodi: "Sipil" },
  { no: 3, kode: "TS213113", nama: "Mekanika Tanah I", semester: "3", prodi: "Sipil" },
  { no: 4, kode: "TS213114", nama: "Praktikum Mekanika Tanah I", semester: "3", prodi: "Sipil" },
  { no: 5, kode: "TS213115", nama: "Analisis Struktur II", semester: "3", prodi: "Sipil" },
  { no: 6, kode: "TS213116", nama: "Perencanaan Geometri Jalan", semester: "3", prodi: "Sipil" },
  { no: 7, kode: "TS213117", nama: "Teknik Survei dan Pengukuran Wilayah", semester: "3", prodi: "Sipil" },
  { no: 8, kode: "TS213118", nama: "Praktikum Teknik Survei dan Pengukuran Wilayah", semester: "3", prodi: "Sipil" },
  { no: 9, kode: "TS213119", nama: "Hidrolika", semester: "3", prodi: "Sipil" },
  { no: 10, kode: "TS213120", nama: "Praktikum Hidrolika", semester: "3", prodi: "Sipil" },
  { no: 1, kode: "TS214121", nama: "Metode Numerik", semester: "4", prodi: "Sipil" },
  { no: 2, kode: "TS214122", nama: "Mekanika Tanah II", semester: "4", prodi: "Sipil" },
  { no: 3, kode: "TS214123", nama: "Praktikum Mekanika Tanah II", semester: "4", prodi: "Sipil" },
  { no: 4, kode: "TS214124", nama: "Mekanika Bahan", semester: "4", prodi: "Sipil" },
  { no: 5, kode: "TS214125", nama: "Struktur Beton Bertulang I", semester: "4", prodi: "Sipil" },
  { no: 6, kode: "TS214126", nama: "Teknik Perkerasan Jalan", semester: "4", prodi: "Sipil" },
  { no: 7, kode: "TS214127", nama: "Praktikum Teknik Perkerasan Jalan", semester: "4", prodi: "Sipil" },
  { no: 8, kode: "TS214128", nama: "Hidrologi Terapan", semester: "4", prodi: "Sipil" },
  { no: 9, kode: "TS214129", nama: "Praktikum Hidrologi Terapan", semester: "4", prodi: "Sipil" },
  { no: 10, kode: "TS214130", nama: "Manajemen Konstruksi", semester: "4", prodi: "Sipil" },
  { no: 1, kode: "TS215131", nama: "Teknik Pondasi", semester: "5", prodi: "Sipil" },
  { no: 2, kode: "TS215132", nama: "Analisis Struktur Metode Matriks", semester: "5", prodi: "Sipil" },
  { no: 3, kode: "TS215133", nama: "Struktur Beton Bertulang II", semester: "5", prodi: "Sipil" },
  { no: 4, kode: "TS215134", nama: "Struktur Baja I", semester: "5", prodi: "Sipil" },
  { no: 5, kode: "TS215135", nama: "Rekayasa Lalu Lintas", semester: "5", prodi: "Sipil" },
  { no: 6, kode: "TS215136", nama: "Drainase Dan Sanitasi Lingkungan", semester: "5", prodi: "Sipil" },
  { no: 7, kode: "TS215137", nama: "Praktikum Drainase dan Sanitasi Lingkungan", semester: "5", prodi: "Sipil" },
  { no: 8, kode: "TS215138", nama: "Metode Pelaksanaan Dan Pembongkaran Konstruksi", semester: "5", prodi: "Sipil" },
  { no: 9, kode: "TS215139", nama: "Manajemen Peralatan Konstruksi", semester: "5", prodi: "Sipil" },
  { no: 1, kode: "TS210108", nama: "Literasi Data Dan Teknologi", semester: "6", prodi: "Sipil" },
  { no: 2, kode: "TS210109", nama: "Dasar-Dasar Kewirausahaan", semester: "6", prodi: "Sipil" },
  { no: 3, kode: "TS216142", nama: "Metode dan Teknologi Inovasi Perbaikan Tanah", semester: "6", prodi: "Sipil" },
  { no: 4, kode: "TS216143", nama: "Struktur Baja II", semester: "6", prodi: "Sipil" },
  { no: 5, kode: "TS216144", nama: "Dinamika Struktur Dan Teknik Gempa", semester: "6", prodi: "Sipil" },
  { no: 6, kode: "TS216145", nama: "Rekayasa Sumber Daya Air Berkelanjutan", semester: "6", prodi: "Sipil" },
  { no: 7, kode: "TS216146", nama: "Aspek Hukum Dalam Pembangunan", semester: "6", prodi: "Sipil" },
  { no: 8, kode: "TS216147", nama: "Aplikasi Komputer Untuk Teknik Sipil", semester: "6", prodi: "Sipil" },
  { no: 9, kode: "TS216148", nama: "Praktikum Aplikasi Komputer Untuk Teknik Sipil", semester: "6", prodi: "Sipil" },
  { no: 10, kode: "TS210149", nama: "Teknik Penulisan Karya Ilmiah dan Presentasi", semester: "6", prodi: "Sipil" },
  { no: 1, kode: "TS217154", nama: "Rekayasa Lingkungan Berkelanjutan", semester: "7", prodi: "Sipil" },
  { no: 2, kode: "TS217155", nama: "Perancangan Infrastruktur Teknik Sipil", semester: "7", prodi: "Sipil" },
  { no: 3, kode: "TS210156", nama: "Kerja Praktek", semester: "7", prodi: "Sipil" },
  { no: 1, kode: "TS215240", nama: "Konstruksi Di Atas Tanah Lunak", semester: "Pilihan", prodi: "Sipil" },
  { no: 2, kode: "TS215241", nama: "Manajemen Operasional Proyek Infrastruktur", semester: "Pilihan", prodi: "Sipil" },
  { no: 3, kode: "TS216250", nama: "Rekayasa Lahan Gambut", semester: "Pilihan", prodi: "Sipil" },
  { no: 4, kode: "TS216251", nama: "Manajemen Keselamatan Lalu Lintas", semester: "Pilihan", prodi: "Sipil" },
  { no: 5, kode: "TS216252", nama: "Penyediaan Air Bersih", semester: "Pilihan", prodi: "Sipil" },
  { no: 6, kode: "TS216253", nama: "Ekonomi Teknik", semester: "Pilihan", prodi: "Sipil" },
  { no: 7, kode: "TS217257", nama: "Stabilitas Lereng dan Penanganan Longsor", semester: "Pilihan", prodi: "Sipil" },
  { no: 8, kode: "TS217258", nama: "Metode Elemen Hingga", semester: "Pilihan", prodi: "Sipil" },
  { no: 9, kode: "TS217259", nama: "Teknik Jembatan", semester: "Pilihan", prodi: "Sipil" },
  { no: 10, kode: "TS217260", nama: "Sistem Transportasi Publik", semester: "Pilihan", prodi: "Sipil" },
  { no: 11, kode: "TS217261", nama: "Sistem Kebandarudaraan", semester: "Pilihan", prodi: "Sipil" },
  { no: 12, kode: "TS217262", nama: "Pengelolaan Limpasan Air Hujan", semester: "Pilihan", prodi: "Sipil" },
  { no: 13, kode: "TS217263", nama: "Keselamatan dan Kesehatan Kerja (K3) Konstruksi", semester: "Pilihan", prodi: "Sipil" },
  { no: 14, kode: "TS218265", nama: "Topik Khusus Geoteknik", semester: "Pilihan", prodi: "Sipil" },
  { no: 15, kode: "TS218266", nama: "Sistem Monitoring Kesehatan Bangunan", semester: "Pilihan", prodi: "Sipil" },
  { no: 16, kode: "TS218267", nama: "Teknik Pelabuhan", semester: "Pilihan", prodi: "Sipil" },
  { no: 17, kode: "TS218268", nama: "Manajemen Dan Evaluasi Perkerasan Jalan", semester: "Pilihan", prodi: "Sipil" },
  { no: 18, kode: "TS218269", nama: "Pengendalian Daya Rusak Air", semester: "Pilihan", prodi: "Sipil" },
  { no: 19, kode: "TS218270", nama: "Amdal", semester: "Pilihan", prodi: "Sipil" },
  { no: 20, kode: "TS218271", nama: "Manajemen Informasi Pembangunan", semester: "Pilihan", prodi: "Sipil" },

  // --- GEOLOGI ---
  { no: 1, kode: "TG210101", nama: "Pendidikan Agama Islam", semester: "1", prodi: "Geologi" },
  { no: 2, kode: "TG210104", nama: "Bahasa Indonesia", semester: "1", prodi: "Geologi" },
  { no: 3, kode: "TG210102", nama: "Pendidikan Pancasila", semester: "1", prodi: "Geologi" },
  { no: 4, kode: "TG211101", nama: "Fisika Dasar I", semester: "1", prodi: "Geologi" },
  { no: 5, kode: "TG211102", nama: "Praktikum Fisika Dasar I", semester: "1", prodi: "Geologi" },
  { no: 6, kode: "TG211103", nama: "Kimia Dasar I", semester: "1", prodi: "Geologi" },
  { no: 7, kode: "TG211104", nama: "Praktikum Kimia Dasar I", semester: "1", prodi: "Geologi" },
  { no: 8, kode: "TG211105", nama: "Kalkulus I", semester: "1", prodi: "Geologi" },
  { no: 9, kode: "TG211106", nama: "Geologi Dasar", semester: "1", prodi: "Geologi" },
  { no: 10, kode: "TG211107", nama: "Kristalografi dan Mineralogi", semester: "1", prodi: "Geologi" },
  { no: 11, kode: "TG211108", nama: "Praktikum Kristalografi dan Mineralogi", semester: "1", prodi: "Geologi" },
  { no: 1, kode: "TG210105", nama: "Ibadah dan Muamalah", semester: "2", prodi: "Geologi" },
  { no: 2, kode: "TG210107", nama: "Bahasa Inggris", semester: "2", prodi: "Geologi" },
  { no: 3, kode: "TG210103", nama: "Pendidikan Kewarganegaraan", semester: "2", prodi: "Geologi" },
  { no: 4, kode: "TG212109", nama: "Fisika Dasar II", semester: "2", prodi: "Geologi" },
  { no: 5, kode: "TG212110", nama: "Kimia Dasar II", semester: "2", prodi: "Geologi" },
  { no: 6, kode: "TG212111", nama: "Kalkulus II", semester: "2", prodi: "Geologi" },
  { no: 7, kode: "TG212112", nama: "Petrologi", semester: "2", prodi: "Geologi" },
  { no: 8, kode: "TG212113", nama: "Praktikum Petrologi", semester: "2", prodi: "Geologi" },
  { no: 9, kode: "TG212175", nama: "Sedimentologi dan Stratigrafi", semester: "2", prodi: "Geologi" },
  { no: 10, kode: "TG212176", nama: "Praktikum Sedimentologi dan Stratigrafi", semester: "2", prodi: "Geologi" },
  { no: 11, kode: "TG212116", nama: "Teknik Pemetaan Topografi", semester: "2", prodi: "Geologi" },
  { no: 12, kode: "TG212117", nama: "Praktikum Teknik Pemetaan Topografi", semester: "2", prodi: "Geologi" },
  { no: 1, kode: "TG210106", nama: "Islam dan Keilmuan", semester: "3", prodi: "Geologi" },
  { no: 2, kode: "TG210109", nama: "Dasar-Dasar Kewirausahaan", semester: "3", prodi: "Geologi" },
  { no: 3, kode: "TG210108", nama: "Literasi Data dan Teknologi", semester: "3", prodi: "Geologi" },
  { no: 4, kode: "TG213118", nama: "Statistika", semester: "3", prodi: "Geologi" },
  { no: 5, kode: "TG213177", nama: "Aljabar Linear", semester: "3", prodi: "Geologi" },
  { no: 6, kode: "TG213178", nama: "Geomorfologi dan Penginderaan Jauh", semester: "3", prodi: "Geologi" },
  { no: 7, kode: "TG212179", nama: "Praktikum Geomorfologi dan Penginderaan Jauh", semester: "3", prodi: "Geologi" },
  { no: 8, kode: "TG213121", nama: "Geologi Struktur", semester: "3", prodi: "Geologi" },
  { no: 9, kode: "TG213122", nama: "Praktikum Geologi Struktur", semester: "3", prodi: "Geologi" },
  { no: 10, kode: "TG213123", nama: "Paleontologi", semester: "3", prodi: "Geologi" },
  { no: 11, kode: "TG213124", nama: "Praktikum Paleontologi", semester: "3", prodi: "Geologi" },
  { no: 1, kode: "TG214126", nama: "Geoprenuer", semester: "4", prodi: "Geologi" },
  { no: 2, kode: "TG214127", nama: "Metodologi Penelitian", semester: "4", prodi: "Geologi" },
  { no: 3, kode: "TG214128", nama: "Mineral Optik dan Petrografi", semester: "4", prodi: "Geologi" },
  { no: 4, kode: "TG214129", nama: "Praktikum Mineral Optik dan Petrografi", semester: "4", prodi: "Geologi" },
  { no: 5, kode: "TG214130", nama: "Mikropaleontologi", semester: "4", prodi: "Geologi" },
  { no: 6, kode: "TG214131", nama: "Praktikum Mikropaleontologi", semester: "4", prodi: "Geologi" },
  { no: 7, kode: "TG214132", nama: "Geologi Sejarah", semester: "4", prodi: "Geologi" },
  { no: 8, kode: "TG214134", nama: "Geologi Teknik", semester: "4", prodi: "Geologi" },
  { no: 9, kode: "TG214135", nama: "Praktikum Geologi Teknik", semester: "4", prodi: "Geologi" },
  { no: 10, kode: "TG214136", nama: "Geologi Minyak dan Gas Bumi", semester: "4", prodi: "Geologi" },
  { no: 11, kode: "TG214137", nama: "Praktikum Geologi Minyak dan Gas Bumi", semester: "4", prodi: "Geologi" },
  { no: 1, kode: "TG215180", nama: "Kimia Analitik", semester: "5", prodi: "Geologi" },
  { no: 2, kode: "TG215138", nama: "Geologi Indonesia", semester: "5", prodi: "Geologi" },
  { no: 3, kode: "TG215139", nama: "Teknik Lapangan I", semester: "5", prodi: "Geologi" },
  { no: 4, kode: "TG215140", nama: "Hidrogeologi", semester: "5", prodi: "Geologi" },
  { no: 5, kode: "TG215141", nama: "Praktikum Hidrogeologi", semester: "5", prodi: "Geologi" },
  { no: 6, kode: "TG215142", nama: "Geofisika", semester: "5", prodi: "Geologi" },
  { no: 7, kode: "TG215143", nama: "Praktikum Geofisika", semester: "5", prodi: "Geologi" },
  { no: 8, kode: "TG215144", nama: "Sistem Informasi Geografis", semester: "5", prodi: "Geologi" },
  { no: 9, kode: "TG215145", nama: "Praktikum Sistem Informasi Geografis", semester: "5", prodi: "Geologi" },
  { no: 10, kode: "TG215146", nama: "Geokomputasi", semester: "5", prodi: "Geologi" },
  { no: 11, kode: "TG215147", nama: "Praktikum Geokomputasi", semester: "5", prodi: "Geologi" },
  { no: 1, kode: "TG216148", nama: "Teknik Komunikasi Geologi", semester: "6", prodi: "Geologi" },
  { no: 2, kode: "TG216149", nama: "Tektonika", semester: "6", prodi: "Geologi" },
  { no: 3, kode: "TG216150", nama: "Geologi Batubara", semester: "6", prodi: "Geologi" },
  { no: 4, kode: "TG216151", nama: "Geologi Kuarter", semester: "6", prodi: "Geologi" },
  { no: 5, kode: "TG216152", nama: "Geologi Lingkungan", semester: "6", prodi: "Geologi" },
  { no: 6, kode: "TG216153", nama: "Geologi Mitigasi Bencana", semester: "6", prodi: "Geologi" },
  { no: 7, kode: "TG216154", nama: "Geokimia", semester: "6", prodi: "Geologi" },
  { no: 1, kode: "TG217161", nama: "Keselamatan, Kesehatan Kerja dan Lingkungan", semester: "7", prodi: "Geologi" },
  { no: 2, kode: "TG217162", nama: "Teknik Lapangan II", semester: "7", prodi: "Geologi" },
  { no: 3, kode: "TG217163", nama: "Geothermal", semester: "7", prodi: "Geologi" },
  { no: 4, kode: "TG217181", nama: "Capstone Design", semester: "7", prodi: "Geologi" },
  { no: 5, kode: "TG217165", nama: "Geowisata", semester: "7", prodi: "Geologi" },
  { no: 6, kode: "TG217166", nama: "Vulkanologi", semester: "7", prodi: "Geologi" },
  { no: 1, kode: "TG216255", nama: "Sekuen Stratigrafi", semester: "Pilihan", prodi: "Geologi" },
  { no: 2, kode: "TG216256", nama: "Mineral Alterasi", semester: "Pilihan", prodi: "Geologi" },
  { no: 3, kode: "TG216257", nama: "Geomekanika", semester: "Pilihan", prodi: "Geologi" },
  { no: 4, kode: "TG216258", nama: "Hidrogeologi Lanjut", semester: "Pilihan", prodi: "Geologi" },
  { no: 5, kode: "TG216259", nama: "Geologi Pengembangan Wilayah", semester: "Pilihan", prodi: "Geologi" },
  { no: 6, kode: "TG216260", nama: "Bahasa Pemograman", semester: "Pilihan", prodi: "Geologi" },
  { no: 7, kode: "TG217267", nama: "Public Speaking", semester: "Pilihan", prodi: "Geologi" },
  { no: 8, kode: "TG217268", nama: "Leadership", semester: "Pilihan", prodi: "Geologi" },
  { no: 9, kode: "TG217269", nama: "Penilaian Formasi", semester: "Pilihan", prodi: "Geologi" },
  { no: 10, kode: "TG217270", nama: "Non-Konvensional Energi", semester: "Pilihan", prodi: "Geologi" },
  { no: 11, kode: "TG217271", nama: "Petrogenesis", semester: "Pilihan", prodi: "Geologi" },
  { no: 12, kode: "TG217272", nama: "Manajemen Eksplorasi", semester: "Pilihan", prodi: "Geologi" },
  { no: 13, kode: "TG217273", nama: "Analisis Dampak Lingkungan", semester: "Pilihan", prodi: "Geologi" },

  // --- ILMU KOMUNIKASI ---
  { no: 1, kode: "IK210101", nama: "Pendidikan Agama Islam", semester: "1", prodi: "Ilmu Komunikasi" },
  { no: 2, kode: "IK210102", nama: "Pendidikan Pancasila", semester: "1", prodi: "Ilmu Komunikasi" },
  { no: 3, kode: "IK210103", nama: "Pendidikan Kewarganegaraan", semester: "1", prodi: "Ilmu Komunikasi" },
  { no: 4, kode: "IK210104", nama: "Bahasa Indonesia", semester: "1", prodi: "Ilmu Komunikasi" },
  { no: 5, kode: "IK211101", nama: "Pengantar Ilmu Komunikasi", semester: "1", prodi: "Ilmu Komunikasi" },
  { no: 6, kode: "IK211102", nama: "Dasar Jurnalistik", semester: "1", prodi: "Ilmu Komunikasi" },
  { no: 7, kode: "IK211103", nama: "Dasar Kehumasan", semester: "1", prodi: "Ilmu Komunikasi" },
  { no: 8, kode: "IK211104", nama: "Dasar Periklanan", semester: "1", prodi: "Ilmu Komunikasi" },
  { no: 1, kode: "IK210109", nama: "Dasar Kewirausahaan", semester: "2", prodi: "Ilmu Komunikasi" },
  { no: 2, kode: "IK210107", nama: "Bahasa Inggris", semester: "2", prodi: "Ilmu Komunikasi" },
  { no: 3, kode: "IK210108", nama: "Literasi Data & Teknologi", semester: "2", prodi: "Ilmu Komunikasi" },
  { no: 4, kode: "IK210105", nama: "Ibadah, Muamalah, dan Akhlak", semester: "2", prodi: "Ilmu Komunikasi" },
  { no: 5, kode: "IK212101", nama: "Teori-Teori Komunikasi Massa", semester: "2", prodi: "Ilmu Komunikasi" },
  { no: 6, kode: "IK212102", nama: "Public Speaking", semester: "2", prodi: "Ilmu Komunikasi" },
  { no: 7, kode: "IK212103", nama: "Komunikasi Dan Budaya Melayu", semester: "2", prodi: "Ilmu Komunikasi" },
  { no: 8, kode: "IK212104", nama: "Etika dan Regulasi Media", semester: "2", prodi: "Ilmu Komunikasi" },
  { no: 1, kode: "IK210106", nama: "Islam & Keilmuan", semester: "3", prodi: "Ilmu Komunikasi" },
  { no: 2, kode: "IK213101", nama: "Content Creative", semester: "3", prodi: "Ilmu Komunikasi" },
  { no: 3, kode: "IK213102", nama: "Media Baru dan Komunikasi Digital", semester: "3", prodi: "Ilmu Komunikasi" },
  { no: 4, kode: "IK213103", nama: "Fotografi Dasar", semester: "3", prodi: "Ilmu Komunikasi" },
  { no: 5, kode: "IK213104", nama: "Filsafat Ilmu Komunikasi", semester: "3", prodi: "Ilmu Komunikasi" },
  { no: 6, kode: "IK213105", nama: "Komunikasi Politik", semester: "3", prodi: "Ilmu Komunikasi" },
  { no: 7, kode: "IK213106", nama: "Analisis Isi Media", semester: "3", prodi: "Ilmu Komunikasi" },
  { no: 1, kode: "IK214101", nama: "Komunikasi Islam", semester: "4", prodi: "Ilmu Komunikasi" },
  { no: 2, kode: "IK214102", nama: "Komunikasi Interpersonal", semester: "4", prodi: "Ilmu Komunikasi" },
  { no: 3, kode: "IK214103", nama: "Semiotika Visual", semester: "4", prodi: "Ilmu Komunikasi" },
  { no: 4, kode: "IK214104", nama: "Digital Public Relations", semester: "4", prodi: "Ilmu Komunikasi" },
  { no: 5, kode: "IK214105", nama: "Digital Journalism", semester: "4", prodi: "Ilmu Komunikasi" },
  { no: 6, kode: "IK214106", nama: "Produksi Konten Digital", semester: "4", prodi: "Ilmu Komunikasi" },
  { no: 7, kode: "IK214107", nama: "Teori New Media", semester: "4", prodi: "Ilmu Komunikasi" },
  { no: 1, kode: "IK210110", nama: "Metode Penelitian Kuantitatif", semester: "5", prodi: "Ilmu Komunikasi" },
  { no: 2, kode: "IK215101", nama: "Teknik Analisis Data Kuantitatif", semester: "5", prodi: "Ilmu Komunikasi" },
  { no: 3, kode: "IK210111", nama: "Metode Penelitian Kualitatif", semester: "5", prodi: "Ilmu Komunikasi" },
  { no: 4, kode: "IK215102", nama: "Teknik Analisis Data Kualitatif", semester: "5", prodi: "Ilmu Komunikasi" },
  { no: 5, kode: "IK215103", nama: "Komunikasi Kelompok dan Organisasi", semester: "5", prodi: "Ilmu Komunikasi" },
  { no: 6, kode: "IK215104", nama: "Literasi Digital dan Sosial Media", semester: "5", prodi: "Ilmu Komunikasi" },
  { no: 1, kode: "IK216101", nama: "Psikologi Komunikasi", semester: "6", prodi: "Ilmu Komunikasi" },
  { no: 2, kode: "IK216102", nama: "Event Organizer", semester: "6", prodi: "Ilmu Komunikasi" },
  { no: 3, kode: "IK216103", nama: "Riset Media", semester: "6", prodi: "Ilmu Komunikasi" },
  { no: 4, kode: "IK216104", nama: "Mobile Journalism", semester: "6", prodi: "Ilmu Komunikasi" },
  { no: 5, kode: "IK216105", nama: "Fotografi Komersil", semester: "6", prodi: "Ilmu Komunikasi" },
  { no: 1, kode: "IK217101", nama: "Media Promotion and Marketing", semester: "7", prodi: "Ilmu Komunikasi" },
  { no: 2, kode: "IK217102", nama: "Desain Komunikasi Visual", semester: "7", prodi: "Ilmu Komunikasi" },
  { no: 3, kode: "IK217103", nama: "Crisis and Risk Communication", semester: "7", prodi: "Ilmu Komunikasi" },
  { no: 4, kode: "IK217104", nama: "Komunikasi Pembangunan", semester: "7", prodi: "Ilmu Komunikasi" },
  { no: 5, kode: "IK217105", nama: "Storytelling Digital", semester: "7", prodi: "Ilmu Komunikasi" },
  { no: 1, kode: "IK216201", nama: "Komunikasi Pariwisata", semester: "Pilihan", prodi: "Ilmu Komunikasi" },
  { no: 2, kode: "IK216202", nama: "Kampanye Politik (Digital)", semester: "Pilihan", prodi: "Ilmu Komunikasi" },
  { no: 3, kode: "IK216203", nama: "Kajian Gender dan Budaya", semester: "Pilihan", prodi: "Ilmu Komunikasi" },
  { no: 4, kode: "IK216204", nama: "Komunikasi Korporasi", semester: "Pilihan", prodi: "Ilmu Komunikasi" },

  // --- PWK ---
  { no: 1, kode: "PW 210101", nama: "Pendidikan Agama Islam", semester: "1", prodi: "PWK" },
  { no: 2, kode: "PW 211101", nama: "Kependudukan", semester: "1", prodi: "PWK" },
  { no: 3, kode: "PW 211102", nama: "Matematika Dasar", semester: "1", prodi: "PWK" },
  { no: 4, kode: "PW 211103", nama: "Ekonomi Wilayah dan Kota 1", semester: "1", prodi: "PWK" },
  { no: 5, kode: "PW 211104", nama: "Pengantar PWK", semester: "1", prodi: "PWK" },
  { no: 6, kode: "PW 210108", nama: "Literasi Data dan Teknologi", semester: "1", prodi: "PWK" },
  { no: 7, kode: "PW 210104", nama: "Bahasa Indonesia", semester: "1", prodi: "PWK" },
  { no: 8, kode: "PW 210102", nama: "Pendidikan Pancasila", semester: "1", prodi: "PWK" },
  { no: 9, kode: "PW 211105", nama: "Geologi Tata Lingkungan", semester: "1", prodi: "PWK" },
  { no: 1, kode: "PW 210105", nama: "Ibadah, Muamalah dan Akhlak", semester: "2", prodi: "PWK" },
  { no: 2, kode: "PW 212106", nama: "Statistik", semester: "2", prodi: "PWK" },
  { no: 3, kode: "PW 212107", nama: "Ekonomi Wilayah dan Kota 2", semester: "2", prodi: "PWK" },
  { no: 4, kode: "PW 212108", nama: "Pemetaan Dasar", semester: "2", prodi: "PWK" },
  { no: 5, kode: "PW 212109", nama: "Praktikum Pemetaan Dasar", semester: "2", prodi: "PWK" },
  { no: 6, kode: "PW 212110", nama: "Pengantar Proses Perencanaan", semester: "2", prodi: "PWK" },
  { no: 7, kode: "PW 212111", nama: "Identifikasi dan Teknik Presentasi", semester: "2", prodi: "PWK" },
  { no: 8, kode: "PW 212112", nama: "Tata Guna dan Pengembangan Lahan", semester: "2", prodi: "PWK" },
  { no: 9, kode: "PW 212113", nama: "Sistem Sosial", semester: "2", prodi: "PWK" },
  { no: 10, kode: "PW 210103", nama: "Pendidikan Kewarganegaraan", semester: "2", prodi: "PWK" },
  { no: 1, kode: "PW 210106", nama: "Islam dan Keilmuan", semester: "3", prodi: "PWK" },
  { no: 2, kode: "PW 213114", nama: "MAP 1", semester: "3", prodi: "PWK" },
  { no: 3, kode: "PW 213115", nama: "Praktikum MAP 1", semester: "3", prodi: "PWK" },
  { no: 4, kode: "PW 213116", nama: "Interpretasi Citra", semester: "3", prodi: "PWK" },
  { no: 5, kode: "PW 213117", nama: "Praktikum Interpretasi Citra", semester: "3", prodi: "PWK" },
  { no: 6, kode: "PW 213118", nama: "Pengantar Transportasi", semester: "3", prodi: "PWK" },
  { no: 7, kode: "PW 213119", nama: "Prasarana Wilayah dan Kota", semester: "3", prodi: "PWK" },
  { no: 8, kode: "PW 213120", nama: "Permukiman Kota", semester: "3", prodi: "PWK" },
  { no: 9, kode: "PW 213121", nama: "Analisis Struktur dan Pola Ruang", semester: "3", prodi: "PWK" },
  { no: 10, kode: "PW 213122", nama: "Analisis Sumber Daya Lingkungan", semester: "3", prodi: "PWK" },
  { no: 1, kode: "PW 214123", nama: "MAP 2", semester: "4", prodi: "PWK" },
  { no: 2, kode: "PW 214124", nama: "Praktikum MAP 2", semester: "4", prodi: "PWK" },
  { no: 3, kode: "PW 214125", nama: "Sistem Informasi Perencanaan", semester: "4", prodi: "PWK" },
  { no: 4, kode: "PW 214126", nama: "Praktikum Sistem Informasi Perencanaan", semester: "4", prodi: "PWK" },
  { no: 5, kode: "PW 214127", nama: "Studio Proses Perencanaan", semester: "4", prodi: "PWK" },
  { no: 6, kode: "PW 214128", nama: "Perencanaan Transportasi", semester: "4", prodi: "PWK" },
  { no: 7, kode: "PW 214129", nama: "Perencanaan Kota", semester: "4", prodi: "PWK" },
  { no: 8, kode: "PW 214130", nama: "Pembiayaan Pembangunan", semester: "4", prodi: "PWK" },
  { no: 9, kode: "PW 214131", nama: "Pemanfaatan dan Pengendalian Ruang", semester: "4", prodi: "PWK" },
  { no: 1, kode: "PW 215132", nama: "Perencanaan Wilayah", semester: "5", prodi: "PWK" },
  { no: 2, kode: "PW 215133", nama: "Perencanaan Tapak", semester: "5", prodi: "PWK" },
  { no: 3, kode: "PW 215134", nama: "Praktikum Perencanaan Tapak", semester: "5", prodi: "PWK" },
  { no: 4, kode: "PW 215135", nama: "Pengelolaan Sumber Daya Air", semester: "5", prodi: "PWK" },
  { no: 5, kode: "PW 215136", nama: "Perencanaan Pariwisata", semester: "5", prodi: "PWK" },
  { no: 6, kode: "PW 215137", nama: "Studio Perencanaan Kota", semester: "5", prodi: "PWK" },
  { no: 7, kode: "PW 215138", nama: "Hukum & Administrasi Perencanaan", semester: "5", prodi: "PWK" },
  { no: 8, kode: "PW 215239", nama: "Perencanaan Kawasan Permukiman", semester: "5", prodi: "PWK" },
  { no: 9, kode: "PW 215240", nama: "Sejarah dan Preservasi Kota", semester: "5", prodi: "PWK" },
  { no: 1, kode: "PW 216141", nama: "Studio Perencanaan Wilayah", semester: "6", prodi: "PWK" },
  { no: 2, kode: "PW 216142", nama: "Teknik Evaluasi Perencanaan", semester: "6", prodi: "PWK" },
  { no: 3, kode: "PW 216143", nama: "Bahasa Inggris", semester: "6", prodi: "PWK" },
  { no: 4, kode: "PW 216144", nama: "Perencanaan Ruang DAS", semester: "6", prodi: "PWK" },
  { no: 5, kode: "PW 216145", nama: "Teori Perencanaan", semester: "6", prodi: "PWK" },
  { no: 6, kode: "PW 216246", nama: "Pengelolaan Transportasi", semester: "6", prodi: "PWK" },
  { no: 7, kode: "PW 216247", nama: "Perencanaan Pengembangan Industri", semester: "6", prodi: "PWK" },
  { no: 1, kode: "PW 210148", nama: "Kerja Praktek", semester: "7", prodi: "PWK" },
  { no: 2, kode: "PW 217149", nama: "Metodologi Penelitian", semester: "7", prodi: "PWK" },
  { no: 3, kode: "PW 217150", nama: "Studio Perencanaan Ruang Berbasis DAS", semester: "7", prodi: "PWK" },
  { no: 4, kode: "PW 217151", nama: "Dasar-dasar Kewirausahaan", semester: "7", prodi: "PWK" },
  { no: 5, kode: "PW 217152", nama: "Etika Profesi", semester: "7", prodi: "PWK" },
  { no: 6, kode: "PW 217253", nama: "Perencanaan Wilayah Pesisir dan Pulau Kecil", semester: "7", prodi: "PWK" },
  { no: 7, kode: "PW 217254", nama: "Perencanaan Desa Terpadu", semester: "7", prodi: "PWK" },

  // --- AGRIBISNIS ---
  { no: 1, kode: "AS210101", nama: "Pendidikan Agama Islam", semester: "1", prodi: "Agribisnis" },
  { no: 2, kode: "AS210102", nama: "Pendidikan Pancasila", semester: "1", prodi: "Agribisnis" },
  { no: 3, kode: "AS211101", nama: "Dasar-dasar Ekologi Pertanian", semester: "1", prodi: "Agribisnis" },
  { no: 4, kode: "AS210107", nama: "Bahasa Inggris", semester: "1", prodi: "Agribisnis" },
  { no: 5, kode: "AS211102", nama: "Sosiologi Pedesaan", semester: "1", prodi: "Agribisnis" },
  { no: 6, kode: "AS211103", nama: "Biologi Pertanian", semester: "1", prodi: "Agribisnis" },
  { no: 7, kode: "AS211104", nama: "Pengantar Ilmu Pertanian", semester: "1", prodi: "Agribisnis" },
  { no: 8, kode: "AS211105", nama: "Matematik Ekonomi", semester: "1", prodi: "Agribisnis" },
  { no: 9, kode: "AS211106", nama: "Pengantar Ilmu Ekonomi", semester: "1", prodi: "Agribisnis" },
  { no: 10, kode: "AS211107", nama: "Dasar-Dasar Manajemen", semester: "1", prodi: "Agribisnis" },
  { no: 1, kode: "AS210105", nama: "Ibadah, Muamalah dan Akhlak", semester: "2", prodi: "Agribisnis" },
  { no: 2, kode: "AS210103", nama: "Pendidikan Kewarganegaraan", semester: "2", prodi: "Agribisnis" },
  { no: 3, kode: "AS210104", nama: "Bahasa Indonesia", semester: "2", prodi: "Agribisnis" },
  { no: 4, kode: "AS212101", nama: "Statistik Ekonomi dan Bisnis", semester: "2", prodi: "Agribisnis" },
  { no: 5, kode: "AS212102", nama: "Agroklimatologi", semester: "2", prodi: "Agribisnis" },
  { no: 6, kode: "AS212103", nama: "Dasar-dasar Akuntansi", semester: "2", prodi: "Agribisnis" },
  { no: 7, kode: "AS210108", nama: "Literasi Data dan Teknologi", semester: "2", prodi: "Agribisnis" },
  { no: 8, kode: "AS212104", nama: "Ekonomi Pertanian", semester: "2", prodi: "Agribisnis" },
  { no: 9, kode: "AS212105", nama: "Metoda dan Penulisan Ilmiah", semester: "2", prodi: "Agribisnis" },
  { no: 1, kode: "AS210106", nama: "Islam dan Keilmuan", semester: "3", prodi: "Agribisnis" },
  { no: 2, kode: "AS213101", nama: "Dasar-dasar Agronomi", semester: "3", prodi: "Agribisnis" },
  { no: 3, kode: "AS213102", nama: "Dasar-dasar Perlindungan Tanaman", semester: "3", prodi: "Agribisnis" },
  { no: 4, kode: "AS213103", nama: "Dasar-dasar Ilmu Tanah", semester: "3", prodi: "Agribisnis" },
  { no: 5, kode: "AS213104", nama: "Manajemen Agribisnis", semester: "3", prodi: "Agribisnis" },
  { no: 6, kode: "AS213105", nama: "Ekonomi Mikro", semester: "3", prodi: "Agribisnis" },
  { no: 7, kode: "AS213106", nama: "Manajemen Alat dan Mesin Pertanian", semester: "3", prodi: "Agribisnis" },
  { no: 8, kode: "AS210109", nama: "Dasar-Dasar Kewirausahaan", semester: "3", prodi: "Agribisnis" },
  { no: 1, kode: "AS214101", nama: "Teknologi Produksi Tanaman Perkebunan", semester: "4", prodi: "Agribisnis" },
  { no: 2, kode: "AS214102", nama: "Teknologi Produksi Tanaman Makanan", semester: "4", prodi: "Agribisnis" },
  { no: 3, kode: "AS214103", nama: "Teknologi Produksi Tanaman Hortikultura", semester: "4", prodi: "Agribisnis" },
  { no: 4, kode: "AS214104", nama: "Ekonomi Sumber Daya Alam", semester: "4", prodi: "Agribisnis" },
  { no: 5, kode: "AS214105", nama: "Pembiayaan Agribisnis", semester: "4", prodi: "Agribisnis" },
  { no: 6, kode: "AS214106", nama: "Manajemen Usahatani", semester: "4", prodi: "Agribisnis" },
  { no: 7, kode: "AS214107", nama: "Ekonomi Makro", semester: "4", prodi: "Agribisnis" },
  { no: 8, kode: "AS214108", nama: "Ekonomi Produksi", semester: "4", prodi: "Agribisnis" },
  { no: 1, kode: "AS215101", nama: "Metoda Penelitian Sosial Ekonomi", semester: "5", prodi: "Agribisnis" },
  { no: 2, kode: "AS215102", nama: "Ekonomi Manajerial", semester: "5", prodi: "Agribisnis" },
  { no: 3, kode: "AS215103", nama: "Pembangunan dan Kebijakan Agribisnis", semester: "5", prodi: "Agribisnis" },
  { no: 4, kode: "AS215104", nama: "Manajemen Strategis", semester: "5", prodi: "Agribisnis" },
  { no: 5, kode: "AS215105", nama: "Manajemen Produksi dan Operasi Agribisnis", semester: "5", prodi: "Agribisnis" },
  { no: 6, kode: "AS215106", nama: "Pemasaran Agribisnis", semester: "5", prodi: "Agribisnis" },
  { no: 7, kode: "AS215107", nama: "Manajemen Agroindustri", semester: "5", prodi: "Agribisnis" },
  { no: 8, kode: "AS215108", nama: "Manajemen Perbankan Syari'ah", semester: "5", prodi: "Agribisnis" },
  { no: 1, kode: "AS216101", nama: "Perencanaan dan Evaluasi Proyek Agribisnis", semester: "6", prodi: "Agribisnis" },
  { no: 2, kode: "AS216102", nama: "Ekonometrika", semester: "6", prodi: "Agribisnis" },
  { no: 3, kode: "AS216103", nama: "Manajemen Keuangan Agribisnis", semester: "6", prodi: "Agribisnis" },
  { no: 4, kode: "AS216104", nama: "Perdagangan Internasional", semester: "6", prodi: "Agribisnis" },
  { no: 5, kode: "AS216105", nama: "Koperasi dan UMKM Agribisnis", semester: "6", prodi: "Agribisnis" },
  { no: 6, kode: "AS216106", nama: "Penyuluhan dan Sistem Informasi Agribisnis", semester: "6", prodi: "Agribisnis" },
  { no: 7, kode: "AS216107", nama: "Manajemen Perkebunan", semester: "6", prodi: "Agribisnis" },
  { no: 8, kode: "AS216108", nama: "Manajemen Pemasaran", semester: "6", prodi: "Agribisnis" },
  { no: 1, kode: "AS217201", nama: "Kebijakan dan Ketahanan Pangan", semester: "7", prodi: "Agribisnis" },
  { no: 2, kode: "AS217202", nama: "Akuntansi Manajemen", semester: "7", prodi: "Agribisnis" },
  { no: 3, kode: "AS217203", nama: "Bisnis Plan", semester: "7", prodi: "Agribisnis" },
  { no: 4, kode: "AS217204", nama: "Komunikasi dan Etika Bisnis", semester: "7", prodi: "Agribisnis" },
  { no: 5, kode: "AS217205", nama: "Perencanaan dan Pengembangan Wilayah", semester: "7", prodi: "Agribisnis" },
  { no: 6, kode: "AS217206", nama: "Manajemen Pengendalian Mutu", semester: "7", prodi: "Agribisnis" },
  { no: 7, kode: "AS217207", nama: "Analisis Harga Agribisnis", semester: "7", prodi: "Agribisnis" },
  { no: 8, kode: "AS217208", nama: "Analisis Keputusan Agribisnis", semester: "7", prodi: "Agribisnis" },
  { no: 9, kode: "AS217209", nama: "Kelembagaan Agribisnis", semester: "7", prodi: "Agribisnis" },
  { no: 10, kode: "AS217210", nama: "Sistem Pertanian Berkelanjutan", semester: "7", prodi: "Agribisnis" },
  { no: 11, kode: "AS217211", nama: "Pemasaran Digital Agribisnis", semester: "7", prodi: "Agribisnis" },
  { no: 12, kode: "AS217212", nama: "Teori Organisasi dan Kepemimpinan", semester: "7", prodi: "Agribisnis" },
  { no: 13, kode: "AS217213", nama: "Pemberdayaan Masyarakat", semester: "7", prodi: "Agribisnis" },
  { no: 14, kode: "AS217214", nama: "Perilaku Konsumen", semester: "7", prodi: "Agribisnis" },
  { no: 15, kode: "AS217215", nama: "Praktek Kerja Lapangan", semester: "7", prodi: "Agribisnis" },

  // --- AGROTEKNOLOGI ---
  { no: 1, kode: "AT210101", nama: "Pendidikan Agama Islam", semester: "1", prodi: "Agroteknologi" },
  { no: 2, kode: "AT210102", nama: "Pendidikan Pancasila", semester: "1", prodi: "Agroteknologi" },
  { no: 3, kode: "AT210103", nama: "Pendidikan Kewarganegaraan", semester: "1", prodi: "Agroteknologi" },
  { no: 4, kode: "AT210104", nama: "Bahasa Indonesia", semester: "1", prodi: "Agroteknologi" },
  { no: 5, kode: "AT211101", nama: "Kimia Pertanian", semester: "1", prodi: "Agroteknologi" },
  { no: 6, kode: "AT211102", nama: "Matematika Statistik", semester: "1", prodi: "Agroteknologi" },
  { no: 7, kode: "AT211103", nama: "Biologi Pertanian", semester: "1", prodi: "Agroteknologi" },
  { no: 8, kode: "AT211104", nama: "Pengantar Ilmu Pertanian", semester: "1", prodi: "Agroteknologi" },
  { no: 9, kode: "AT210108", nama: "Literasi Data dan Teknologi", semester: "1", prodi: "Agroteknologi" },
  { no: 1, kode: "AT210105", nama: "Ibadah, Muamalah dan Akhlak", semester: "2", prodi: "Agroteknologi" },
  { no: 2, kode: "AT210107", nama: "Bahasa Inggris", semester: "2", prodi: "Agroteknologi" },
  { no: 3, kode: "AT212105", nama: "Ekonomi Pertanian", semester: "2", prodi: "Agroteknologi" },
  { no: 4, kode: "AT212106", nama: "Biokimia Pertanian", semester: "2", prodi: "Agroteknologi" },
  { no: 5, kode: "AT212107", nama: "Agroklimatologi", semester: "2", prodi: "Agroteknologi" },
  { no: 6, kode: "AT212108", nama: "Dasar-dasar Ekologi Pertanian", semester: "2", prodi: "Agroteknologi" },
  { no: 7, kode: "AT212109", nama: "Dasar-Dasar Agroteknologi", semester: "2", prodi: "Agroteknologi" },
  { no: 8, kode: "AT210109", nama: "Dasar-dasar kewirausahaan", semester: "2", prodi: "Agroteknologi" },
  { no: 1, kode: "AT210106", nama: "Islam dan Keilmuan (Pertanian)", semester: "3", prodi: "Agroteknologi" },
  { no: 2, kode: "AT213110", nama: "Dasar-Dasar Fisiologi Tumbuhan", semester: "3", prodi: "Agroteknologi" },
  { no: 3, kode: "AT213111", nama: "Dasar-Dasar Ilmu Tanah", semester: "3", prodi: "Agroteknologi" },
  { no: 4, kode: "AT213112", nama: "Hidrologi Pertanian", semester: "3", prodi: "Agroteknologi" },
  { no: 5, kode: "AT213113", nama: "Genetika Tanaman", semester: "3", prodi: "Agroteknologi" },
  { no: 6, kode: "AT213114", nama: "Mikrobiologi Pertanian", semester: "3", prodi: "Agroteknologi" },
  { no: 7, kode: "AT213115", nama: "Mekanisasi Pertanian", semester: "3", prodi: "Agroteknologi" },
  { no: 1, kode: "AT214116", nama: "Teknologi Produksi Tanaman Perkebunan I", semester: "4", prodi: "Agroteknologi" },
  { no: 2, kode: "AT214117", nama: "Teknologi Produksi Tanaman Pangan I", semester: "4", prodi: "Agroteknologi" },
  { no: 3, kode: "AT214118", nama: "Teknologi Produksi Tanaman Hortikultura I", semester: "4", prodi: "Agroteknologi" },
  { no: 4, kode: "AT214119", nama: "Dasar-dasar Perlindungan Tanaman", semester: "4", prodi: "Agroteknologi" },
  { no: 5, kode: "AT214120", nama: "Metode Penelitian", semester: "4", prodi: "Agroteknologi" },
  { no: 6, kode: "AT214121", nama: "Bioteknologi Pertanian", semester: "4", prodi: "Agroteknologi" },
  { no: 7, kode: "AT214122", nama: "Perancangan Percobaan", semester: "4", prodi: "Agroteknologi" },
  { no: 1, kode: "AT215123", nama: "Manajemen Produksi", semester: "5", prodi: "Agroteknologi" },
  { no: 2, kode: "AT215124", nama: "Ekologi Tanaman", semester: "5", prodi: "Agroteknologi" },
  { no: 3, kode: "AT215125", nama: "Lahan Marginal dan Teknologi Pengelolaannya", semester: "5", prodi: "Agroteknologi" },
  { no: 4, kode: "AT215126", nama: "Teknologi Benih", semester: "5", prodi: "Agroteknologi" },
  { no: 5, kode: "AT215127", nama: "Pengendalian Terpadu", semester: "5", prodi: "Agroteknologi" },
  { no: 1, kode: "AT216128", nama: "Fisiologi Pertumbuhan dan Perkembangan Tanaman", semester: "6", prodi: "Agroteknologi" },
  { no: 2, kode: "AT216129", nama: "Sistem Pertanian Berkelanjutan", semester: "6", prodi: "Agroteknologi" },
  { no: 3, kode: "AT216130", nama: "Teknologi Kesuburan Tanah", semester: "6", prodi: "Agroteknologi" },
  { no: 4, kode: "AT216131", nama: "Pestisida dan Teknik Aplikasinya", semester: "6", prodi: "Agroteknologi" },
  { no: 5, kode: "AT216132", nama: "Penyuluhan dan Sistem Informasi Pertanian", semester: "6", prodi: "Agroteknologi" },
  { no: 6, kode: "AT216133", nama: "Pemuliaan Tanaman", semester: "6", prodi: "Agroteknologi" },
  { no: 1, kode: "AT217134", nama: "Evaluasi Kesesuaian Lahan", semester: "7", prodi: "Agroteknologi" },
  { no: 2, kode: "AT217135", nama: "Teknologi Pasca Panen", semester: "7", prodi: "Agroteknologi" },
  { no: 3, kode: "AT217136", nama: "Manajemen Agribisnis", semester: "7", prodi: "Agroteknologi" },
  { no: 4, kode: "AT217137", nama: "Agroforestri", semester: "7", prodi: "Agroteknologi" },
  { no: 5, kode: "AT217138", nama: "Kultur Jaringan", semester: "7", prodi: "Agroteknologi" },
  { no: 1, kode: "AT215201", nama: "Teknologi Produksi Tanaman Perkebunan II", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 2, kode: "AT215202", nama: "Teknologi Produksi Tanaman Pangan II", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 3, kode: "AT215203", nama: "Teknologi Produksi Tanaman Hortikultura II", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 4, kode: "AT216204", nama: "Sosiologi Pedesaan", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 5, kode: "AT216205", nama: "Ketahanan Pangan", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 6, kode: "AT216206", nama: "PKL", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 7, kode: "AT217207", nama: "Teknologi Pangan", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 8, kode: "AT217208", nama: "Pertamanan", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 9, kode: "AT217209", nama: "Pengelolaan perkebunan", semester: "Pilihan", prodi: "Agroteknologi" },
  { no: 10, kode: "AT217210", nama: "Dasar-dasar Manajemen", semester: "Pilihan", prodi: "Agroteknologi" },

  // --- MESIN ---
  { no: 1, kode: "TM210104", nama: "Bahasa Indonesia", semester: "1", prodi: "Mesin" },
  { no: 2, kode: "TM213119", nama: "Termodinamika 1", semester: "1", prodi: "Mesin" },
  { no: 3, kode: "TM213120", nama: "Mekanika Kekuatan Material", semester: "1", prodi: "Mesin" },
  { no: 4, kode: "TM213124", nama: "Praktikum Termofluida 1", semester: "1", prodi: "Mesin" },
  { no: 5, kode: "TM213123", nama: "Perpindahan Kalor dan Massa 1", semester: "1", prodi: "Mesin" },
  { no: 6, kode: "TM213121", nama: "Mekanika Fluida 1", semester: "1", prodi: "Mesin" },
  { no: 7, kode: "TM213118", nama: "Kinematika", semester: "1", prodi: "Mesin" },
  { no: 8, kode: "TM213122", nama: "Matematika 3", semester: "1", prodi: "Mesin" },
  { no: 1, kode: "TM212116", nama: "Praktikum Fisika 2", semester: "2", prodi: "Mesin" },
  { no: 2, kode: "TM212114", nama: "Material Teknik 2", semester: "2", prodi: "Mesin" },
  { no: 3, kode: "TM212110", nama: "Matematika 2", semester: "2", prodi: "Mesin" },
  { no: 4, kode: "TM212112", nama: "Ilmu Hayat", semester: "2", prodi: "Mesin" },
  { no: 5, kode: "TM212115", nama: "Praktikum CAD", semester: "2", prodi: "Mesin" },
  { no: 6, kode: "TM210105", nama: "Ibadah dan Muamalah", semester: "2", prodi: "Mesin" },
  { no: 7, kode: "TM210107", nama: "Bahasa Inggris", semester: "2", prodi: "Mesin" },
  { no: 8, kode: "TM212117", nama: "Praktikum Material Teknik", semester: "2", prodi: "Mesin" },
  { no: 9, kode: "TM212111", nama: "Fisika 2", semester: "2", prodi: "Mesin" },
  { no: 10, kode: "TM212109", nama: "Statika Struktur", semester: "2", prodi: "Mesin" },
  { no: 11, kode: "TM212113", nama: "Menggambar Mesin dan CAD", semester: "2", prodi: "Mesin" },

  // --- PERMINYAKAN ---
  { no: 1, kode: "TP213122", nama: "Fluida Reservoir", semester: "3", prodi: "Perminyakan" },
  { no: 2, kode: "TP213117", nama: "Statistika dan Probabilistik", semester: "3", prodi: "Perminyakan" },
  { no: 3, kode: "TP213116", nama: "Termodinamika", semester: "3", prodi: "Perminyakan" },
  { no: 4, kode: "TP213123", nama: "Praktikum Fluida Reservoir", semester: "3", prodi: "Perminyakan" },
  { no: 5, kode: "TP210102", nama: "Pendidikan Pancasila", semester: "3", prodi: "Perminyakan" },
  { no: 6, kode: "TP213118", nama: "Praktikum Statistika dan Probabilistik", semester: "3", prodi: "Perminyakan" },
  { no: 7, kode: "TP213119", nama: "Algoritma dan Struktur Data", semester: "3", prodi: "Perminyakan" },
  { no: 8, kode: "TP213120", nama: "Praktikum Algoritma dan Struktur Data", semester: "3", prodi: "Perminyakan" },
  { no: 9, kode: "TP213121", nama: "Mekanika Kekuatan Material", semester: "3", prodi: "Perminyakan" },
  { no: 10, kode: "TP213115", nama: "Persamaan Diferensial Parsial Teknik Perminyakan", semester: "3", prodi: "Perminyakan" },
  { no: 1, kode: "TP214130", nama: "Praktikum Teknik Pemboran I", semester: "4", prodi: "Perminyakan" },
  { no: 2, kode: "TP214132", nama: "Praktikum Fasilitas Produksi Permukaan", semester: "4", prodi: "Perminyakan" },
  { no: 3, kode: "TP214126", nama: "Petrofisika", semester: "4", prodi: "Perminyakan" },
  { no: 4, kode: "TP214128", nama: "Geologi Minyak dan Gas Bumi", semester: "4", prodi: "Perminyakan" },
  { no: 5, kode: "TP214127", nama: "Praktikum Petrofisika", semester: "4", prodi: "Perminyakan" },
  { no: 6, kode: "TP214131", nama: "Fasilitas Produksi Permukaan", semester: "4", prodi: "Perminyakan" },
  { no: 7, kode: "TP210106", nama: "Islam dan Keilmuan", semester: "4", prodi: "Perminyakan" },
  { no: 8, kode: "TP214125", nama: "Metode Numerik Teknik Perminyakan", semester: "4", prodi: "Perminyakan" },
  { no: 9, kode: "TP214129", nama: "Teknik Pemboran I", semester: "4", prodi: "Perminyakan" },
  { no: 10, kode: "TP214124", nama: "Mekanika Fluida", semester: "4", prodi: "Perminyakan" },
  { no: 1, kode: "TP215134", nama: "Evaluasi Formasi", semester: "5", prodi: "Perminyakan" },
  { no: 2, kode: "TP215136", nama: "Pengujian Sumur", semester: "5", prodi: "Perminyakan" },
  { no: 3, kode: "TP210103", nama: "Pendidikan Kewarganegaraan", semester: "5", prodi: "Perminyakan" },
  { no: 4, kode: "TP215133", nama: "Teknik Reservoir", semester: "5", prodi: "Perminyakan" },
  { no: 5, kode: "TP215140", nama: "Teknik Produksi", semester: "5", prodi: "Perminyakan" },
  { no: 6, kode: "TP215137", nama: "Teknik Pemboran II", semester: "5", prodi: "Perminyakan" },
  { no: 7, kode: "TP215139", nama: "Teknik Komplesi dan Kerja Ulang Sumur", semester: "5", prodi: "Perminyakan" },
  { no: 8, kode: "TP215135", nama: "Praktikum Evaluasi Formasi", semester: "5", prodi: "Perminyakan" },
  { no: 9, kode: "TP215138", nama: "Praktikum Teknik Pemboran II", semester: "5", prodi: "Perminyakan" },
  { no: 1, kode: "TP216144", nama: "Metode Pengangkatan Buatan", semester: "6", prodi: "Perminyakan" },
  { no: 2, kode: "TP216141", nama: "Etika Keteknikan", semester: "6", prodi: "Perminyakan" },
  { no: 3, kode: "TP210105", nama: "Ibadah dan Muamalah", semester: "6", prodi: "Perminyakan" },
  { no: 4, kode: "TP216143", nama: "Teknik Gas Bumi", semester: "6", prodi: "Perminyakan" },
  { no: 5, kode: "TP216146", nama: "Manajemen Keekonomian Proyek Migas", semester: "6", prodi: "Perminyakan" },
  { no: 6, kode: "TP216145", nama: "Stimulasi Sumur", semester: "6", prodi: "Perminyakan" },
  { no: 7, kode: "TP210258", nama: "Teknik Pemboran Horizontal", semester: "6", prodi: "Perminyakan" },
  { no: 8, kode: "TP216142", nama: "Proses Peningkatan Perolehan Minyak", semester: "6", prodi: "Perminyakan" },
  { no: 9, kode: "TP210264", nama: "Optimasi Operasi Migas", semester: "6", prodi: "Perminyakan" },
  { no: 1, kode: "STP2547145", nama: "Problematika Produksi", semester: "7", prodi: "Perminyakan" },
  { no: 2, kode: "STP2547146", nama: "Karakterisasi dan Pemodelan Reservoir", semester: "7", prodi: "Perminyakan" },
  { no: 3, kode: "STP2547149", nama: "Manajemen Lingkungan dan Keberlanjutan di Industri Migas dan Panas Bumi", semester: "7", prodi: "Perminyakan" },
  { no: 4, kode: "STP2547144", nama: "Rekayasa Dekarbonisasi Energi Fosil", semester: "7", prodi: "Perminyakan" },
  { no: 5, kode: "STP2540150", nama: "Kerja Praktek", semester: "7", prodi: "Perminyakan" },
  { no: 6, kode: "STP2540147", nama: "Studi Terarah", semester: "7", prodi: "Perminyakan" }
];

// ============================================================================
// FACULTY-PRODI MAPPING
// ============================================================================

/**
 * Mapping Program Studi ke Fakultas
 * Digunakan untuk sistem cascade dropdown: Fakultas → Prodi
 */
export const facultyMapping: Record<string, string> = {
  'Informatika': 'Fakultas Teknik',
  'Sipil': 'Fakultas Teknik',
  'Geologi': 'Fakultas Teknik',
  'Mesin': 'Fakultas Teknik',
  'Perminyakan': 'Fakultas Teknik',
  'Ilmu Komunikasi': 'Fakultas Ilmu Sosial dan Ilmu Politik',
  'PWK': 'Fakultas Teknik',
  'Agribisnis': 'Fakultas Pertanian',
  'Agroteknologi': 'Fakultas Pertanian',
};

/**
 * Mapping nama prodi lama ke nama prodi baru
 * Untuk backward compatibility dengan data user lama di localStorage
 * 
 * 🔄 SUPABASE: Bisa dihapus setelah migrasi, karena data akan clean di database
 */
export const prodiNameMapping: Record<string, string> = {
  'Teknik Informatika': 'Informatika',
  'Teknik Sipil': 'Sipil',
  'Teknik Geologi': 'Geologi',
  'Teknik Mesin': 'Mesin',
  'Teknik Perminyakan': 'Perminyakan',
  'Perencanaan Wilayah dan Kota': 'PWK',
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Normalize nama prodi untuk backward compatibility
 * Converts old prodi names (e.g., "Teknik Informatika") to new names ("Informatika")
 * 
 * @param prodi - Nama program studi
 * @returns Normalized nama prodi
 */
export const normalizeProdiName = (prodi: string): string => {
  return prodiNameMapping[prodi] || prodi;
};

/**
 * Get fakultas by program studi
 * 
 * @param prodi - Nama program studi
 * @returns Nama fakultas
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('courses')
 *   .select('faculty')
 *   .eq('prodi', prodi)
 *   .limit(1)
 *   .single()
 */
export const getFacultyByProdi = (prodi: string): string => {
  const normalizedProdi = normalizeProdiName(prodi);
  return facultyMapping[normalizedProdi] || 'Fakultas Teknik';
};

/**
 * Get list of all program studi
 * 
 * @returns Array of unique prodi names
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('courses')
 *   .select('prodi')
 *   .order('prodi')
 */
export const getProdiList = (): string[] => {
  const prodis = new Set(allCourses.map(course => course.prodi));
  return Array.from(prodis).sort();
};

/**
 * Get list of all fakultas
 * 
 * @returns Array of unique fakultas names
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('courses')
 *   .select('faculty')
 *   .order('faculty')
 */
export const getFacultyList = (): string[] => {
  const faculties = new Set(Object.values(facultyMapping));
  return Array.from(faculties).sort();
};

/**
 * Get list of prodi by fakultas (cascade filter)
 * 
 * @param faculty - Nama fakultas
 * @returns Array of prodi names dalam fakultas tersebut
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('courses')
 *   .select('prodi')
 *   .eq('faculty', faculty)
 *   .order('prodi')
 */
export const getProdiByFaculty = (faculty: string): string[] => {
  const prodis = Object.entries(facultyMapping)
    .filter(([prodi, fac]) => fac === faculty)
    .map(([prodi, fac]) => prodi);
  return prodis.sort();
};

/**
 * Get courses by program studi
 * 
 * @param prodi - Nama program studi
 * @returns Array of courses untuk prodi tersebut
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('courses')
 *   .select('*')
 *   .eq('prodi', prodi)
 *   .order('semester', { ascending: true })
 */
export const getCoursesByProdi = (prodi: string): Course[] => {
  const normalizedProdi = normalizeProdiName(prodi);
  return allCourses.filter(course => course.prodi === normalizedProdi);
};

/**
 * Get courses by program studi and semester (cascade filter)
 * 
 * @param prodi - Nama program studi
 * @param semester - Semester (1-7 atau "Pilihan")
 * @returns Array of courses untuk prodi dan semester tersebut
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('courses')
 *   .select('*')
 *   .eq('prodi', prodi)
 *   .eq('semester', semester)
 *   .order('code')
 */
export const getCoursesBySemester = (prodi: string, semester: string): Course[] => {
  const normalizedProdi = normalizeProdiName(prodi);
  return allCourses.filter(
    course => course.prodi === normalizedProdi && course.semester === semester
  );
};

/**
 * Get list of semesters available for a program studi
 * 
 * @param prodi - Nama program studi
 * @returns Array of semester numbers sorted
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('courses')
 *   .select('semester')
 *   .eq('prodi', prodi)
 *   .order('semester')
 */
export const getSemestersByProdi = (prodi: string): string[] => {
  const normalizedProdi = normalizeProdiName(prodi);
  const semesters = new Set(
    allCourses
      .filter(course => course.prodi === normalizedProdi)
      .map(course => course.semester)
  );
  return Array.from(semesters).sort((a, b) => {
    if (a === 'Pilihan') return 1;
    if (b === 'Pilihan') return -1;
    return parseInt(a) - parseInt(b);
  });
};

/**
 * Search courses by query string
 * 
 * @param query - Search query (course code or name)
 * @param prodi - Optional prodi filter
 * @returns Array of matching courses
 * 
 * 🔄 SUPABASE: Replace dengan full-text search
 * const { data } = await supabase
 *   .from('courses')
 *   .select('*')
 *   .or(`code.ilike.%${query}%,name.ilike.%${query}%`)
 *   .eq('prodi', prodi) // if provided
 */
export const searchCourses = (query: string, prodi?: string): Course[] => {
  const lowerQuery = query.toLowerCase();
  return allCourses.filter(course => {
    const matchesProdi = !prodi || course.prodi === prodi;
    const matchesQuery = 
      course.kode.toLowerCase().includes(lowerQuery) ||
      course.nama.toLowerCase().includes(lowerQuery);
    return matchesProdi && matchesQuery;
  });
};
