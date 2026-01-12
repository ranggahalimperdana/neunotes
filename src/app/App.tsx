import { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, Settings, FileText, Search, ChevronRight, Loader2 } from 'lucide-react';

// IMPORT KOMPONEN
import CourseDetail from './components/CourseDetail';
import Login from './components/Login';
import Register from './components/Register';
import UploadNotes from './components/UploadNotes';
import FilterSection from './components/FilterSection';
import SettingsAccount from './components/SettingsAccount';
import LandingPage from './components/LandingPage';
import ForgotPassword from './components/ForgotPassword';
import AdminDashboard from './components/AdminDashboard';
import Timeline from './components/Timeline';

// IMPORT SERVICES & TYPES DARI API
import { authService, masterService, Faculty, Prodi, Semester, Course } from './services/api';

// Interface User Data untuk State Aplikasi
interface UserData {
  id: string;
  fullName: string;
  email: string;
  faculty: string;
  prodi: string;
  role: 'user' | 'admin' | 'super_admin';
  profilePicture?: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'course-detail' | 'upload-notes' | 'settings' | 'landing'>('landing');
  
  // Auth States
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // --- STATE DATA DARI DATABASE ---
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [prodiList, setProdiList] = useState<Prodi[]>([]); 
  const [semesterList, setSemesterList] = useState<Semester[]>([]);
  const [courseList, setCourseList] = useState<Course[]>([]); 
  const [isCoursesLoading, setIsCoursesLoading] = useState(false);

  // Filter States
  const [selectedFaculty, setSelectedFaculty] = useState(''); 
  const [selectedProdi, setSelectedProdi] = useState('');     
  const [selectedSemester, setSelectedSemester] = useState(''); 
  const [searchQuery, setSearchQuery] = useState('');

  // UI States
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // =========================================
  // 1. INITIAL LOAD (SESSION & MASTER DATA)
  // =========================================
  useEffect(() => {
    const initApp = async () => {
      try {
        // A. Cek Sesi User
        const profile = await authService.getCurrentUserWithRole();
        if (profile) {
          const mappedUser: UserData = {
            id: profile.id_user,
            fullName: profile.full_name,
            email: profile.email,
            faculty: profile.id_faculty || '', 
            prodi: profile.id_prodi || '',
            role: profile.role,
            profilePicture: profile.user_profile
          };
          setUserData(mappedUser);
          setIsLoggedIn(true);

          // Redirect Logic untuk Admin / Super Admin
          if (mappedUser.role === 'admin' || mappedUser.role === 'super_admin') {
            setCurrentView('dashboard');
          } else if (currentView === 'landing') {
            setCurrentView('home'); 
          }
        } else {
          if (currentView !== 'landing') setCurrentView('landing');
        }

        // B. Load Master Data
        const [facs, sems] = await Promise.all([
          masterService.getFaculties(),
          masterService.getSemesters()
        ]);
        setFaculties(facs);
        setSemesterList(sems);

      } catch (error) {
        console.error("Init failed", error);
      } finally {
        setIsAuthLoading(false);
      }
    };

    initApp();
  }, []); 

  // =========================================
  // 2. LOAD PRODI SAAT FAKULTAS BERUBAH
  // =========================================
  useEffect(() => {
    const loadProdi = async () => {
      if (selectedFaculty) {
        try {
          const prodis = await masterService.getProdiByFaculty(selectedFaculty);
          setProdiList(prodis);
        } catch (e) {
          console.error("Gagal load prodi", e);
        }
      } else {
        setProdiList([]);
        setSelectedProdi('');
      }
    };
    loadProdi();
  }, [selectedFaculty]);

  // =========================================
  // 3. LOAD COURSES (FILTER LOGIC)
  // =========================================
  useEffect(() => {
    const fetchCourses = async () => {
        if (currentView !== 'home' && currentView !== 'course-detail') return;

        setIsCoursesLoading(true);
        try {
            const courses = await masterService.getCourses(
                selectedFaculty, 
                selectedProdi, 
                selectedSemester, 
                searchQuery
            );
            setCourseList(courses);
        } catch (e) {
            console.error("Gagal load courses", e);
        } finally {
            setIsCoursesLoading(false);
        }
    };

    const timeoutId = setTimeout(() => {
        fetchCourses();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedFaculty, selectedProdi, selectedSemester, searchQuery, currentView]);


  // --- Helper Functions ---

  const showSuccessNotification = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => { setShowNotification(false); }, 4000);
  };

