
import React from 'react';
import { User } from '../types';
import { LogOut, Settings, Bell, Shield, ChevronRight, Smile, Sparkles, BookMarked } from 'lucide-react';

interface ProfilePageProps {
  user: User;
  onLogout: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Profile Section */}
      <section className="flex flex-col items-center py-8">
        <div className="relative">
          <div className="w-28 h-28 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl mb-6">
            <Smile className="w-14 h-14" />
          </div>
          <div className="absolute bottom-4 -right-2 bg-white p-2 rounded-2xl shadow-lg border border-gray-50">
            <Sparkles className="w-5 h-5 text-amber-500" />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{user.name}</h2>
          <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">
            {user.role === 'admin' ? 'Master Admin' : user.role === 'teacher' ? 'Youth Teacher' : 'Youth Student'}
          </p>
        </div>
      </section>

      {/* Profile Info Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">출석 횟수</p>
          <p className="text-2xl font-black text-indigo-600">24회</p>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">작성 글</p>
          <p className="text-2xl font-black text-purple-600">12개</p>
        </div>
      </div>

      {/* Setting List */}
      <section className="bg-white rounded-[2rem] overflow-hidden border border-gray-50 shadow-sm">
        <h3 className="px-6 py-5 text-sm font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">앱 설정</h3>
        <div className="divide-y divide-gray-50">
          <MenuLink icon={<Bell className="text-blue-500" />} label="알림 설정" />
          <MenuLink icon={<BookMarked className="text-emerald-500" />} label="스크랩한 묵상" />
          <MenuLink icon={<Shield className="text-amber-500" />} label="개인정보 관리" />
          <MenuLink icon={<Settings className="text-gray-400" />} label="버전 정보" value="v1.0.4" />
        </div>
      </section>

      {/* Logout Action */}
      <button 
        onClick={() => {
          if(window.confirm("정말 로그아웃 하시겠습니까?")) onLogout();
        }}
        className="w-full bg-red-50 text-red-600 py-5 rounded-[1.5rem] font-black flex items-center justify-center space-x-2 active:scale-[0.98] transition-all hover:bg-red-100 mb-10"
      >
        <LogOut className="w-5 h-5" />
        <span>로그아웃</span>
      </button>

      <div className="text-center pb-10">
        <p className="text-[10px] text-gray-300 font-bold tracking-widest uppercase">WE YOUTH Platform © 2024</p>
      </div>
    </div>
  );
};

const MenuLink = ({ icon, label, value }: { icon: React.ReactNode, label: string, value?: string }) => (
  <button className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group">
    <div className="flex items-center space-x-4">
      <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-white transition-colors">
        {icon}
      </div>
      <span className="font-bold text-gray-800 text-sm">{label}</span>
    </div>
    <div className="flex items-center text-gray-300">
      {value && <span className="text-xs font-bold mr-2 text-gray-400">{value}</span>}
      <ChevronRight className="w-5 h-5" />
    </div>
  </button>
);

export default ProfilePage;
