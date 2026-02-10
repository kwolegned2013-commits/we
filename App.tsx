
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Home, MessageSquare, Calendar, UserCheck, BookOpen, Settings, LogOut, Sparkles, User as UserIcon, Bell } from 'lucide-react';
import { User, Notice, Post } from './types';
import { INITIAL_NOTICES, INITIAL_POSTS } from './constants';
import HomePage from './pages/HomePage';
import CommunityPage from './pages/CommunityPage';
import QTPage from './pages/QTPage';
import AttendancePage from './pages/AttendancePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import NoticeDetailPage from './pages/NoticeDetailPage';
import PostDetailPage from './pages/PostDetailPage';
import ProfilePage from './pages/ProfilePage';

const getInitialNotices = () => {
  const saved = localStorage.getItem('we_youth_notices');
  return saved ? JSON.parse(saved) : INITIAL_NOTICES;
};

const getInitialPosts = () => {
  const saved = localStorage.getItem('we_youth_posts');
  return saved ? JSON.parse(saved) : INITIAL_POSTS;
};

const getInitialSchedule = () => {
  const saved = localStorage.getItem('we_youth_schedule');
  return saved ? JSON.parse(saved) : [
    { day: "월", title: "고등부 찬양팀 연습", time: "19:00", type: "practice" },
    { day: "목", title: "중등부 소그룹 모임", time: "18:30", type: "meeting" },
    { day: "주일", title: "주일 대예배 & 분반공부", time: "10:30", isMain: true, type: "worship" }
  ];
};

const Logo = ({ className = "", inverted = false }) => (
  <div className={`flex flex-col items-center leading-none ${className} ${inverted ? 'text-white' : 'text-gray-900'}`}>
    <div className="text-2xl font-black tracking-tighter flex items-end">
      <span>W</span><span>E</span>
    </div>
    <div className="w-full flex justify-center -mt-1">
       <svg width="24" height="8" viewBox="0 0 24 8" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M2 2C6 6 18 6 22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
       </svg>
    </div>
  </div>
);

const SplashScreen = () => (
  <div className="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center z-[999]">
    <Logo inverted className="mb-6 scale-150" />
    <div className="flex items-center space-x-2 text-indigo-400 font-bold tracking-widest text-sm animate-pulse">
      <Sparkles className="w-4 h-4" />
      <span>WE YOUTH</span>
    </div>
  </div>
);

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('we_youth_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [notices, setNotices] = useState<Notice[]>(getInitialNotices);
  const [posts, setPosts] = useState<Post[]>(getInitialPosts);
  const [schedules, setSchedules] = useState(getInitialSchedule);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { localStorage.setItem('we_youth_notices', JSON.stringify(notices)); }, [notices]);
  useEffect(() => { localStorage.setItem('we_youth_posts', JSON.stringify(posts)); }, [posts]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('we_youth_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('we_youth_user');
  };

  if (showSplash) return <SplashScreen />;
  if (!currentUser) return <LoginPage onLogin={handleLogin} />;

  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden pb-28">
        <header className="bg-white/90 backdrop-blur-xl border-b border-gray-100 sticky top-0 z-[40] px-4 pt-safe">
          <div className="max-w-4xl mx-auto h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 active:scale-95 transition-transform">
              <Logo className="scale-75" />
              <span className="font-black text-lg tracking-tighter text-gray-900">WE Youth</span>
            </Link>
            <div className="flex items-center space-x-1">
              <button className="p-2 text-gray-400 hover:text-indigo-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <Link to="/profile" className="p-2 text-gray-400 hover:text-indigo-600">
                <UserIcon className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 max-w-4xl w-full mx-auto p-4 animate-in fade-in duration-500">
          <Routes>
            <Route path="/" element={<HomePage user={currentUser} notices={notices} schedules={schedules} />} />
            <Route path="/notice/:id" element={<NoticeDetailPage notices={notices} />} />
            <Route path="/community" element={<CommunityPage user={currentUser} posts={posts} setPosts={setPosts} />} />
            <Route path="/post/:id" element={<PostDetailPage user={currentUser} posts={posts} setPosts={setPosts} />} />
            <Route path="/attendance" element={<AttendancePage user={currentUser} />} />
            <Route path="/qt" element={<QTPage user={currentUser} />} />
            <Route path="/profile" element={<ProfilePage user={currentUser} onLogout={handleLogout} />} />
            <Route path="/admin" element={currentUser.role !== 'student' ? <AdminPage user={currentUser} notices={notices} setNotices={setNotices} schedules={schedules} setSchedules={setSchedules} worshipInfo={{time: "10:30", location: "지하 1층"}} setWorshipInfo={() => {}} /> : <Navigate to="/" />} />
          </Routes>
        </main>

        <nav className="fixed bottom-6 left-4 right-4 bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[2.5rem] px-6 py-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-[50] max-w-lg mx-auto md:bottom-8">
          <NavLink to="/" icon={<Home />} label="홈" />
          <NavLink to="/community" icon={<MessageSquare />} label="소통" />
          <NavLink to="/attendance" icon={<UserCheck />} label="출석" />
          <NavLink to="/qt" icon={<BookOpen />} label="묵상" />
          <NavLink to="/profile" icon={<UserIcon />} label="프로필" />
        </nav>
      </div>
    </HashRouter>
  );
};

const NavLink = ({ to, icon, label }: { to: string, icon: React.ReactElement, label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`flex flex-col items-center space-y-1 transition-all duration-300 relative ${isActive ? 'text-indigo-600' : 'text-gray-300'}`}>
      <div className={`transition-transform duration-300 ${isActive ? 'scale-110 -translate-y-0.5' : ''}`}>
        {React.cloneElement(icon, { className: "w-6 h-6", strokeWidth: isActive ? 2.5 : 2 })}
      </div>
      <span className={`text-[10px] font-black transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
      {isActive && (
        <span className="absolute -top-1 w-1 h-1 bg-indigo-600 rounded-full animate-pulse"></span>
      )}
    </Link>
  );
};

export default App;
