# UniNotes - Developer Documentation

> Platform berbagi catatan akademik dengan Neo-Brutalism design dan role-based access control.

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Code Architecture](#code-architecture)
- [Supabase Integration Guide](#supabase-integration-guide)
- [Development Guidelines](#development-guidelines)

---

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4.0
- **Icons**: Lucide React
- **State**: React Hooks (useState, useEffect)
- **Data Storage**: localStorage (akan diganti dengan Supabase)
- **Design System**: Neo-Brutalism

---

## 📁 Project Structure

```
src/app/
├── components/          # React components
│   ├── Login.tsx        # Login page
│   ├── Register.tsx     # Registration page
│   ├── UserDashboard.tsx   # User dashboard
│   ├── UploadNotes.tsx     # Upload & manage notes
│   └── AdminDashboard.tsx  # Admin panel
│
├── services/           # Business logic & API calls
│   ├── authService.ts      # Authentication operations
│   └── notesService.ts     # Notes/posts operations
│
├── data/              # Static data
│   └── allCoursesData.ts   # Course data (9 prodi)
│
├── types/             # TypeScript interfaces
│   └── index.ts           # Centralized type definitions
│
├── constants/         # Application constants
│   └── index.ts           # Keys, messages, configs
│
├── utils/             # Helper functions
│   ├── validation.ts      # Form validation
│   └── formatting.ts      # Data formatting
│
└── App.tsx            # Main application component
```

---

## ✨ Key Features

### **User Features**
- ✅ Register & Login dengan email/password
- ✅ Upload catatan (PDF/Image) dengan metadata lengkap
- ✅ Filter cascade: Fakultas → Prodi → Semester → Mata Kuliah
- ✅ Manage catatan sendiri (CRUD)
- ✅ Browse semua catatan dengan filter advanced

### **Admin Features**
- ✅ Login sebagai admin
- ✅ View semua posting dari semua user
- ✅ Delete posting yang bermasalah
- ✅ Promote user menjadi admin
- ✅ **No downgrade**: Admin tidak bisa kembali jadi user

### **Data**
- ✅ 9 Program Studi dengan data mata kuliah lengkap:
  - Informatika, Sipil, Geologi, Ilmu Komunikasi
  - PWK, Agribisnis, Agroteknologi, Perminyakan
  - Mesin (⚠️ hanya semester 1-2)

---

## 🏗 Code Architecture

### **Service Layer Pattern**

Semua operasi data dipisahkan ke dalam service layer untuk memudahkan integrasi dengan Supabase.

#### **authService.ts**
```typescript
// Current: localStorage operations
// Future: Supabase Auth

export const registerUser = (...) => { /* ... */ }
export const loginUser = (...) => { /* ... */ }
export const promoteToAdmin = (...) => { /* ... */ }
```

#### **notesService.ts**
```typescript
// Current: localStorage operations
// Future: Supabase Database + Storage

export const getAllNotes = () => { /* ... */ }
export const createNote = (...) => { /* ... */ }
export const deleteNote = (...) => { /* ... */ }
export const getFilteredNotes = (...) => { /* ... */ }
```

### **Component Architecture**

Semua components menggunakan service layer, bukan direct localStorage access:

```typescript
// ❌ BAD: Direct localStorage access
const notes = JSON.parse(localStorage.getItem('notes'));

// ✅ GOOD: Use service layer
import { getAllNotes } from '../services/notesService';
const notes = getAllNotes();
```

**Benefit**: Ketika migrasi ke Supabase, cukup update service layer saja, components tidak perlu diubah!

---

## 🔄 Supabase Integration Guide

### **Step 1: Install Dependencies**

```bash
npm install @supabase/supabase-js
```

### **Step 2: Setup Supabase Client**

Create `/src/app/config/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### **Step 3: Database Schema**

Run these SQL commands in Supabase SQL Editor:

#### **Users Table**
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (Supabase Auth will handle authentication)
-- We use this for additional user data
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  faculty TEXT NOT NULL,
  prodi TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

#### **Notes Table**
```sql
CREATE TABLE notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  course_code TEXT NOT NULL,
  course_title TEXT NOT NULL,
  type TEXT CHECK (type IN ('PDF', 'IMG')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size TEXT NOT NULL,
  file_url TEXT NOT NULL,
  faculty TEXT NOT NULL,
  prodi TEXT NOT NULL,
  semester TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can view notes" ON notes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own notes" ON notes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes" ON notes
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes" ON notes
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Admins can delete any note" ON notes
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

#### **Courses Table** (Optional - bisa tetap gunakan static data)
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  semester TEXT NOT NULL,
  prodi TEXT NOT NULL,
  faculty TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read courses
CREATE POLICY "Anyone can view courses" ON courses
  FOR SELECT USING (true);
```

### **Step 4: Supabase Storage Setup**

Create storage bucket for file uploads:

1. Go to Supabase Dashboard → Storage
2. Create new bucket: `notes-files`
3. Make it **public** (or set custom policies)
4. Storage policies:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Users can upload files" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'notes-files' AND
    auth.role() = 'authenticated'
  );

-- Allow anyone to view files
CREATE POLICY "Anyone can view files" ON storage.objects
  FOR SELECT USING (bucket_id = 'notes-files');

-- Allow users to delete their own files
CREATE POLICY "Users can delete their own files" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'notes-files' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
```

### **Step 5: Update Services**

#### **Update authService.ts**

Replace localStorage code dengan Supabase Auth:

```typescript
import { supabase } from '../config/supabase';

// Register
export const registerUser = async (name, email, password, faculty, prodi) => {
  // 1. Sign up with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) return { success: false, message: authError.message };

  // 2. Insert additional data to users table
  const { error: userError } = await supabase
    .from('users')
    .insert({
      id: authData.user.id,
      email,
      name,
      faculty,
      prodi,
      role: 'user',
    });

  if (userError) return { success: false, message: userError.message };

  return { success: true, message: 'Registrasi berhasil!' };
};

// Login
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return { success: false, message: error.message };

  // Get user data
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();

  return {
    success: true,
    message: 'Login berhasil!',
    user: userData,
  };
};

// Logout
export const logoutUser = async () => {
  await supabase.auth.signOut();
};

// Get current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  return userData;
};
```

#### **Update notesService.ts**

Replace localStorage dengan Supabase Database + Storage:

```typescript
import { supabase } from '../config/supabase';

// Create note
export const createNote = async (note, file) => {
  const user = await getCurrentUser();
  
  // 1. Upload file to Storage
  const fileName = `${Date.now()}_${file.name}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('notes-files')
    .upload(`${user.id}/${fileName}`, file);

  if (uploadError) return { success: false, message: uploadError.message };

  // 2. Get public URL
  const { data: urlData } = supabase.storage
    .from('notes-files')
    .getPublicUrl(`${user.id}/${fileName}`);

  // 3. Insert metadata to database
  const { error: insertError } = await supabase
    .from('notes')
    .insert({
      user_id: user.id,
      course_code: note.courseCode,
      course_title: note.courseTitle,
      type: note.type,
      title: note.title,
      description: note.description,
      file_name: fileName,
      file_size: note.fileSize,
      file_url: urlData.publicUrl,
      faculty: note.faculty,
      prodi: note.prodi,
      semester: note.semester,
    });

  if (insertError) return { success: false, message: insertError.message };

  return { success: true, message: 'Catatan berhasil diupload!' };
};

// Get all notes
export const getAllNotes = async () => {
  const { data, error } = await supabase
    .from('notes')
    .select('*, users(name, email)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Delete note
export const deleteNote = async (noteId) => {
  // 1. Get note data
  const { data: note } = await supabase
    .from('notes')
    .select('file_url, user_id')
    .eq('id', noteId)
    .single();

  // 2. Delete file from storage
  const filePath = `${note.user_id}/${note.file_name}`;
  await supabase.storage
    .from('notes-files')
    .remove([filePath]);

  // 3. Delete from database
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId);

  if (error) return { success: false, message: error.message };
  return { success: true, message: 'Catatan berhasil dihapus' };
};
```

### **Step 6: Update Components**

Components tidak perlu banyak berubah! Hanya perlu:

1. **Ubah synchronous calls jadi async/await**:

```typescript
// Before
const notes = getAllNotes();

// After
const [notes, setNotes] = useState([]);

useEffect(() => {
  const loadNotes = async () => {
    const data = await getAllNotes();
    setNotes(data);
  };
  loadNotes();
}, []);
```

2. **Handle loading states**:

```typescript
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  setLoading(true);
  const result = await createNote(note, file);
  setLoading(false);
  
  if (result.success) {
    // Success handling
  }
};
```

### **Step 7: Environment Variables**

Create `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📝 Development Guidelines

### **Code Style**

1. **Use TypeScript strictly**
   ```typescript
   // ✅ Good
   const user: User = { name: 'John', email: 'john@email.com' };
   
   // ❌ Bad
   const user: any = { ... };
   ```

2. **Always use service layer**
   ```typescript
   // ✅ Good
   import { getAllNotes } from '../services/notesService';
   
   // ❌ Bad
   const notes = localStorage.getItem('notes');
   ```

3. **Component structure**
   ```typescript
   // 1. Imports
   import { useState } from 'react';
   import { createNote } from '../services/notesService';
   
   // 2. Interfaces/Types
   interface Props { ... }
   
   // 3. Component
   export default function Component({ ... }: Props) {
     // 3.1. State & Hooks
     const [state, setState] = useState();
     
     // 3.2. Handlers
     const handleClick = () => { ... };
     
     // 3.3. Render
     return ( ... );
   }
   ```

### **Git Workflow**

1. Create feature branch: `git checkout -b feature/add-supabase`
2. Make changes with clear commits
3. Test thoroughly
4. Create pull request

### **Testing Checklist**

- [ ] User dapat register dan login
- [ ] User dapat upload catatan dengan file
- [ ] Filter cascade berfungsi (Fakultas → Prodi → Semester → Mata Kuliah)
- [ ] User hanya bisa edit/delete catatan sendiri
- [ ] Admin dapat delete semua catatan
- [ ] Admin dapat promote user
- [ ] Setelah promoted, user tidak bisa akses user dashboard

---

## 🔍 Important Notes

### **Data Consistency**

- Nama prodi harus **exact match** dengan data di `allCoursesData.ts`
- Ada backward compatibility untuk nama prodi lama (e.g., "Teknik Informatika" → "Informatika")

### **Role System**

- Default role: `user`
- Admin promotion: **one-way** (tidak bisa downgrade)
- Admin harus login dengan admin dashboard, tidak bisa akses user dashboard

### **File Storage**

- Current: base64 di localStorage (limited, tidak scalable)
- Future: Supabase Storage (unlimited, CDN, optimized)

---

## 🚀 Next Steps

1. ✅ Setup Supabase project
2. ✅ Run database migrations
3. ✅ Setup storage bucket
4. ✅ Update service layer
5. ✅ Test authentication flow
6. ✅ Test file upload/download
7. ✅ Deploy to production

---

## 📞 Support

Jika ada pertanyaan atau butuh bantuan integrasi Supabase:
- Review comment `🔄 SUPABASE INTEGRATION` di setiap service file
- Check JSDoc comments untuk setiap function
- Semua integration points sudah didokumentasikan dengan jelas

**Happy Coding! 🎉**
