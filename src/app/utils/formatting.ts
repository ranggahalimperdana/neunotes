/**
 * UniNotes - Formatting Utilities
 * 
 * Helper functions untuk formatting data.
 */

import { DATE_FORMAT } from '../constants';

/**
 * Format file size from bytes to human-readable format
 * 
 * @param bytes - File size in bytes
 * @returns Formatted file size (e.g., "1.5 MB")
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

/**
 * Format date to Indonesian locale
 * 
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "15 Desember 2024")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString(DATE_FORMAT.LOCALE, DATE_FORMAT.OPTIONS);
};

/**
 * Format date to relative time
 * 
 * @param dateString - ISO date string
 * @returns Relative time (e.g., "2 hari yang lalu")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'Baru saja';
  if (diffInMinutes < 60) return `${diffInMinutes} menit yang lalu`;
  if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
  if (diffInDays < 7) return `${diffInDays} hari yang lalu`;
  
  return formatDate(dateString);
};

/**
 * Truncate text with ellipsis
 * 
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Convert file to base64 string
 * 
 * @param file - File object
 * @returns Promise with base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Generate unique ID
 * 
 * @returns Unique ID string
 * 
 * 🔄 SUPABASE: Tidak perlu function ini, UUID akan di-generate otomatis
 */
export const generateId = (): string => {
  return Date.now().toString();
};
