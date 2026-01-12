import { Mail, Lock, Eye, EyeOff, X, LogIn } from 'lucide-react';
import { useState } from 'react';
// Import service Supabase yang sudah kita buat
import { authService } from '../services/api'; 

interface LoginProps {
  onClose: () => void;
  onLoginSuccess: () => void; // Parent component akan handle redirect berdasarkan role nanti
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export default function Login({ onClose, onLoginSuccess, onSwitchToRegister, onForgotPassword }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // State error validasi form
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  // State error dari Backend (misal: Password salah)
  const [backendError, setBackendError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }

    if (!password) {
      newErrors.password = 'Kata sandi harus diisi';
    } else if (password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError(''); // Reset error backend

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 1. Panggil Supabase Login
      await authService.signIn(email, password);

      // 2. Cek Role User (Optional: untuk memastikan user ada di tabel profiles)
      // Langkah ini memastikan data profil termuat sebelum menutup modal
      const userProfile = await authService.getCurrentUserWithRole();
      
      if (!userProfile) {
        throw new Error("Data profil tidak ditemukan.");
      }

      console.log("Login Berhasil sebagai:", userProfile.role);

      // 3. Sukses
      onLoginSuccess(); // Trigger parent (App.tsx) untuk update state user & redirect dashboard
      onClose(); // Tutup modal

    } catch (error: any) {
      console.error("Login Error:", error);
      // Tampilkan pesan error yang user-friendly
      setBackendError('Email atau kata sandi salah. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-mono">
      {/* Modal */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md mx-4 animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[#EA4335] border-2 border-black flex items-center justify-center transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Header */}
        <div className="pt-12 pb-8 px-8 text-center bg-[#FBBC05] border-b-2 border-black">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <LogIn className="w-8 h-8 text-black" />
          </div>

          <h2 className="text-3xl font-black text-black mb-2 uppercase tracking-tight">
            Selamat Datang
          </h2>
          <p className="text-black font-bold">
            Masuk untuk mulai berbagi dan mengunduh catatan
          </p>
        </div>

        {/* Backend Error Alert (Ditambahkan agar user tahu jika login gagal) */}
        {backendError && (
          <div className="mx-8 mt-6 bg-red-100 border-2 border-[#EA4335] text-[#EA4335] p-3 font-bold text-center text-sm">
            ⚠️ {backendError}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-black text-black mb-2 uppercase">
              Email
            </label>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                <Mail className="w-5 h-5 text-black" />
              </div>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                  if (backendError) setBackendError(''); // Hapus error backend saat mengetik
                }}
                placeholder="nama@email.com"
                className={`w-full pl-14 pr-4 py-3 border-2 ${
                  errors.email ? 'border-[#EA4335] bg-red-50' : 'border-black'
                } focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold placeholder:text-gray-400 placeholder:font-normal`}
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-sm text-[#EA4335] font-bold bg-[#EA4335]/10 p-1 border-l-2 border-[#EA4335]">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="password" className="block text-sm font-black text-black uppercase">
                Kata Sandi
              </label>
              <button
                type="button"
                className="text-xs font-bold text-[#4285F4] hover:underline decoration-2"
                onClick={onForgotPassword}
              >
                Lupa sandi?
              </button>
            </div>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                <Lock className="w-5 h-5 text-black" />
              </div>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                  if (backendError) setBackendError('');
                }}
                placeholder="Masukkan kata sandi..."
                className={`w-full pl-14 pr-12 py-3 border-2 ${
                  errors.password ? 'border-[#EA4335] bg-red-50' : 'border-black'
                } focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold placeholder:text-gray-400 placeholder:font-normal`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#4285F4] transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-[#EA4335] font-bold bg-[#EA4335]/10 p-1 border-l-2 border-[#EA4335]">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#34A853] text-white font-black uppercase tracking-wider py-4 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              </span>
            ) : (
              'Masuk Sekarang'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-100 px-8 py-6 text-center border-t-2 border-black">
          <p className="text-black font-bold">
            Belum punya akun?{' '}
            <button
              type="button"
              className="text-[#4285F4] hover:underline decoration-2 font-black uppercase"
              onClick={onSwitchToRegister}
            >
              Daftar di sini
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}