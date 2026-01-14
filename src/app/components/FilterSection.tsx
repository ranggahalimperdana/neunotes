import { Filter, X } from 'lucide-react';
// Import tipe data dari api.ts agar TypeScript mengenali strukturnya
import { Faculty, Prodi, Semester } from '../services/api';

/* =============================================================================
   KAMUS DATA (JANGAN DIUBAH BAGIAN INI YA)
   Ini biar komputer ngerti data apa aja yang bakal masuk ke kotak filter.
   =============================================================================
*/
interface FilterSectionProps {
  selectedFaculty: string;
  selectedProdi: string;
  selectedSemester: string;
  
  onFacultyChange: (facultyId: string) => void;
  onProdiChange: (prodiId: string) => void;
  onSemesterChange: (semesterId: string) => void;
  onClearFilters: () => void;

  // Data List dari Database
  faculties?: Faculty[];
  prodiList?: Prodi[];
  semesters?: Semester[];
}

/* =============================================================================
   TAMPILAN KOTAK FILTER
   Di sini tempat kamu bisa ubah warna, garis, dan bentuk kotaknya.
   =============================================================================
*/
export default function FilterSection({
  selectedFaculty,
  selectedProdi,
  selectedSemester,
  onFacultyChange,
  onProdiChange,
  onSemesterChange,
  onClearFilters,
  faculties = [], 
  prodiList = [], 
  semesters = []
}: FilterSectionProps) {
  
  const hasActiveFilters = selectedFaculty || selectedProdi || selectedSemester;

  return (
    // KOTAK PEMBUNGKUS UTAMA (Kotak Putih Besar)
    <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-12 font-mono relative z-10 rounded-2xl overflow-hidden">
      
      {/* HEADER (Judul Filter - Warna Kuning) */}
      {/* Ganti 'bg-[#FBBC05]' kalau mau ubah warna latar judul */}
      <div className="flex items-center justify-between p-6 border-b-2 border-black bg-[#FBBC05]">
        <div className="flex items-center gap-3">
          {/* Ikon Filter di dalam kotak hitam */}
          <div className="bg-black p-1.5 rounded-lg shadow-sm">
            <Filter className="w-5 h-5 text-white" />
          </div>
          {/* Tulisan Judul */}
          <h3 className="font-black text-black text-xl uppercase tracking-tight">Filter Mata Kuliah</h3>
        </div>
        
        {/* Tombol BERSIHKAN (Cuma muncul kalau ada yang dipilih) */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            // Warna tombol saat disorot mouse: 'hover:bg-[#EA4335]' (Merah)
            className="group flex items-center gap-2 text-sm font-bold text-black bg-white hover:text-white hover:bg-[#EA4335] px-4 py-2 border-2 border-black transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none rounded-lg"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
            BERSIHKAN
          </button>
        )}
      </div>

      <div className="p-8">
        {/* GRID DROPDOWN (Susunan Kotak Pilihan) */}
        {/* 'grid-cols-3' artinya ada 3 kolom ke samping. Kalau mau 2, ganti jadi 'grid-cols-2' */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* ==============================================================
              1. PILIHAN FAKULTAS (Kotak Biru)
             ============================================================== */}
          <div className="group">
            {/* Label tulisan di atas kotak */}
            <label className="block text-sm font-black text-black mb-3 uppercase group-hover:text-[#4285F4] transition-colors">
              Fakultas
            </label>
            <div className="relative">
              <select
                value={selectedFaculty}
                onChange={(e) => onFacultyChange(e.target.value)}
                // Warna garis fokus: 'focus:border-[#4285F4]' (Biru)
                className="w-full px-4 py-4 border-2 border-black bg-white font-bold focus:outline-none focus:bg-[#4285F4]/5 focus:border-[#4285F4] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] appearance-none cursor-pointer rounded-xl transition-all hover:-translate-y-0.5"
              >
                <option value="">SEMUA FAKULTAS</option>
                {/* Daftar Fakultas dari Database */}
                {faculties.map((f) => (
                  <option key={f.id_faculty} value={f.id_faculty}>
                    {f.faculty_name}
                  </option>
                ))}
              </select>
              {/* Panah di kanan (Warna Biru 'bg-[#4285F4]') */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white border-l-2 border-black bg-[#4285F4] rounded-r-[10px]">
                <svg className="fill-current h-4 w-4 transform group-hover:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ==============================================================
              2. PILIHAN PRODI (Kotak Merah)
             ============================================================== */}
          <div className="group">
            {/* Label tulisan */}
            <label className={`block text-sm font-black text-black mb-3 uppercase transition-colors ${selectedFaculty ? 'group-hover:text-[#EA4335]' : 'opacity-50'}`}>
              Program Studi
            </label>
            <div className="relative">
              <select
                value={selectedProdi}
                onChange={(e) => onProdiChange(e.target.value)}
                disabled={!selectedFaculty} // Matikan kalau fakultas belum dipilih
                // Warna garis fokus: 'focus:border-[#EA4335]' (Merah)
                className="w-full px-4 py-4 border-2 border-black bg-white font-bold focus:outline-none focus:bg-[#EA4335]/5 focus:border-[#EA4335] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] appearance-none disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none disabled:border-gray-300 cursor-pointer rounded-xl transition-all hover:-translate-y-0.5"
              >
                <option value="">
                  {selectedFaculty ? 'SEMUA PROGRAM STUDI' : 'PILIH FAKULTAS DULU'}
                </option>
                {/* Daftar Prodi dari Database */}
                {prodiList.map((p) => (
                  <option key={p.id_prodi} value={p.id_prodi}>
                    {p.prodi_name}
                  </option>
                ))}
              </select>
              {/* Panah di kanan (Warna Merah 'bg-[#EA4335]') */}
              <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 border-l-2 border-black rounded-r-[10px] text-white transition-colors ${!selectedFaculty ? 'bg-gray-300 border-gray-300' : 'bg-[#EA4335]'}`}>
                <svg className="fill-current h-4 w-4 transform group-hover:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* ==============================================================
              3. PILIHAN SEMESTER (Kotak Hijau)
             ============================================================== */}
          <div className="group">
            {/* Label tulisan */}
            <label className="block text-sm font-black text-black mb-3 uppercase group-hover:text-[#34A853] transition-colors">
              Semester
            </label>
            <div className="relative">
              <select
                value={selectedSemester}
                onChange={(e) => onSemesterChange(e.target.value)}
                // Warna garis fokus: 'focus:border-[#34A853]' (Hijau)
                className="w-full px-4 py-4 border-2 border-black bg-white font-bold focus:outline-none focus:bg-[#34A853]/5 focus:border-[#34A853] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] appearance-none cursor-pointer rounded-xl transition-all hover:-translate-y-0.5"
              >
                <option value="">SEMUA SEMESTER</option>
                {/* Daftar Semester dari Database */}
                {semesters.map((s) => (
                  <option key={s.id_semester} value={s.id_semester}>
                    {s.semester_name}
                  </option>
                ))}
              </select>
              {/* Panah di kanan (Warna Hijau 'bg-[#34A853]') */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-white border-l-2 border-black bg-[#34A853] rounded-r-[10px]">
                <svg className="fill-current h-4 w-4 transform group-hover:rotate-180 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}