  const handleLoginSuccess = async () => {
    setIsAuthLoading(true);
    try {
        const profile = await authService.getCurrentUserWithRole();
        if (profile) {
            const mappedUser: UserData = {
                id: profile.id_user,
                fullName: profile.full_name,
                email: profile.email,
                faculty: profile.id_faculty || '',
                prodi: profile.id_prodi || '',
                role: profile.role,
                profilePicture: profile.user_profile
            };
            setUserData(mappedUser);
            setIsLoggedIn(true);
            setShowLogin(false);

            if (mappedUser.role === 'admin' || mappedUser.role === 'super_admin') {
                setCurrentView('dashboard');
                showSuccessNotification(`Selamat datang Admin, ${mappedUser.fullName}!`);
            } else {
                setCurrentView('home');
                showSuccessNotification(`Selamat datang kembali, ${mappedUser.fullName}!`);
            }
        }
    } catch (e) {
        console.error(e);
    } finally {
        setIsAuthLoading(false);
    }
  };

  const handleRegisterSuccess = () => {
    setShowRegister(false);
    setShowLogin(true);
    showSuccessNotification('Akun berhasil dibuat! Silakan masuk.');
  };

  const handleLogout = async () => {
    await authService.signOut();
    setUserData(null);
    setIsLoggedIn(false);
    setShowUserMenu(false);
    setCurrentView('landing');
    clearAllFilters();
    showSuccessNotification('Anda telah keluar.');
  };

  const handleUpdateUser = (updatedUser: any) => {
    if (userData) {
        setUserData({ ...userData, ...updatedUser });
    }
    showSuccessNotification('Profil berhasil diperbarui!');
  };

