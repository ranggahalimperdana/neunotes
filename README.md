# UniNotes - Project Overview

> Platform berbagi catatan akademik dengan Neo-Brutalism design system

## 🎯 Quick Info

**Status**: ✅ Production Ready (localStorage) | 🔄 Ready for Supabase Integration  
**Tech**: React 18 + TypeScript + Tailwind CSS v4  
**Design**: Neo-Brutalism  
**Data**: localStorage → Supabase (migration ready)

---

## 📂 Documentation Index

| Document | Purpose | For |
|----------|---------|-----|
| [DEVELOPER_GUIDE.md](/DEVELOPER_GUIDE.md) | Full development guide & Supabase integration | All developers |
| [SUPABASE_INTEGRATION.md](/SUPABASE_INTEGRATION.md) | Quick integration checklist | Backend developers |
| [CODE_STANDARDS.md](/CODE_STANDARDS.md) | Coding standards & best practices | All developers |
| [README.md](/README.md) | Project overview (this file) | Everyone |

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Components (React + TypeScript + Tailwind CSS)      │  │
│  │  - Login.tsx                                          │  │
│  │  - Register.tsx                                       │  │
│  │  - UserDashboard.tsx                                  │  │
│  │  - UploadNotes.tsx                                    │  │
│  │  - AdminDashboard.tsx                                 │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕️
┌─────────────────────────────────────────────────────────────┐
│                     SERVICE LAYER                            │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  authService.ts        notesService.ts               │  │
│  │  - registerUser()      - createNote()                │  │
│  │  - loginUser()         - getAllNotes()               │  │
│  │  - logoutUser()        - deleteNote()                │  │
│  │  - promoteToAdmin()    - getFilteredNotes()          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                            ↕️
┌─────────────────────────────────────────────────────────────┐
│                      DATA LAYER                              │
│  ┌────────────────────┐         ┌─────────────────────┐    │
│  │   localStorage     │   →→→   │   Supabase          │    │
│  │   (Current)        │         │   (Future)          │    │
│  │                    │         │   - Auth            │    │
│  │  - users           │         │   - Database        │    │
│  │  - notes           │         │   - Storage         │    │
│  └────────────────────┘         └─────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

**Key Principle**: Service layer sebagai **abstraction** → Components tidak perlu berubah saat migrasi ke Supabase!

---

## 🎨 Features

### **User Features**
- ✅ Register & Login (email/password)
- ✅ Upload notes (PDF/Image) dengan metadata lengkap
- ✅ Filter cascade: Fakultas → Prodi → Semester → Mata Kuliah
- ✅ Manage notes (Create, Read, Update, Delete)
- ✅ Browse all notes dengan advanced filters
- ✅ Search by title, description, course name

### **Admin Features**
- ✅ Separate admin login
- ✅ View all posts from all users
- ✅ Delete problematic posts
- ✅ Promote users to admin
- ✅ **One-way promotion** (no downgrade)
- ✅ Admin cannot access user dashboard

### **Data Coverage**
9 Program Studi dengan mata kuliah lengkap:
- ✅ Informatika (semester 1-7 + Pilihan)
- ✅ Sipil (semester 1-7 + Pilihan)
- ✅ Geologi (semester 1-7 + Pilihan)
- ✅ Ilmu Komunikasi (semester 1-7 + Pilihan)
- ✅ PWK (semester 1-7 + Pilihan)
- ✅ Agribisnis (semester 1-7 + Pilihan)
- ✅ Agroteknologi (semester 1-7 + Pilihan)
- ✅ Perminyakan (semester 1-7 + Pilihan)
- ⚠️ Mesin (semester 1-2 only)

---

## 🗂️ Project Structure

```
src/app/
├── components/              # UI components
│   ├── Login.tsx            # Login page
│   ├── Register.tsx         # Registration with cascade dropdowns
│   ├── UserDashboard.tsx    # Main user dashboard
│   ├── UploadNotes.tsx      # Upload & manage own notes
│   └── AdminDashboard.tsx   # Admin panel
│
├── services/                # Business logic (Ready for Supabase!)
│   ├── authService.ts       # Authentication operations
│   └── notesService.ts      # Notes CRUD operations
│
├── data/                    # Static data
│   └── allCoursesData.ts    # 9 prodi course data
│
├── types/                   # TypeScript definitions
│   └── index.ts             # All interfaces & types
│
├── constants/               # App constants
│   └── index.ts             # Storage keys, messages, configs
│
├── utils/                   # Helper functions
│   ├── validation.ts        # Form validation
│   └── formatting.ts        # Data formatting
│
└── App.tsx                  # Main app component
```

---

## 🚀 Getting Started

### **Installation**
```bash
npm install
```

### **Development**
```bash
npm run dev
```

### **Build**
```bash
npm run build
```

### **Type Check**
```bash
npm run type-check
```

---

## 🔄 Supabase Integration Status

| Module | localStorage | Supabase | Status |
|--------|--------------|----------|--------|
| Authentication | ✅ Working | 🔄 Ready | Comments added |
| User Management | ✅ Working | 🔄 Ready | Comments added |
| Notes CRUD | ✅ Working | 🔄 Ready | Comments added |
| File Upload | ✅ base64 | 🔄 Ready | Storage planned |
| Course Data | ✅ Static | 🔄 Optional | Can stay static |

**Integration Time**: ~3 hours (estimated)  
**See**: [SUPABASE_INTEGRATION.md](/SUPABASE_INTEGRATION.md)

---

## 📖 How to Use This Codebase

### **For New Developers**

