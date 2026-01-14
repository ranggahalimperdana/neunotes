import { useState, useEffect } from 'react';
// 📦 Ini gudang ikon (gambar kecil kayak tong sampah, mata, dll)
import { Shield, Trash2, LogOut, Search, Filter, AlertTriangle, BarChart3, FileText, Users as UsersIcon, TrendingUp, Activity, Eye, ArrowUpCircle, ArrowDownCircle, ShieldAlert } from 'lucide-react';
// 🔌 Ini kabel data ke Database
import { adminService, Profile } from '../services/api';

/* =============================================================================
   📝 KAMUS DATA (Bentuk data yang dipakai)
   =============================================================================
*/

// Bentuk data "Postingan"
interface Post {
  id: string;             
  title: string;          
  courseCode: string;     
  courseTitle: string;    
  faculty: string;        
  prodi: string;          
  uploadedBy: string;     
  author: string;         
  createdAt: string;      
  fileType: 'PDF' | 'IMG';
  fileData?: string;      
  description?: string;   
}

// Bentuk data "Catatan Aktivitas" (Log)
interface AdminLog {
  adminEmail: string;
  actionType: string;
  targetId: string;
  timestamp: string;
}

// Data yang diterima dari halaman Induk (App.tsx)
interface AdminDashboardProps {
  adminEmail: string;        // Email admin yang login
  currentUserRole: string;   // Jabatan: 'admin' atau 'super_admin'
  onLogout: () => void;      // Fungsi logout
}

