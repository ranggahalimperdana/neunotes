# UniNotes - Role-Based Access System

## 📋 Overview

UniNotes sekarang memiliki sistem role-based dengan dua role: **User** dan **Admin**.

## 🎯 Arsitektur Role System

### Role Types

1. **User (Default)**
   - Dapat membuat, mengedit, dan menghapus posting sendiri
   - Akses ke user dashboard
   - Dapat melihat semua posting
   - Dapat mengupload catatan/tugas

2. **Admin**
   - Tidak dapat membuat posting baru
   - Tidak dapat mengakses user dashboard
   - Hanya akses ke admin panel
   - Dapat menghapus posting bermasalah
   - Dapat mempromosikan user menjadi admin

### Aturan Penting

- Default role saat register: **user**
- Admin dapat promote user → admin
- **TIDAK ADA downgrade** (admin → user)
- Setelah menjadi admin, user tidak bisa lagi akses fitur user

---

## 📁 Struktur File

```
src/
├── app/
│   ├── services/
│   │   └── supabase.ts          # Service layer & database schema (dengan komentar)
│   ├── components/
│   │   ├── AdminDashboard.tsx   # Admin panel untuk moderasi
│   │   ├── Login.tsx            # Updated dengan role check
│   │   ├── Register.tsx         # Updated dengan default role
│   │   └── ...
│   └── App.tsx                  # Updated dengan role-based routing
```

---

## 🗄️ Database Schema (Supabase)

File `/src/app/services/supabase.ts` berisi **full SQL schema** yang perlu dijalankan di Supabase.

### Tables

1. **profiles** - User profile dengan role
   ```sql
   - id (UUID, PK)
   - email (TEXT, UNIQUE)
   - full_name (TEXT)
   - faculty (TEXT)
   - prodi (TEXT)
   - role (TEXT, DEFAULT 'user')
   - profile_picture (TEXT)
   - created_at, updated_at
   ```

2. **posts** - Catatan/tugas yang diupload
   ```sql
   - id (UUID, PK)
   - title, description
   - course_code, course_title
   - faculty, prodi, semester
   - file_url, file_type, file_size
   - uploaded_by (UUID, FK to profiles)
   - author_name, author_email
   - views, downloads
   - created_at, updated_at
   ```

3. **admin_logs** - Log aktivitas admin
   ```sql
   - id (UUID, PK)
   - admin_id (UUID, FK)
   - action_type (delete_post | promote_user)
   - target_id, target_email
   - details (JSONB)
   - created_at
   ```

### Row Level Security (RLS) Policies

✅ Users can read all profiles  
✅ Users can update own profile  
✅ Admins can update any profile (untuk promote)  
✅ Anyone can read posts  
✅ Only **users** (bukan admin) can create posts  
✅ Users can update/delete own posts  
✅ Admins can delete any post  
✅ Only admins can read/create admin logs  

---

## 🔌 Integrasi Supabase

### Step 1: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 2: Setup Supabase Project

1. Buat project di https://supabase.com
2. Dapatkan **Project URL** dan **Anon Key**
3. Update di `/src/app/services/supabase.ts`:
   ```typescript
   const SUPABASE_URL = 'YOUR_SUPABASE_URL';
   const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
   ```

### Step 3: Run SQL Schema

1. Buka **Supabase SQL Editor**
2. Copy-paste semua SQL dari komentar di `supabase.ts`
3. Execute

### Step 4: Setup Storage Bucket

1. Buka **Supabase Storage**
2. Create bucket: `notes-files`
3. Set bucket to **public**
4. Add policy untuk authenticated users upload

### Step 5: Uncomment Service Code

Uncomment semua function di `supabase.ts`:
- `authService.signUp()`
- `authService.signIn()`
- `userService.createPost()`
- `adminService.deletePost()`
- dll.

---

## 🚀 Login Flow & Role-Based Redirect

### Login Process

1. User input email & password
2. System check credentials di `uninotes_users` (localStorage) atau Supabase
3. Check user role:
   ```typescript
   if (user.role === 'admin') {
     // Redirect ke Admin Dashboard
     setCurrentView('dashboard');
   } else {
     // Redirect ke User Home
     setCurrentView('home');
   }
   ```

### User Dashboard vs Admin Panel

**User Dashboard** (`/components/Dashboard.tsx`):
- Feed posting dari semua user
- Upload catatan baru
- Lihat catatan sendiri
- Edit/hapus posting sendiri

**Admin Dashboard** (`/components/AdminDashboard.tsx`):
- **Tab: Kelola Posting**
  - Lihat semua posting
  - Hapus posting bermasalah
  - Filter by fakultas
  - Search posting
- **Tab: Kelola User**
  - Lihat semua user
  - Promote user → admin
  - Filter by fakultas
  - Search user

---

## 🔐 API Endpoints (Supabase Functions)

