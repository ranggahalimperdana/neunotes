import { useState, useEffect } from 'react';
import {
  Menu, X, Home, Book, Bookmark, Settings, LogOut,
  Search, Plus, Bell, User, Download, FileText, Image as ImageIcon
} from 'lucide-react';
import { authService } from '../services/api';
import { supabase } from '../services/supabaseClient'; // 🔧 ADDED

/* ================= TYPES ================= */

interface Profile {
  id_user: string;
  email: string;
  role: string;
  full_name?: string | null;
  user_profile?: string | null;
}

interface Note {
  id_catatan: string;                 // 🔧 ADJUST (sesuai DB)
  judul: string;
  deskripsi: string;
  created_at: string;
  id_prodi: string;

  profiles?: {                        // 🔧 ADDED (hasil JOIN)
    full_name?: string | null;
    user_profile?: string | null;
  };
}

interface DashboardProps {
  userEmail: string;
  onLogout: () => void;
}

/* ================= COMPONENT ================= */

export default function Dashboard({ userEmail, onLogout }: DashboardProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedProdi, setSelectedProdi] = useState('Semua');
  const [userProfile, setUserProfile] = useState<Profile | null>(null);

  /* ================= FETCH PROFILE (LOGIN USER) ================= */

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await authService.getCurrentUserWithRole();
      if (profile) setUserProfile(profile);
    };
    fetchProfile();
  }, []);

  /* ================= FETCH NOTES + JOIN PROFILES ================= */
  // 🔧 INI KUNCI UTAMA

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase
        .from('notes')
        .select(`
          id_catatan,
          judul,
          deskripsi,
          created_at,
          id_prodi,
          profiles (
            full_name,
            user_profile
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetch notes:', error);
        return;
      }

      setAllNotes(data || []);
      setFilteredNotes(data || []);
    };

    fetchNotes();
  }, []);

  /* ================= FILTER ================= */

  const handleFilterByProdi = (prodi: string) => {
    setSelectedProdi(prodi);
    setFilteredNotes(
      prodi === 'Semua'
        ? allNotes
        : allNotes.filter(n => n.id_prodi === prodi)
    );
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

  /* ================= UI ================= */

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
      className={`w-full flex items-center gap-4 px-6 py-4 border-b-2 border-black
        ${activeTab === id ? 'bg-[#FBBC05]' : 'bg-white hover:bg-gray-100'}`}
    >
      <Icon className="w-6 h-6" />
      <span className="font-bold uppercase">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-[#F7F7F5] font-mono flex">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-72 bg-white border-r-2 border-black hidden md:flex flex-col">
        <div className="p-6 bg-[#FBBC05] border-b-2 border-black">
          <h1 className="text-2xl font-black uppercase">Neunotes</h1>
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
                <User className="w-8 h-8 text-gray-500" />
              )}
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500">Halo,</p>
              <p className="font-black truncate max-w-[140px]">
                {displayUsername}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1">
          <NavItem id="home" icon={Home} label="Beranda" />
          <NavItem id="explore" icon={Search} label="Jelajahi" />
          <NavItem id="saved" icon={Bookmark} label="Disimpan" />
          <NavItem id="my-notes" icon={Book} label="Catatan Saya" />
          <NavItem id="settings" icon={Settings} label="Pengaturan" />
        </nav>

        <div className="p-6 border-t-2 border-black">
          <button
            onClick={onLogout}
            className="w-full bg-[#EA4335] text-white py-3 border-2 border-black font-black"
          >
            <LogOut className="inline mr-2" />
            Keluar
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-black mb-6">Dashboard</h1>

        {filteredNotes.length === 0 ? (
          <p className="font-bold">Belum ada catatan.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNotes.map(note => (
              <div
                key={note.id_catatan}
                className="bg-white border-2 border-black shadow p-4"
              >
                {/* 🔧 AVATAR PENGIRIM */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-black">
                    {note.profiles?.user_profile ? (
                      <img
                        src={note.profiles.user_profile}
                        alt={note.profiles.full_name ?? 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-4 h-4 text-gray-500 mx-auto my-auto" />
                    )}
                  </div>
                  <span className="text-xs font-bold">
                    {note.profiles?.full_name ?? 'Anonim'}
                  </span>
                </div>

                <h3 className="font-black mb-2">{note.judul}</h3>
                <p className="text-sm mb-4">{note.deskripsi}</p>

                <button className="flex items-center gap-2 font-bold">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
