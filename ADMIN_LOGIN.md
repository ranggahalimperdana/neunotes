# 🔐 Admin Login - Quick Guide

## ✅ ADMIN ACCOUNT SUDAH AUTO-CREATED!

Admin account sudah **otomatis dibuat** saat aplikasi pertama kali load!

Tidak perlu jalankan script lagi - langsung login saja dengan:

```
📧 Email:    admin@uninotes.com
🔑 Password: admin123
```

---

## 🚀 Cara Login Admin:

### Step 1: Buka aplikasi
```
http://localhost:5173
```

### Step 2: Klik tombol "Masuk"

### Step 3: Login dengan credentials:
```
📧 Email:    admin@uninotes.com
🔑 Password: admin123
```

### Step 4: Otomatis redirect ke Admin Panel! 🎉

---

## 💡 Cek di Console

Saat aplikasi pertama load, di Browser Console (F12) akan muncul:

```
✅ ADMIN ACCOUNT AUTO-CREATED!
📧 Email: admin@uninotes.com
🔑 Password: admin123
Login sekarang untuk akses Admin Panel!
```

---

## 🎯 Fitur Admin Dashboard

Setelah login sebagai admin, Anda akan diarahkan ke **Admin Panel** dengan fitur:

### 📋 Tab 1: KELOLA POSTING
- ✅ Lihat semua posting dari semua user
- ✅ Filter posting berdasarkan fakultas
- ✅ Cari posting berdasarkan judul, kode, atau author
- ✅ Hapus posting yang bermasalah (dengan konfirmasi)
- ✅ Lihat detail: Course Code, File Type, Fakultas, Prodi, Author, Tanggal

### 👥 Tab 2: KELOLA USER  
- ✅ Lihat semua user terdaftar
- ✅ Filter user berdasarkan fakultas
- ✅ Cari user berdasarkan nama atau email
- ✅ Lihat role user (Admin/User)
- ✅ **Promote user menjadi admin** (dengan konfirmasi)
- ⚠️ **PERHATIAN**: Setelah dipromosikan jadi admin, user tidak bisa downgrade!

### 🛡️ Fitur Keamanan
- ✅ Warning banner: Admin tidak bisa membuat posting
- ✅ Semua aksi admin dicatat di localStorage (`uninotes_admin_logs`)
- ✅ Konfirmasi sebelum hapus posting
- ✅ Konfirmasi sebelum promote user

---

## 🎨 Tampilan Admin Dashboard

### Header
- **Background**: Gradient Red → Orange 🔴
- **Icon**: Shield 🛡️
- **Text**: "Admin Panel"
- **Email**: Ditampilkan di bawah title

### Warning Banner
- **Background**: Kuning
- **Icon**: AlertTriangle ⚠️
- **Pesan**: Admin tidak bisa buat posting atau interaksi sebagai user

### Tabs
- **Active Tab**: Background biru dengan shadow
- **Inactive Tab**: Background putih

---

## 🚀 Apa yang Terjadi Setelah Login Admin?

1. ✅ Redirect otomatis ke **Admin Panel** (bukan user dashboard)
2. ✅ Tampil 2 tab: **Kelola Posting** & **Kelola User**
3. ✅ Warning banner: "Sebagai admin, tidak bisa buat posting"
4. ✅ Bisa hapus posting bermasalah
5. ✅ Bisa promote user jadi admin

---

## 👤 Membuat User Biasa untuk Testing

1. Klik **"Daftar Sekarang"**
2. Isi form:
   ```
   Email: user@uninotes.com
   Password: user123
   Nama: Test User
   Fakultas: (pilih sembarang)
   Prodi: (pilih sembarang)
   ```
3. Submit → Otomatis login sebagai **User**
4. Bisa upload catatan, dll.

---

## 🔄 Switch Role (Testing)

### Promote User → Admin (via Console)
```javascript
const users = JSON.parse(localStorage.getItem('uninotes_users'));
users['user@uninotes.com'].role = 'admin';
localStorage.setItem('uninotes_users', JSON.stringify(users));
console.log('✅ User promoted to admin!');
```

User harus **logout & login lagi** untuk melihat perubahan.

---

## 🐛 Troubleshooting

### Problem: "Email atau kata sandi salah"
**Solution**: Pastikan sudah jalankan script `createAdminAccount()` di console.

### Problem: Masih redirect ke user dashboard
**Solution**: Check role di localStorage:
```javascript
const user = JSON.parse(localStorage.getItem('uninotes_user'));
console.log('Current role:', user.role);
```

Jika bukan 'admin', logout dan login ulang.

### Problem: Ingin reset semua data
**Solution**:
```javascript
localStorage.clear();
location.reload();
```

Lalu setup admin lagi dari awal.

---

## 📋 Testing Checklist

- [ ] Admin berhasil dibuat via console
- [ ] Login dengan `admin@uninotes.com`
- [ ] Redirect ke Admin Panel (bukan user home)
- [ ] Tab "Kelola Posting" tampil
- [ ] Tab "Kelola User" tampil
- [ ] Create user biasa via Register
- [ ] Login sebagai user → redirect ke user home
- [ ] User bisa upload catatan
- [ ] Admin bisa lihat & hapus posting user
- [ ] Admin bisa promote user → admin

---

## 🎨 Perbedaan Visual Admin vs User

### Admin Panel
- Header: Gradient **Red/Orange** 🔴
- Icon: **Shield** 🛡️
- Text: "Admin Panel"
- Warning banner kuning

### User Dashboard
- Header: Normal **Blue/Green** 🔵
- Icon: **Book** 📚
- Text: "Dashboard"
- Upload button available

---

## 📞 Auto-Instruction di Console

Aplikasi sudah diupdate dengan **auto-helper di console**!

Saat pertama kali load aplikasi, console akan otomatis tampilkan:
```
🔧 SETUP ADMIN ACCOUNT
Jalankan script ini untuk create admin account:
[full script...]
```

Tinggal **copy-paste** dan jalankan!

---

## 🎯 Next: Supabase Integration

Untuk production dengan Supabase, lihat:
- `ROLE_SYSTEM_SETUP.md` - Full setup guide
- `API_ENDPOINTS.md` - API documentation

---

**Selamat mencoba! 🚀**