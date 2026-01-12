/**
 * UniNotes - Validation Utilities
 * 
 * Reusable validation functions untuk form inputs.
 */

import { VALIDATION_MESSAGES } from '../constants';

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password length
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};

/**
 * Validate required field
 */
export const isRequired = (value: string): boolean => {
  return value.trim() !== '';
};

/**
 * Validate file type
 */
export const isValidFileType = (file: File, acceptedTypes: string[]): boolean => {
  return acceptedTypes.includes(file.type);
};

/**
 * Validate file size
 */
export const isValidFileSize = (file: File, maxSizeInBytes: number): boolean => {
  return file.size <= maxSizeInBytes;
};

/**
 * Get validation error message for email
 */
export const validateEmail = (email: string): string => {
  if (!isRequired(email)) {
    return VALIDATION_MESSAGES.REQUIRED_FIELD;
  }
  if (!isValidEmail(email)) {
    return VALIDATION_MESSAGES.INVALID_EMAIL;
  }
  return '';
};

/**
 * Get validation error message for password
 */
export const validatePassword = (password: string): string => {
  if (!isRequired(password)) {
    return VALIDATION_MESSAGES.REQUIRED_FIELD;
  }
  if (!isValidPassword(password)) {
    return VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH;
  }
  return '';
};

/**
 * Get validation error message for required field
 */
export const validateRequired = (value: string, fieldName: string): string => {
  if (!isRequired(value)) {
    return `${fieldName} ${VALIDATION_MESSAGES.REQUIRED_FIELD.toLowerCase()}`;
  }
  return '';
};
