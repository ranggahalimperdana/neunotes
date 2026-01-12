/**
 * UniNotes - Auth Service
 * 
 * Service layer untuk authentication operations.
 * Saat ini menggunakan localStorage, nantinya akan diintegrasikan dengan Supabase Auth.
 * 
 * 🔄 SUPABASE INTEGRATION GUIDE:
 * ============================================================================
 * 
 * 1. Install Supabase Client:
 *    npm install @supabase/supabase-js
 * 
 * 2. Setup Supabase Client:
 *    import { createClient } from '@supabase/supabase-js'
 *    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
 * 
 * 3. Replace localStorage dengan Supabase Auth:
 *    - register() → supabase.auth.signUp()
 *    - login() → supabase.auth.signInWithPassword()
 *    - logout() → supabase.auth.signOut()
 *    - getCurrentUser() → supabase.auth.getUser()
 * 
 * 4. Database Schema untuk Supabase:
 *    CREATE TABLE users (
 *      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
 *      email TEXT UNIQUE NOT NULL,
 *      name TEXT NOT NULL,
 *      faculty TEXT NOT NULL,
 *      prodi TEXT NOT NULL,
 *      role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
 *      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
 *      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
 *    );
 * 
 * 5. Row Level Security (RLS) Policies:
 *    - Users can read their own data
 *    - Admins can read/update all users
 *    - Only authenticated users can insert
 * 
 * ============================================================================
 */

import { STORAGE_KEYS, USER_ROLES, VALIDATION_MESSAGES } from '../constants';
import type { User, LoggedInUser } from '../types';

/**
 * Get all users from localStorage
 * 
 * 🔄 SUPABASE: Replace dengan query ke tabel 'users'
 * const { data, error } = await supabase
 *   .from('users')
 *   .select('*')
 */
const getAllUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

/**
 * Save users to localStorage
 * 
 * 🔄 SUPABASE: Tidak perlu function ini, data otomatis tersimpan di database
 */
const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

/**
 * Check if email already exists
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('users')
 *   .select('email')
 *   .eq('email', email)
 *   .single()
 */
export const checkEmailExists = (email: string): boolean => {
  const users = getAllUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

/**
 * Register new user
 * 
 * 🔄 SUPABASE: Replace dengan Supabase Auth
 * const { data, error } = await supabase.auth.signUp({
 *   email: email,
 *   password: password,
 *   options: {
 *     data: {
 *       name: name,
 *       faculty: faculty,
 *       prodi: prodi,
 *       role: 'user'
 *     }
 *   }
 * })
 */
export const registerUser = (
  name: string,
  email: string,
  password: string,
  faculty: string,
  prodi: string
): { success: boolean; message: string } => {
  // Check if email already exists
  if (checkEmailExists(email)) {
    return {
      success: false,
      message: VALIDATION_MESSAGES.EMAIL_ALREADY_EXISTS,
    };
  }

  // Create new user
  const newUser: User = {
    name,
    email: email.toLowerCase(),
    password, // 🔄 SUPABASE: Password akan di-hash otomatis oleh Supabase Auth
    faculty,
    prodi,
    role: USER_ROLES.USER, // Default role is user
  };

  // Save to localStorage
  const users = getAllUsers();
  users.push(newUser);
  saveUsers(users);

  return {
    success: true,
    message: 'Registrasi berhasil!',
  };
};

/**
 * Login user
 * 
 * 🔄 SUPABASE: Replace dengan Supabase Auth
 * const { data, error } = await supabase.auth.signInWithPassword({
 *   email: email,
 *   password: password,
 * })
 * 
 * // Get additional user data from users table
 * const { data: userData } = await supabase
 *   .from('users')
 *   .select('*')
 *   .eq('email', email)
 *   .single()
 */
export const loginUser = (
  email: string,
  password: string
): { success: boolean; message: string; user?: LoggedInUser } => {
  const users = getAllUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return {
      success: false,
      message: 'Email atau password salah',
    };
  }

  // Create logged in user object (exclude password)
  const loggedInUser: LoggedInUser = {
    name: user.name,
    email: user.email,
    faculty: user.faculty,
    prodi: user.prodi,
    role: user.role,
  };

  // Save to localStorage (current session)
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(loggedInUser));

  return {
    success: true,
    message: 'Login berhasil!',
    user: loggedInUser,
  };
};

/**
 * Logout user
 * 
 * 🔄 SUPABASE: Replace dengan
 * await supabase.auth.signOut()
 */
export const logoutUser = (): void => {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
};

/**
 * Get current logged in user
 * 
 * 🔄 SUPABASE: Replace dengan
 * const { data: { user } } = await supabase.auth.getUser()
 * 
 * // Get additional data from users table
 * const { data: userData } = await supabase
 *   .from('users')
 *   .select('*')
 *   .eq('email', user.email)
 *   .single()
 */
export const getCurrentUser = (): LoggedInUser | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

/**
 * Check if user is admin
 */
export const isAdmin = (user: LoggedInUser | null): boolean => {
  return user?.role === USER_ROLES.ADMIN;
};

/**
 * Get user by email
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('users')
 *   .select('*')
 *   .eq('email', email)
 *   .single()
 */
export const getUserByEmail = (email: string): User | null => {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
};

/**
 * Promote user to admin
 * 
 * 🔄 SUPABASE: Replace dengan update query
 * const { data, error } = await supabase
 *   .from('users')
 *   .update({ role: 'admin' })
 *   .eq('email', email)
 */
export const promoteToAdmin = (email: string): { success: boolean; message: string } => {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

  if (userIndex === -1) {
    return {
      success: false,
      message: VALIDATION_MESSAGES.EMAIL_NOT_FOUND,
    };
  }

  if (users[userIndex].role === USER_ROLES.ADMIN) {
    return {
      success: false,
      message: 'User sudah menjadi admin',
    };
  }

  // Update role to admin
  users[userIndex].role = USER_ROLES.ADMIN;
  saveUsers(users);

  return {
    success: true,
    message: 'User berhasil dipromosikan menjadi admin',
  };
};

/**
 * Get all regular users (non-admin)
 * 
 * 🔄 SUPABASE: Replace dengan query
 * const { data } = await supabase
 *   .from('users')
 *   .select('*')
 *   .eq('role', 'user')
 *   .order('name')
 */
export const getAllRegularUsers = (): User[] => {
  const users = getAllUsers();
  return users.filter(user => user.role === USER_ROLES.USER);
};
