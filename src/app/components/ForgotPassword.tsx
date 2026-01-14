import { Mail, Lock, Eye, EyeOff, X, Key, ArrowRight, Check, AlertCircle, ShieldCheck, RefreshCw, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
// 🔌 Ini kabel data ke Database (Supabase)
import { authService, supabase } from '../services/api'; 

/* =============================================================================
   📝 DATA DARI LUAR (PROPS)
   Data yang dikirim dari halaman Login ke sini.
   =============================================================================
*/
interface ForgotPasswordProps {
  onClose: () => void;           // Fungsi buat tutup pop-up ini
  onSwitchToLogin: () => void;   // Fungsi buat pindah ke halaman Login
}

/* =============================================================================
   🔐 HALAMAN LUPA PASSWORD
   =============================================================================
*/
export default function ForgotPassword({ onClose, onSwitchToLogin }: ForgotPasswordProps) {
  
  // --- 🧠 MEMORI SEMENTARA (STATE) ---
  
  // 1. TAHAP: Kita lagi di langkah mana? (email -> pin -> password baru -> sukses)
  const [step, setStep] = useState<'email' | 'verify-pin' | 'new-password' | 'success'>('email');
  
  // 2. DATA INPUT: Apa yang diketik user?
  const [email, setEmail] = useState('');
  const [passwordForm, setPasswordForm] = useState({
    new: '',
    confirm: ''
  });
  const [inputPin, setInputPin] = useState(''); // Kode PIN 6 angka
  
  // 3. TAMPILAN: Password kelihatan atau titik-titik?
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });
  
  // 4. STATUS: Lagi loading (muter-muter) atau ada error?
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 5. WAKTU: Hitung mundur buat kirim ulang kode
  const [resendTimer, setResendTimer] = useState(0);

  // --- ⏱️ PENGHITUNG WAKTU MUNDUR ---
  useEffect(() => {
    let interval: any; // Ubah tipe jadi 'any' biar aman dari error TypeScript
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1); // Kurangi 1 detik
      }, 1000);
    }
    return () => clearInterval(interval); // Berhenti kalau komponen ditutup
  }, [resendTimer]);

  // ===========================================================================
  // 🚀 LANGKAH 1: KIRIM KODE KE EMAIL
  // ===========================================================================
  const handleVerifyEmail = async (e: React.FormEvent) => {
    e.preventDefault(); // Biar halaman gak refresh sendiri
    setError('');       // Hapus pesan error lama

    // Cek dulu: Email diisi gak?
    if (!email) {
      setError('Email harus diisi');
      return;
    }

    setIsLoading(true); // Nyalain loading...

    try {
      // Panggil Supabase: "Eh, kirim kode OTP ke email ini dong!"
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            shouldCreateUser: false // Cuma buat user lama, jangan buat baru
        }
      });
      
      if (error) throw error; // Kalau gagal, lempar error
      
      // Kalau berhasil:
      setIsLoading(false);
      setStep('verify-pin'); // Pindah ke Langkah 2 (Isi PIN)
      setResendTimer(60);    // Mulai hitung mundur 60 detik
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
      setError(err.message || 'Gagal mengirim kode. Pastikan email terdaftar.');
    }
  };

  // ===========================================================================
  // 🛡️ LANGKAH 2: CEK KODE PIN
  // ===========================================================================
  const handleVerifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Cek: PIN harus 6 angka
    if (inputPin.length !== 6) {
      setError('Masukkan 6 digit kode PIN');
      return;
    }

    setIsLoading(true);

    try {
      // Tanya Supabase: "Kode ini bener gak?"
      const { error } = await supabase.auth.verifyOtp({
        email: email,
        token: inputPin,
        type: 'recovery' // Tipe pemulihan akun
      });

      if (error) throw error;
      
      // Kalau PIN benar:
      setIsLoading(false);
      setStep('new-password'); // Pindah ke Langkah 3 (Password Baru)
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
      setError('Kode PIN salah atau kadaluarsa. Silakan coba lagi.');
    }
  };

  // Fungsi Kirim Ulang Kode (kalau belum masuk)
  const handleResendPin = async () => {
    if (resendTimer > 0) return; // Tunggu timer habis dulu

    setIsLoading(true);
    setError('');
    try {
        const { error } = await supabase.auth.signInWithOtp({
            email: email,
            options: { shouldCreateUser: false }
        });
        
        if (error) throw error;

        alert(`Kode baru telah dikirim ke ${email}`);
        setResendTimer(60);
    } catch (err: any) {
        setError("Gagal mengirim ulang kode: " + err.message);
    } finally {
        setIsLoading(false);
    }
  };

  // ===========================================================================
  // 🔑 LANGKAH 3: SIMPAN PASSWORD BARU
  // ===========================================================================
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Cek syarat password
    if (passwordForm.new.length < 6) {
      setError('Kata sandi minimal 6 karakter');
      return;
    }

    // Cek apakah password sama
    if (passwordForm.new !== passwordForm.confirm) {
      setError('Konfirmasi kata sandi tidak cocok');
      return;
    }

    setIsLoading(true);

    try {
      // Bilang ke Supabase: "Ganti password user ini ya!"
      await authService.updateUserPassword(passwordForm.new);
      
      setIsLoading(false);
      setStep('success'); // Pindah ke Langkah 4 (Sukses)
    } catch (err: any) {
      setIsLoading(false);
      console.error(err);
      setError('Gagal memperbarui kata sandi: ' + err.message);
    }
  };

  // ===========================================================================
  // 🎨 TAMPILAN UTAMA (HTML) - UBAH WARNA & POSISI DI SINI
  // ===========================================================================
  return (
    // Layar Hitam Transparan di Belakang
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 font-mono">
      
      {/* Kotak Putih Utama */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md mx-4 animate-in zoom-in-95 duration-300 relative">
        
        {/* Tombol Silang (X) di Pojok Kanan Atas */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-[#EA4335] border-2 border-black flex items-center justify-center transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-10"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* --- BAGIAN KEPALA (HEADER BIRU) --- */}
        <div className="pt-12 pb-8 px-8 text-center bg-[#4285F4] border-b-2 border-black">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white border-2 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Key className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight text-stroke-black">
            Lupa Sandi?
          </h2>
          {/* Teks Penjelasan Berubah Sesuai Langkah */}
          <p className="text-white font-bold opacity-90">
            {step === 'email' && 'Masukkan email untuk mencari akunmu'}
            {step === 'verify-pin' && 'Cek email Anda untuk kode verifikasi'}
            {step === 'new-password' && 'Buat kata sandi baru yang aman'}
            {step === 'success' && 'Kata sandi berhasil diperbarui!'}
          </p>
        </div>

        {/* --- BAGIAN BADAN (FORMULIR) --- */}
        <div className="p-8">
          
          {/* TAMPILAN 1: MASUKKAN EMAIL */}
          {step === 'email' && (
            <form onSubmit={handleVerifyEmail} className="space-y-6">
              {/* Kotak Pesan Error (Merah) */}
              {error && (
                <div className="bg-red-50 border-2 border-[#EA4335] p-3 flex items-center gap-3 text-[#EA4335] font-bold text-sm">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase">Email Terdaftar</label>
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-16 pr-4 py-3 border-2 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-gray-400"
                    placeholder="nama@email.com"
                    autoFocus
                  />
                </div>
              </div>

              {/* Tombol Kirim Kode */}
              <button
                type="submit"
                disabled={isLoading}
                // Ubah warna tombol: 'bg-black' -> 'bg-blue-600'
                className="w-full bg-black text-white px-6 py-4 border-2 border-black hover:bg-[#FBBC05] hover:text-black transition-all flex items-center justify-center gap-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                    <><Loader2 className="animate-spin w-5 h-5"/> Memproses...</>
                ) : (
                  <>
                    Kirim Kode <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* TAMPILAN 2: MASUKKAN PIN */}
          {step === 'verify-pin' && (
            <form onSubmit={handleVerifyPin} className="space-y-6">
              {error && (
                <div className="bg-red-50 border-2 border-[#EA4335] p-3 flex items-center gap-3 text-[#EA4335] font-bold text-sm">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              <div className="text-center mb-6">
                 <div className="bg-gray-100 border-2 border-black p-4 inline-block rounded-full mb-4">
                    <ShieldCheck className="w-8 h-8 text-[#4285F4]" />
                 </div>
                 <h3 className="font-bold text-lg">Verifikasi Identitas</h3>
                 <p className="text-sm text-gray-600">Kode PIN telah dikirim ke <span className="font-bold text-black">{email}</span></p>
                 <p className="text-xs text-gray-500 mt-1">(Cek folder Spam jika tidak masuk)</p>
              </div>

              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase text-center">Masukkan 6 Digit PIN</label>
                <div className="flex justify-center">
                  <input 
                    type="text"
                    maxLength={6}
                    value={inputPin}
                    onChange={(e) => setInputPin(e.target.value.replace(/[^0-9]/g, ''))} // Cuma boleh angka
                    className="w-48 text-center text-3xl tracking-[0.5em] font-black py-3 border-b-4 border-black focus:border-[#4285F4] focus:outline-none transition-all placeholder:text-gray-300"
                    placeholder="••••••"
                    autoFocus
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#4285F4] text-white px-6 py-4 border-2 border-black hover:bg-[#3367d6] transition-all flex items-center justify-center gap-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? <><Loader2 className="animate-spin w-5 h-5"/> Memverifikasi...</> : 'Verifikasi PIN'}
                </button>
                
                {/* Tombol Kirim Ulang */}
                <button
                  type="button"
                  onClick={handleResendPin}
                  disabled={isLoading || resendTimer > 0}
                  className="w-full bg-white text-black px-4 py-2 hover:bg-gray-100 transition-all flex items-center justify-center gap-2 font-bold text-sm disabled:opacity-50"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} /> 
                  {resendTimer > 0 ? `Kirim ulang dalam ${resendTimer}s` : 'Kirim Ulang Kode'}
                </button>
              </div>
            </form>
          )}

          {/* TAMPILAN 3: GANTI PASSWORD BARU */}
          {step === 'new-password' && (
            <form onSubmit={handleResetPassword} className="space-y-6">
               {error && (
                <div className="bg-red-50 border-2 border-[#EA4335] p-3 flex items-center gap-3 text-[#EA4335] font-bold text-sm">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              )}

              {/* Input Password Baru */}
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
                  <button
                    type="button"
                    onClick={() => setShowPassword({...showPassword, new: !showPassword.new})}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#4285F4]"
                  >
                    {showPassword.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Input Konfirmasi Password */}
              <div>
                <label className="block text-sm font-black text-black mb-2 uppercase">Konfirmasi Kata Sandi</label>
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r-2 border-black bg-gray-100 z-10 pointer-events-none">
                    <Lock className="w-5 h-5 text-black" />
                  </div>
                  <input 
                    type={showPassword.confirm ? "text" : "password"}
                    value={passwordForm.confirm}
                    onChange={(e) => setPasswordForm({...passwordForm, confirm: e.target.value})}
                    className="w-full pl-16 pr-12 py-3 border-2 border-black font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all placeholder:font-normal placeholder:text-gray-400"
                    placeholder="Ulangi kata sandi"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword({...showPassword, confirm: !showPassword.confirm})}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-black hover:text-[#4285F4]"
                  >
                    {showPassword.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#34A853] text-white px-6 py-4 border-2 border-black hover:bg-[#2d9147] transition-all flex items-center justify-center gap-3 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <><Loader2 className="animate-spin w-5 h-5"/> Menyimpan...</> : 'Simpan Kata Sandi'}
              </button>
            </form>
          )}

          {/* TAMPILAN 4: BERHASIL */}
          {step === 'success' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-[#34A853] text-white rounded-full flex items-center justify-center mx-auto border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Check className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black text-black uppercase mb-2">Berhasil!</h3>
                <p className="text-gray-600 font-bold">Kata sandi Anda telah diperbarui. Silakan masuk menggunakan kata sandi baru.</p>
              </div>
              <button
                onClick={onSwitchToLogin}
                className="w-full bg-black text-white px-6 py-4 border-2 border-black hover:bg-gray-800 transition-all font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                Masuk Sekarang
              </button>
            </div>
          )}

        </div>
        
        {/* Tombol Batal di Bawah */}
        {step !== 'success' && (
          <div className="bg-gray-50 px-8 py-4 text-center border-t-2 border-black">
              <button
                onClick={onSwitchToLogin}
                className="text-gray-500 font-bold text-sm hover:text-black hover:underline"
              >
                Batal & Kembali ke Login
              </button>
          </div>
        )}
      </div>
    </div>
  );
}