import { ArrowRight, BookOpen, PenTool, Share2, Search, Zap, Shield, Smile, Mail, Github, Heart } from 'lucide-react';
import React from 'react';

// --- CUSTOM SVG DOODLE FACES (Original & Copyright Free) ---
// Komponen ini menggambar wajah-wajah dengan gaya sketsa simpel/abstrak
const DoodleFace = ({ variant, color, className }: { variant: number, color: string, className?: string }) => {
  const strokeColor = "black";
  const strokeWidth = "2.5";

  return (
    <div className={`relative transition-transform hover:-translate-y-2 duration-300 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        {/* Base Head Shape */}
        <circle cx="50" cy="50" r="45" fill="white" stroke={strokeColor} strokeWidth={strokeWidth} />
        
        {/* Variants */}
        {variant === 1 && ( // The "Engineer" (Yellow Hat)
          <>
            <path d="M10 40 Q50 5 90 40" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            <path d="M10 40 L90 40" stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x="42" y="15" width="16" height="12" rx="2" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            {/* Face */}
            <circle cx="35" cy="60" r="3" fill="black" />
            <circle cx="65" cy="60" r="3" fill="black" />
            <path d="M45 75 Q50 80 55 75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <path d="M48 60 L52 65 L48 65" fill="none" stroke={strokeColor} strokeWidth="2" />
          </>
        )}

        {variant === 2 && ( // The "Artist" (Beret/Messy Hair)
          <>
             {/* Hair/Hat */}
            <path d="M20 45 C 10 30, 30 10, 50 20 C 70 10, 90 30, 80 45" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            {/* Glasses */}
            <circle cx="35" cy="55" r="10" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <circle cx="65" cy="55" r="10" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            <line x1="45" y1="55" x2="55" y2="55" stroke={strokeColor} strokeWidth={strokeWidth} />
            {/* Smile */}
            <path d="M40 75 Q50 85 60 75" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          </>
        )}

        {variant === 3 && ( // The "Focus" (Headphones)
          <>
            {/* Headphones */}
            <path d="M15 55 C 15 20, 85 20, 85 55" fill="none" stroke={strokeColor} strokeWidth="4" />
            <rect x="5" y="45" width="15" height="25" rx="5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            <rect x="80" y="45" width="15" height="25" rx="5" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
            {/* Face */}
            <line x1="35" y1="55" x2="45" y2="60" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <line x1="65" y1="55" x2="55" y2="60" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
            <line x1="45" y1="75" x2="55" y2="75" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" />
          </>
        )}

        {variant === 4 && ( // The "Reader" (Book icon)
          <>
             <circle cx="50" cy="50" r="45" fill={color} stroke={strokeColor} strokeWidth={strokeWidth} />
             <path d="M30 40 L50 70 L70 40" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
             <circle cx="35" cy="40" r="4" fill="white" />
             <circle cx="65" cy="40" r="4" fill="white" />
             <path d="M40 75 Q50 65 60 75" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" />
          </>
        )}

        {variant === 5 && ( // The "Idea" (Lightbulb/Bright)
          <>
            {/* Spikes */}
            <path d="M50 5 L50 15 M85 15 L78 22 M15 15 L22 22" stroke={color} strokeWidth="4" strokeLinecap="round" />
            {/* Face */}
            <circle cx="35" cy="50" r="4" fill="black" />
            <circle cx="65" cy="50" r="4" fill="black" />
            {/* Nose */}
            <path d="M50 50 L45 60 L50 60" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} />
            {/* Mouth */}
            <circle cx="50" cy="75" r="5" fill="black" />
          </>
        )}
      </svg>
    </div>
  );
};

// --- MAIN COMPONENT ---

interface LandingPageProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

export default function LandingPage({ onLoginClick, onRegisterClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#F7F7F5] font-mono text-black selection:bg-[#FBBC05] selection:text-black">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b-2 border-black z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black flex items-center justify-center rounded-sm">
              <span className="text-white font-black text-xl">U</span>
            </div>
            <span className="text-xl font-black tracking-tighter uppercase">UniNotes</span>
          </div>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-4">
            <button 
              onClick={onLoginClick}
              className="bg-black text-white px-5 py-2 text-sm sm:text-base font-bold border-2 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
            >
              Masuk
            </button>
            <button 
              onClick={onRegisterClick}
              className="text-xs sm:text-sm font-bold hover:underline decoration-2 underline-offset-4 py-1"
            >
              Daftar Sekarang
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          
          {/* 1. CHARACTER ROW (Notion Style) */}
          <div className="flex flex-wrap justify-center items-end gap-[-10px] sm:gap-4 mb-8 select-none">
            {/* Character 1: Study */}
            <div className="relative z-10 -rotate-6 hover:rotate-0 transition-transform cursor-pointer">
               <DoodleFace variant={4} color="#4285F4" /> 
               <div className="absolute -bottom-4 -right-4 bg-white border-2 border-black px-2 py-1 text-xs font-bold rotate-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Catat</div>
            </div>
            
            {/* Character 2: Artist */}
            <div className="relative z-20 hover:-translate-y-4 transition-transform cursor-pointer">
               <DoodleFace variant={2} color="#EA4335" />
            </div>

            {/* Character 3: Main (Engineer/Builder) */}
            <div className="relative z-30 scale-125 mx-2 hover:scale-135 transition-transform cursor-pointer">
               <DoodleFace variant={1} color="#FBBC05" />
               {/* Floating Element */}
               <div className="absolute -top-6 right-0 animate-bounce">
                 <Zap className="w-8 h-8 text-black fill-[#FBBC05]" />
               </div>
            </div>

            {/* Character 4: Focus */}
            <div className="relative z-20 hover:-translate-y-4 transition-transform cursor-pointer">
               <DoodleFace variant={3} color="#34A853" />
            </div>

             {/* Character 5: Idea */}
             <div className="relative z-10 rotate-6 hover:rotate-0 transition-transform cursor-pointer">
               <DoodleFace variant={5} color="#FBBC05" />
               <div className="absolute -bottom-4 -left-4 bg-white border-2 border-black px-2 py-1 text-xs font-bold -rotate-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Paham</div>
            </div>
          </div>

          {/* 2. HEADLINE */}
          <h1 className="text-5xl sm:text-7xl font-black leading-[0.9] tracking-tight mb-6 text-black">
            Satu Kampus.<br className="hidden sm:block" />
            <span className="ml-2 bg-[#FBBC05] px-2">Satu Komunitas.</span>
          </h1>

          {/* 3. SUBHEADLINE */}
          <p className="text-xl sm:text-2xl font-bold text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            UniNotes adalah tempat mahasiswa berbagi catatan, menemukan jawaban tugas, dan salin berbagi pengetahuan.
          </p>

          {/* 4. CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          </div>
        </div>
      </header>

      {/* FEATURE GRID (Neo-Brutalism Cards) */}
      <section className="py-20 px-6 bg-white border-t-2 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="p-8 border-2 border-black bg-[#F1F3F5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-[#4285F4] border-2 border-black flex items-center justify-center mb-6 rounded-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">Gudang Materi</h3>
              <p className="font-bold text-gray-600">Akses  catatan kuliah, rangkuman, dan soal ujian dari berbagai fakultas.</p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border-2 border-black bg-[#F1F3F5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-[#EA4335] border-2 border-black flex items-center justify-center mb-6 rounded-md">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">Kolaborasi</h3>
              <p className="font-bold text-gray-600">Upload catatanmu, bantu teman seangkatan, dan saling barbagi.</p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border-2 border-black bg-[#F1F3F5] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 bg-[#FBBC05] border-2 border-black flex items-center justify-center mb-6 rounded-md">
                <Search className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl font-black mb-3">Cari Cepat</h3>
              <p className="font-bold text-gray-600">Filter berdasarkan mata kuliah hingga semester. Anti ribet.</p>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-white pt-20 pb-10 px-6 border-t-4 border-black">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 items-center">
            
            {/* BRAND SECTION (Col 1-6) */}
            <div className="md:col-span-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#FBBC05] border-2 border-white flex items-center justify-center rounded-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                  <span className="text-black font-black text-2xl">U</span>
                </div>
                <span className="text-3xl font-black tracking-tighter uppercase text-white">UniNotes</span>
              </div>
              <p className="font-bold text-gray-400 text-lg leading-relaxed max-w-sm">
                Platform berbagi catatan untuk mahasiswa UIR. Belajar bareng, Share Catatan & Tugas.
              </p>
            </div>

            {/* DEVELOPER CARD SECTION (Col 7-12) */}
            <div className="md:col-span-6 flex justify-end">
              <div className="w-full max-w-md bg-white text-black p-6 border-4 border-[#34A853] shadow-[8px_8px_0px_0px_#34A853] relative transform hover:-rotate-1 transition-transform">
                <div className="absolute -top-3 -right-3 bg-[#EA4335] text-white px-3 py-1 font-black text-xs border-2 border-black rotate-3">
                  DEV CONTACT
                </div>
                <h4 className="font-black text-xl mb-2 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#FBBC05] fill-black" />
                  Developer Team
                </h4>
                <p className="font-bold text-sm text-gray-600 mb-4">
                  Ada saran fitur? Nemuin bug yang bikin kesel? Atau mau traktir kopi?
                </p>
                
                <a href="mailto:dev@uninotes.id" className="flex items-center gap-3 bg-black text-white p-3 rounded-lg border-2 border-transparent hover:bg-[#4285F4] hover:border-black transition-all group">
                   <div className="bg-white/20 p-2 rounded">
                      <Mail className="w-5 h-5 text-white" />
                   </div>
                   <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase text-gray-400 group-hover:text-white/80">Email Kami</span>
                      <span className="font-bold text-sm">dev@uninotes.id</span>
                   </div>
                </a>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="border-t-2 border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-gray-500">
            <p className="flex flex-wrap justify-center items-center gap-2 text-center leading-normal">
              <span>© 2024 UniNotes. Dibuat Oleh</span>
              <Heart className="w-4 h-4 text-[#EA4335] fill-[#EA4335] inline-block" />
              <span>Kelompok Satu.</span>
            </p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer"> BigThanks To</span>
              <span className="hover:text-white cursor-pointer">Figma AI </span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
