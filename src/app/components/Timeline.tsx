import { useState, useEffect, useRef } from 'react';
import { Clock, FileText, Download, Eye, Zap, ChevronLeft, ChevronRight, Star, Image as ImageIcon, Loader2 } from 'lucide-react';
// IMPORT SERVICE API
import { adminService } from '../services/api'; 

interface Post {
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  faculty: string;
  prodi: string;
  uploadedBy: string;
  author: string;
  authorImage?: string; // Foto profil
  createdAt: string;
  fileType: 'PDF' | 'IMG';
  fileData?: string; // URL File
  fileName?: string;
  description?: string;
}

interface TimelineProps {
  userEmail: string;
}

export default function Timeline({ userEmail }: TimelineProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // State untuk loading download
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [posts]);

  // --- 1. LOAD DATA DARI DATABASE (DENGAN FILTER WAKTU) ---
  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const data = await adminService.getAllPosts();

      if (data) {
        const formattedPosts: Post[] = data.map((note: any) => ({
          id: note.id,
          title: note.title,
          courseCode: note.courseCode, 
          courseTitle: note.courseTitle || 'Mata Kuliah Umum',
          faculty: note.faculty,
          prodi: note.prodi,
          uploadedBy: note.uploadedBy,
          author: note.author || 'Mahasiswa',
          authorImage: note.authorImage,
          createdAt: note.createdAt,
          fileType: note.fileType || 'PDF', 
          fileData: note.fileData, 
          description: note.description
        }));

        // --- KONFIGURASI FILTER WAKTU ---
        const timeLimit = new Date();

        // 🟢 OPSI 1: 10 Menit Terakhir (SEDANG AKTIF)
        timeLimit.setMinutes(timeLimit.getMinutes() - 10);

        // 🟡 OPSI 2: 24 Jam Terakhir (Hapus tanda // di bawah untuk mengaktifkan)
        // timeLimit.setHours(timeLimit.getHours() - 24);

        // 🔴 OPSI 3: 7 Hari Terakhir (Hapus tanda // di bawah untuk mengaktifkan)
        // timeLimit.setDate(timeLimit.getDate() - 7); 

        // Filter data berdasarkan waktu yang dipilih di atas
        const recentPosts = formattedPosts.filter(post => {
            const postDate = new Date(post.createdAt);
            // Hanya ambil post yang lebih baru dari batas waktu (timeLimit)
            return postDate >= timeLimit;
        });

        setPosts(recentPosts);
      }
    } catch (error) {
      console.error("Gagal memuat timeline:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. FORMAT TANGGAL ---
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'Baru saja';

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit', // Tambah jam biar kelihatan bedanya
      minute: '2-digit'
    }).format(date);
  };

  // --- 3. FUNGSI VIEW (Preview di Tab Baru) ---
  const handleView = (post: Post) => {
    if (!post.fileData) {
        alert("File tidak ditemukan / Url rusak");
        return;
    }
    window.open(post.fileData, '_blank');
  };

  // --- 4. FUNGSI DOWNLOAD (Force Download) ---
  const handleDownload = async (post: Post) => {
    if (!post.fileData) return;

    try {
      setDownloadingId(post.id);
      
      // Fetch file sebagai blob
      const response = await fetch(post.fileData);
      const blob = await response.blob();
      
      // Buat URL objek sementara
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Tentukan nama file
      const extension = post.fileType === 'PDF' ? 'pdf' : 'jpg';
      const fileName = `${post.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${extension}`;
      
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback jika fetch gagal (misal kena CORS), buka di tab baru
      window.open(post.fileData, '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  // --- LOGIC SCROLL ---
  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350; 
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
      setTimeout(checkScrollButtons, 300);
    }
  };

  return (
    <div className="w-full relative">
      {/* Timeline Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 border-3 sm:border-4 border-black p-4 sm:p-6 lg:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl sm:rounded-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-black/10 rounded-full blur-2xl"></div>
          
          <div className="relative flex items-center justify-between gap-3 sm:gap-4 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="relative">
                <div className="bg-yellow-400 p-2 sm:p-3 lg:p-4 border-2 sm:border-4 border-black rounded-lg sm:rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-black" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white uppercase tracking-tight flex items-center gap-1 sm:gap-2">
                  Timeline <Star className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-yellow-300 fill-yellow-300" />
                </h2>
                <p className="text-white/90 font-bold text-sm sm:text-base lg:text-lg mt-0.5 sm:mt-1">
                  🔥 {posts.length} catatan terbaru (7 Hari Terakhir)
                </p>
              </div>
            </div>
            
            {posts.length > 0 && (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button onClick={() => scroll('left')} disabled={!canScrollLeft} className={`p-2 sm:p-3 border-2 sm:border-4 border-black font-black transition-all rounded-md sm:rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none ${canScrollLeft ? 'bg-white text-black hover:bg-yellow-300' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
                <button onClick={() => scroll('right')} disabled={!canScrollRight} className={`p-2 sm:p-3 border-2 sm:border-4 border-black font-black transition-all rounded-md sm:rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none ${canScrollRight ? 'bg-white text-black hover:bg-yellow-300' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Timeline Posts */}
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          onScroll={checkScrollButtons}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8 pb-8 min-h-[400px]">
            
            {isLoading && posts.length === 0 ? (
               <div className="w-full flex items-center justify-center min-h-[400px]">
                 <div className="flex flex-col items-center">
                    <Loader2 className="animate-spin w-12 h-12 text-[#4285F4] mb-4" />
                    <p className="font-bold">Memuat Timeline...</p>
                 </div>
               </div>
            ) : posts.length === 0 ? (
              <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50 border-3 sm:border-4 border-black p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                <p className="font-black text-gray-900 text-xl uppercase">Belum Ada Posting Baru</p>
                <p className="text-gray-600 font-bold mb-4">Tidak ada catatan dalam 7 hari terakhir. 🚀</p>
              </div>
            ) : (
              posts.map((post, index) => {
                const isNew = index < 3; 
                
                return (
                  <div key={post.id} className="flex-shrink-0 w-[300px] sm:w-[360px] bg-white border-3 sm:border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all duration-300 rounded-xl overflow-hidden relative">
                    {isNew && (
                      <div className="absolute top-3 right-3 z-10 bg-red-500 text-white px-2 py-0.5 border-2 border-black rounded-md font-black text-xs shadow-sm animate-pulse">
                        🔥 NEW
                      </div>
                    )}

                    {/* Post Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 border-b-3 sm:border-b-4 border-black p-3 sm:p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center rounded-lg shadow-sm overflow-hidden">
                          {post.authorImage ? (
                             <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                          ) : (
                             <span className="font-black text-white text-lg">{post.author ? post.author.charAt(0).toUpperCase() : 'U'}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-sm text-white truncate">{post.author}</p>
                          <p className="text-xs text-white/90 font-bold">{formatDate(post.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-yellow-300 text-black px-2 py-1 text-xs font-bold border-2 border-black rounded-md">
                          {post.prodi || 'Umum'}
                        </span>
                      </div>

                      <h3 className="font-black text-lg mb-1 text-gray-900 line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-xs font-bold text-gray-600 mb-3 line-clamp-1">{post.courseTitle}</p>
                      
                      {post.description && (
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-2 mb-3 rounded-r-md">
                          <p className="text-xs text-gray-700 italic line-clamp-2">"{post.description}"</p>
                        </div>
                      )}

                      {/* File Preview Thumbnail (Klik untuk Download) */}
                      <div 
                        className="mt-3 border-3 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:opacity-90 transition-opacity bg-gray-100 flex items-center justify-center h-40"
                        onClick={() => handleDownload(post)}
                      >
                        {post.fileType === 'IMG' && post.fileData ? (
                            <img src={post.fileData} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center p-4">
                                <FileText className="w-12 h-12 mx-auto text-red-500 mb-2" />
                                <p className="font-black text-sm uppercase">Dokumen PDF</p>
                            </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-4">
                        {/* TOMBOL LIHAT -> Langsung Buka Link */}
                        <button
                          onClick={() => handleView(post)}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 border-2 border-black font-black hover:bg-blue-600 transition-all rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] text-xs"
                        >
                          <Eye className="w-4 h-4" /> LIHAT
                        </button>
                        
                        {/* TOMBOL UNDUH -> Force Download */}
                        <button
                          onClick={() => handleDownload(post)}
                          disabled={downloadingId === post.id}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 border-2 border-black font-black hover:bg-green-600 transition-all rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] text-xs disabled:opacity-70 disabled:cursor-wait"
                        >
                          {downloadingId === post.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Download className="w-4 h-4" />
                          )}
                          UNDUH
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}