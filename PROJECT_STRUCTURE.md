# UniNotes - Project Structure

Dokumentasi lengkap struktur project UniNotes dengan role-based access system.

---

## 📂 File Structure

```
uninotes/
│
├── src/
│   ├── app/
│   │   ├── App.tsx                      # Main app dengan role-based routing
│   │   │
│   │   ├── components/
│   │   │   ├── AdminDashboard.tsx       # Admin panel (role: admin)
│   │   │   ├── Dashboard.tsx            # User dashboard (role: user)
│   │   │   ├── LandingPage.tsx          # Public landing page
│   │   │   ├── Login.tsx                # Login dengan role detection
│   │   │   ├── Register.tsx             # Register (default role: user)
│   │   │   ├── ForgotPassword.tsx       # Password recovery
│   │   │   ├── CourseDetail.tsx         # Detail mata kuliah
│   │   │   ├── UploadNotes.tsx          # Upload catatan (user only)
│   │   │   ├── FilterSection.tsx        # Filter fakultas/prodi
│   │   │   ├── SettingsAccount.tsx      # User settings
│   │   │   └── ui/                      # Shadcn UI components
│   │   │
│   │   ├── services/
│   │   │   └── supabase.ts              # Supabase service layer + schema
│   │   │
│   │   └── data/
│   │       └── coursesData.ts           # Mock course data
│   │
│   └── styles/
│       ├── index.css                    # Global styles
│       ├── tailwind.css                 # Tailwind base
│       ├── theme.css                    # Theme variables
│       └── fonts.css                    # Font imports
│
├── ROLE_SYSTEM_SETUP.md                 # Setup guide (role system)
├── API_ENDPOINTS.md                     # API documentation
├── PROJECT_STRUCTURE.md                 # This file
└── package.json
```

---

## 🎯 Component Responsibilities

### 1. **App.tsx** (Main Controller)

**Responsibility**: Routing & state management

**State Management**:
- `currentView` → landing | home | dashboard | course-detail | upload-notes | settings
- `userData` → Current user data dengan role
- `isLoggedIn` → Authentication status
- Filter states (faculty, prodi, semester)

**Role-Based Routing**:
```typescript
// Login success handler
if (user.role === 'admin') {
  setCurrentView('dashboard'); // Admin Panel
} else {
  setCurrentView('home');       // User Home
}
```

**Views**:
- `landing` → LandingPage component
- `home` → Main browse interface
- `dashboard` → AdminDashboard (admin) or Dashboard (user)
- `course-detail` → CourseDetail component
- `upload-notes` → UploadNotes component
- `settings` → SettingsAccount component

---

### 2. **LandingPage.tsx** (Public)

**Responsibility**: Marketing page untuk non-authenticated users

**Features**:
- Hero section dengan CTA
- Features showcase
- Footer dengan social links
- Buttons: "Masuk" dan "Daftar Sekarang"

**Props**:
```typescript
{
  onLoginClick: () => void;
  onRegisterClick: () => void;
}
```

---

### 3. **Login.tsx** (Public)

**Responsibility**: User authentication

**Features**:
- Email/password validation
- Role detection dari localStorage/Supabase
- Redirect berdasarkan role
- Link ke Register & Forgot Password

**Flow**:
1. Validate credentials
2. Get user data (including role)
3. Store to `uninotes_temp_login`
4. Trigger `onLoginSuccess()`
5. App.tsx handles redirect based on role

**Supabase Integration** (commented):
```typescript
// const profile = await authService.signIn(email, password);
// Redirect based on profile.role
```

---

### 4. **Register.tsx** (Public)

**Responsibility**: User registration

**Features**:
- Multi-step form dengan validation
- Faculty & Prodi selection
- Password strength check
- **Default role: 'user'**

**Data Created**:
```typescript
{
  fullName: string;
  email: string;
  faculty: string;
  prodi: string;
  role: 'user'; // ← ALWAYS 'user' on register
}
```

---

### 5. **Dashboard.tsx** (Role: user)

**Responsibility**: User personal dashboard

**Features**:
- Feed semua posting (dari semua user)
- Upload catatan baru
- Lihat catatan sendiri
- Edit/hapus posting sendiri
- Profile info

**Access**: `userData.role === 'user'`

**Actions**:
- Create post
- Delete own post
- View all posts
- Download files

---

### 6. **AdminDashboard.tsx** (Role: admin)

**Responsibility**: Admin moderation panel

**Features**:

**Tab 1: Kelola Posting**
- View all posts
- Delete any post (dengan confirmation)
- Filter by fakultas
- Search by title/author/course

**Tab 2: Kelola User**
- View all users dengan role badge
- Promote user → admin
- Filter by fakultas
- Search by name/email

**Access**: `userData.role === 'admin'`

**Important**:
- Admin TIDAK bisa create post
- Admin TIDAK bisa akses user dashboard
- Warning banner: "Sebagai admin, Anda tidak dapat membuat posting"

