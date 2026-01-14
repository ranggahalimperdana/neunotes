import { useState, useEffect } from 'react';
import {
  Menu, X, Home, Book, Bookmark, Settings, LogOut,
  Search, Plus, Bell, User, Download, FileText, Eye, Image as ImageIcon,
  Edit, Trash2
} from 'lucide-react';
import { authService, supabase } from '../services/api';

/* ================= TYPES ================= */

interface Profile {
  id_user: string;
  email: string;
  role: string;
  full_name?: string | null;
  user_profile?: string | null;
}

interface Note {
  id_catatan: string;
  id_user: string; // ID Pemilik Catatan
  judul: string;
  deskripsi: string;
  created_at: string;
  id_prodi: string;
  catatan_type?: 'PDF' | 'IMG'; 
  file_catatan?: string; // URL File
  profiles?: {
    full_name?: string | null;
    user_profile?: string | null;
  };
}

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
  initialTab?: string;
}

/* ================= COMPONENT ================= */

export default function Dashboard({ userEmail, onLogout, initialTab = 'home' }: DashboardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedProdi, setSelectedProdi] = useState('Semua');
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  /* ================= FETCH PROFILE (LOGIN USER) ================= */

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authService.getCurrentUserWithRole();
        if (profile) setUserProfile(profile);
      } catch (err) {
        console.error("Gagal load profile", err);
      }
    };
    fetchProfile();
  }, []);

  /* ================= FETCH NOTES + JOIN PROFILES ================= */
  
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select(`
          id_catatan,
          id_user,
          judul,
          deskripsi,
          created_at,
          id_prodi,
          catatan_type,
          file_catatan,
          profiles:id_user (
            full_name,
            user_profile
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetch notes:', error);
        return;
      }

      const formattedData = (data || []) as unknown as Note[];
      setAllNotes(formattedData);
      setFilteredNotes(formattedData);
    };

    fetchNotes();
  }, []);

  /* ================= FILTER & ACTIONS ================= */

  const handleFilterByProdi = (prodi: string) => {
    setSelectedProdi(prodi);
    setFilteredNotes(
      prodi === 'Semua'
        ? allNotes
        : allNotes.filter(n => n.id_prodi === prodi)
    );
  };

  // 3. FUNGSI BUKA LINK (DIRECT)
  const openFileDirectly = (url?: string) => {
    if (!url) {
        alert("File tidak ditemukan / Url rusak");
        return;
    }
    window.open(url, '_blank');
  };

  const handleDeleteNote = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
        try {
            const { error } = await supabase.from('notes').delete().eq('id_catatan', id);
            if (error) throw error;
            
            // Update UI
            setAllNotes(prev => prev.filter(n => n.id_catatan !== id));
            setFilteredNotes(prev => prev.filter(n => n.id_catatan !== id));
            alert('Catatan berhasil dihapus');
        } catch (error: any) {
            alert('Gagal menghapus: ' + error.message);
        }
    }
  };

  const prodiList = Array.from(
    new Set(allNotes.map(n => n.id_prodi))
  ).sort();

  /* ================= UTILS ================= */

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const displayUsername =
    userProfile?.full_name || userEmail.split('@')[0];

  /* ================= UI COMPONENTS ================= */

  const NavItem = ({
    id,
    icon: Icon,
    label
  }: {
    id: string;
    icon: any;
    label: string;
  }) => (
    <button
      onClick={() => {
        setActiveTab(id);
        setIsMobileMenuOpen(false);
      }}
      className={`w-full flex items-center gap-4 px-6 py-4 border-b-2 border-black transition-all
        ${activeTab === id ? 'bg-[#FBBC05]' : 'bg-white hover:bg-gray-100'}`}
    >
      <Icon className="w-6 h-6" />
      <span className="font-bold uppercase">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-mono flex">

      {/* ================= SIDEBAR ================= */}
      <button 
        className="md:hidden fixed top-4 right-4 z-50 bg-white p-2 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X /> : <Menu />}
      </button>

      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-white border-r-2 border-black transform transition-transform duration-300 z-40
        md:translate-x-0 md:static flex flex-col
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 bg-[#FBBC05] border-b-2 border-black">
          <h1 className="text-2xl font-black uppercase tracking-tight">Neunotes</h1>
        </div>

        <div className="p-6 border-b-2 border-black">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full border-2 border-black overflow-hidden bg-gray-200 flex items-center justify-center">
              {userProfile?.user_profile ? (
                <img
                  src={userProfile.user_profile}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-full h-full flex items-center justify-center">
                    <span className="font-black text-white text-lg">
                        {displayUsername.charAt(0).toUpperCase()}
                    </span>
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-gray-500">Halo,</p>
              <p className="font-black truncate max-w-[140px] text-lg">
                {displayUsername}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto">
          <NavItem id="home" icon={Home} label="Beranda" />
          <NavItem id="explore" icon={Search} label="Jelajahi" />
          <NavItem id="saved" icon={Bookmark} label="Disimpan" />
          <NavItem id="my-notes" icon={Book} label="Catatan Saya" />
          <NavItem id="settings" icon={Settings} label="Pengaturan" />
        </nav>

        <div className="p-6 border-t-2 border-black bg-gray-50">
          <button
            onClick={onLogout}
            className="w-full bg-[#EA4335] text-white py-3 border-2 border-black font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all rounded-lg"
          >
            <LogOut className="inline mr-2 w-5 h-5" />
            KELUAR
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        <div className="md:hidden h-16"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
                <h1 className="text-4xl font-black mb-2 uppercase">
                  {activeTab === 'my-notes' ? 'Catatan Saya' : 'Dashboard'}
                </h1>
                <p className="font-bold text-gray-500">Selamat datang kembali di area belajar!</p>
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                <button
                    onClick={() => handleFilterByProdi('Semua')}
                    className={`px-4 py-2 border-2 border-black rounded-full font-bold whitespace-nowrap transition-all ${selectedProdi === 'Semua' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                    Semua
                </button>
                {prodiList.map(prodi => (
                    <button
                        key={prodi}
                        onClick={() => handleFilterByProdi(prodi)}
                        className={`px-4 py-2 border-2 border-black rounded-full font-bold whitespace-nowrap transition-all ${selectedProdi === prodi ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                    >
                        {prodi}
                    </button>
                ))}
            </div>
        </div>

        {filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-black rounded-xl bg-gray-50">
            <FileText className="w-16 h-16 text-gray-300 mb-4" />
            <p className="font-bold text-xl text-gray-500">Belum ada catatan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <div
                key={note.id_catatan}
                className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all rounded-xl p-5 flex flex-col"
              >
                {/* Header Card: User Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-gray-100">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-black flex-shrink-0">
                    {note.profiles?.user_profile ? (
                      <img
                        src={note.profiles.user_profile}
                        alt={note.profiles.full_name ?? 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-black truncate">
                      {note.profiles?.full_name ?? 'Anonim'}
                    </p>
                    <p className="text-xs font-bold text-gray-500">
                      {new Date(note.created_at).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <span className="ml-auto text-[10px] font-black bg-gray-100 border border-black px-2 py-1 rounded uppercase">
                    {note.id_prodi}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 mb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-black text-lg leading-tight uppercase line-clamp-2">{note.judul}</h3>
                        {note.catatan_type && (
                            <span className={`text-[10px] font-black px-1.5 py-0.5 border border-black rounded ${note.catatan_type === 'PDF' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                {note.catatan_type}
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2 font-medium mb-3">{note.deskripsi}</p>

                    {/* --- PREVIEW THUMBNAIL (Direct Click) --- */}
                    <div 
                      className="border-2 border-black rounded-lg overflow-hidden h-32 flex items-center justify-center bg-gray-100 cursor-pointer hover:opacity-90 transition-opacity relative group/thumb"
                      onClick={() => openFileDirectly(note.file_catatan)}
                    >
                        {note.catatan_type === 'IMG' && note.file_catatan ? (
                            <img src={note.file_catatan} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center">
                                <FileText className="w-10 h-10 text-red-500 mx-auto mb-1 group-hover/thumb:scale-110 transition-transform" />
                                <p className="text-xs font-bold text-gray-500">DOKUMEN PDF</p>
                            </div>
                        )}
                        {/* Overlay Icon on Hover */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                            <Eye className="w-8 h-8 text-white drop-shadow-md" />
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-auto flex flex-col gap-2">
                    {/* TOMBOL PREVIEW UTAMA */}
                    <button 
                        onClick={() => openFileDirectly(note.file_catatan)}
                        className="w-full flex items-center justify-center gap-2 font-black bg-black text-white border-2 border-black py-3 rounded-lg hover:bg-gray-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
                    >
                        <Eye className="w-4 h-4" />
                        LIHAT FILE
                    </button>

                    {/* TOMBOL EDIT & HAPUS (Hanya muncul jika user pemilik catatan) */}
                    {userProfile?.id_user === note.id_user && (
                        <div className="grid grid-cols-2 gap-2">
                            <button 
                                onClick={() => alert('Fitur Edit akan segera hadir!')}
                                className="flex items-center justify-center gap-2 font-bold bg-white text-black border-2 border-black py-2 rounded-lg hover:bg-yellow-400 transition-all text-xs"
                            >
                                <Edit className="w-3 h-3" /> EDIT
                            </button>
                            <button 
                                onClick={() => handleDeleteNote(note.id_catatan)}
                                className="flex items-center justify-center gap-2 font-bold bg-white text-red-600 border-2 border-black py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all text-xs"
                            >
                                <Trash2 className="w-3 h-3" /> HAPUS
                            </button>
                        </div>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}