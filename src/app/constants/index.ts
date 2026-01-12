/**
 * UniNotes - Application Constants
 * 
 * File ini berisi semua constant values yang digunakan di aplikasi.
 * Memudahkan maintenance dan perubahan nilai di satu tempat.
 */

// ============================================================================
// LOCALSTORAGE KEYS
// ============================================================================

/**
 * LocalStorage keys untuk data persistence
 * 
 * 🔄 SUPABASE INTEGRATION:
 * - Key ini akan dihapus dan diganti dengan Supabase queries
 * - Data akan diambil dari database, bukan localStorage
 */
export const STORAGE_KEYS = {
  USERS: 'uninotes_users',
  POSTS: 'uninotes_all_posts',
  CURRENT_USER: 'uninotes_current_user',
} as const;

// ============================================================================
// USER ROLES
// ============================================================================

/**
 * Available user roles
 */
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

// ============================================================================
// FILE UPLOAD LIMITS
// ============================================================================

/**
 * File upload configuration
 */
export const FILE_CONFIG = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB in bytes
  MAX_SIZE_MB: 10,
  ACCEPTED_PDF: ['application/pdf'],
  ACCEPTED_IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
} as const;

// ============================================================================
// NOTE TYPES
// ============================================================================

/**
 * Available note types
 */
export const NOTE_TYPES = {
  PDF: 'PDF',
  IMG: 'IMG',
  ALL: 'ALL',
} as const;

// ============================================================================
// FAKULTAS DATA
// ============================================================================

/**
 * List fakultas yang tersedia
 */
export const AVAILABLE_FACULTIES = [
  'Fakultas Teknik',
  'Fakultas Ilmu Sosial dan Ilmu Politik',
  'Fakultas Pertanian',
] as const;

// ============================================================================
// VALIDATION MESSAGES
// ============================================================================

/**
 * Error messages untuk validasi form
 */
export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Field ini wajib diisi',
  INVALID_EMAIL: 'Format email tidak valid',
  PASSWORD_MIN_LENGTH: 'Password minimal 6 karakter',
  PASSWORD_NOT_MATCH: 'Password tidak sama',
  EMAIL_ALREADY_EXISTS: 'Email sudah terdaftar',
  EMAIL_NOT_FOUND: 'Email tidak terdaftar',
  INVALID_PASSWORD: 'Password salah',
  FILE_TOO_LARGE: 'Ukuran file maksimal 10MB',
  INVALID_FILE_TYPE: 'Tipe file tidak valid',
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

/**
 * Success messages untuk notifikasi
 */
export const SUCCESS_MESSAGES = {
  REGISTER_SUCCESS: 'Registrasi berhasil! Silakan login.',
  LOGIN_SUCCESS: 'Login berhasil!',
  UPLOAD_SUCCESS: 'Catatan berhasil diupload! 🎉',
  UPDATE_SUCCESS: 'Catatan berhasil diperbarui! ✓',
  DELETE_SUCCESS: 'Catatan berhasil dihapus',
  PROMOTE_SUCCESS: 'User berhasil dipromosikan menjadi admin',
} as const;

// ============================================================================
// DATE FORMAT
// ============================================================================

/**
 * Date format configuration
 */
export const DATE_FORMAT = {
  LOCALE: 'id-ID',
  OPTIONS: {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  } as Intl.DateTimeFormatOptions,
} as const;
