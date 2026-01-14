/// <reference types="vite/client" />
// ^ Baris di atas adalah "Kamus Utama". Ini memberitahu TypeScript:
// "Halo, proyek ini pakai Vite. Tolong kenali sintaks bawaan Vite (seperti import.meta)."

// Interface ini adalah "Daftar Isi" untuk variabel .env kamu.
// Tanpa ini, TypeScript akan bingung dan menganggap variabel .env tidak ada.
interface ImportMetaEnv {
  // Memberitahu bahwa ada variabel VITE_SUPABASE_URL yang isinya pasti tulisan (string)
  readonly VITE_SUPABASE_URL: string
  
  // Memberitahu bahwa ada variabel VITE_SUPABASE_ANON_KEY yang isinya pasti tulisan (string)
  readonly VITE_SUPABASE_ANON_KEY: string
}

// Ini adalah "Penyambung".
// Kita memberitahu TypeScript bahwa properti 'env' di dalam 'import.meta'
// harus mengikuti aturan daftar isi (ImportMetaEnv) yang sudah kita buat di atas.
interface ImportMeta {
  readonly env: ImportMetaEnv
}