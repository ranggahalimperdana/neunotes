# UniNotes API Endpoints

Dokumentasi lengkap untuk semua endpoint API yang tersedia di sistem UniNotes.

---

## 🔐 Authentication

### 1. Sign Up (Register)

**Function**: `authService.signUp()`

```typescript
await authService.signUp(
  email: string,
  password: string,
  userData: {
    fullName: string;
    faculty: string;
    prodi: string;
  }
);
```

**Response**:
```typescript
{
  user: {
    id: string;
    email: string;
    // Supabase auth user object
  }
}
```

**Supabase Implementation**:
```typescript
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: userData.fullName,
      faculty: userData.faculty,
      prodi: userData.prodi,
    }
  }
});

// Create profile in profiles table
await supabase.from('profiles').insert({
  id: data.user!.id,
  email: email,
  full_name: userData.fullName,
  faculty: userData.faculty,
  prodi: userData.prodi,
  role: 'user'
});
```

---

### 2. Sign In (Login)

**Function**: `authService.signIn()`

```typescript
const profile: Profile = await authService.signIn(
  email: string,
  password: string
);
```

**Response**:
```typescript
{
  id: string;
  email: string;
  full_name: string;
  faculty: string;
  prodi: string;
  role: 'user' | 'admin';
  profile_picture?: string;
  created_at: string;
  updated_at: string;
}
```

**Redirect Logic**:
```typescript
if (profile.role === 'admin') {
  // Redirect to Admin Dashboard
} else {
  // Redirect to User Home
}
```

---

### 3. Sign Out (Logout)

**Function**: `authService.signOut()`

```typescript
await authService.signOut();
```

**Cleanup**:
- Clear localStorage
- Clear Supabase session
- Redirect to landing page

---

### 4. Get Current Profile

**Function**: `authService.getCurrentProfile()`

```typescript
const profile: Profile | null = await authService.getCurrentProfile();
```

**Use Case**:
- Check user role on page load
- Refresh user data
- Protected route check

---

## 👤 User Services (Role: user)

### 1. Create Post

**Function**: `userService.createPost()`

**Access**: Only users with role = 'user'

```typescript
const post: Post = await userService.createPost({
  title: string;
  description?: string;
  course_code: string;
  course_title: string;
  faculty: string;
  prodi: string;
  semester?: number;
  file_url: string;
  file_type: string;
  file_size?: number;
  author_name: string;
  author_email: string;
});
```

**RLS Policy**: Only users (NOT admin) can insert

```sql
CREATE POLICY "Users can create posts" ON public.posts
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'user'
    )
  );
```

---

### 2. Get All Posts

**Function**: `userService.getAllPosts()`

**Access**: Public (semua user bisa lihat)

```typescript
const posts: Post[] = await userService.getAllPosts({
  faculty?: string;
  prodi?: string;
  semester?: number;
  courseCode?: string;
});
```

**Filter Example**:
```typescript
// Get posts by Fakultas Teknik
const posts = await userService.getAllPosts({ 
  faculty: 'Fakultas Teknik' 
});

// Get posts by Prodi Informatika, Semester 3
const posts = await userService.getAllPosts({ 
  prodi: 'Informatika',
  semester: 3 
});
```

---

### 3. Get My Posts

**Function**: `userService.getMyPosts()`

**Access**: Authenticated user only

```typescript
const myPosts: Post[] = await userService.getMyPosts();
```

**Use Case**:
- User dashboard "Catatan Saya"
- Edit/delete own posts

---

### 4. Delete My Post

**Function**: `userService.deleteMyPost()`

**Access**: Owner only

```typescript
await userService.deleteMyPost(postId: string);
```

**RLS Policy**: User can only delete own posts

```sql
CREATE POLICY "Users can delete own posts" ON public.posts
  FOR DELETE USING (auth.uid() = uploaded_by);
```

---

### 5. Increment Views

**Function**: `userService.incrementViews()`

**Access**: Public

```typescript
await userService.incrementViews(postId: string);
```

**Supabase Function**:
```sql
CREATE OR REPLACE FUNCTION increment_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
```

---

### 6. Increment Downloads

**Function**: `userService.incrementDownloads()`

**Access**: Public

