import { X, User, Mail, Lock, GraduationCap, BookOpen, Loader2, Building2, Eye, EyeOff } from 'lucide-react';
import { useState, useEffect } from 'react';
import { authService, masterService, Faculty, Prodi } from '../services/api';

interface RegisterProps {
  onClose: () => void;
  onRegisterSuccess: () => void;
  onSwitchToLogin: () => void;
}

export default function Register({ onClose, onRegisterSuccess, onSwitchToLogin }: RegisterProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    facultyId: '', // Menyimpan ID Fakultas (misal: 'FT')
    prodiId: ''    // Menyimpan ID Prodi (misal: 'PRODI-IF')
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // State Data Master
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [prodiList, setProdiList] = useState<Prodi[]>([]);
  
  // State UI
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [backendError, setBackendError] = useState('');

  // 1. Load Fakultas saat komponen muncul
  useEffect(() => {
    const loadFaculties = async () => {
      try {
        const data = await masterService.getFaculties();
        setFaculties(data);
      } catch (err) {
        console.error("Gagal memuat fakultas", err);
      }
    };
    loadFaculties();
  }, []);

  // 2. Load Prodi saat Fakultas dipilih
  useEffect(() => {
    const loadProdi = async () => {
      if (formData.facultyId) {
        try {
          const data = await masterService.getProdiByFaculty(formData.facultyId);
          setProdiList(data);
          // Reset prodi jika user mengganti fakultas agar tidak mismatch
          setFormData(prev => ({ ...prev, prodiId: '' })); 
        } catch (err) {
          console.error("Gagal memuat prodi", err);
        }
      } else {
        setProdiList([]);
      }
    };
    loadProdi();
  }, [formData.facultyId]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Hapus error saat user mengetik
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    if (backendError) setBackendError('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Nama lengkap harus diisi';
    else if (formData.fullName.trim().length < 3) newErrors.fullName = 'Nama lengkap minimal 3 karakter';

    if (!formData.email) newErrors.email = 'Email harus diisi';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Format email tidak valid';

    if (!formData.facultyId) newErrors.facultyId = 'Fakultas harus dipilih';
    if (!formData.prodiId) newErrors.prodiId = 'Program studi harus dipilih';

    if (!formData.password) newErrors.password = 'Kata sandi harus diisi';
    else if (formData.password.length < 6) newErrors.password = 'Kata sandi minimal 6 karakter';

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Kata sandi tidak cocok';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBackendError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      await authService.signUp(formData.email, formData.password, {
        fullName: formData.fullName,
        facultyId: formData.facultyId,
        prodiId: formData.prodiId
      });

      // Jika berhasil
      alert('Registrasi Berhasil! Silakan cek email Anda untuk verifikasi (jika diperlukan) atau langsung Login.');
      onRegisterSuccess();
      onClose(); // Tutup modal register
      onSwitchToLogin(); // Buka modal login

    } catch (error: any) {
      console.error("Register Error:", error);
      setBackendError(error.message || 'Terjadi kesalahan saat mendaftar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto py-8 font-mono">
      {/* Modal */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl mx-4 animate-in zoom-in-95 duration-300 my-8 relative">

        {/* Header */}
        <div className="pt-12 pb-8 px-8 text-center bg-[#4285F4] border-b-2 border-black">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <User className="w-8 h-8 text-black" />
          </div>

          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight text-stroke-black">
            Buat Akun Baru
          </h2>
          <p className="text-white font-bold">
            Bergabung dengan mahasiswa lainnya di UniNotes!
          </p>
        </div>

        {/* Error Umum dari Backend */}
        {backendError && (
            <div className="mx-8 mt-6 bg-red-100 border-2 border-[#EA4335] text-[#EA4335] p-3 font-bold text-center">
                ⚠️ {backendError}
            </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Full Name */}
            <div className="md:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-black text-black mb-2 uppercase">
                Nama Lengkap <span className="text-[#EA4335]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <User className="w-5 h-5 text-black" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Masukkan nama lengkap..."
                  className={`w-full pl-14 pr-4 py-3 border-2 ${
                    errors.fullName ? 'border-[#EA4335] bg-red-50' : 'border-black'
                  } focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold placeholder:text-gray-400 placeholder:font-normal`}
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-sm text-[#EA4335] font-bold bg-[#EA4335]/10 p-1 border-l-2 border-[#EA4335]">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-black text-black mb-2 uppercase">
                Email <span className="text-[#EA4335]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
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

            {/* Faculty */}
            <div className="md:col-span-2">
              <label htmlFor="faculty" className="block text-sm font-black text-black mb-2 uppercase">
                Fakultas <span className="text-[#EA4335]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <Building2 className="w-5 h-5 text-black" />
                </div>
                <select
                  id="faculty"
                  value={formData.facultyId}
                  onChange={(e) => handleChange('facultyId', e.target.value)}
                  className={`w-full pl-14 pr-4 py-3 border-2 ${
                    errors.facultyId ? 'border-[#EA4335] bg-red-50' : 'border-black'
                  } focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all appearance-none bg-white cursor-pointer font-bold`}
                >
                  <option value="">Pilih fakultas...</option>
                  {faculties.map((f) => (
                    <option key={f.id_faculty} value={f.id_faculty}>
                      {f.faculty_name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black border-l-2 border-black bg-[#34A853]">
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.facultyId && (
                <p className="mt-1 text-sm text-[#EA4335] font-bold bg-[#EA4335]/10 p-1 border-l-2 border-[#EA4335]">{errors.facultyId}</p>
              )}
            </div>

            {/* Prodi */}
            <div className="md:col-span-2">
              <label htmlFor="prodi" className="block text-sm font-black text-black mb-2 uppercase">
                Program Studi <span className="text-[#EA4335]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <GraduationCap className="w-5 h-5 text-black" />
                </div>
                <select
                  id="prodi"
                  value={formData.prodiId}
                  onChange={(e) => handleChange('prodiId', e.target.value)}
                  disabled={!formData.facultyId}
                  className={`w-full pl-14 pr-4 py-3 border-2 ${
                    errors.prodiId ? 'border-[#EA4335] bg-red-50' : 'border-black'
                  } focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all appearance-none bg-white cursor-pointer font-bold disabled:bg-gray-200 disabled:cursor-not-allowed`}
                >
                  <option value="">
                    {formData.facultyId ? "Pilih program studi..." : "Pilih fakultas dahulu..."}
                  </option>
                  {prodiList.map((p) => (
                    <option key={p.id_prodi} value={p.id_prodi}>
                      {p.prodi_name}
                    </option>
                  ))}
                </select>
                <div className={`pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-black border-l-2 border-black ${!formData.facultyId ? 'bg-gray-300' : 'bg-[#34A853]'}`}>
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {errors.prodiId && (
                <p className="mt-1 text-sm text-[#EA4335] font-bold bg-[#EA4335]/10 p-1 border-l-2 border-[#EA4335]">{errors.prodiId}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-black text-black mb-2 uppercase">
                Kata Sandi <span className="text-[#EA4335]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <Lock className="w-5 h-5 text-black" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Min. 6 karakter"
                  className={`w-full pl-14 pr-12 py-3 border-2 ${
                    errors.password ? 'border-[#EA4335] bg-red-50' : 'border-black'
                  } focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold placeholder:text-gray-400 placeholder:font-normal`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#4285F4] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-[#EA4335] font-bold bg-[#EA4335]/10 p-1 border-l-2 border-[#EA4335]">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-black text-black mb-2 uppercase">
                Konfirmasi Kata Sandi <span className="text-[#EA4335]">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-10 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                  <Lock className="w-5 h-5 text-black" />
                </div>
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Ulangi kata sandi"
                  className={`w-full pl-14 pr-12 py-3 border-2 ${
                    errors.confirmPassword ? 'border-[#EA4335] bg-red-50' : 'border-black'
                  } focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all font-bold placeholder:text-gray-400 placeholder:font-normal`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#4285F4] transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-[#EA4335] font-bold bg-[#EA4335]/10 p-1 border-l-2 border-[#EA4335]">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#34A853] text-white font-black uppercase tracking-wider py-4 px-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin h-5 w-5 text-white" />
                Mendaftar...
              </span>
            ) : (
              'Daftar Sekarang'
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="bg-gray-100 px-8 py-6 text-center border-t-2 border-black">
          <p className="text-black font-bold">
            Sudah punya akun?{' '}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-[#4285F4] hover:underline decoration-2 font-black uppercase"
            >
              Masuk di sini
            </button>
          </p>
        </div>

        {/* Close Button - DILETAKKAN PALING BAWAH AGAR MUNCUL PALING DEPAN (Z-INDEX MENANG) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[#EA4335] border-2 border-black flex items-center justify-center transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-50"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-white" />
        </button>

      </div>
    </div>
  );
}