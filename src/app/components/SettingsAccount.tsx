import { ArrowLeft, User, Mail, GraduationCap, BookOpen, LogOut, Camera, Upload, Lock, Key, Eye, EyeOff, Save, ChevronRight, ShieldCheck, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
// IMPORT SERVICE SUPABASE
import { authService } from '../services/api';

interface UserData {
  fullName: string;
  email: string;
  faculty: string;
  prodi: string;
  profilePicture?: string;
  role?: string;
}

interface SettingsAccountProps {
  onBack: () => void;
  userData: UserData;
  onLogout: () => void;
  onUpdateUser: (userData: UserData) => void;
}

export default function SettingsAccount({ onBack, userData, onLogout, onUpdateUser }: SettingsAccountProps) {
  const [activeTab, setActiveTab] = useState<'main' | 'security'>('main');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State untuk Upload Foto
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  // Password Change States
  const [passwordForm, setPasswordForm] = useState({
    current: '', // Field baru untuk password lama
    new: '',
    confirm: ''
  });
  const [showPassword, setShowPassword] = useState({
    current: false, // Toggle visibility password lama
    new: false,
    confirm: false
  });
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // --- 1. FETCH DATA TERBARU SAAT LOAD ---
  useEffect(() => {
    const fetchFreshUserData = async () => {
      try {
        const freshProfile = await authService.getCurrentUserWithRole();
        
        if (freshProfile) {
          onUpdateUser({
            fullName: freshProfile.full_name,
            email: freshProfile.email,
            // Menggunakan optional chaining untuk support data join dari api.ts
            faculty: freshProfile.faculties?.faculty_name || freshProfile.faculty_name || '-', 
            prodi: freshProfile.prodi?.prodi_name || freshProfile.prodi_name || '-',
            role: freshProfile.role,
            profilePicture: freshProfile.user_profile
          });
        }
      } catch (error) {
        console.error("Gagal menyinkronkan data user:", error);
      }
    };

    fetchFreshUserData();
  }, []);

  const handleLogoutClick = () => setShowLogoutConfirm(true);
  const confirmLogout = () => { setShowLogoutConfirm(false); onLogout(); };

  // --- 2. LOGIKA GANTI FOTO PROFIL ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return alert('Ukuran file terlalu besar! Maksimal 2MB.');

    setIsUploadingImage(true);
    try {
      const currentUser = await authService.getCurrentUserWithRole();
      if (!currentUser) throw new Error("Sesi tidak valid. Silakan login ulang.");

      const publicUrl = await authService.uploadAvatar(file, currentUser.id_user);
      await authService.updateUserProfile(currentUser.id_user, { user_profile: publicUrl });

      const freshProfile = await authService.getCurrentUserWithRole();
      if (freshProfile) {
          onUpdateUser({
            fullName: freshProfile.full_name,
            email: freshProfile.email,
            faculty: freshProfile.faculties?.faculty_name || userData.faculty,
            prodi: freshProfile.prodi?.prodi_name || userData.prodi,
            role: freshProfile.role,
            profilePicture: publicUrl
          });
      }
      alert("Foto profil berhasil diperbarui!");
    } catch (error: any) {
      alert(`Gagal mengganti foto: ${error.message}`);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // --- 3. LOGIKA GANTI PASSWORD (DENGAN VERIFIKASI OLD PASSWORD) ---
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus({ type: null, message: '' });

    // Validasi: Semua field harus diisi
    if (!passwordForm.current || !passwordForm.new || !passwordForm.confirm) {
      return setPasswordStatus({ type: 'error', message: 'Mohon isi semua kolom kata sandi.' });
    }

    if (passwordForm.new.length < 6) {
      return setPasswordStatus({ type: 'error', message: 'Kata sandi baru minimal 6 karakter.' });
    }

    if (passwordForm.new !== passwordForm.confirm) {
      return setPasswordStatus({ type: 'error', message: 'Konfirmasi kata sandi baru tidak cocok.' });
    }

    setIsSavingPassword(true);

    try {
      // 1. VERIFIKASI: Coba login dengan password lama untuk memastikan user adalah pemilik akun
      try {
        await authService.signIn(userData.email, passwordForm.current);
      } catch (error) {
        throw new Error("Kata sandi saat ini salah.");
      }

      // 2. UPDATE: Jika login berhasil (password lama benar), baru update password
      await authService.updateUserPassword(passwordForm.new);

      // Sukses
      setPasswordStatus({ type: 'success', message: 'Kata sandi berhasil diperbarui!' });
      setPasswordForm({ current: '', new: '', confirm: '' });

    } catch (error: any) {
      console.error("Gagal update password:", error);
      setPasswordStatus({ type: 'error', message: error.message || 'Gagal memperbarui kata sandi.' });
    } finally {
      setIsSavingPassword(false);
    }
  };

  // Render Main Settings View
  const renderMainView = () => (
    <div className="animate-in slide-in-from-left-5 duration-300">
      {/* Profile Information Section */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
        {/* Header with Avatar & Photo Upload */}
        <div className="bg-[#34A853] px-6 py-8 border-b-2 border-black relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-10 rounded-full -mr-10 -mt-10"></div>
          <div className="flex flex-col sm:flex-row items-center gap-6 relative z-10">
            <div className="relative group cursor-pointer" onClick={triggerFileInput} title="Ganti Foto Profil">
              <div className="w-24 h-24 bg-white border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative">
                {isUploadingImage && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <Loader2 className="animate-spin h-6 w-6 text-white" />
                  </div>
                )}
                {userData.profilePicture ? (
                  <img src={userData.profilePicture} alt="Profile" className="w-full h-full object-cover"/>
                ) : (
                  <span className="text-4xl font-black text-black">{userData.fullName?.charAt(0).toUpperCase()}</span>
                )}
              </div>
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#FBBC05] border-2 border-black p-1.5 rounded-full shadow-sm z-10 group-hover:scale-110 transition-transform">
                <Upload className="w-4 h-4 text-black" />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            </div>

            <div className="text-white text-center sm:text-left">
              <h2 className="text-3xl font-black mb-1 uppercase text-stroke-black">{userData.fullName}</h2>
              <p className="text-black font-bold bg-[#FBBC05] inline-block px-2 border-2 border-black mb-2">{userData.email}</p>
              <p className="text-xs font-bold text-white/90 uppercase tracking-wide">Klik foto untuk mengganti</p>
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="p-8 space-y-6">
          <h3 className="font-black text-xl text-black mb-6 flex items-center gap-2 uppercase">
            <User className="w-6 h-6 text-black" /> Informasi Akun
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center gap-4 p-4 border-2 border-black border-dashed bg-gray-50">
              <div className="w-10 h-10 bg-[#4285F4] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><User className="w-5 h-5 text-white" /></div>
              <div><p className="text-xs font-bold text-gray-500 uppercase">Nama Lengkap</p><p className="font-black text-black">{userData.fullName}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 border-2 border-black border-dashed bg-gray-50">
              <div className="w-10 h-10 bg-[#34A853] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><Mail className="w-5 h-5 text-white" /></div>
              <div><p className="text-xs font-bold text-gray-500 uppercase">Email</p><p className="font-black text-black">{userData.email}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 border-2 border-black border-dashed bg-gray-50">
              <div className="w-10 h-10 bg-[#EA4335] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><GraduationCap className="w-5 h-5 text-white" /></div>
              <div><p className="text-xs font-bold text-gray-500 uppercase">Fakultas</p><p className="font-black text-black">{userData.faculty || '-'}</p></div>
            </div>
            <div className="flex items-center gap-4 p-4 border-2 border-black border-dashed bg-gray-50">
              <div className="w-10 h-10 bg-[#FBBC05] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><BookOpen className="w-5 h-5 text-black" /></div>
              <div><p className="text-xs font-bold text-gray-500 uppercase">Program Studi</p><p className="font-black text-black">{userData.prodi || '-'}</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 mb-8">
        <button onClick={() => setActiveTab('security')} className="w-full group bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all text-left flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-transparent group-hover:border-black group-hover:bg-[#4285F4] transition-colors"><ShieldCheck className="w-6 h-6" /></div>
            <div><h4 className="font-black text-xl text-black uppercase">Keamanan Akun</h4><p className="text-sm font-bold text-gray-500">Ganti kata sandi & proteksi</p></div>
          </div>
          <ChevronRight className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform" />
        </button>
        <button onClick={handleLogoutClick} className="w-full group bg-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(234,67,53,1)] hover:border-[#EA4335] hover:-translate-y-1 transition-all text-left flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 text-black flex items-center justify-center border-2 border-black group-hover:bg-[#EA4335] group-hover:text-white transition-colors"><LogOut className="w-6 h-6" /></div>
            <div><h4 className="font-black text-xl text-black uppercase group-hover:text-[#EA4335] transition-colors">Keluar</h4><p className="text-sm font-bold text-gray-500">Akhiri sesi aplikasi</p></div>
          </div>
          <ChevronRight className="w-6 h-6 text-black group-hover:translate-x-1 transition-transform group-hover:text-[#EA4335]" />
        </button>
      </div>
    </div>
  );

  const renderSecurityView = () => (
    <div className="animate-in slide-in-from-right-5 duration-300">
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8">
        <div className="p-8 border-b-2 border-black bg-gray-50 flex items-center gap-4">
           <div className="w-10 h-10 bg-[#4285F4] border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><ShieldCheck className="w-5 h-5 text-white" /></div>
           <div><h3 className="font-black text-xl text-black uppercase">Keamanan Akun</h3><p className="text-sm font-bold text-gray-500">Perbarui kata sandi Anda</p></div>
        </div>

        <div className="p-8">
          <form onSubmit={handleChangePassword} className="space-y-6 max-w-2xl mx-auto">
            {passwordStatus.message && (
              <div className={`p-4 border-2 border-black font-bold text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2 ${passwordStatus.type === 'error' ? 'bg-red-50 text-[#EA4335]' : 'bg-green-50 text-[#34A853]'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordStatus.type === 'error' ? 'bg-[#EA4335]' : 'bg-[#34A853]'}`}></div>
                {passwordStatus.message}
              </div>
            )}

            {/* --- 1. CURRENT PASSWORD FIELD --- */}
            <div>
              <label className="block text-sm font-black text-black mb-2 uppercase">Kata Sandi Saat Ini</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <Lock className="w-5 h-5 text-black" />
                </div>
                <input 
                  type={showPassword.current ? "text" : "password"}
                  value={passwordForm.current}
                  onChange={(e) => setPasswordForm({...passwordForm, current: e.target.value})}
                  className="w-full pl-16 pr-12 py-3 border-2 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-gray-400"
                  placeholder="Masukkan kata sandi lama"
                />
                <button type="button" onClick={() => setShowPassword({...showPassword, current: !showPassword.current})} className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#4285F4]">
                  {showPassword.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* --- 2. NEW PASSWORD FIELD --- */}
            <div>
              <label className="block text-sm font-black text-black mb-2 uppercase">Kata Sandi Baru</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <Key className="w-5 h-5 text-black" />
                </div>
                <input 
                  type={showPassword.new ? "text" : "password"}
                  value={passwordForm.new}
                  onChange={(e) => setPasswordForm({...passwordForm, new: e.target.value})}
                  className="w-full pl-16 pr-12 py-3 border-2 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-gray-400"
                  placeholder="Minimal 6 karakter"
                />
                <button type="button" onClick={() => setShowPassword({...showPassword, new: !showPassword.new})} className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#4285F4]">
                  {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* --- 3. CONFIRM PASSWORD FIELD --- */}
            <div>
              <label className="block text-sm font-black text-black mb-2 uppercase">Konfirmasi Kata Sandi Baru</label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <Lock className="w-5 h-5 text-black" />
                </div>
                <input 
                  type={showPassword.confirm ? "text" : "password"}
                  value={passwordForm.confirm}
                  onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                  className="w-full pl-16 pr-12 py-3 border-2 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-gray-400"
                  placeholder="Ulangi kata sandi baru"
                />
                <button type="button" onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})} className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#4285F4]">
                  {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="pt-4 flex gap-4">
              <button type="button" onClick={() => setActiveTab('main')} className="flex-1 bg-white text-black px-6 py-3 border-2 border-black hover:bg-gray-100 transition-all font-black uppercase">
                Batal
              </button>
              <button type="submit" disabled={isSavingPassword} className="flex-[2] bg-black text-white px-8 py-3 border-2 border-black hover:bg-[#34A853] transition-all flex items-center justify-center gap-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed rounded-lg">
                {isSavingPassword ? <><Loader2 className="animate-spin h-4 w-4 text-white" />Menyimpan...</> : <><Save className="w-4 h-4" />Simpan Perubahan</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-mono">
      <div className="bg-white border-b-2 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button onClick={() => activeTab === 'main' ? onBack() : setActiveTab('main')} className="flex items-center gap-2 text-black hover:text-[#4285F4] mb-6 transition-colors font-bold uppercase group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>{activeTab === 'main' ? 'Kembali ke Beranda' : 'Kembali ke Menu'}</span>
          </button>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div><h1 className="text-4xl font-black text-black mb-2 uppercase tracking-tight">Pengaturan Akun</h1><p className="text-black font-bold">{activeTab === 'main' ? 'Kelola profil dan preferensi aplikasi' : 'Kelola kata sandi dan keamanan akun'}</p></div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'main' ? renderMainView() : renderSecurityView()}
        {activeTab === 'main' && <div className="mt-8 text-center"><p className="text-sm font-bold text-gray-500">Akun dibuat dengan email: <span className="font-black text-black">{userData.email}</span></p></div>}
      </div>
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-mono animate-in fade-in duration-200">
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-8 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-[#FBBC05] border-2 border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full"><LogOut className="w-10 h-10 text-black" /></div>
              <h3 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">Keluar dari Akun?</h3>
              <p className="text-black font-bold mb-8">Anda akan keluar dari akun <span className="bg-[#4285F4] text-white px-1 border border-black">{userData.fullName}</span>.</p>
              <div className="flex gap-4 w-full">
                <button onClick={() => setShowLogoutConfirm(false)} className="flex-1 px-6 py-4 border-2 border-black text-black hover:bg-gray-100 transition-all font-black uppercase tracking-wide rounded-lg">Batal</button>
                <button onClick={confirmLogout} className="flex-1 px-6 py-4 bg-[#EA4335] text-white border-2 border-black hover:bg-red-600 transition-all font-black uppercase tracking-wide flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none rounded-lg"><LogOut className="w-4 h-4" />Ya, Keluar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}