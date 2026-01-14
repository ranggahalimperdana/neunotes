import { useState, useEffect } from 'react';
import { Shield, Trash2, LogOut, Search, Filter, AlertTriangle, BarChart3, FileText, Users as UsersIcon, TrendingUp, Activity, Eye, ArrowUpCircle, ArrowDownCircle, ShieldAlert } from 'lucide-react';
// Import Service Supabase
import { adminService, Profile } from '../services/api';

// Interface Post (Disesuaikan dengan data dari Supabase)
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
  fileData?: string; // URL File
  description?: string;
}

interface AdminLog {
  adminEmail: string;
  actionType: string;
  targetId: string;
  timestamp: string;
}

interface AdminDashboardProps {
  adminEmail: string;
  currentUserRole: string; // Props baru untuk cek role yang sedang login
  onLogout: () => void;
}

export default function AdminDashboard({ adminEmail, currentUserRole, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'posts' | 'users'>('overview');
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<Profile[]>([]);
  const [adminLogs, setAdminLogs] = useState<AdminLog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  
  // Modal States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [showPromoteConfirm, setShowPromoteConfirm] = useState<string | null>(null);
  const [showDemoteConfirm, setShowDemoteConfirm] = useState<string | null>(null);
  const [previewPost, setPreviewPost] = useState<Post | null>(null);
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Load data on mount and tab change
  useEffect(() => {
    loadData();
    loadAdminLogs();
  }, [activeTab]);

  // --- LOAD DATA ---

  const loadData = async () => {
    try {
      // Load Posts
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

      // Load Users
      const profiles = await adminService.getAllUsers();
      setUsers(profiles);

    } catch (error) {
      console.error("Gagal memuat data dashboard:", error);
    }
  };

  const loadAdminLogs = () => {
    const logs = localStorage.getItem('uninotes_admin_logs');
    if (logs) {
      setAdminLogs(JSON.parse(logs));
    }
  };

  // --- ACTIONS ---

  const handleDeletePost = async (postId: string) => {
    try {
      await adminService.deletePost(postId);
      setPosts(posts.filter(p => p.id !== postId)); // Optimistic update
      setShowDeleteConfirm(null);
      logAdminAction('delete_post', postId);
      alert('Postingan berhasil dihapus.');
    } catch (error: any) {
      alert(`Gagal menghapus postingan: ${error.message}`);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    // 🔧 UPDATE: Izinkan Admin & Super Admin untuk mengubah role
    if (currentUserRole !== 'super_admin' && currentUserRole !== 'admin') {
        alert("AKSES DITOLAK: Anda tidak memiliki izin untuk mengubah role.");
        return;
    }

    // 🔧 UPDATE: Proteksi Akun Super Admin (Tidak bisa diubah oleh siapapun)
    const targetUser = users.find(u => u.id_user === userId);
    if (targetUser && targetUser.role === 'super_admin') {
         alert("AKSES DITOLAK: Tidak dapat mengubah akun Super Admin.");
         return;
    }

    setActionLoading(userId);
    try {
      await adminService.changeUserRole(userId, newRole);
      
      // Update local state
      setUsers(users.map(u => u.id_user === userId ? { ...u, role: newRole } : u));
      
      // Close modals
      setShowPromoteConfirm(null);
      setShowDemoteConfirm(null);
      
      logAdminAction(newRole === 'admin' ? 'promote_user' : 'demote_admin', userId);
      alert(`Role berhasil diubah menjadi ${newRole.toUpperCase()}.`);
    } catch (error: any) {
      alert(`Gagal update role: ${error.message}`);
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

  // --- FILTERS & STATS ---

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !postSearchQuery || 
      post.title?.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      post.courseCode?.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
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

  return (
    <div className="min-h-screen bg-gray-50 font-mono">
      {/* Admin Header */}
      <header className={`sticky top-0 z-50 border-b-4 border-black shadow-[0_6px_0_0_rgba(0,0,0,1)] ${currentUserRole === 'super_admin' ? 'bg-gradient-to-r from-red-600 via-orange-600 to-red-700' : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-black p-4 border-4 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] rounded-xl rotate-3 hover:rotate-0 transition-transform">
                {currentUserRole === 'super_admin' ? <ShieldAlert className="w-10 h-10 text-white" /> : <Shield className="w-10 h-10 text-white" />}
              </div>
              <div>
                <h1 className="text-4xl font-black text-white uppercase tracking-tight drop-shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                  {currentUserRole === 'super_admin' ? 'SUPER ADMIN' : 'ADMIN PANEL'}
                </h1>
                <p className="text-white/95 font-bold text-sm mt-1 bg-black/20 px-3 py-1 rounded-full inline-block">
                  {adminEmail}
                </p>
              </div>
            </div>
            
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-black text-white px-8 py-4 border-4 border-white font-black text-lg hover:bg-white hover:text-black hover:border-black transition-all rounded-xl shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              <LogOut className="w-6 h-6" />
              <span className="hidden sm:inline">KELUAR</span>
            </button>
          </div>
        </div>
      </header>

      {/* Warning Banner */}
      <div className="bg-yellow-400 border-y-4 border-black py-4 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 p-2 border-2 border-black rounded-lg">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <p className="font-black text-black text-lg">
              <span className="text-red-600">STATUS:</span> Terhubung ke Database Supabase (Live Mode).
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-6 px-6 font-black text-xl border-4 border-black transition-all rounded-xl ${
              activeTab === 'overview'
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105'
                : 'bg-white text-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <BarChart3 className="w-8 h-8 mx-auto mb-2" />
            OVERVIEW
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`py-6 px-6 font-black text-xl border-4 border-black transition-all rounded-xl ${
              activeTab === 'posts'
                ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105'
                : 'bg-white text-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <FileText className="w-8 h-8 mx-auto mb-2" />
            POSTING ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-6 px-6 font-black text-xl border-4 border-black transition-all rounded-xl ${
              activeTab === 'users'
                ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] scale-105'
                : 'bg-white text-black hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
            }`}
          >
            <UsersIcon className="w-8 h-8 mx-auto mb-2" />
            USERS ({users.length})
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' ? (
          <div className="space-y-8">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <FileText className="w-12 h-12 text-white" />
                  <div className="bg-white/20 p-2 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white/80 font-bold text-sm uppercase mb-1">Total Posting</h3>
                <p className="text-white font-black text-5xl">{stats.totalPosts}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <UsersIcon className="w-12 h-12 text-white" />
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Activity className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white/80 font-bold text-sm uppercase mb-1">Total Users</h3>
                <p className="text-white font-black text-5xl">{stats.totalUsers}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <Shield className="w-12 h-12 text-white" />
                  <div className="bg-white/20 p-2 rounded-lg">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-white/80 font-bold text-sm uppercase mb-1">Admin & Super Admin</h3>
                <p className="text-white font-black text-5xl">{stats.totalAdmins}</p>
              </div>
            </div>
          </div>
        ) : activeTab === 'posts' ? (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="CARI POSTING (judul, kode, author)..."
                    value={postSearchQuery}
                    onChange={(e) => setPostSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 border-4 border-black font-black text-lg rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
                  />
                </div>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="w-full pl-14 pr-4 py-4 border-4 border-black font-black text-lg rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                  >
                    <option value="">SEMUA FAKULTAS</option>
                    {faculties.map(faculty => (
                      <option key={faculty} value={faculty}>{faculty}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Posts List */}
            <div className="space-y-4">
              {filteredPosts.length === 0 ? (
                <div className="bg-white border-4 border-black p-16 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                  <FileText className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="font-black text-gray-400 text-2xl">TIDAK ADA POSTING</p>
                </div>
              ) : (
                filteredPosts.map(post => (
                  <div key={post.id} className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl flex items-center justify-between">
                    <div>
                        <h3 className="font-black text-xl">{post.title}</h3>
                        <p className="text-gray-600">{post.author} - {post.courseCode}</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPreviewPost(post)}
                            className="bg-blue-500 text-white px-4 py-2 border-2 border-black font-bold rounded-lg hover:bg-blue-600 flex items-center gap-2"
                        >
                            <Eye className="w-4 h-4" /> LIHAT
                        </button>
                        <button
                            onClick={() => setShowDeleteConfirm(post.id)}
                            className="bg-red-500 text-white px-4 py-2 border-2 border-black font-bold rounded-lg hover:bg-red-600 flex items-center gap-2"
                        >
                            <Trash2 className="w-4 h-4" /> HAPUS
                        </button>
                    </div>
                    
                    {/* Delete Confirmation */}
                    {showDeleteConfirm === post.id && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                            <div className="bg-white border-4 border-black p-6 rounded-xl shadow-xl max-w-sm w-full">
                                <p className="font-black text-xl mb-4 text-center">Yakin hapus posting ini?</p>
                                <div className="flex gap-4">
                                    <button onClick={() => setShowDeleteConfirm(null)} className="flex-1 py-3 border-2 border-black rounded-lg font-bold">BATAL</button>
                                    <button onClick={() => handleDeletePost(post.id)} className="flex-1 py-3 bg-red-500 text-white border-2 border-black rounded-lg font-bold">YA, HAPUS</button>
                                </div>
                            </div>
                        </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Search User */}
            <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black" />
                <input
                  type="text"
                  placeholder="CARI USER..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-4 py-4 border-4 border-black font-black text-lg rounded-lg focus:outline-none focus:ring-4 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Users List */}
            <div className="space-y-4">
              {filteredUsers.length === 0 ? (
                <div className="bg-white border-4 border-black p-16 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl">
                  <UsersIcon className="w-20 h-20 text-gray-300 mx-auto mb-4" />
                  <p className="font-black text-gray-400 text-2xl">TIDAK ADA USER</p>
                </div>
              ) : (
                filteredUsers.map(user => (
                  <div
                    key={user.id_user}
                    className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all rounded-xl"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1">
                        
                        {/* --- PERBAIKAN: LOGIKA AVATAR/INISIAL --- */}
                        {user.user_profile ? (
                            // Jika ada foto profil, tampilkan foto
                            <img 
                                src={user.user_profile} 
                                alt={user.full_name} 
                                className="w-12 h-12 rounded-xl border-2 border-black object-cover"
                            />
                        ) : (
                            // Jika tidak ada foto, tampilkan inisial (Fallback)
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 border-2 border-black flex items-center justify-center rounded-xl">
                              <span className="font-black text-white text-xl">
                                {user.full_name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                        )}
                        {/* -------------------------------------- */}

                        <div>
                          <h3 className="font-black text-xl">{user.full_name}</h3>
                          <p className="text-sm font-bold text-gray-600">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`px-2 py-0.5 text-xs font-black border border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                              user.role === 'admin' || user.role === 'super_admin' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                            }`}>
                              {user.role === 'super_admin' ? 'SUPER ADMIN' : user.role === 'admin' ? 'ADMIN' : 'USER'}
                            </span>
                            <span className="text-xs font-bold text-gray-500">{user.id_prodi}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Action Buttons: Only show if NOT self and based on permissions */}
                      {user.id_user !== undefined && user.email !== adminEmail && (
                        <div className="flex gap-2">
                            {/* Logic: Admin & Super Admin Actions */}
                            {/* 🔧 UPDATE: Tampilkan tombol untuk 'admin' dan 'super_admin' */}
                            {(currentUserRole === 'super_admin' || currentUserRole === 'admin') ? (
                                <>
                                    {/* Prevent actions on Super Admin targets */}
                                    {user.role === 'super_admin' ? (
                                        <span className="text-gray-400 font-bold text-xs flex items-center gap-1 border-2 border-transparent px-2 py-1">
                                            <Shield className="w-4 h-4" /> MASTER ACCOUNT
                                        </span>
                                    ) : (
                                        <>
                                            {/* User -> Admin */}
                                            {user.role === 'user' && (
                                                <button
                                                    onClick={() => setShowPromoteConfirm(user.email)}
                                                    className="bg-green-500 text-white px-4 py-2 border-2 border-black font-bold rounded-lg hover:bg-green-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] flex items-center gap-2"
                                                >
                                                    <ArrowUpCircle className="w-4 h-4" /> JADIKAN ADMIN
                                                </button>
                                            )}

                                            {/* Admin -> User */}
                                            {user.role === 'admin' && (
                                                <button
                                                    onClick={() => setShowDemoteConfirm(user.email)}
                                                    className="bg-orange-500 text-white px-4 py-2 border-2 border-black font-bold rounded-lg hover:bg-orange-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[1px] active:translate-y-[1px] flex items-center gap-2"
                                                >
                                                    <ArrowDownCircle className="w-4 h-4" /> TURUNKAN
                                                </button>
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                // User Biasa (Cannot change roles)
                                <span className="text-gray-400 font-bold text-xs flex items-center gap-1 border-2 border-transparent px-2 py-1">
                                    <Shield className="w-4 h-4" /> AKSES DIBATASI
                                </span>
                            )}
                        </div>
                      )}
                    </div>

                    {/* Promote Confirmation */}
                    {showPromoteConfirm === user.email && (
                      <div className="mt-4 p-4 bg-green-50 border-t-2 border-black">
                        <p className="font-bold text-green-800 mb-2">Jadikan {user.full_name} sebagai Admin?</p>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleRoleChange(user.id_user, 'admin')} 
                                disabled={actionLoading === user.id_user}
                                className="bg-green-500 text-white px-4 py-2 border-2 border-black rounded font-bold"
                            >
                                {actionLoading === user.id_user ? 'MEMPROSES...' : 'YA'}
                            </button>
                            <button onClick={() => setShowPromoteConfirm(null)} className="bg-white px-4 py-2 border-2 border-black rounded font-bold">BATAL</button>
                        </div>
                      </div>
                    )}

                    {/* Demote Confirmation */}
                    {showDemoteConfirm === user.email && (
                      <div className="mt-4 p-4 bg-orange-50 border-t-2 border-black">
                        <p className="font-bold text-orange-800 mb-2">Turunkan {user.full_name} menjadi User biasa?</p>
                        <div className="flex gap-2">
                            <button 
                                onClick={() => handleRoleChange(user.id_user, 'user')} 
                                disabled={actionLoading === user.id_user}
                                className="bg-orange-500 text-white px-4 py-2 border-2 border-black rounded font-bold"
                            >
                                {actionLoading === user.id_user ? 'MEMPROSES...' : 'YA'}
                            </button>
                            <button onClick={() => setShowDemoteConfirm(null)} className="bg-white px-4 py-2 border-2 border-black rounded font-bold">BATAL</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewPost && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={() => setPreviewPost(null)}>
          <div className="relative max-w-6xl w-full max-h-[95vh]" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setPreviewPost(null)}
              className="absolute -top-12 right-0 bg-white text-black px-8 py-3 border-4 border-white font-black hover:bg-black hover:text-white transition-all rounded-lg shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none z-20"
            >
              ✕ TUTUP
            </button>
            <div className="bg-white border-4 border-black rounded-xl overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              {previewPost.fileData ? (
                <>
                  {previewPost.fileType === 'IMG' ? (
                    <img
                      src={previewPost.fileData}
                      alt={previewPost.title}
                      className="w-full h-auto max-h-[90vh] object-contain bg-gray-100"
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-red-500 to-orange-500 p-20 text-center min-h-[500px] flex flex-col items-center justify-center">
                      <FileText className="w-32 h-32 text-white mb-6" />
                      <p className="font-black text-white text-4xl mb-3">FILE PDF</p>
                      <a href={previewPost.fileData} target="_blank" rel="noopener noreferrer" className="mt-6 bg-white text-red-500 px-6 py-3 rounded-lg font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                        DOWNLOAD / LIHAT PDF
                      </a>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-gray-200 p-20 text-center min-h-[500px] flex flex-col items-center justify-center">
                  <FileText className="w-32 h-32 text-gray-400 mb-6" />
                  <p className="font-black text-gray-600 text-3xl">FILE TIDAK TERSEDIA</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}