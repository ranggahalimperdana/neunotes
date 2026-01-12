/**
 * Helper Script untuk Create Admin Account
 * 
 * Cara pakai:
 * 1. Buka Browser Console (F12 → Console)
 * 2. Copy-paste function ini
 * 3. Jalankan: createAdminAccount()
 * 4. Login dengan credentials yang ditampilkan
 */

export function createAdminAccount() {
  const adminData = {
    fullName: 'Super Admin',
    email: 'admin@uninotes.com',
    faculty: 'Fakultas Teknik',
    prodi: 'Informatika',
    role: 'admin'
  };

  // Get existing users or create new object
  const savedUsers = localStorage.getItem('uninotes_users');
  const users = savedUsers ? JSON.parse(savedUsers) : {};

  // Add admin account
  users[adminData.email] = adminData;

  // Save to localStorage
  localStorage.setItem('uninotes_users', JSON.stringify(users));

  console.log('✅ ADMIN ACCOUNT CREATED!');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📧 Email:    admin@uninotes.com');
  console.log('🔑 Password: admin123');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('');
  console.log('👉 Sekarang bisa login dengan credentials di atas!');
  console.log('👉 Akan otomatis redirect ke Admin Panel');
  
  return adminData;
}

// Auto-run when script loaded
if (typeof window !== 'undefined') {
  (window as any).createAdminAccount = createAdminAccount;
  console.log('Helper loaded! Run: createAdminAccount()');
}
