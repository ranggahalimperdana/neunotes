# UniNotes - Supabase Integration Checklist

> Quick reference untuk integrasi Supabase API

## 📦 Files yang Perlu Diupdate

### **1. Service Files (Priority: HIGH)**

| File | Current | Supabase Replacement | Status |
|------|---------|---------------------|--------|
| `/src/app/services/authService.ts` | localStorage | Supabase Auth + users table | 🔄 Ready |
| `/src/app/services/notesService.ts` | localStorage | Supabase DB + Storage | 🔄 Ready |

**Semua function sudah ada comment `🔄 SUPABASE INTEGRATION` dengan contoh code!**

### **2. Configuration Files (NEW)**

| File | Purpose | Status |
|------|---------|--------|
| `/src/app/config/supabase.ts` | Supabase client setup | ⚪ Belum dibuat |
| `/.env` | Environment variables | ⚪ Belum dibuat |

### **3. Component Files (Priority: MEDIUM)**

Tidak perlu refactor besar! Hanya perlu:
- Ubah sync calls → async/await
- Tambahkan loading states
- Handle error states

| File | Changes Needed | Complexity |
|------|---------------|------------|
| `/src/app/components/Login.tsx` | async/await, loading | 🟢 Easy |
| `/src/app/components/Register.tsx` | async/await, loading | 🟢 Easy |
| `/src/app/components/UserDashboard.tsx` | async data loading | 🟡 Medium |
| `/src/app/components/UploadNotes.tsx` | file upload to Storage | 🟡 Medium |
| `/src/app/components/AdminDashboard.tsx` | async data loading | 🟡 Medium |

---

## 🗄️ Database Schema

### **Table: users**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  faculty TEXT NOT NULL,
  prodi TEXT NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Table: notes**
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
  file_url TEXT NOT NULL,  -- URL from Supabase Storage
  faculty TEXT NOT NULL,
  prodi TEXT NOT NULL,
  semester TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### **Table: courses** (Optional)
```sql
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  semester TEXT NOT NULL,
  prodi TEXT NOT NULL,
  faculty TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 📦 Storage Buckets

### **Bucket: notes-files**

Structure:
```
notes-files/
├── {user_id}/
│   ├── {timestamp}_file1.pdf
│   ├── {timestamp}_file2.png
│   └── ...
```

Policies:
- ✅ Authenticated users can upload
- ✅ Anyone can read (public)
- ✅ Users can delete own files

---

## 🔄 Migration Steps

### **Step 1: Setup (15 min)**
```bash
# Install Supabase
npm install @supabase/supabase-js

# Create config file
# /src/app/config/supabase.ts

# Create .env
# VITE_SUPABASE_URL=...
# VITE_SUPABASE_ANON_KEY=...
```

### **Step 2: Database (10 min)**
1. Copy SQL schema dari DEVELOPER_GUIDE.md
2. Run di Supabase SQL Editor
3. Verify tables created

### **Step 3: Storage (5 min)**
1. Create bucket `notes-files`
2. Set bucket public
3. Add storage policies

### **Step 4: Update authService.ts (30 min)**
Replace localStorage functions dengan Supabase Auth:
- `registerUser()` → `supabase.auth.signUp()`
- `loginUser()` → `supabase.auth.signInWithPassword()`
- `logoutUser()` → `supabase.auth.signOut()`
- `getCurrentUser()` → `supabase.auth.getUser()`
- `promoteToAdmin()` → Update users table

### **Step 5: Update notesService.ts (45 min)**
Replace localStorage functions:
- `createNote()` → Upload to Storage + Insert DB
- `getAllNotes()` → Query from DB
- `deleteNote()` → Delete from Storage + DB
- `updateNote()` → Update DB (dan Storage jika file berubah)
- `getFilteredNotes()` → Query with filters

### **Step 6: Update Components (60 min)**
For each component:
1. Add `async/await` to handlers
2. Add `loading` state
3. Add error handling
4. Test functionality

### **Step 7: Testing (30 min)**
- [ ] Register user
- [ ] Login user
- [ ] Upload note with file
- [ ] View all notes
- [ ] Filter notes
- [ ] Edit note
- [ ] Delete note
- [ ] Admin login
- [ ] Admin delete note
- [ ] Admin promote user

**Total Estimated Time: ~3 hours**

---

## 🎯 Quick Reference: Where to Find Integration Points

### **Authentication**
📄 File: `/src/app/services/authService.ts`
🔍 Search: `🔄 SUPABASE`

Functions:
- `registerUser()` - Line ~100
- `loginUser()` - Line ~130
- `logoutUser()` - Line ~170
- `getCurrentUser()` - Line ~180
- `promoteToAdmin()` - Line ~220

### **Notes/Posts**
📄 File: `/src/app/services/notesService.ts`
🔍 Search: `🔄 SUPABASE`

Functions:
- `getAllNotes()` - Line ~50
- `createNote()` - Line ~100
- `updateNote()` - Line ~150
- `deleteNote()` - Line ~200
- `getFilteredNotes()` - Line ~250

### **Course Data**
📄 File: `/src/app/data/allCoursesData.ts`
🔍 Search: `🔄 SUPABASE`

Functions (optional to migrate):
- `getCoursesByProdi()`
- `getCoursesBySemester()`
- `getSemestersByProdi()`

---

## ⚠️ Important Notes

### **Before Migration**
1. ✅ Backup localStorage data
2. ✅ Test current functionality
3. ✅ Document current user accounts

### **During Migration**
1. ⚠️ Work on dev branch
2. ⚠️ Test each service independently
3. ⚠️ Keep localStorage fallback (temporary)

### **After Migration**
1. ✅ Migrate user data from localStorage to Supabase
2. ✅ Migrate notes data
3. ✅ Remove localStorage code
4. ✅ Update documentation

---

## 🆘 Troubleshooting

### **Common Issues**

**Issue 1: "User tidak bisa upload file"**
- Check Storage bucket policy
- Verify user is authenticated
- Check file size limit

**Issue 2: "Query returns empty"**
- Check RLS policies
- Verify user authentication
- Check table structure

**Issue 3: "Auth error: Invalid JWT"**
- Refresh auth token
- Check `.env` variables
- Re-login user

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase Storage Guide](https://supabase.com/docs/guides/storage)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## ✅ Post-Integration Checklist

- [ ] All localStorage references removed
- [ ] All services use Supabase
- [ ] RLS policies tested
- [ ] File upload/download working
- [ ] Authentication flow working
- [ ] Admin features working
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Code documented
- [ ] Tests passing
- [ ] Deployed to production

---

**Good luck dengan integrasi! 🚀**

Jika ada pertanyaan, cek:
1. `/DEVELOPER_GUIDE.md` - Full documentation
2. Service files - Inline comments dengan contoh code
3. JSDoc comments - Dokumentasi function lengkap
