/**
 * UniNotes - Type Definitions
 * 
 * Centralized type definitions untuk seluruh aplikasi.
 * File ini memudahkan developer untuk memahami struktur data.
 */

// ============================================================================
// USER TYPES
// ============================================================================

/**
 * Interface untuk data user yang disimpan di localStorage
 * 
 * 🔄 SUPABASE INTEGRATION:
 * - Akan dimapping ke tabel 'users' di Supabase
 * - Tambahkan field: id (UUID), created_at, updated_at
 * - password akan di-hash menggunakan Supabase Auth
 */
export interface User {
  name: string;
  email: string;
  password: string;
  faculty: string;
  prodi: string;
  role: 'user' | 'admin';
}

/**
 * Interface untuk user yang sedang login
 */
export interface LoggedInUser {
  name: string;
  email: string;
  faculty: string;
  prodi: string;
  role: 'user' | 'admin';
}

// ============================================================================
// NOTE/POST TYPES
// ============================================================================

/**
 * Interface untuk catatan/post yang di-upload user
 * 
 * 🔄 SUPABASE INTEGRATION:
 * - Akan dimapping ke tabel 'notes' di Supabase
 * - fileData (base64) akan diganti dengan fileUrl dari Supabase Storage
 * - Tambahkan field: id (UUID), created_at, updated_at
 * - Relasi: user_id (foreign key ke users table)
 */
export interface UserNote {
  id: string;
  courseCode: string;
  courseTitle: string;
  type: 'PDF' | 'IMG';
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  createdAt: string;
  author: string;
  faculty: string;
  prodi: string;
  uploadedBy: string; // Email user yang upload
  fileType: string;
  semester: string;
  fileData?: string; // Base64 encoded (localStorage), akan diganti fileUrl (Supabase)
}

// ============================================================================
// COURSE TYPES
// ============================================================================

/**
 * Interface untuk data mata kuliah
 */
export interface Course {
  no: number;
  kode: string;
  nama: string;
  semester: string;
  prodi: string;
}

/**
 * Interface untuk course selection di form
 */
export interface CourseOption {
  code: string;
  title: string;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

/**
 * Interface untuk filter dashboard
 */
export interface DashboardFilters {
  searchQuery: string;
  selectedFaculty: string;
  selectedProdi: string;
  selectedSemester: string;
  selectedType: 'ALL' | 'PDF' | 'IMG';
}

// ============================================================================
// FORM TYPES
// ============================================================================

/**
 * Interface untuk form registration
 */
export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  faculty: string;
  prodi: string;
}

/**
 * Interface untuk form errors
 */
export interface FormErrors {
  [key: string]: string;
}

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

/**
 * Interface untuk notification
 */
export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