### Auth Services
```typescript
authService.signUp(email, password, userData)
authService.signIn(email, password)
authService.signOut()
authService.getCurrentProfile()
```

### User Services (Role: user)
```typescript
userService.createPost(postData)
userService.getAllPosts(filters)
userService.getMyPosts()
userService.deleteMyPost(postId)
userService.incrementViews(postId)
userService.incrementDownloads(postId)
```

### Admin Services (Role: admin)
```typescript
adminService.isAdmin()
adminService.getAllUsers()
adminService.getAllPostsForAdmin()
adminService.deletePost(postId, reason)
adminService.promoteUserToAdmin(userId)
adminService.getAdminLogs(limit)
```

### Storage Services
```typescript
storageService.uploadFile(file, folder)
storageService.deleteFile(fileUrl)
```

---

## 🧪 Testing dengan LocalStorage

Saat ini aplikasi menggunakan **localStorage** sebagai fallback untuk development.

### Create Admin Account (Manual)

1. Buat akun baru via Register
2. Buka **Browser DevTools** → Console
3. Run script:
   ```javascript
   // Get users
   const users = JSON.parse(localStorage.getItem('uninotes_users'));
   
   // Promote specific user to admin
   users['admin@example.com'].role = 'admin';
   
   // Save
   localStorage.setItem('uninotes_users', JSON.stringify(users));
   
   // Update current session if logged in
   const currentUser = JSON.parse(localStorage.getItem('uninotes_user'));
   if (currentUser.email === 'admin@example.com') {
     currentUser.role = 'admin';
     localStorage.setItem('uninotes_user', JSON.stringify(currentUser));
   }
   
   // Reload page
   location.reload();
   ```

### Test Scenarios

1. **User Login** → Should redirect to user home
2. **Admin Login** → Should redirect to admin panel
3. **User try to create post** → Success
4. **Admin try to create post** → Cannot (UI hidden)
5. **Admin delete post** → Success
6. **Admin promote user** → User becomes admin

---

## 📊 Admin Dashboard Features

### Tab 1: Kelola Posting

- **View all posts** dengan info lengkap
- **Delete button** dengan confirmation
- **Filter** by fakultas
- **Search** by title, course code, author
- **Stats**: Total posting count

### Tab 2: Kelola User

- **View all users** dengan role badge
- **Promote button** (hanya untuk user role)
- **Filter** by fakultas
- **Search** by name, email
- **Stats**: Total user count
- **Confirmation** sebelum promote

### Warning Banner

```
⚠️ PENTING: Sebagai admin, Anda tidak dapat membuat posting 
atau berinteraksi sebagai user biasa.
```

---

## 🔒 Security Best Practices

### Row Level Security

✅ Semua tabel menggunakan RLS  
✅ Policy berdasarkan role dari `profiles` table  
✅ Admin check via `auth.uid()` + `role = 'admin'`  
✅ User can only modify own data  

### Important Notes

⚠️ **Figma Make TIDAK ditujukan untuk mengumpulkan PII atau data sensitif**  
⚠️ Gunakan hanya untuk testing/prototype  
⚠️ Untuk production, gunakan proper backend security  

---

## 🎨 UI/UX Design

**PENTING**: Desain UI TIDAK BOLEH DIUBAH!  
Sistem role hanya menambah logic backend, bukan mengubah visual.

### Admin Dashboard Design

Menggunakan **Neo-Brutalism** style yang sama:
- ✅ Border tebal (#000)
- ✅ Shadow kasar (shadow-[4px_4px...])
- ✅ Warna: Red/Orange untuk admin (vs Blue/Green untuk user)
- ✅ Font mono uppercase bold
- ✅ Rounded corners (rounded-xl)

---

## 🐛 Troubleshooting

### Issue: User tidak bisa login setelah promote

**Solution**: Ensure role field ada di localStorage:
```javascript
const user = JSON.parse(localStorage.getItem('uninotes_user'));
if (!user.role) {
  user.role = 'user';
  localStorage.setItem('uninotes_user', JSON.stringify(user));
}
```

### Issue: Admin bisa create post

**Solution**: Check UI blocking:
- Upload button harus hidden untuk admin
- API harus reject POST from admin role

### Issue: Supabase RLS error

**Solution**: 
1. Check policies di SQL Editor
2. Ensure `auth.uid()` matches profile ID
3. Test with SQL query di Supabase

---

## 📝 Next Steps

1. ✅ Connect ke Supabase (follow setup guide)
2. ✅ Run SQL schema
3. ✅ Setup storage bucket
4. ✅ Uncomment service functions
5. ✅ Test login flow
6. ✅ Create first admin manually
7. ✅ Test admin features
8. ✅ Deploy!

---

## 📞 Support

Jika ada pertanyaan atau issue:
1. Check SQL schema di `supabase.ts`
2. Check RLS policies di Supabase
3. Check browser console untuk error
4. Test dengan localStorage fallback dulu

---

**Good luck! 🚀**
