import { supabase } from './supabase';

export interface Note {
  id: string;
  title: string;
  description: string;
  course_code: string;
  course_title: string;
  semester: string;
  faculty: string;
  prodi: string;
  file_url: string;
  file_name: string;
  file_size: string;
  file_type: 'PDF' | 'IMG';
  uploaded_by: string;
  uploader_name: string;
  created_at: string;
}

export const notesService = {
  // 1. Upload File ke Storage & Simpan Data ke Database
  uploadNote: async (file: File, metadata: Omit<Note, 'id' | 'file_url' | 'created_at' | 'uploaded_by'>) => {
    // A. Upload File ke Storage
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    if (!userId) throw new Error("User tidak terautentikasi.");

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('notes-files')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    // B. Dapatkan Public URL
    const { data: urlData } = supabase.storage
      .from('notes-files')
      .getPublicUrl(filePath);

    // C. Simpan Metadata ke Database
    const { data, error: dbError } = await supabase
      .from('notes')
      .insert({
        ...metadata,
        file_url: urlData.publicUrl,
        uploaded_by: userId,
      })
      .select()
      .single();

    if (dbError) throw dbError;
    return data;
  },

  // 2. Ambil Semua Catatan (dengan filter opsional)
  getNotes: async (filters?: { uploaded_by?: string; course_code?: string }) => {
    let query = supabase.from('notes').select('*').order('created_at', { ascending: false });

    if (filters?.uploaded_by) {
      query = query.eq('uploaded_by', filters.uploaded_by);
    }
    
    if (filters?.course_code) {
        query = query.eq('course_code', filters.course_code);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Note[];
  },

  // 3. Hapus Catatan
  deleteNote: async (noteId: string, fileUrl: string) => {
    // A. Hapus dari Database
    const { error: dbError } = await supabase
      .from('notes')
      .delete()
      .eq('id', noteId);

    if (dbError) throw dbError;

    // B. Hapus File Fisik dari Storage (Optional tapi disarankan agar hemat storage)
    // Extract path dari URL: .../notes-files/USER_ID/FILENAME
    try {
        const path = fileUrl.split('/notes-files/')[1];
        if (path) {
            await supabase.storage.from('notes-files').remove([path]);
        }
    } catch (error) {
        console.error("Gagal menghapus file fisik:", error);
        // Error hapus file storage tidak perlu menghentikan proses UI
    }
  },

  // 4. Update Catatan (Fitur Baru)
  updateNote: async (
    noteId: string, 
    updates: Partial<Note>, 
    newFile?: File, 
    oldFileUrl?: string
  ) => {
    let file_url = updates.file_url;
    let file_name = updates.file_name;
    let file_size = updates.file_size;

    // Jika ada file baru yang dipilih user
    if (newFile) {
        const user = await supabase.auth.getUser();
        const userId = user.data.user?.id;
        if (!userId) throw new Error("User tidak terautentikasi.");

        // A. Upload file baru
        const fileExt = newFile.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `${userId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('notes-files')
            .upload(filePath, newFile);

        if (uploadError) throw uploadError;

        // B. Dapatkan URL baru
        const { data: urlData } = supabase.storage
            .from('notes-files')
            .getPublicUrl(filePath);
        
        file_url = urlData.publicUrl;
        file_name = newFile.name;
        
        // Hitung size manual disini untuk update metadata
        file_size = (newFile.size < 1024 ? newFile.size + ' B' : 
                    newFile.size < 1024 * 1024 ? (newFile.size / 1024).toFixed(2) + ' KB' : 
                    (newFile.size / (1024 * 1024)).toFixed(2) + ' MB');

        // C. Hapus file lama dari storage (agar hemat ruang)
        if (oldFileUrl) {
            try {
                const oldPath = oldFileUrl.split('/notes-files/')[1];
                if (oldPath) {
                    await supabase.storage.from('notes-files').remove([oldPath]);
                }
            } catch (e) {
                console.error("Gagal hapus file lama:", e); // Non-blocking error
            }
        }
    }

    // D. Update Data di Database
    // Kita filter object updates agar tidak membawa field undefined
    const cleanUpdates = {
        ...updates,
        file_url,
        file_name,
        file_size
    };

    const { data, error } = await supabase
        .from('notes')
        .update(cleanUpdates)
        .eq('id', noteId)
        .select()
        .single();

    if (error) throw error;
    return data;
  }
};