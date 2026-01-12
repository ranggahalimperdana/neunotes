import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Upload, FileText, X, Trash2, Edit2, Loader2, CheckCircle } from 'lucide-react';
// IMPORT SERVICES
import { authService, masterService, supabase, Semester, Course } from '../services/api';

interface UploadNotesProps {
  onBack: () => void;
  userName: string;
  userEmail: string;
  userFaculty: string; // id_faculty
  userProdi: string;   // id_prodi
}

// Interface untuk Data Catatan di Frontend
interface Note {
  id: string;
  title: string;
  description: string;
  course_code: string;
  course_title: string;
  semester: string;
  file_type: 'PDF' | 'IMG';
  file_url: string;
  file_name: string;
  created_at: string;
  course_id: string; 
}

export default function UploadNotes({ onBack, userFaculty, userProdi }: UploadNotesProps) {
  // State Data
  const [userNotes, setUserNotes] = useState<Note[]>([]);
  const [semesters, setSemesters] = useState<Semester[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);

  // State UI
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingNotes, setIsLoadingNotes] = useState(true);
  const [isLoadingCourses, setIsLoadingCourses] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

  // State Form
  const [selectedSemester, setSelectedSemester] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [noteType, setNoteType] = useState<'PDF' | 'IMG'>('PDF');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- 1. LOAD DATA AWAL (SEMESTERS & NOTES) ---
  useEffect(() => {
    const initData = async () => {
      try {
        // Ambil Data Semester
        const sems = await masterService.getSemesters();
        setSemesters(sems);
        
        // Ambil Catatan User
        await fetchMyNotes();
      } catch (e) {
        console.error("Init Error:", e);
      }
    };
    initData();
  }, []);

  // --- 2. LOAD COURSES SAAT SEMESTER DIPILIH ---
  useEffect(() => {
    const loadCourses = async () => {
      if (selectedSemester && userProdi) {
        setIsLoadingCourses(true);
        try {
          // Panggil API getCourses dengan filter Prodi dan Semester
          const data = await masterService.getCourses(undefined, userProdi, selectedSemester);
          setCourses(data);
        } catch (e) { 
            console.error("Gagal load course", e); 
        } finally {
            setIsLoadingCourses(false);
        }
      } else {
        setCourses([]);
      }
    };
    loadCourses();
  }, [selectedSemester, userProdi]);

  // --- FETCH USER NOTES (MANUAL QUERY AGAR LEBIH SPESIFIK) ---
  const fetchMyNotes = async () => {
    setIsLoadingNotes(true);
    try {
      const user = await authService.getCurrentUserWithRole();
      if (!user) return;

      const { data, error } = await supabase
        .from('notes')
        .select(`
          *,
          courses:id_courses (matkul_code, matkul_name),
          semesters:id_semester (semester_name)
        `)
        .eq('id_user', user.id_user)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const formattedNotes: Note[] = data.map((item: any) => ({
          id: item.id_catatan,
          title: item.judul,
          description: item.deskripsi,
          course_code: item.courses?.matkul_code || '-',
          course_title: item.courses?.matkul_name || '-',
          semester: item.id_semester,
          course_id: item.id_courses,
          file_type: item.catatan_type,
          file_url: item.file_catatan,
          file_name: item.file_catatan.split('/').pop() || 'File',
          created_at: item.created_at
      }));

      setUserNotes(formattedNotes);
    } catch (error) {
      console.error("Gagal load notes:", error);
    } finally {
      setIsLoadingNotes(false);
    }
  };

  // --- HELPER FUNCTION ---
  const showNotif = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) return showNotif('Maksimal 10MB', 'error');
      
      const isImg = file.type.startsWith('image/');
      const isPdf = file.type === 'application/pdf';

      if (noteType === 'IMG' && !isImg) return showNotif('Format harus Gambar (JPG/PNG)', 'error');
      if (noteType === 'PDF' && !isPdf) return showNotif('Format harus PDF', 'error');

      setSelectedFile(file);
      if (isImg) setFilePreview(URL.createObjectURL(file));
      else setFilePreview('');
    }
  };

  const resetForm = () => {
    setSelectedSemester('');
    setSelectedCourse('');
    setNoteType('PDF');
    setNoteTitle('');
    setNoteDescription('');
    setSelectedFile(null);
    setFilePreview('');
    setEditingNoteId(null);
  };

  // --- SUBMIT (CREATE & UPDATE) ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return showNotif('Pilih Mata Kuliah', 'error');
    if (!editingNoteId && !selectedFile) return showNotif('File wajib diupload', 'error');

    setIsUploading(true);
    try {
      const user = await authService.getCurrentUserWithRole();
      if (!user) throw new Error("Sesi habis");

      let fileUrl = '';

      // 1. Upload File (Jika ada file baru)
      if (selectedFile) {
        const fileExt = selectedFile.name.split('.').pop();
        const fileName = `${Date.now()}_${selectedFile.name.replace(/\s/g, '_')}`;
        
        const { error: uploadError } = await supabase.storage.from('notes').upload(fileName, selectedFile);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('notes').getPublicUrl(fileName);
        fileUrl = data.publicUrl;
      }

      // 2. Prepare Payload
      const payload: any = {
        judul: noteTitle,
        deskripsi: noteDescription,
        catatan_type: noteType,
        id_faculty: userFaculty,
        id_prodi: userProdi,
        id_semester: selectedSemester,
        id_courses: selectedCourse,
      };

      if (fileUrl) payload.file_catatan = fileUrl;

      if (editingNoteId) {
        // UPDATE
        const { error } = await supabase.from('notes').update(payload).eq('id_catatan', editingNoteId);
        if (error) throw error;
        showNotif('Catatan berhasil diperbarui!', 'success');
      } else {
        // INSERT
        payload.id_user = user.id_user;
        const { error } = await supabase.from('notes').insert(payload);
        if (error) throw error;
        showNotif('Catatan berhasil diupload!', 'success');
      }

      resetForm();
      setShowUploadForm(false);
      fetchMyNotes();

    } catch (error: any) {
      console.error(error);
      showNotif(`Gagal: ${error.message}`, 'error');
    } finally {
      setIsUploading(false);
    }
  };

  // --- DELETE ---
  const handleDelete = async (noteId: string) => {
    if (!confirm("Hapus catatan ini secara permanen?")) return;
    try {
      const { error } = await supabase.from('notes').delete().eq('id_catatan', noteId);
      if (error) throw error;
      showNotif('Catatan dihapus', 'success');
      fetchMyNotes();
    } catch (error: any) {
      showNotif(error.message, 'error');
    }
  };

  // --- EDIT ---
  const handleEdit = (note: Note) => {
    setEditingNoteId(note.id);
    setNoteTitle(note.title);
    setNoteDescription(note.description);
    setNoteType(note.file_type);
    
    // Set Semester dulu
    setSelectedSemester(note.semester);
    
    // Delay sedikit agar Course ter-load berdasarkan semester
    setTimeout(() => {
        setSelectedCourse(note.course_id);
    }, 500);

    setShowUploadForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white font-mono pt-24 pb-12 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-black mb-2 font-bold group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              KEMBALI KE BERANDA
            </button>
            <h1 className="text-4xl font-black text-black uppercase tracking-tight">Catatan Saya</h1>
            <p className="font-bold text-gray-500">Kelola materi yang sudah kamu bagikan</p>
          </div>
          
          {!showUploadForm && (
            <button
              onClick={() => { setShowUploadForm(true); resetForm(); }}
              className="bg-[#34A853] text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-black uppercase flex items-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Upload Baru
            </button>
          )}
        </div>

        {/* Form Upload / Edit */}
        {showUploadForm && (
          <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mb-12 animate-in slide-in-from-bottom-5 rounded-xl">
            <div className="flex justify-between items-center mb-6 border-b-2 border-black border-dashed pb-4">
              <h2 className="text-2xl font-black uppercase">
                {editingNoteId ? 'Edit Catatan' : 'Upload Catatan Baru'}
              </h2>
              <button onClick={() => { setShowUploadForm(false); resetForm(); }} className="hover:bg-red-100 p-2 rounded-full transition-colors">
                <X className="w-6 h-6 text-[#EA4335]" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Judul & Deskripsi */}
                <div className="space-y-4">
                  <div>
                    <label className="block font-black text-sm uppercase mb-1">Judul Catatan</label>
                    <input 
                      type="text" 
                      value={noteTitle}
                      onChange={e => setNoteTitle(e.target.value)}
                      className="w-full border-2 border-black px-4 py-2 font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all rounded-lg"
                      placeholder="Contoh: Rangkuman Kalkulus Pertemuan 1"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-black text-sm uppercase mb-1">Deskripsi</label>
                    <textarea 
                      value={noteDescription}
                      onChange={e => setNoteDescription(e.target.value)}
                      className="w-full border-2 border-black px-4 py-2 font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:outline-none transition-all h-32 resize-none rounded-lg"
                      placeholder="Deskripsi singkat..."
                      required
                    />
                  </div>
                </div>

                {/* Dropdown & File */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block font-black text-sm uppercase mb-1">Semester</label>
                        <select 
                            value={selectedSemester} 
                            onChange={e => { setSelectedSemester(e.target.value); setSelectedCourse(''); }}
                            className="w-full border-2 border-black px-4 py-2 font-bold bg-white focus:outline-none rounded-lg cursor-pointer"
                            required
                        >
                            <option value="">Pilih...</option>
                            {semesters.map(s => <option key={s.id_semester} value={s.id_semester}>{s.semester_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block font-black text-sm uppercase mb-1">Mata Kuliah</label>
                        <div className="relative">
                            <select 
                                value={selectedCourse} 
                                onChange={e => setSelectedCourse(e.target.value)}
                                className="w-full border-2 border-black px-4 py-2 font-bold bg-white focus:outline-none disabled:bg-gray-100 rounded-lg cursor-pointer appearance-none"
                                required
                                disabled={!selectedSemester || isLoadingCourses}
                            >
                                <option value="">{isLoadingCourses ? 'Memuat...' : 'Pilih...'}</option>
                                {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                            {isLoadingCourses && <div className="absolute right-3 top-3"><Loader2 className="w-4 h-4 animate-spin"/></div>}
                        </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-black text-sm uppercase mb-1">Tipe File</label>
                    <div className="flex gap-4 mb-2">
                        <label className="flex items-center gap-2 cursor-pointer font-bold bg-gray-100 px-3 py-1 rounded border border-gray-300">
                            <input type="radio" checked={noteType === 'PDF'} onChange={() => setNoteType('PDF')} /> PDF
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer font-bold bg-gray-100 px-3 py-1 rounded border border-gray-300">
                            <input type="radio" checked={noteType === 'IMG'} onChange={() => setNoteType('IMG')} /> Gambar
                        </label>
                    </div>
                    
                    <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-black bg-gray-50 hover:bg-[#4285F4]/10 p-6 text-center cursor-pointer transition-colors relative rounded-xl"
                    >
                        <input ref={fileInputRef} type="file" className="hidden" accept={noteType === 'PDF' ? '.pdf' : 'image/*'} onChange={handleFileSelect} />
                        {selectedFile ? (
                            <div>
                                <p className="font-bold text-[#34A853] flex items-center justify-center gap-2">
                                    <CheckCircle className="w-5 h-5" /> {selectedFile.name}
                                </p>
                                {filePreview && <img src={filePreview} className="h-20 mx-auto mt-2 border-2 border-black rounded" alt="preview" />}
                            </div>
                        ) : (
                            <div className="text-gray-500">
                                <Upload className="w-8 h-8 mx-auto mb-2" />
                                <p className="font-bold text-sm">Klik untuk upload {editingNoteId ? '(Ganti File)' : 'File'}</p>
                                <p className="text-xs mt-1">Maks. 10MB</p>
                            </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-black border-dashed flex justify-end gap-3">
                <button type="button" onClick={resetForm} className="px-6 py-3 font-bold border-2 border-black hover:bg-gray-100 rounded-lg">Reset</button>
                <button 
                    type="submit" 
                    disabled={isUploading}
                    className="px-8 py-3 bg-[#4285F4] text-white font-black uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all flex items-center gap-2 disabled:opacity-70 rounded-lg"
                >
                    {isUploading && <Loader2 className="animate-spin w-5 h-5" />}
                    {editingNoteId ? 'Simpan Perubahan' : 'Upload Sekarang'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* List Notes */}
        <div>
            {isLoadingNotes ? (
                <div className="text-center py-20 font-bold animate-pulse flex flex-col items-center">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#4285F4]"/>
                    Memuat catatan saya...
                </div>
            ) : userNotes.length === 0 ? (
                <div className="text-center py-20 border-2 border-black bg-white shadow-sm rounded-xl border-dashed">
                    <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-2xl font-black mb-2 uppercase">Belum ada catatan</h3>
                    <p className="text-gray-500 font-bold">Mulai upload catatanmu sekarang!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userNotes.map((note) => (
                        <div key={note.id} className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform flex flex-col group rounded-xl overflow-hidden">
                            <div className="bg-black text-white px-4 py-2 flex justify-between items-center">
                                <span className="font-bold text-xs bg-[#FBBC05] text-black px-2 py-0.5 rounded-sm">{note.course_code}</span>
                                <span className="text-xs font-mono">{new Date(note.created_at).toLocaleDateString()}</span>
                            </div>
                            <div className="p-5 flex-1">
                                <h3 className="font-black text-lg leading-tight mb-2 line-clamp-2 uppercase">{note.title}</h3>
                                <p className="text-sm font-bold text-gray-500 mb-3">{note.course_title}</p>
                                <p className="text-sm text-gray-700 line-clamp-3">{note.description}</p>
                            </div>
                            <div className="p-4 border-t-2 border-black flex gap-2 bg-gray-50">
                                <button onClick={() => handleEdit(note)} className="flex-1 py-2 border-2 border-black font-bold hover:bg-[#FBBC05] transition-colors flex justify-center items-center gap-2 text-sm uppercase rounded-lg">
                                    <Edit2 className="w-4 h-4" /> Edit
                                </button>
                                <button onClick={() => handleDelete(note.id)} className="flex-1 py-2 border-2 border-black font-bold hover:bg-[#EA4335] hover:text-white transition-colors flex justify-center items-center gap-2 text-sm uppercase rounded-lg">
                                    <Trash2 className="w-4 h-4" /> Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-6 right-6 px-6 py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-white z-50 animate-in slide-in-from-bottom-5 rounded-xl flex items-center gap-2 ${notification.type === 'success' ? 'bg-[#34A853]' : 'bg-[#EA4335]'}`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5"/> : <X className="w-5 h-5"/>}
            {notification.message}
        </div>
      )}
    </div>
  );
}