1. **Start here**: Read this README
2. **Understand architecture**: Check [DEVELOPER_GUIDE.md](/DEVELOPER_GUIDE.md)
3. **Follow standards**: Read [CODE_STANDARDS.md](/CODE_STANDARDS.md)
4. **Start coding**: Look at inline `🔄 SUPABASE` comments in service files

### **For Backend Integration**

1. **Read**: [SUPABASE_INTEGRATION.md](/SUPABASE_INTEGRATION.md)
2. **Setup**: Create Supabase project
3. **Database**: Run SQL migrations
4. **Update**: Follow service file comments
5. **Test**: Use provided checklist

### **For Frontend Work**

1. **Read**: [CODE_STANDARDS.md](/CODE_STANDARDS.md)
2. **Components**: Follow component structure guidelines
3. **State**: Use service layer, not direct localStorage
4. **Styling**: Follow Tailwind CSS standards

---

## 🔍 Key Files to Understand

| Priority | File | Why Important |
|----------|------|---------------|
| 🔴 High | `/src/app/services/authService.ts` | All authentication logic |
| 🔴 High | `/src/app/services/notesService.ts` | All notes operations |
| 🟡 Medium | `/src/app/data/allCoursesData.ts` | Course data & helper functions |
| 🟡 Medium | `/src/app/types/index.ts` | Data structures |
| 🟢 Low | `/src/app/constants/index.ts` | Configuration values |

---

## 💡 Design Decisions

### **1. Service Layer Pattern**
**Why**: Memisahkan business logic dari UI. Ketika migrasi ke Supabase, hanya perlu update service files, components tidak berubah.

### **2. TypeScript Strict Mode**
**Why**: Type safety untuk menghindari runtime errors dan improve developer experience.

### **3. No External State Management**
**Why**: Aplikasi cukup simple, React hooks sudah cukup. Menghindari over-engineering.

### **4. Static Course Data**
**Why**: Data mata kuliah jarang berubah, tidak perlu database overhead. Bisa di-migrate ke DB nanti jika perlu.

### **5. Neo-Brutalism Design**
**Why**: Memenuhi requirement desain UI/UX dari Figma yang tidak boleh diubah.

---

## ⚠️ Known Limitations

### **Current (localStorage)**
- ❌ No file size limit validation
- ❌ Files stored as base64 (performance issue with large files)
- ❌ No data persistence across devices
- ❌ No real-time updates
- ❌ No backup/recovery

### **After Supabase**
- ✅ Proper file storage with CDN
- ✅ Cross-device sync
- ✅ Real-time subscriptions
- ✅ Automatic backups
- ✅ Better security

---

## 🧪 Testing Guide

### **Manual Testing Checklist**

**User Flow**:
- [ ] Register with valid email/password
- [ ] Login with registered account
- [ ] Select Fakultas → see correct Prodi list
- [ ] Upload note with file (PDF/Image)
- [ ] View uploaded notes
- [ ] Edit own note
- [ ] Delete own note
- [ ] Logout

**Admin Flow**:
- [ ] Login as admin
- [ ] View all posts from all users
- [ ] Delete any post
- [ ] Search for user by email
- [ ] Promote user to admin
- [ ] Verify user cannot login to user dashboard anymore

**Edge Cases**:
- [ ] Register with duplicate email (should fail)
- [ ] Login with wrong password (should fail)
- [ ] Upload file > 10MB (should fail)
- [ ] Upload with empty fields (should fail)
- [ ] Filter with no results (should show empty state)

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| Components | 5 main + sub-components |
| Services | 2 (auth + notes) |
| Types | 10+ interfaces |
| Constants | 50+ constants |
| Course Data | 500+ mata kuliah |
| Program Studi | 9 prodi |
| Fakultas | 3 fakultas |

---

## 🤝 Contributing

1. Read [CODE_STANDARDS.md](/CODE_STANDARDS.md)
2. Create feature branch
3. Follow coding standards
4. Test thoroughly
5. Create pull request
6. Pass code review

---

## 📝 Changelog

### **Version 1.0.0** (Current)
- ✅ Complete user authentication
- ✅ Complete notes management
- ✅ Complete admin features
- ✅ 9 prodi data integrated
- ✅ Clean code refactoring
- ✅ Full documentation
- ✅ Supabase integration comments
- 🔄 Ready for Supabase migration

---

## 📞 Support & Questions

### **Where to Find Help**

| Question | Document |
|----------|----------|
| "How do I integrate Supabase?" | [SUPABASE_INTEGRATION.md](/SUPABASE_INTEGRATION.md) |
| "What are the coding standards?" | [CODE_STANDARDS.md](/CODE_STANDARDS.md) |
| "How does authentication work?" | [DEVELOPER_GUIDE.md](/DEVELOPER_GUIDE.md) + `/src/app/services/authService.ts` |
| "How do I add a new feature?" | [CODE_STANDARDS.md](/CODE_STANDARDS.md) + existing component examples |
| "Where is the data stored?" | Currently: localStorage, Future: Supabase (see service files) |

### **Code Navigation**

**Search for these markers in code**:
- `🔄 SUPABASE INTEGRATION` - Integration points with Supabase examples
- `TODO` - Things to implement
- `FIXME` - Things to fix
- `NOTE` - Important notes

---

## 🎓 Learning Resources

- **React**: https://react.dev/learn
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Supabase**: https://supabase.com/docs
- **Clean Code**: [CODE_STANDARDS.md](/CODE_STANDARDS.md)

---

## ✨ Credits

**Developed for**: UniNotes Platform  
**Design**: Neo-Brutalism (Figma)  
**Data**: 9 Program Studi - Universitas  
**Documentation**: Complete & Developer-Friendly

---

**Happy Coding! 🚀**

*Last Updated: December 2024*