```typescript
await userService.incrementDownloads(postId: string);
```

**Supabase Function**:
```sql
CREATE OR REPLACE FUNCTION increment_downloads(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE posts SET downloads = downloads + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
```

---

## 👮 Admin Services (Role: admin)

### 1. Check Admin Status

**Function**: `adminService.isAdmin()`

```typescript
const isAdmin: boolean = await adminService.isAdmin();
```

**Use Case**:
- Route guard
- UI conditional rendering
- API authorization

---

### 2. Get All Users

**Function**: `adminService.getAllUsers()`

**Access**: Admin only

```typescript
const users: Profile[] = await adminService.getAllUsers();
```

**Returns**: All user profiles dengan role info

**Use Case**: Admin panel "Kelola User"

---

### 3. Get All Posts (Admin View)

**Function**: `adminService.getAllPostsForAdmin()`

**Access**: Admin only

```typescript
const posts: Post[] = await adminService.getAllPostsForAdmin();
```

**Difference vs `userService.getAllPosts()`**:
- Same data, tapi context berbeda
- Admin view untuk moderasi
- Include all metadata for review

---

### 4. Delete Post (Any Post)

**Function**: `adminService.deletePost()`

**Access**: Admin only

```typescript
await adminService.deletePost(
  postId: string,
  reason?: string
);
```

**Process**:
1. Get post details
2. Delete post
3. Log action to `admin_logs`

**RLS Policy**: Admin can delete any post

```sql
CREATE POLICY "Admins can delete any post" ON public.posts
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

**Admin Log**:
```typescript
{
  admin_id: string;
  admin_email: string;
  action_type: 'delete_post';
  target_id: postId;
  target_email: post.author_email;
  details: {
    post_title: string;
    reason: string;
  }
}
```

---

### 5. Promote User to Admin

**Function**: `adminService.promoteUserToAdmin()`

**Access**: Admin only

```typescript
await adminService.promoteUserToAdmin(userId: string);
```

**Process**:
1. Check if target is already admin
2. Update profile role to 'admin'
3. Log action to `admin_logs`

**RLS Policy**: Admin can update any profile

```sql
CREATE POLICY "Admins can update any profile" ON public.profiles
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

**Important**: Tidak ada downgrade (admin → user)!

**Admin Log**:
```typescript
{
  admin_id: string;
  admin_email: string;
  action_type: 'promote_user';
  target_id: userId;
  target_email: user.email;
  details: {
    user_name: string;
  }
}
```

---

### 6. Get Admin Logs

**Function**: `adminService.getAdminLogs()`

**Access**: Admin only

```typescript
const logs: AdminLog[] = await adminService.getAdminLogs(limit: number = 50);
```

**Response**:
```typescript
{
  id: string;
  admin_id: string;
  admin_email: string;
  action_type: 'delete_post' | 'promote_user';
  target_id?: string;
  target_email?: string;
  details?: {
    post_title?: string;
    user_name?: string;
    reason?: string;
  };
  created_at: string;
}
```

**Use Case**: Audit trail, transparency

---

## 📁 Storage Services

### 1. Upload File

**Function**: `storageService.uploadFile()`

**Access**: Authenticated users

```typescript
const fileUrl: string = await storageService.uploadFile(
  file: File,
  folder: string = 'notes'
);
```

**Process**:
1. Generate unique filename: `{userId}/{timestamp}.{ext}`
2. Upload to Supabase Storage bucket `notes-files`
3. Get public URL
4. Return URL

**File Path Structure**:
```
notes-files/
  notes/
    {user_id}/
      1640995200000.pdf
      1640995201000.docx
```

**Storage Policy** (Supabase):
```sql
-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'notes-files');

-- Allow public to download
CREATE POLICY "Public can download"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'notes-files');
```

---

### 2. Delete File

**Function**: `storageService.deleteFile()`

**Access**: Owner or Admin

```typescript
await storageService.deleteFile(fileUrl: string);
```

**Use Case**:
- User deletes own post
- Admin deletes problematic post

---

## 🔄 Example Flow: User Upload Post