/* =============================================================================
   🖥️ TAMPILAN UTAMA DASHBOARD
   =============================================================================
*/
export default function AdminDashboard({ adminEmail, currentUserRole, onLogout }: AdminDashboardProps) {
  
  // --- 🧠 MEMORI SEMENTARA (STATE) ---
  // Tempat menyimpan data biar bisa tampil di layar
  
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'users'>('overview'); // Tab yang aktif
  const [posts, setPosts] = useState<Post[]>([]);       // Daftar semua postingan
  const [users, setUsers] = useState<Profile[]>([]);    // Daftar semua user
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>([]);
  
  // Kotak Pencarian & Filter
  const [searchQuery, setSearchQuery] = useState('');          // Cari nama user
  const [postSearchQuery, setPostSearchQuery] = useState('');  // Cari judul postingan
  const [selectedFaculty, setSelectedFaculty] = useState('');  // Filter fakultas
  
  // Pop-up Konfirmasi (Biar gak salah klik)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showPromoteConfirm, setShowPromoteConfirm] = useState<string | null>(null);
  const [showDemoteConfirm, setShowDemoteConfirm] = useState<string | null>(null);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // Loading muter-muter

  // --- 🔄 JALAN OTOMATIS SAAT DIBUKA ---
  useEffect(() => {
    loadData();      // Ambil data terbaru
    loadAdminLogs(); // Ambil catatan log
  }, [activeTab]);

  // --- 📡 FUNGSI AMBIL DATA ---
  const loadData = async () => {
    try {
      // 1. Ambil Postingan dari Database
      const allPosts = await adminService.getAllPosts();
      const mappedPosts: Post[] = allPosts.map((p: any) => ({
        id: p.id,
        title: p.title,
        courseCode: p.courseCode,
        courseTitle: p.courseTitle,
        faculty: p.faculty,
        prodi: p.prodi,
        uploadedBy: p.uploadedBy,
        author: p.author,
        createdAt: p.createdAt,
        fileType: p.fileType,
        fileData: p.fileData,
        description: p.description
      }));
      setPosts(mappedPosts);

      // 2. Ambil User dari Database
      const profiles = await adminService.getAllUsers();
      setUsers(profiles);

    } catch (error) {
      console.error("Gagal memuat data:", error);
    }
  };

  const loadAdminLogs = () => {
    const logs = localStorage.getItem('uninotes_admin_logs');
    if (logs) setAdminLogs(JSON.parse(logs));
  };

  // --- 🗑️ TOMBOL HAPUS POSTINGAN ---
  const handleDeletePost = async (postId: string) => {
    try {
      await adminService.deletePost(postId); // Hapus di database
      setPosts(posts.filter(p => p.id !== postId)); // Hapus di layar
      setShowDeleteConfirm(null); // Tutup pop-up
      logAdminAction('delete_post', postId);
      alert('Postingan berhasil dihapus.');
    } catch (error: any) {
      alert(`Gagal menghapus: ${error.message}`);
    }
  };

  // --- 👑 TOMBOL UBAH JABATAN (NAIK/TURUN PANGKAT) ---
  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    
    // 1. CEK: Kamu siapa? (Cuma Admin & Super Admin yang boleh)
    if (currentUserRole !== 'super_admin' && currentUserRole !== 'admin') {
        alert("AKSES DITOLAK: Anda tidak punya izin.");
        return;
    }

    // 2. CEK: Siapa yang mau diubah?
    const targetUser = users.find(u => u.id_user === userId);
    
    // 🛡️ PROTEKSI: Super Admin GAK BOLEH diganggu!
    if (targetUser && targetUser.role === 'super_admin') {
         alert("AKSES DITOLAK: Tidak bisa mengubah akun Super Admin.");
         return;
    }

    // Kalau lolos, lanjut ubah jabatan...
    setActionLoading(userId);
    try {
      await adminService.changeUserRole(userId, newRole);
      
      // Update tampilan di layar
      setUsers(users.map(u => u.id_user === userId ? { ...u, role: newRole } : u));
      
      setShowPromoteConfirm(null);
      setShowDemoteConfirm(null);
      
      logAdminAction(newRole === 'admin' ? 'promote_user' : 'demote_admin', userId);
      alert(`Berhasil! Role diubah jadi ${newRole.toUpperCase()}.`);
    } catch (error: any) {
      alert(`Gagal: ${error.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  const logAdminAction = (actionType: string, targetId: string) => {
    const logs = JSON.parse(localStorage.getItem('uninotes_admin_logs') || '[]');
    logs.push({
      adminEmail,
      actionType,
      targetId,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('uninotes_admin_logs', JSON.stringify(logs));
    loadAdminLogs();
  };

  // --- 🔍 MESIN PENCARI (FILTER) ---

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !postSearchQuery || 
      post.title?.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      post.author?.toLowerCase().includes(postSearchQuery.toLowerCase());
    const matchesFaculty = !selectedFaculty || post.faculty === selectedFaculty;
    return matchesSearch && matchesFaculty;
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = !searchQuery ||
      user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const faculties = Array.from(new Set(posts.map(p => p.faculty || 'Unknown')));

  const stats = {
    totalPosts: posts.length,
    totalUsers: users.length,
    totalAdmins: users.filter(u => u.role === 'admin' || u.role === 'super_admin').length
  };

  // ===========================================================================
  // 🎨 BAGIAN TAMPILAN (HTML/JSX) - SILAKAN UBAH WARNA/POSISI DI SINI
  // ===========================================================================
  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      
      {/* 🔴 HEADER ATAS (JUDUL & LOGOUT) */}
      <header className={`sticky top-0 z-50 border-b-4 border-black shadow-[0_6px_0_0_rgba(0,0,0,1)] ${currentUserRole === 'super_admin' ? 'bg-gradient-to-r from-red-600 via-orange-600 to-red-700' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-black p-4 border-4 border-white shadow-md rounded-xl rotate-3 hover:rotate-0 transition-transform">
                {currentUserRole === 'super_admin' ? <ShieldAlert className="w-10 h-10 text-white" /> : <Shield className="w-10 h-10 text-white" />}
              </div>
              <div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tight">
                  {currentUserRole === 'super_admin' ? 'SUPER ADMIN' : 'ADMIN PANEL'}
                </h1>
                <p className="text-white/90 font-bold text-sm bg-black/20 px-3 py-1 rounded-full inline-block mt-1">
                  {adminEmail}
                </p>
              </div>
            </div>
            
            <button onClick={onLogout} className="flex items-center gap-2 bg-black text-white px-8 py-4 border-4 border-white font-black text-lg hover:bg-white hover:text-black hover:border-black transition-all rounded-xl shadow-lg active:translate-y-1 active:shadow-none">
              <LogOut className="w-6 h-6" />
              <span className="hidden sm:inline">KELUAR</span>
            </button>
          </div>
        </div>
      </header>

      {/* ⚠️ BANNER KUNING (STATUS) */}
      <div className="bg-yellow-400 border-y-4 border-black py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3">
          <div className="bg-red-600 p-2 border-2 border-black rounded-lg">
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <p className="font-black text-black text-lg">
            <span className="text-red-600">STATUS:</span> Terhubung ke Database Supabase (Live Mode).
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 🔘 TOMBOL NAVIGASI TAB (Ganti tab di sini) */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {['overview', 'posts', 'users'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-6 px-6 font-black text-xl border-4 border-black transition-all rounded-xl uppercase flex flex-col items-center gap-2
                ${activeTab === tab 
                  ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105' 
                  : 'bg-white text-black hover:bg-gray-100 shadow-md hover:shadow-lg'}`}
            >
              {tab === 'overview' && <BarChart3 className="w-8 h-8" />}
              {tab === 'posts' && <FileText className="w-8 h-8" />}
              {tab === 'users' && <UsersIcon className="w-8 h-8" />}
              {tab} {tab === 'posts' ? `(${posts.length})` : tab === 'users' ? `(${users.length})` : ''}
            </button>
          ))}
        </div>

        {/* 📦 ISI KONTEN (Berubah sesuai Tab) */}
        
        {/* === TAB 1: OVERVIEW === */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Kartu Biru */}
            <div className="bg-blue-600 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl text-white">
              <div className="flex justify-between mb-4"><FileText className="w-12 h-12" /><TrendingUp className="w-8 h-8 opacity-50" /></div>
              <h3 className="font-bold uppercase text-sm opacity-80">Total Posting</h3>
              <p className="font-black text-5xl">{stats.totalPosts}</p>
            </div>
            {/* Kartu Hijau */}
            <div className="bg-green-600 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl text-white">
              <div className="flex justify-between mb-4"><UsersIcon className="w-12 h-12" /><Activity className="w-8 h-8 opacity-50" /></div>
              <h3 className="font-bold uppercase text-sm opacity-80">Total Users</h3>
              <p className="font-black text-5xl">{stats.totalUsers}</p>
            </div>
            {/* Kartu Ungu */}
            <div className="bg-purple-600 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl text-white">
              <div className="flex justify-between mb-4"><Shield className="w-12 h-12" /><Eye className="w-8 h-8 opacity-50" /></div>
              <h3 className="font-bold uppercase text-sm opacity-80">Total Admin</h3>
              <p className="font-black text-5xl">{stats.totalAdmins}</p>
            </div>
          </div>
        )}

        {/* === TAB 2: POSTING (DAFTAR CATATAN) === */}
        {activeTab === 'posts' && (
          <div className="space-y-6">
            {/* Filter */}
            <div className="bg-white border-4 border-black p-6 shadow-md rounded-xl grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-6 h-6 text-gray-400" />
                <input type="text" placeholder="Cari judul..." value={postSearchQuery} onChange={(e) => setPostSearchQuery(e.target.value)} className="w-full pl-14 pr-4 py-3 border-4 border-black font-bold rounded-lg" />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-3.5 w-6 h-6 text-gray-400" />
                <select value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)} className="w-full pl-14 pr-4 py-3 border-4 border-black font-bold rounded-lg bg-white appearance-none cursor-pointer">
                  <option value="">Semua Fakultas</option>
                  {faculties.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>

            {/* List */}
            {filteredPosts.length === 0 ? (
              <div className="bg-white border-4 border-black p-16 text-center rounded-xl"><p className="font-black text-2xl text-gray-400">KOSONG</p></div>
            ) : (
              filteredPosts.map(post => (
                <div key={post.id} className="bg-white border-4 border-black p-6 shadow-md rounded-xl flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-xl">{post.title}</h3>
                    <p className="text-gray-600">{post.author} - {post.courseCode}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setPreviewPost(post)} className="bg-blue-500 text-white px-4 py-2 border-2 border-black font-bold rounded-lg hover:bg-blue-600 flex gap-2"><Eye className="w-4 h-4"/> LIHAT</button>
                    <button onClick={() => setShowDeleteConfirm(post.id)} className="bg-red-500 text-white px-4 py-2 border-2 border-black font-bold rounded-lg hover:bg-red-600 flex gap-2"><Trash2 className="w-4 h-4"/> HAPUS</button>
                  </div>
                  
                  {/* Pop-up Hapus */}
                  {showDeleteConfirm === post.id && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                      <div className="bg-white border-4 border-black p-6 rounded-xl shadow-xl w-80 text-center">
                        <p className="font-black text-xl mb-4">Hapus postingan ini?</p>
                        <div className="flex gap-2">
                          <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-2 border-2 border-black rounded-lg font-bold">BATAL</button>
                          <button onClick={() => handleDeletePost(post.id)} className="flex-1 py-2 bg-red-500 text-white border-2 border-black rounded-lg font-bold">HAPUS</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* === TAB 3: USERS (DAFTAR ORANG) === */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="bg-white border-4 border-black p-6 shadow-md rounded-xl">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-6 h-6 text-black" />
                <input type="text" placeholder="Cari User..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-4 py-3 border-4 border-black font-bold rounded-lg" />
              </div>
            </div>

            {filteredUsers.length === 0 ? (
              <div className="bg-white border-4 border-black p-16 text-center rounded-xl"><p className="font-black text-2xl text-gray-400">KOSONG</p></div>
            ) : (
              filteredUsers.map(user => (
                <div key={user.id_user} className="bg-white border-4 border-black p-6 shadow-md hover:shadow-lg transition-all rounded-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      {/* Foto Profil */}
                      {user.user_profile ? (
                        <img src={user.user_profile} alt={user.full_name} className="w-12 h-12 rounded-xl border-2 border-black object-cover" />
                      ) : (
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex items-center justify-center rounded-xl">
                          <span className="font-black text-white text-xl">{user.full_name?.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div>
                        <h3 className="font-black text-xl">{user.full_name}</h3>
                        <p className="text-sm font-bold text-gray-600">{user.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-0.5 text-xs font-black border border-black rounded shadow-sm ${user.role === 'admin' || user.role === 'super_admin' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                            {user.role === 'super_admin' ? 'SUPER ADMIN' : user.role === 'admin' ? 'ADMIN' : 'USER'}
                          </span>
                          <span className="text-xs font-bold text-gray-500">{user.id_prodi}</span>
                        </div>
                      </div>
                    </div>

                    {/* TOMBOL AKSI (NAIK/TURUN PANGKAT) */}
                    {user.id_user !== undefined && user.email !== adminEmail && (
                      <div className="flex gap-2">
                        {/* Jika Admin/Super Admin login -> Tampilkan tombol */}
                        {(currentUserRole === 'super_admin' || currentUserRole === 'admin') ? (
                          <>
                            {/* Super Admin target -> GAK BISA DIAPA-APAIN */}
                            {user.role === 'super_admin' ? (
                                <span className="text-gray-400 font-bold text-xs flex items-center gap-1 border-2 border-transparent px-2 py-1"><Shield className="w-4 h-4" /> MASTER</span>
                            ) : (
                                <>
                                  {/* User Biasa -> Tombol JADIKAN ADMIN */}
                                  {user.role === 'user' && (
                                    <button onClick={() => setShowPromoteConfirm(user.email)} className="bg-green-500 text-white px-4 py-2 border-2 border-black font-bold rounded-lg hover:bg-green-600 shadow-md flex items-center gap-2">
                                      <ArrowUpCircle className="w-4 h-4" /> JADIKAN ADMIN
                                    </button>
                                  )}
                                  {/* Admin -> Tombol TURUNKAN */}
                                  {user.role === 'admin' && (
                                    <button onClick={() => setShowDemoteConfirm(user.email)} className="bg-orange-500 text-white px-4 py-2 border-2 border-black font-bold rounded-lg hover:bg-orange-600 shadow-md flex items-center gap-2">
                                      <ArrowDownCircle className="w-4 h-4" /> TURUNKAN
                                    </button>
                                  )}
                                </>
                            )}
                          </>
                        ) : (
                          // Kalau User Biasa -> Tampilkan Label Dibatasi
                          <span className="text-gray-400 font-bold text-xs flex items-center gap-1"><Shield className="w-4 h-4" /> DIBATASI</span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Pop-up Konfirmasi Naik Pangkat */}
                  {showPromoteConfirm === user.email && (
                    <div className="mt-4 p-4 bg-green-50 border-t-2 border-black">
                      <p className="font-bold text-green-800 mb-2">Yakin jadikan {user.full_name} Admin?</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleRoleChange(user.id_user, 'admin')} disabled={actionLoading === user.id_user} className="bg-green-500 text-white px-4 py-2 border-2 border-black rounded font-bold">
                          {actionLoading === user.id_user ? 'DIPROSES...' : 'YA, JADIKAN ADMIN'}
                        </button>
                        <button onClick={() => setShowPromoteConfirm(null)} className="bg-white px-4 py-2 border-2 border-black rounded font-bold">BATAL</button>
                      </div>
                    </div>
                  )}

                  {/* Pop-up Konfirmasi Turun Pangkat */}
                  {showDemoteConfirm === user.email && (
                    <div className="mt-4 p-4 bg-orange-50 border-t-2 border-black">
                      <p className="font-bold text-orange-800 mb-2">Turunkan {user.full_name} jadi User biasa?</p>
                      <div className="flex gap-2">
                        <button onClick={() => handleRoleChange(user.id_user, 'user')} disabled={actionLoading === user.id_user} className="bg-orange-500 text-white px-4 py-2 border-2 border-black rounded font-bold">
                          {actionLoading === user.id_user ? 'DIPROSES...' : 'YA, TURUNKAN'}
                        </button>
                        <button onClick={() => setShowDemoteConfirm(null)} className="bg-white px-4 py-2 border-2 border-black rounded font-bold">BATAL</button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

      </div>

      {/* MODAL PREVIEW (BUKA GAMBAR/PDF) */}
      {previewPost && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={() => setPreviewPost(null)}>
          <div className="relative max-w-6xl w-full max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreviewPost(null)} className="absolute -top-12 right-0 bg-white text-black px-8 py-3 border-4 border-white font-black hover:bg-black hover:text-white rounded-lg shadow-md z-20">✕ TUTUP</button>
            <div className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-lg">
              {previewPost.fileData ? (
                previewPost.fileType === 'IMG' ? (
                  <img src={previewPost.fileData} alt={previewPost.title} className="w-full h-auto max-h-[90vh] object-contain bg-gray-100" />
                ) : (
                  <div className="bg-gradient-to-br from-red-500 to-orange-500 p-20 text-center min-h-[500px] flex flex-col items-center justify-center">
                    <FileText className="w-32 h-32 text-white mb-6" />
                    <p className="font-black text-white text-4xl mb-3">FILE PDF</p>
                    <a href={previewPost.fileData} target="_blank" rel="noopener noreferrer" className="mt-6 bg-white text-red-500 px-6 py-3 rounded-lg font-bold border-2 border-black shadow-md hover:shadow-none hover:translate-y-1 transition-all">LIHAT PDF/Image</a>
                  </div>
                )
              ) : (
                <div className="bg-gray-200 p-20 text-center"><FileText className="w-32 h-32 text-gray-400 mb-6" /><p className="font-black text-gray-600 text-3xl">FILE RUSAK</p></div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}