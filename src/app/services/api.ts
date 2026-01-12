import { createClient } from '@supabase/supabase-js';

// ==========================================
// KONFIGURASI SUPABASE (CLIENT)
// ==========================================

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Anon Key in .env file');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// ==========================================
// 1. TYPE DEFINITIONS
// ==========================================

export interface Profile {
  id_user: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin' | 'super_admin';
  user_profile?: string;
  id_faculty?: string;
  id_prodi?: string;
  id_semester?: string;
  id_courses?: string;
  created_at: string;
  // Tambahan untuk menampung hasil join
  faculties?: { faculty_name: string };
  prodi?: { prodi_name: string };
  // Properti alternatif jika mapping manual dilakukan
  faculty_name?: string;
  prodi_name?: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  semester: string;
  prodi: string;
  faculty: string;
  notes: number;
  description: string;
}

export interface Faculty {
  id_faculty: string;
  faculty_name: string;
}

export interface Prodi {
  id_prodi: string;
  prodi_name: string;
  id_faculty: string;
}

export interface Semester {
  id_semester: string;
  semester_name: string;
}

// ==========================================
// 2. AUTH SERVICE
// ==========================================

export const authService = {
  signUp: async (email: string, password: string, userData: { fullName: string, facultyId: string, prodiId: string }) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id_user: authData.user.id,
          email: email,
          full_name: userData.fullName,
          id_faculty: userData.facultyId,
          id_prodi: userData.prodiId,
          role: 'user'
        });

      if (profileError) throw profileError;
    }
    return authData;
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // MENGAMBIL DATA USER + JOIN NAMA FAKULTAS & PRODI
  getCurrentUserWithRole: async (): Promise<any> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        faculties:id_faculty (faculty_name),
        prodi:id_prodi (prodi_name)
      `)
      .eq('id_user', user.id)
      .maybeSingle();

    if (error) return null;
    return data;
  },

  sendPasswordResetOtp: async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/update-password', 
    });
    if (error) throw error;
  },

  updateUserPassword: async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    });
    if (error) throw error;
    return data;
  },

  uploadAvatar: async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  },

  updateUserProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id_user', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};

// ==========================================
// 3. MASTER DATA SERVICE
// ==========================================

export const masterService = {
  getFaculties: async () => {
    const { data, error } = await supabase
      .from('faculties')
      .select('*')
      .order('faculty_name');
    
    if (error) throw error;
    return data as Faculty[];
  },

  getProdiByFaculty: async (facultyId: string) => {
    const { data, error } = await supabase
      .from('prodi')
      .select('*')
      .eq('id_faculty', facultyId)
      .order('prodi_name');

    if (error) throw error;
    return data as Prodi[];
  },

  getSemesters: async () => {
    const { data, error } = await supabase
      .from('semesters')
      .select('*')
      .order('id_semester');
    
    if (error) throw error;
    return data as Semester[];
  },

  getCourses: async (facultyId?: string, prodiId?: string, semesterId?: string, search?: string) => {
    let query = supabase
      .from('courses')
      .select(`
        *,
        prodi:id_prodi (prodi_name, id_faculty),
        semester:id_semester (semester_name)
      `);

    if (prodiId) {
      query = query.eq('id_prodi', prodiId);
    } else if (facultyId) {
      const { data: prodiList } = await supabase
        .from('prodi')
        .select('id_prodi')
        .eq('id_faculty', facultyId);
      
      if (prodiList && prodiList.length > 0) {
        const prodiIds = prodiList.map(p => p.id_prodi);
        query = query.in('id_prodi', prodiIds);
      } else {
        return [];
      }
    }

    if (semesterId) {
      query = query.eq('id_semester', semesterId);
    }

    if (search) {
      query = query.or(`matkul_name.ilike.%${search}%,matkul_code.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id_courses,
      code: item.matkul_code,
      title: item.matkul_name,
      description: `Mata Kuliah Program Studi ${item.prodi?.prodi_name}`,
      notes: 0,
      faculty: item.prodi?.id_faculty || '', 
      prodi: item.prodi?.prodi_name || '',
      semester: item.semester?.semester_name || '' 
    })) as Course[];
  },

  getNotesByCourse: async (courseId: string) => {
    const { data, error } = await supabase
      .from('notes')
      .select(`
        *,
        profiles:id_user (full_name) 
      `) 
      .eq('id_courses', courseId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id_catatan,
      title: item.judul,
      description: item.deskripsi,
      fileType: item.catatan_type,
      fileUrl: item.file_catatan,
      createdAt: item.created_at,
      uploaderName: item.profiles?.full_name || 'Mahasiswa',
      downloadCount: 0 
    }));
  },

  // NEW: Get Recent Notes for Timeline
  getRecentNotes: async () => {
    const { data, error } = await supabase
      .from('notes')
      .select(`
        *,
        profiles:id_user (full_name),
        courses:id_courses (matkul_name, matkul_code)
      `)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) throw error;

    return data.map((item: any) => ({
      id: item.id_catatan,
      title: item.judul,
      category: item.courses?.matkul_name || 'Mata Kuliah Umum', 
      author: item.profiles?.full_name || 'Mahasiswa',
      date: item.created_at,
      fileType: item.catatan_type,
      isNew: true 
    }));
  },

  uploadNote: async (file: File, noteData: any) => {
    const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`; 
    
    const { error: uploadError } = await supabase.storage
      .from('notes') 
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from('notes')
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase.from('notes').insert({
      id_user: noteData.userId,
      judul: noteData.title,
      deskripsi: noteData.description,
      catatan_type: noteData.type,
      file_catatan: urlData.publicUrl,
      id_faculty: noteData.facultyId,
      id_prodi: noteData.prodiId,
      id_semester: noteData.semesterId,
      id_courses: noteData.courseId
    });

    if (dbError) throw dbError;
    return true;
  }
};

// ==========================================
// 4. ADMIN SERVICE
// ==========================================

export const adminService = {
  getAllUsers: async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('role', { ascending: true }); 
    
    if (error) throw error;
    return data as Profile[];
  },

  changeUserRole: async (targetUserId: string, newRole: 'user' | 'admin') => {
    const currentUser = await authService.getCurrentUserWithRole();
    if (!currentUser) throw new Error("User tidak ditemukan.");

    if (currentUser.role !== 'super_admin') {
        throw new Error("AKSES DITOLAK: Hanya Super Admin yang memiliki hak akses ini.");
    }

    if (currentUser.id_user === targetUserId) {
        throw new Error("AKSES DITOLAK: Anda tidak dapat mengubah status akun sendiri.");
    }

    const { data: targetUser, error: targetError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id_user', targetUserId)
      .single();

    if (targetError || !targetUser) throw new Error("Target user tidak ditemukan.");

    if (targetUser.role === 'super_admin') {
       throw new Error("AKSES DITOLAK: Tidak bisa mengubah akun Super Admin.");
    }

    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('id_user', targetUserId);

    if (error) throw error;
    return { success: true, message: `Role user berhasil diubah menjadi ${newRole}` };
  },

  getAllPosts: async () => {
    const { data, error } = await supabase
      .from('notes')
      .select(`
        *,
        profiles:id_user (full_name),
        courses:id_courses (matkul_code, matkul_name),
        prodi:id_prodi (prodi_name),
        faculties:id_faculty (faculty_name)
      `) 
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    return data.map((note: any) => ({
      id: note.id_catatan,
      title: note.judul,
      courseCode: note.courses?.matkul_code || '-',
      courseTitle: note.courses?.matkul_name || '-',
      faculty: note.faculties?.faculty_name || '-',
      prodi: note.prodi?.prodi_name || '-',
      uploadedBy: note.id_user,
      author: note.profiles?.full_name || 'Unknown',
      createdAt: note.created_at,
      fileType: note.catatan_type,
      fileData: note.file_catatan,
      description: note.deskripsi
    })); 
  },

  deletePost: async (postId: string) => {
    const currentUser = await authService.getCurrentUserWithRole();

    if (currentUser?.role === 'user') {
        throw new Error("AKSES DITOLAK: Anda tidak memiliki izin Admin.");
    }

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id_catatan', postId);

    if (error) throw error;
  }
};