```typescript
// 1. User selects file
const file = document.querySelector('input[type="file"]').files[0];

// 2. Upload file to storage
const fileUrl = await storageService.uploadFile(file, 'notes');

// 3. Create post with file URL
const post = await userService.createPost({
  title: "Catatan Algoritma Semester 3",
  description: "Materi lengkap algoritma dan struktur data",
  course_code: "TIF301",
  course_title: "Algoritma dan Struktur Data",
  faculty: "Fakultas Teknik",
  prodi: "Informatika",
  semester: 3,
  file_url: fileUrl,
  file_type: file.type,
  file_size: file.size,
  author_name: userData.fullName,
  author_email: userData.email
});

// 4. Success! Post created
console.log('Post created:', post.id);
```

---

## 🔄 Example Flow: Admin Delete Post

```typescript
// 1. Admin views all posts
const posts = await adminService.getAllPostsForAdmin();

// 2. Admin selects problematic post
const postToDelete = posts.find(p => p.id === selectedId);

// 3. Admin deletes post with reason
await adminService.deletePost(
  postToDelete.id,
  "Konten tidak sesuai dengan guidelines"
);

// 4. Delete file from storage
await storageService.deleteFile(postToDelete.file_url);

// 5. Success! Post deleted and logged
console.log('Post deleted by admin');
```

---

## 🔄 Example Flow: Admin Promote User

```typescript
// 1. Admin views all users
const users = await adminService.getAllUsers();

// 2. Admin selects user to promote
const userToPromote = users.find(u => u.email === 'moderator@example.com');

// 3. Admin promotes user
await adminService.promoteUserToAdmin(userToPromote.id);

// 4. Success! User is now admin
// User must re-login to get new role
console.log('User promoted to admin');
```

---

## 🚨 Error Handling

All services should handle errors properly:

```typescript
try {
  const posts = await userService.getAllPosts();
} catch (error) {
  console.error('Failed to fetch posts:', error);
  // Show user-friendly error message
  showNotification('Gagal memuat data. Silakan coba lagi.');
}
```

**Common Errors**:

- `User not authenticated` → Redirect to login
- `Permission denied` → Show unauthorized message
- `Only users can create posts` → Admin trying to create post
- `Only admins can promote users` → User trying admin action

---

## 📊 Data Types Reference

### Profile
```typescript
interface Profile {
  id: string;
  email: string;
  full_name: string;
  faculty: string;
  prodi: string;
  role: 'user' | 'admin';
  profile_picture?: string;
  created_at: string;
  updated_at: string;
}
```

### Post
```typescript
interface Post {
  id: string;
  title: string;
  description?: string;
  course_code: string;
  course_title: string;
  faculty: string;
  prodi: string;
  semester?: number;
  file_url: string;
  file_type: string;
  file_size?: number;
  uploaded_by: string;
  author_name: string;
  author_email: string;
  views: number;
  downloads: number;
  created_at: string;
  updated_at: string;
}
```

### AdminLog
```typescript
interface AdminLog {
  id: string;
  admin_id: string;
  admin_email: string;
  action_type: 'delete_post' | 'promote_user';
  target_id?: string;
  target_email?: string;
  details?: Record<string, any>;
  created_at: string;
}
```

---

## 🔗 Quick Reference

| Service | Function | Access | Purpose |
|---------|----------|--------|---------|
| **Auth** | `signUp()` | Public | Register new user |
| | `signIn()` | Public | Login user |
| | `signOut()` | Authenticated | Logout |
| | `getCurrentProfile()` | Authenticated | Get user data |
| **User** | `createPost()` | User only | Upload catatan |
| | `getAllPosts()` | Public | Browse catatan |
| | `getMyPosts()` | Authenticated | My uploads |
| | `deleteMyPost()` | Owner | Delete own post |
| **Admin** | `isAdmin()` | Authenticated | Check admin status |
| | `getAllUsers()` | Admin only | User management |
| | `deletePost()` | Admin only | Moderate posts |
| | `promoteUserToAdmin()` | Admin only | Promote users |
| | `getAdminLogs()` | Admin only | Audit trail |
| **Storage** | `uploadFile()` | Authenticated | Upload files |
| | `deleteFile()` | Owner/Admin | Delete files |

---

Dokumentasi ini akan terus diupdate seiring development. ✨