**Actions**:
- Delete any post
- Promote user to admin
- View admin logs (future)

---

### 7. **UploadNotes.tsx** (Role: user only)

**Responsibility**: Upload catatan/tugas

**Features**:
- File upload (PDF, DOCX, etc.)
- Metadata form (title, course, faculty, etc.)
- Preview sebelum upload
- Success notification

**Access**: `userData.role === 'user'`

**Blocked For**: Admin users (UI hidden + API reject)

**Data Structure**:
```typescript
{
  id: string;
  title: string;
  courseCode: string;
  courseTitle: string;
  faculty: string;
  prodi: string;
  uploadedBy: string; // user email/id
  author: string;
  createdAt: string;
  fileUrl: string;
  fileType: string;
}
```

---

### 8. **CourseDetail.tsx** (Public/Authenticated)

**Responsibility**: Show notes untuk specific course

**Features**:
- List semua notes untuk course
- Download button
- View counter
- Filter by semester
- Author info

**Actions**:
- Download file
- Increment view/download counter

---

### 9. **SettingsAccount.tsx** (Authenticated)

**Responsibility**: User profile management

**Features**:
- Edit profile (name, faculty, prodi)
- Change profile picture
- View account info
- **Cannot change role** (security)

**Access**: All authenticated users (admin & user)

---

### 10. **FilterSection.tsx** (Utility)

**Responsibility**: Filter UI component

**Features**:
- Fakultas dropdown
- Prodi dropdown (dynamic based on fakultas)
- Semester dropdown
- Clear filters button

**Props**:
```typescript
{
  selectedFaculty: string;
  selectedProdi: string;
  selectedSemester: string;
  onFacultyChange: (faculty: string) => void;
  onProdiChange: (prodi: string) => void;
  onSemesterChange: (semester: string) => void;
  onClearFilters: () => void;
  facultiesData: Faculty[];
}
```

---

## 🗄️ Data Layer

### 1. **LocalStorage (Current)**

**Keys**:
- `uninotes_user` → Current logged in user
- `uninotes_users` → All registered users (object by email)
- `uninotes_uploaded_notes` → All posted notes
- `uninotes_admin_logs` → Admin action logs
- `uninotes_temp_login` → Temporary login data

**Structure**:
```typescript
// uninotes_user
{
  fullName: string;
  email: string;
  faculty: string;
  prodi: string;
  role: 'user' | 'admin';
  profilePicture?: string;
}

// uninotes_users
{
  "user@example.com": {
    fullName: "...",
    email: "...",
    faculty: "...",
    prodi: "...",
    role: "user"
  },
  "admin@example.com": {
    fullName: "...",
    email: "...",
    faculty: "...",
    prodi: "...",
    role: "admin"
  }
}

// uninotes_uploaded_notes
[
  {
    id: "uuid",
    title: "...",
    courseCode: "...",
    // ...
  }
]

// uninotes_admin_logs
[
  {
    adminEmail: "admin@example.com",
    actionType: "delete_post",
    targetId: "post-id",
    timestamp: "2025-01-01T00:00:00Z"
  }
]
```

---

### 2. **Supabase (Future)**

**File**: `/src/app/services/supabase.ts`

**Tables**:
1. `profiles` → User data dengan role
2. `posts` → Posted notes/assignments
3. `admin_logs` → Admin action audit trail

**Storage**:
- Bucket: `notes-files`
- Path: `notes/{user_id}/{timestamp}.{ext}`

**Services**:
- `authService` → Sign up, sign in, sign out, get profile
- `userService` → Create post, get posts, delete own post
- `adminService` → Delete any post, promote user, view logs
- `storageService` → Upload/delete files

**See**: `/src/app/services/supabase.ts` untuk full schema & implementation

---

## 🎨 Design System

**Style**: Neo-Brutalism

**Colors**:
- Primary: `#4285F4` (Blue)
- Success: `#34A853` (Green)
- Warning: `#FBBC05` (Yellow)
- Danger: `#EA4335` (Red)
- Black: `#000000`
- White: `#FFFFFF`

**Typography**:
- Font: `font-mono`
- Weight: `font-bold`, `font-black`
- Case: `uppercase` for headings

**Borders**:
- Thickness: `border-2`
- Color: Always `border-black`
- Radius: `rounded-lg`, `rounded-xl`

