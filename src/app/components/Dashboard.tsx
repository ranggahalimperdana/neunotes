import { useState, useEffect } from 'react';
import { 
  Menu, X, Home, Book, Bookmark, Settings, LogOut, 
  Search, Plus, Bell, Filter, User, MoreVertical, Heart, Download, FileText, Image as ImageIcon
} from 'lucide-react';
import { authService, Profile } from '../services/api'; // Import authService

interface Note {
  id: string;
  courseCode: string;
  courseTitle: string;
  type: 'PDF' | 'IMG';
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  createdAt: string;
  author: string;
  faculty: string;
  prodi: string;
  uploadedBy: string;
  fileType: string;
  semester: string;
  fileData?: string;
}

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export default function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedProdi, setSelectedProdi] = useState<string>('Semua');
  
  // State untuk Data Profile User
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  // --- FETCH USER PROFILE DATA ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authService.getCurrentUserWithRole();
        if (profile) {
          setUserProfile(profile);
        }
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };
    fetchProfile();
  }, []); // Run once on mount
  // ------------------------------

  // Load ALL notes from localStorage (no filter by user prodi)
  useEffect(() => {
    const savedNotes = localStorage.getItem('uninotes_all_posts');
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      setAllNotes(notes);
      setFilteredNotes(notes);
    }
  }, []);

  // Filter notes by prodi
  const handleFilterByProdi = (prodi: string) => {
    setSelectedProdi(prodi);
    if (prodi === 'Semua') {
      setFilteredNotes(allNotes);
    } else {
      setFilteredNotes(allNotes.filter(note => note.prodi === prodi));
    }
  };

  // Get unique prodi list
  const prodiList = Array.from(new Set(allNotes.map(note => note.prodi))).sort();

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Fallback username if profile not loaded yet
  const displayUsername = userProfile?.full_name || userEmail.split('@')[0];

  const NavItem = ({ id, icon: Icon, label, onClick }: any) => (
    <button
      onClick={() => {
        setActiveTab(id);
        if (onClick) onClick();
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-4 px-6 py-4 border-b-2 border-black transition-all hover:bg-[#FBBC05] group ${
        activeTab === id ? 'bg-[#FBBC05] text-black' : 'bg-white text-gray-600'
      }`}
    >
      <Icon className={`w-6 h-6 ${activeTab === id ? 'text-black' : 'text-gray-500 group-hover:text-black'}`} />
      <span className={`font-bold uppercase tracking-wider ${activeTab === id ? 'text-black' : 'text-gray-600 group-hover:text-black'}`}>
        {label}
      </span>
      {activeTab === id && (
        <div className="ml-auto w-3 h-3 bg-black rounded-full animate-pulse" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-mono text-black flex flex-col md:flex-row">
      
      {/* --- MOBILE HEADER (Visible < md) --- */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b-2 border-black px-4 py-3 flex items-center justify-between shadow-[0px_4px_0px_0px_rgba(0,0,0,0.1)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#FBBC05] border-2 border-black flex items-center justify-center rounded-sm">
            <span className="text-black font-black text-xl">U</span>
          </div>
          <span className="text-xl font-black tracking-tighter uppercase">UniNotes</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 border-2 border-black rounded bg-white hover:bg-gray-100 active:translate-y-[2px] transition-all"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* --- SIDEBAR NAVIGATION --- */}
      <aside 
        className={`
          fixed md:sticky top-0 left-0 z-30 h-[calc(100vh-66px)] md:h-screen w-full md:w-72 
          bg-white border-r-0 md:border-r-2 border-black flex flex-col transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0 mt-[66px] md:mt-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Desktop Logo Area */}
        <div className="hidden md:flex items-center gap-3 p-6 border-b-2 border-black bg-[#FBBC05]">
          <div className="w-10 h-10 bg-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-white font-black text-2xl">U</span>
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase">UniNotes</span>
        </div>

        {/* User Profile Snippet */}
        <div className="p-6 border-b-2 border-black bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full border-2 border-black bg-gray-200 flex items-center justify-center overflow-hidden">
              {/* LOGIKA TAMPILAN FOTO DI SIDEBAR */}
              {userProfile?.avatar_url ? (
                <img 
                  src={userProfile.avatar_url} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-gray-500" />
              )}
            </div>
            <div>
              <p className="font-bold text-sm text-gray-500 uppercase">Halo,</p>
              <p className="font-black text-lg truncate max-w-[140px]">{displayUsername}</p>
            </div>
          </div>
          <div className="flex gap-2 text-xs font-bold">
            <span className="bg-[#E8F0FE] text-[#4285F4] px-2 py-1 border border-[#4285F4] rounded">Mhs. Abadi</span>
            <span className="bg-[#CEEAD6] text-[#34A853] px-2 py-1 border border-[#34A853] rounded">Lvl. 5</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto">
          <NavItem id="home" icon={Home} label="Beranda" />
          <NavItem id="explore" icon={Search} label="Jelajahi" />
          <NavItem id="saved" icon={Bookmark} label="Disimpan" />
          <NavItem id="my-notes" icon={Book} label="Catatan Saya" />
          <NavItem id="settings" icon={Settings} label="Pengaturan" />
        </nav>

        {/* Logout Button */}
        <div className="p-6 border-t-2 border-black bg-gray-50">
          <button 
            onClick={onLogout}
            className="w-full bg-[#EA4335] text-white py-3 border-2 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 overflow-y-auto h-[calc(100vh-66px)] md:h-screen w-full">
        
        {/* Top Header (Desktop Only) */}
        <header className="hidden md:flex items-center justify-between px-8 py-6 bg-white border-b-2 border-black sticky top-0 z-20">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Dashboard
          </h1>
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Cari catatan..." 
                className="pl-10 pr-4 py-2 border-2 border-black w-64 font-bold focus:outline-none focus:w-80 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[4px] focus:translate-y-[4px]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
            
            {/* Action Buttons */}
            <button className="p-2 border-2 border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all">
              <Bell className="w-6 h-6" />
            </button>
            <button className="bg-black text-white px-4 py-2 border-2 border-black font-bold flex items-center gap-2 shadow-[4px_4px_0px_0px_#4285F4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
              <Plus className="w-5 h-5" /> Upload
            </button>
          </div>
        </header>

        {/* Mobile FAB (Floating Action Button) for Upload */}
        <button className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-black text-white border-2 border-white rounded-full flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 active:scale-90 transition-all">
          <Plus className="w-8 h-8" />
        </button>

        {/* Content Container */}
        <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto pb-24 md:pb-8">

          {/* Welcome Banner */}
          <div className="bg-[#4285F4] border-2 border-black p-6 md:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
            <div className="relative z-10 text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-4 uppercase leading-none">
                Siap Belajar,<br/> {displayUsername}?
              </h2>
              <p className="font-bold text-white/90 max-w-lg text-sm md:text-base">
                Ada <span className="underline decoration-2 decoration-[#FBBC05] underline-offset-4">12 catatan baru</span> di jurusanmu minggu ini. Jangan sampai ketinggalan materi ujian!
              </p>
            </div>
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all" />
            <Book className="absolute bottom-4 right-4 w-32 h-32 text-black/10 rotate-12" />
          </div>

          {/* Quick Stats (Responsive Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Catatan', val: '12', color: 'bg-[#FBBC05]' },
              { label: 'Diunduh', val: '450', color: 'bg-[#EA4335]' },
              { label: 'Disukai', val: '89', color: 'bg-[#34A853]' },
              { label: 'Peringkat', val: '#5', color: 'bg-white' },
            ].map((stat, idx) => (
              <div key={idx} className={`${stat.color} border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform`}>
                <h3 className="text-3xl font-black mb-1">{stat.val}</h3>
                <p className="text-xs font-bold uppercase tracking-wide opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Content Filters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
             <h3 className="text-2xl font-black flex items-center gap-2">
               <span className="bg-black text-white px-2 py-0">Semua</span> Catatan ({filteredNotes.length})
             </h3>
             <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
               <button 
                 onClick={() => handleFilterByProdi('Semua')}
                 className={`whitespace-nowrap px-4 py-2 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                   selectedProdi === 'Semua' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
                 }`}
               >
                 Semua
               </button>
               {prodiList.slice(0, 4).map((prodi) => (
                 <button 
                   key={prodi}
                   onClick={() => handleFilterByProdi(prodi)}
                   className={`whitespace-nowrap px-4 py-2 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                     selectedProdi === prodi ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
                   }`}
                 >
                   {prodi}
                 </button>
               ))}
             </div>
          </div>

          {/* Notes Grid (Responsive: 1 -> 2 -> 3 Cols) */}
          {filteredNotes.length === 0 ? (
            <div className="bg-white border-2 border-black p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <Book className="w-20 h-20 mx-auto mb-4 text-gray-300" />
              <h3 className="text-2xl font-black text-black mb-2 uppercase">Belum Ada Catatan</h3>
              <p className="text-gray-600 font-bold">
                {selectedProdi === 'Semua' 
                  ? 'Jadilah yang pertama mengupload catatan!'
                  : `Belum ada catatan untuk ${selectedProdi}`
                }
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => {
                // Generate random colors for each card
                const colors = [
                  { bg: '#F8D7DA', tag: '#EA4335' },
                  { bg: '#D1E7DD', tag: '#34A853' },
                  { bg: '#FFF3CD', tag: '#FBBC05' },
                  { bg: '#CFE2FF', tag: '#4285F4' },
                  { bg: '#E2D9F3', tag: '#6f42c1' }
                ];
                const colorIndex = parseInt(note.id) % colors.length;
                const color = colors[colorIndex];

                return (
                  <div 
                    key={note.id} 
                    className="bg-white border-2 border-black flex flex-col shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group cursor-pointer"
                  >
                    {/* Card Header */}
                    <div className="p-4 border-b-2 border-black" style={{ backgroundColor: color.bg }}>
                      <div className="flex justify-between items-start mb-4">
                        <span 
                          className="text-[10px] font-black uppercase text-white px-2 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                          style={{ backgroundColor: color.tag }}
                        >
                          {note.prodi}
                        </span>
                        <div className="flex items-center gap-1">
                          {note.type === 'PDF' ? (
                            <FileText className="w-4 h-4 text-black" />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-black" />
                          )}
                        </div>
                      </div>
                      <h4 className="font-black text-lg leading-tight line-clamp-2 min-h-[3rem]">
                        {note.title}
                      </h4>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1">
                      <div className="mb-3">
                        <p className="text-xs font-bold text-gray-500 mb-1">{note.courseCode}</p>
                        <p className="text-sm font-bold text-black line-clamp-1">{note.courseTitle}</p>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">{note.description}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-gray-200 border border-black flex items-center justify-center">
                          <User className="w-3 h-3 text-gray-500" />
                        </div>
                        <p className="text-xs font-bold text-gray-600">{note.author}</p>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs font-bold text-gray-500">
                        <span className="bg-gray-100 px-2 py-1 border border-black">Sem. {note.semester}</span>
                        <span className="text-[10px]">{new Date(note.uploadDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>

                    {/* Card Footer (Action) */}
                    <div className="p-3 border-t-2 border-black bg-gray-50 group-hover:bg-black group-hover:text-white transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" />
                      <span className="font-bold text-xs uppercase">Download Catatan</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}