  const handleBackToHome = () => {
    if (userData?.role === 'admin' || userData?.role === 'super_admin') {
        setCurrentView('dashboard');
    } else {
        setCurrentView('home');
    }
    setSelectedCourse(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
    setShowForgotPassword(false);
    setShowLogin(true);
  };

  const switchToForgotPassword = () => {
    setShowLogin(false);
    setShowForgotPassword(true);
  };

  const clearAllFilters = () => {
    setSelectedFaculty('');
    setSelectedProdi('');
    setSelectedSemester('');
    setSearchQuery('');
  };

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setCurrentView('course-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilters = selectedFaculty || selectedProdi || selectedSemester || searchQuery.trim();

  // --- RENDER VIEWS ---

  if (isAuthLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white font-mono animate-pulse">Memuat UniNotes...</div>;
  }

  // 1. DASHBOARD VIEW (ADMIN / SUPER ADMIN)
  if ((currentView === 'dashboard' && userData) || (userData?.role === 'admin' || userData?.role === 'super_admin')) {
    if (currentView === 'settings') {
      return <SettingsAccount onBack={() => setCurrentView('dashboard')} userData={userData!} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />
    }
    return (
      <div className="font-mono">
        <AdminDashboard 
            adminEmail={userData!.email} 
            // PENTING: Mengirim Role User ke Dashboard untuk validasi tombol
            currentUserRole={userData!.role} 
            onLogout={handleLogout} 
        />
        {/* Notification Toast */}
        {showNotification && (
          <div className="fixed bottom-6 right-6 bg-black text-white px-6 py-4 border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] flex items-center gap-4 z-50 animate-in slide-in-from-bottom-5 duration-300 rounded-xl">
            <div className="bg-[#34A853] p-2 text-black rounded-lg">
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
            </div>
            <p className="font-bold font-mono">{notificationMessage}</p>
          </div>
        )}
      </div>
    );
  }

  // 2. UPLOAD NOTES VIEW
  if (currentView === 'upload-notes') {
    return <UploadNotes onBack={handleBackToHome} userName={userData?.fullName || ''} userEmail={userData?.email || ''} userFaculty={userData?.faculty || ''} userProdi={userData?.prodi || ''} />;
  }

  // 3. SETTINGS VIEW (USER)
  if (currentView === 'settings' && userData) {
    return <SettingsAccount onBack={handleBackToHome} userData={userData} onLogout={handleLogout} onUpdateUser={handleUpdateUser} />;
  }

  // 4. COURSE DETAIL VIEW
  if (currentView === 'course-detail' && selectedCourse) {
    return (
      <div className="min-h-screen bg-white font-mono bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        {/* Navbar Sederhana untuk Detail */}
        <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b-2 border-black z-50 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <button onClick={handleBackToHome} className="flex items-center gap-3 group">
                <div className="bg-[#34A853] border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-none transition-all duration-200 ease-out rounded-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div><h1 className="font-black text-2xl text-black tracking-tight group-hover:text-[#34A853] transition-colors">Neu<span className="text-[#4285F4]">Notes</span></h1></div>
              </button>
              <div className="flex items-center gap-4">
                {isLoggedIn && userData && (
                  <>
                    <span className="text-sm font-bold text-black hidden sm:block">Halo, {userData.fullName.split(' ')[0]}!</span>
                    <div className="relative">
                      <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-lg">
                        {userData.profilePicture ? <img src={userData.profilePicture} className="w-6 h-6 rounded-md object-cover border border-black" alt="Profile" /> : <div className="w-6 h-6 bg-[#FBBC05] border border-black flex items-center justify-center rounded-md"><span className="font-bold text-xs text-black">{userData.fullName.charAt(0).toUpperCase()}</span></div>}
                        <span className="hidden sm:inline font-bold text-black">{userData.fullName.split(' ')[0]}</span>
                        <ChevronDown className="w-4 h-4 text-black" />
                      </button>
                      {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-10 rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                          <div className="bg-[#4285F4] px-4 py-3 border-b-2 border-black">
                            <p className="font-bold text-white">{userData.fullName}</p>
                            <p className="text-xs text-white/90 truncate">{userData.email}</p>
                          </div>
                          <div className="py-2">
                            <button onClick={() => { setCurrentView('settings'); setShowUserMenu(false); }} className="w-full px-4 py-2 text-left text-sm font-bold text-black hover:bg-[#FBBC05] flex items-center gap-2">
                              <Settings className="w-4 h-4" /> Pengaturan Akun
                            </button>
                            <button onClick={() => { setCurrentView('upload-notes'); setShowUserMenu(false); }} className="w-full px-4 py-2 text-left text-sm font-bold text-black hover:bg-[#34A853] hover:text-white flex items-center gap-2">
                              <FileText className="w-4 h-4" /> Catatan Saya
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <div className="pt-24 pb-12"><CourseDetail course={selectedCourse} onBack={handleBackToHome} /></div>
      </div>
    );
  }

  // 5. LANDING PAGE
  if (currentView === 'landing') {
    return (
      <div className="font-mono">
        <LandingPage onLoginClick={() => setShowLogin(true)} onRegisterClick={() => setShowRegister(true)} />
        {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} onSwitchToRegister={switchToRegister} onForgotPassword={switchToForgotPassword} />}
        {showRegister && <Register onClose={() => setShowRegister(false)} onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={switchToLogin} />}
        {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} onSwitchToLogin={switchToLogin} />}
      </div>
    );
  }

  // 6. MAIN HOME VIEW (USER BIASA)
  return (
    <div className="min-h-screen bg-white font-mono text-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b-2 border-black z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => { clearAllFilters(); handleBackToHome(); }}>
              <div className="bg-[#34A853] border-2 border-black p-2 rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="font-black text-2xl text-black tracking-tight">Neu<span className="text-[#4285F4]">Notes</span></h1>
            </div>
            
            <div className="flex items-center gap-4">
              {isLoggedIn && userData ? (
                <>
                  <span className="text-sm font-bold hidden sm:block">Halo, {userData.fullName.split(' ')[0]}!</span>
                  <div className="relative">
                    <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-2 bg-white border-2 border-black px-4 py-2 hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none rounded-lg">
                      {userData.profilePicture ? (
                        <img src={userData.profilePicture} className="w-6 h-6 rounded-md object-cover border border-black" alt="Profile" />
                      ) : (
                        <div className="w-6 h-6 bg-[#FBBC05] border border-black flex items-center justify-center rounded-md text-xs font-bold">{userData.fullName.charAt(0)}</div>
                      )}
                      <span className="hidden sm:inline font-bold">{userData.fullName.split(' ')[0]}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-10 rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-[#4285F4] px-4 py-3 border-b-2 border-black">
                          <p className="font-bold text-white">{userData.fullName}</p>
                          <p className="text-xs text-white/90 truncate">{userData.email}</p>
                        </div>
                        <div className="py-2">
                          <button onClick={() => { setCurrentView('settings'); setShowUserMenu(false); }} className="w-full px-4 py-2 text-left text-sm font-bold hover:bg-[#FBBC05] flex items-center gap-2">
                            <Settings className="w-4 h-4" /> Pengaturan Akun
                          </button>
                          <button onClick={() => { setCurrentView('upload-notes'); setShowUserMenu(false); }} className="w-full px-4 py-2 text-left text-sm font-bold hover:bg-[#34A853] hover:text-white flex items-center gap-2">
                            <FileText className="w-4 h-4" /> Catatan Saya
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <button onClick={() => setShowLogin(true)} className="bg-black text-white px-6 py-2 border-2 border-black font-bold hover:bg-[#EA4335] rounded-lg">Masuk</button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* TIMELINE */}
      {isLoggedIn && userData && (
        <section className="py-20 border-t-2 border-black bg-gradient-to-b from-white to-blue-50">
          <Timeline userEmail={userData.email} />
        </section>
      )}

      {/* MAIN CONTENT & FILTER */}
      <section className="py-20 border-t-2 border-black bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-3 h-12 bg-[#EA4335] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full" />
            <h3 className="text-4xl font-black text-black uppercase tracking-tight">
              {hasActiveFilters ? 'Hasil Filter' : 'Jelajahi'}
            </h3>
          </div>

          <FilterSection
            selectedFaculty={selectedFaculty}
            selectedProdi={selectedProdi}
            selectedSemester={selectedSemester}
            onFacultyChange={setSelectedFaculty}
            onProdiChange={setSelectedProdi}
            onSemesterChange={setSelectedSemester}
            onClearFilters={clearAllFilters}
            // DATA DINAMIS DARI DATABASE
            faculties={faculties}
            prodiList={prodiList}
            semesters={semesterList}
          />

          {/* RESULT AREA */}
          {isCoursesLoading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-[#4285F4] mb-4" />
                <p className="font-bold text-gray-500">Mencari mata kuliah...</p>
            </div>
          ) : courseList.length === 0 ? (
            <div className="text-center py-20 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-[#FBBC05] border-2 border-black rounded-full mb-6 shadow-sm">
                <Search className="w-10 h-10 text-black" />
              </div>
              <h4 className="text-2xl font-black text-black mb-2 uppercase">TIDAK ADA HASIL</h4>
              <p className="text-gray-600 max-w-md mx-auto font-bold mb-8">
                Coba atur ulang filter atau gunakan kata kunci lain.
              </p>
              
              {/* Quick Filter Buttons (ID-Based) */}
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                <button onClick={() => { setSelectedFaculty('FT'); window.scrollTo({top: 500, behavior: 'smooth'}); }} className="px-4 py-2 bg-gray-100 border-2 border-black rounded-full text-sm font-bold hover:bg-[#4285F4] hover:text-white transition-colors">F. Teknik</button>
                <button onClick={() => { setSelectedSemester('SEM-1'); window.scrollTo({top: 500, behavior: 'smooth'}); }} className="px-4 py-2 bg-gray-100 border-2 border-black rounded-full text-sm font-bold hover:bg-[#4285F4] hover:text-white transition-colors">Semester 1</button>
                <button onClick={() => { setSelectedSemester('SEM-5'); window.scrollTo({top: 500, behavior: 'smooth'}); }} className="px-4 py-2 bg-gray-100 border-2 border-black rounded-full text-sm font-bold hover:bg-[#4285F4] hover:text-white transition-colors">Semester 5</button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courseList.map((course) => (
                <CourseCard key={course.id} course={course} onClick={() => handleCourseClick(course)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modals */}
      {showLogin && <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} onSwitchToRegister={switchToRegister} onForgotPassword={switchToForgotPassword} />}
      {showRegister && <Register onClose={() => setShowRegister(false)} onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={switchToLogin} />}
      {showForgotPassword && <ForgotPassword onClose={() => setShowForgotPassword(false)} onSwitchToLogin={switchToLogin} />}
      
      {/* Toast Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-[#34A853] text-white px-6 py-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 animate-in slide-in-from-bottom-5">
          <p className="font-bold uppercase">{notificationMessage}</p>
        </div>
      )}
    </div>
  );
}

// Component Helper: Course Card (UI Tetap Sama)
function CourseCard({ course, onClick }: { course: Course; onClick: () => void }) {
  const colors = ['border-[#4285F4]', 'border-[#EA4335]', 'border-[#34A853]', 'border-[#FBBC05]'];
  const accentColor = colors[course.code.length % colors.length];

  return (
    <div onClick={onClick} className={`bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col h-full overflow-hidden`}>
      <div className="p-0">
        <div className="bg-black text-white px-4 py-3 font-black text-sm flex justify-between items-center">
          <span className="bg-white/20 px-2 py-0.5 rounded">{course.code}</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-[#FBBC05]"></div>
            <div className="w-2 h-2 rounded-full bg-[#EA4335]"></div>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <h5 className="font-black text-xl text-black mb-3 leading-tight line-clamp-2 uppercase group-hover:text-[#4285F4] transition-colors">
          {course.title}
        </h5>
        <p className="text-sm font-medium text-gray-600 mb-6 line-clamp-3 flex-1 leading-relaxed">
          {course.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t-2 border-gray-100 group-hover:border-black transition-colors">
          <div className="flex items-center gap-2 font-bold text-black bg-gray-50 px-3 py-1 rounded-lg border border-transparent group-hover:border-black transition-all">
            <FileText className="w-4 h-4" />
            <span className="text-xs">LIHAT MATERI</span>
          </div>
          <div className="text-xs font-black text-black bg-[#FBBC05] px-3 py-1.5 border-2 border-black rounded-lg group-hover:bg-[#34A853] group-hover:text-white transition-colors flex items-center gap-1">
            BUKA <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}