**Shadows**:
- Standard: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`
- Hover: `shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`
- Large: `shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]`

**Interactions**:
- Hover: Translate + shadow increase
- Active: Translate back + shadow remove
- Transition: `transition-all duration-200`

---

## 🔐 Security & Access Control

### Role-Based Access

| Feature | User | Admin |
|---------|------|-------|
| View posts | ✅ | ✅ |
| Create post | ✅ | ❌ |
| Delete own post | ✅ | ❌ |
| Delete any post | ❌ | ✅ |
| Upload files | ✅ | ❌ |
| View all users | ❌ | ✅ |
| Promote to admin | ❌ | ✅ |
| Access user dashboard | ✅ | ❌ |
| Access admin panel | ❌ | ✅ |

### RLS Policies (Supabase)

**Profiles**:
- Anyone can read profiles
- Users can update own profile
- Admins can update any profile (for promotion)

**Posts**:
- Anyone can read posts
- Only **users** can create posts (not admin!)
- Users can update/delete own posts
- Admins can delete any post

**Admin Logs**:
- Only admins can read logs
- Only admins can create logs

**See**: `/src/app/services/supabase.ts` untuk full policies

---

## 🔄 User Flows

### 1. **User Registration & Login**

```
1. Landing Page
   ↓ Click "Daftar Sekarang"
2. Register Form
   ↓ Fill form (role = 'user' by default)
3. Submit Registration
   ↓ Create account
4. Redirect to Home
   ↓ Show user dashboard
5. Can upload notes
```

### 2. **Admin Login**

```
1. Landing Page
   ↓ Click "Masuk"
2. Login Form
   ↓ Enter credentials
3. Role Check: admin
   ↓ Redirect to Admin Panel
4. Admin Dashboard
   ↓ Can moderate posts & promote users
5. CANNOT create posts
```

### 3. **Promote User to Admin**

```
1. Admin Panel
   ↓ Tab: Kelola User
2. View all users
   ↓ Find user
3. Click "Jadikan Admin"
   ↓ Confirmation dialog
4. Confirm promotion
   ↓ Update role in database
5. Log action
   ↓ User must re-login
6. User is now Admin
   ↓ Loses access to user features
```

### 4. **Upload & Moderate Note**

```
User Side:
1. Dashboard → "Upload Catatan"
2. Fill form + upload file
3. Submit post
4. Post appears in feed

Admin Side:
1. Admin Panel → "Kelola Posting"
2. View all posts
3. Find problematic post
4. Click "Hapus"
5. Confirm deletion
6. Post removed + logged
```

---

## 📝 Development Roadmap

### Phase 1: LocalStorage (Current) ✅
- ✅ Basic role system dengan localStorage
- ✅ Admin dashboard UI
- ✅ User dashboard UI
- ✅ Role-based routing
- ✅ Basic CRUD operations

### Phase 2: Supabase Integration (Next)
- [ ] Connect Supabase
- [ ] Run SQL schema
- [ ] Uncomment service functions
- [ ] Test authentication
- [ ] Test RLS policies
- [ ] File upload to storage

### Phase 3: Production (Future)
- [ ] Deploy to Vercel/Netlify
- [ ] Setup custom domain
- [ ] Add email verification
- [ ] Add real-time updates
- [ ] Add notification system
- [ ] Add analytics

---

## 🚀 Quick Start Guide

### 1. Development (LocalStorage)

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Create test admin
# 1. Register new account
# 2. Open browser console
# 3. Run:
const users = JSON.parse(localStorage.getItem('uninotes_users'));
users['your@email.com'].role = 'admin';
localStorage.setItem('uninotes_users', JSON.stringify(users));
location.reload();
```

### 2. Production (Supabase)

```bash
# Install Supabase client
npm install @supabase/supabase-js

# Setup Supabase
# 1. Create project at supabase.com
# 2. Get credentials
# 3. Update src/app/services/supabase.ts
# 4. Run SQL schema in Supabase SQL Editor
# 5. Uncomment service functions

# Deploy
npm run build
# Deploy to Vercel/Netlify
```

**See**: `ROLE_SYSTEM_SETUP.md` for detailed setup guide

---

## 📚 Documentation Files

1. **PROJECT_STRUCTURE.md** (This file)
   - Overall project architecture
   - Component responsibilities
   - Data structure

2. **ROLE_SYSTEM_SETUP.md**
   - Setup guide untuk Supabase
   - Database schema
   - Testing guide

3. **API_ENDPOINTS.md**
   - Complete API reference
   - Request/response examples
   - Error handling

---

## 🐛 Common Issues & Solutions

### Issue: User role tidak tersimpan

**Solution**: 
```typescript
// Check if role exists, set default if not
if (!user.role) {
  user.role = 'user';
}
```

### Issue: Admin bisa create post

**Solution**:
- Check UI: Upload button harus hidden untuk admin
- Check API: Reject POST if user.role === 'admin'

### Issue: Promoted user masih lihat user dashboard

**Solution**: User harus logout & login lagi untuk refresh role

---

## 🎯 Best Practices

1. **Always check role** sebelum show/hide UI
2. **Always validate role** di backend/API
3. **Never trust frontend** untuk authorization
4. **Log admin actions** untuk audit trail
5. **Test RLS policies** di Supabase
6. **Use TypeScript types** untuk data consistency
7. **Handle errors gracefully** dengan user-friendly messages

---

**Happy coding! 🚀**
