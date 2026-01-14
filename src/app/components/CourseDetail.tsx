import { useEffect, useState } from 'react';
//  Ini gudang ikon (gambar kecil kayak panah, mata, unduhan, dll)
import { ArrowLeft, Search, FileText, Download, Eye, Image, User, Calendar, Loader2, BookOpen } from 'lucide-react';
//  Ini kabel data buat ngambil catatan dari database
import { masterService, Course } from '../services/api';

//  CETAKAN DATA (Bentuk data catatan harus seperti ini)
interface Note {
  id: string;
  title: string;
  description: string;
  fileType: 'PDF' | 'IMG';
  fileUrl: string;
  createdAt: string;
  uploaderName: string;
  uploaderImage?: string; // Foto profil pengupload
  downloadCount: number;
}

interface CourseDetailProps {
  course: Course | null; // Data mata kuliah yang dipilih
  onBack: () => void;    // Tombol buat balik ke halaman sebelumnya
}

export default function CourseDetail({ course, onBack }: CourseDetailProps) {
  
  //  INGATAN SEMENTARA (STATE)
  // Tempat menyimpan data biar bisa muncul di layar
  const [notes, setNotes] = useState<Note[]>([]);     // Daftar catatan yang diambil
  const [loading, setLoading] = useState(true);       // Status "Lagi loading gak?"
  const [searchQuery, setSearchQuery] = useState(''); // Apa yang diketik di kotak pencarian
  const [downloadingId, setDownloadingId] = useState<string | null>(null); // Catat file mana yang lagi didownload

  //  ROBOT PENGAMBIL DATA (EFFECT)
  // Jalan otomatis pas halaman dibuka atau mata kuliah berubah
  useEffect(() => {
    const loadNotes = async () => {
      if (course) {
        setLoading(true); // Nyalain loading...
        try {
          // Panggil pasukan data dari server
          const data = await masterService.getNotesByCourse(course.id);
          setNotes(data);
        } catch (error) {
          console.error("Gagal memuat catatan:", error);
        } finally {
          setLoading(false); // Matiin loading (selesai)
        }
      }
    };
    loadNotes();
  }, [course]);

  //  MESIN PENYARING (FILTER)
  // Biar kalau ngetik "Kalkulus", yang muncul cuma catatan Kalkulus
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.uploaderName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //  TUKANG RAPIHIN TANGGAL
  // Ubah tanggal komputer jadi tanggal manusia (contoh: 12 Jan 2024)
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  //  FUNGSI LIHAT (PREVIEW)
  const handlePreview = (url: string) => {
    if (url) window.open(url, '_blank'); // Buka di tab baru
    else alert("File tidak tersedia.");
  };

  // ⬇ FUNGSI DOWNLOAD CANGGIH
  // Memaksa browser buat download file, bukan cuma ngebuka doang.
  const handleDownload = async (note: Note) => {
    if (!note.fileUrl) {
        alert("File tidak tersedia.");
        return;
    }

    try {
      setDownloadingId(note.id); // Kasih tanda "Lagi download nih..."

      // 1. Ambil file aslinya
      const response = await fetch(note.fileUrl);
      const blob = await response.blob();
      
      // 2. Bikin link download palsu
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // 3. Kasih nama file
      const extension = note.fileType === 'PDF' ? 'pdf' : 'jpg';
      const safeTitle = note.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      link.setAttribute('download', `${safeTitle}.${extension}`);
      
      // 4. Klik otomatis linknya
      document.body.appendChild(link);
      link.click();
      
      // 5. Bersih-bersih sampah memori
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Download error:', error);
      // Kalau gagal download canggih, buka aja di tab baru (Plan B)
      window.open(note.fileUrl, '_blank');
    } finally {
      setDownloadingId(null); // Selesai download
    }
  };

  if (!course) return null;

  // =================================================================================
  //  BAGIAN TAMPILAN (HTML) - UBAH WARNA & POSISI DI SINI!
  // =================================================================================
  return (
    <div className="min-h-screen bg-white font-mono pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- BAGIAN JUDUL ATAS (HEADER) --- */}
        <div className="pt-8 mb-12">
          
          {/* Tombol "Kembali ke Daftar" */}
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 font-bold hover:text-black mb-6 transition-colors uppercase text-sm group"
          >
            <div className="bg-gray-100 p-2 rounded-lg group-hover:bg-black group-hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> 
            </div>
            Kembali ke Daftar
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              {/* Badge Kode & Fakultas (Kotak warna-warni kecil) */}
              <div className="flex gap-2 mb-3">
                {/* Kode Matkul (Warna Hijau) -> Ganti 'bg-[#34A853]' kalau mau ubah warna */}
                <span className="bg-[#34A853] text-white px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-md">
                  {course.code}
                </span>
                {/* Fakultas (Warna Biru) -> Ganti 'bg-[#4285F4]' kalau mau ubah warna */}
                <span className="bg-[#4285F4] text-white px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-md">
                  {course.faculty || 'FAKULTAS'}
                </span>
              </div>
              
              {/* Judul Besar Mata Kuliah */}
              <h1 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tighter mb-2 leading-tight">
                {course.title}
              </h1>
              
              {/* Info Prodi (Garis Kuning di kiri) */}
              <div className="flex items-center gap-2 text-gray-600 font-bold border-l-4 border-[#FBBC05] pl-4 py-1">
                <p className="text-sm md:text-base">Mata Kuliah Program Studi {course.prodi}</p>
              </div>
            </div>

            {/* Kotak Statistik (Sebelah kanan atas) */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl text-center min-w-[200px] hover:-translate-y-1 transition-transform">
              <span className="bg-[#FBBC05] px-3 py-1 rounded-full border-2 border-black text-[10px] font-black uppercase tracking-wider">
                TOTAL DOKUMEN
              </span>
              <p className="text-6xl font-black text-black mt-3 mb-1">{notes.length}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Catatan Tersedia</p>
            </div>
          </div>
        </div>

        {/* Garis Pemisah Hitam */}
        <hr className="border-2 border-black mb-12" />

        {/* --- BAGIAN DAFTAR CATATAN --- */}
        <div>
          {/* Judul "Daftar Catatan" & Kotak Pencarian */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            <h2 className="text-2xl font-black uppercase flex items-center gap-3">
              <div className="bg-black text-white p-2 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)]">
                <BookOpen className="w-6 h-6" />
              </div>
              Daftar Catatan
            </h2>
            
            {/* Input Pencarian */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
              </div>
              <input
                type="text"
                placeholder="CARI CATATAN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-4 border-black rounded-xl font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all uppercase placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Grid Kartu-Kartu Catatan */}
          {loading ? (
            // Tampilan kalau lagi Loading...
            <div className="text-center py-20 flex flex-col items-center">
              <Loader2 className="w-12 h-12 animate-spin text-black mb-4" />
              <p className="font-bold text-gray-500 uppercase tracking-widest">Memuat materi...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            // Tampilan kalau KOSONG (Gak ada catatan)
            <div className="text-center py-20 border-4 border-black border-dashed rounded-xl bg-gray-50 flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-full border-2 border-black mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 <FileText className="w-12 h-12 text-gray-300" />
              </div>
              <p className="font-black text-gray-400 uppercase text-xl mb-1">Belum ada catatan</p>
              <p className="text-sm font-bold text-gray-400">Jadilah yang pertama berkontribusi!</p>
            </div>
          ) : (
            // Tampilan kalau ADA ISINYA (Looping Kartu)
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id} 
                  className="bg-white border-4 border-black p-5 rounded-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full group"
                >
                  {/* Header Kartu: Ikon & Tanggal */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        {/* Kotak Ikon PDF/Gambar */}
                        <div className={`p-3 border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${note.fileType === 'PDF' ? 'bg-[#EA4335]' : 'bg-[#4285F4]'}`}>
                            {note.fileType === 'PDF' ? <FileText className="w-6 h-6 text-white" /> : <Image className="w-6 h-6 text-white" />}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-0.5">Tipe File</span>
                            <span className="font-black text-lg uppercase leading-none">
                                {note.fileType === 'PDF' ? 'PDF' : 'IMG'}
                            </span>
                        </div>
                    </div>

                    {/* Tanggal Upload */}
                    <div className="flex items-center gap-1.5 border-2 border-black px-3 py-1 rounded-lg bg-gray-50">
                      <Calendar className="w-3 h-3 text-gray-500" />
                      <span className="text-[10px] font-black uppercase text-gray-600">{formatDate(note.createdAt)}</span>
                    </div>
                  </div>

                  {/* Isi Kartu: Judul & Deskripsi */}
                  <div className="flex-1 mb-4">
                    <h3 className="font-black text-lg uppercase leading-tight mb-2 line-clamp-2 group-hover:text-[#4285F4] transition-colors" title={note.title}>
                      {note.title}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 line-clamp-3 bg-gray-50 p-3 rounded-lg border-2 border-transparent group-hover:border-gray-200 transition-colors italic mb-4">
                      "{note.description}"
                    </p>

                    {/* --- PREVIEW THUMBNAIL (Kotak Gambar Kecil) --- */}
                    <div 
                      className="border-2 border-black rounded-lg overflow-hidden h-32 flex items-center justify-center bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity relative group/thumb"
                      onClick={() => handlePreview(note.fileUrl)}
                    >
                        {note.fileType === 'IMG' && note.fileUrl ? (
                            <img src={note.fileUrl} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center">
                                <FileText className="w-10 h-10 text-red-500 mx-auto mb-1 group-hover/thumb:scale-110 transition-transform" />
                                <p className="text-xs font-bold text-gray-500">DOKUMEN PDF</p>
                            </div>
                        )}
                        {/* Efek Mata saat mouse di atas gambar */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                    </div>
                  </div>

                  {/* Info Pengupload (Foto & Nama) */}
                  <div className="flex items-center gap-3 mb-5 px-1">
                    <div className="w-8 h-8 bg-[#FBBC05] border-2 border-black flex items-center justify-center rounded-lg shadow-sm overflow-hidden">
                      {/* Logika: Kalau ada foto -> Tampilkan. Kalau gak ada -> Tampilkan Inisial. */}
                      {note.uploaderImage ? (
                        <img src={note.uploaderImage} alt={note.uploaderName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="font-black text-xs text-black">{note.uploaderName.charAt(0).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-wide">Diupload Oleh</p>
                      <p className="text-xs font-bold text-black truncate">{note.uploaderName}</p>
                    </div>
                  </div>

                  {/* --- TOMBOL AKSI (LIHAT & UNDUH) --- */}
                  <div className="grid grid-cols-2 gap-3 mt-auto">
                    {/* 1. Tombol LIHAT (Buka di Tab Baru) */}
                    <button 
                      onClick={() => handlePreview(note.fileUrl)}
                      className="flex items-center justify-center gap-2 py-2.5 border-2 border-black rounded-lg font-black text-xs uppercase hover:bg-gray-100 transition-all active:scale-95"
                    >
                      <Eye className="w-4 h-4" /> 
                      Lihat
                    </button>

                    {/* 2. Tombol UNDUH (Langsung Download ke HP/Laptop) */}
                    <button 
                      onClick={() => handleDownload(note)}
                      disabled={downloadingId === note.id}
                      className="flex items-center justify-center gap-2 py-2.5 bg-black text-white border-2 border-black rounded-lg font-black text-xs uppercase hover:bg-[#34A853] hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] active:translate-y-[1px] active:shadow-none disabled:opacity-70 disabled:cursor-wait"
                    >
                      {downloadingId === note.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      Unduh
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}