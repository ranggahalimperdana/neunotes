import { useState, useEffect, useRef } from 'react';
import { Clock, FileText, Download, Eye, Zap, ChevronLeft, ChevronRight, Star, Image as ImageIcon } from 'lucide-react';
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
  authorImage?: string; // TAMBAHAN: Properti untuk foto author
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
  const [previewPost, setPreviewPost] = useState<Post | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    checkScrollButtons();
  }, [posts]);

  // --- 1. LOAD DATA DARI DATABASE ---
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
          authorImage: note.authorImage, // TAMBAHAN: Map foto author
          createdAt: note.createdAt,
          fileType: note.fileType || 'PDF', 
          fileData: note.fileData, 
          description: note.description
        }));

        setPosts(formattedPosts);
      }
    } catch (error) {
      console.error("Gagal memuat timeline:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 2. FORMAT TANGGAL AMAN (FIX INVALID DATE) ---
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    
    if (isNaN(date.getTime())) return 'Baru saja';

    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  // --- 3. FUNGSI DOWNLOAD / BUKA FILE ---
  const handleDownload = (post: Post) => {
    if (!post.fileData) {
        alert("File tidak ditemukan / Url rusak");
        return;
    }
    window.open(post.fileData, '_blank');
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

  const getEngagement = (postId: string) => {
    const seed = postId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return { views: Math.floor((seed % 50) + 20) };
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
                  🔥 {posts.length} catatan terbaru
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
                    <div className="animate-spin w-12 h-12 border-4 border-black border-t-yellow-400 rounded-full mb-4"></div>
                    <p className="font-bold">Memuat Timeline...</p>
                 </div>
               </div>
            ) : posts.length === 0 ? (
              <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-gray-50 to-blue-50 border-3 sm:border-4 border-black p-8 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                <p className="font-black text-gray-900 text-xl uppercase">Belum Ada Posting</p>
                <p className="text-gray-600 font-bold mb-4">Timeline akan muncul saat ada catatan baru! 🚀</p>
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
                        
                        {/* --- FOTO PROFIL LOGIC --- */}
                        <div className="w-10 h-10 bg-yellow-400 border-2 border-black flex items-center justify-center rounded-lg shadow-sm overflow-hidden">
                          {post.authorImage ? (
                             <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                          ) : (
                             <span className="font-black text-white text-lg">{post.author ? post.author.charAt(0).toUpperCase() : 'U'}</span>
                          )}
                        </div>
                        {/* ------------------------- */}

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

                      {/* File Preview Thumbnail */}
                      <div 
                        className="mt-3 border-3 border-black rounded-lg overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer hover:opacity-90 transition-opacity bg-gray-100 flex items-center justify-center h-40"
                        onClick={() => setPreviewPost(post)}
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
                        <button
                          onClick={() => setPreviewPost(post)}
                          className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-3 py-2 border-2 border-black font-black hover:bg-blue-600 transition-all rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] text-xs"
                        >
                          <Eye className="w-4 h-4" /> LIHAT
                        </button>
                        <button
                          onClick={() => handleDownload(post)}
                          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 border-2 border-black font-black hover:bg-green-600 transition-all rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none active:translate-x-[1px] active:translate-y-[1px] text-xs"
                        >
                          <Download className="w-4 h-4" /> UNDUH
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

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4" onClick={() => setPreviewPost(null)}>
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewPost(null)} className="absolute -top-12 right-0 bg-white text-black px-4 py-2 border-2 border-black font-black hover:bg-red-500 hover:text-white transition-all rounded-lg shadow-white">
              TUTUP
            </button>

            <div className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-2xl">
              {previewPost.fileData ? (
                <>
                  {previewPost.fileType === 'IMG' ? (
                    <img src={previewPost.fileData} alt={previewPost.title} className="w-full h-auto max-h-[80vh] object-contain bg-gray-100" />
                  ) : (
                    <div className="bg-gradient-to-br from-red-500 to-pink-500 p-20 text-center min-h-[400px] flex flex-col items-center justify-center">
                      <FileText className="w-24 h-24 text-white mb-4 drop-shadow-lg" />
                      <p className="font-black text-white text-3xl mb-4 drop-shadow-md">FILE PDF</p>
                      <button onClick={() => handleDownload(previewPost)} className="bg-white text-black px-8 py-3 border-2 border-black font-black hover:bg-green-400 transition-all rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-2px] hover:translate-x-0">
                        DOWNLOAD / BUKA PDF
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-200 p-12 text-center">
                   <p className="font-black text-xl text-gray-500">File tidak tersedia</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}