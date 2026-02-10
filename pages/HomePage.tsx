
import React from 'react';
import { Link } from 'react-router-dom';
import { User, Notice } from '../types';
import { Calendar, ChevronRight, Bell, Sparkles, MapPin, Clock, ArrowRight } from 'lucide-react';

interface HomePageProps {
  user: User;
  notices: Notice[];
  schedules: any[];
}

const HomePage: React.FC<HomePageProps> = ({ user, notices, schedules }) => {
  return (
    <div className="space-y-8">
      {/* Personalized Greeting */}
      <section className="px-1 py-2">
        <h2 className="text-xl font-medium text-gray-500">안녕하세요,</h2>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          <span className="text-indigo-600">{user.name}</span>님 ✨
        </h1>
      </section>

      {/* Main Feature Widget */}
      <section className="bg-indigo-600 rounded-[2rem] p-7 text-white shadow-[0_20px_40px_rgba(79,70,229,0.3)] relative overflow-hidden group">
        <div className="relative z-10">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-wider">Upcoming Event</span>
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <h1 className="text-3xl font-black mb-2 leading-tight">여름 수련회<br/>"DEEP DIVE"</h1>
          <p className="opacity-90 text-sm mt-2 max-w-[200px] leading-relaxed">하나님과 더 깊어지는 2박 3일의 여정</p>
          <Link to="/notice/1" className="mt-6 inline-flex items-center bg-white text-indigo-600 px-6 py-3 rounded-2xl text-sm font-black shadow-lg active:scale-95 transition-all">
            참가 신청하기 <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
        <div className="absolute -bottom-8 -right-8 opacity-20 group-hover:scale-110 transition-transform duration-1000">
          <Calendar className="w-48 h-48" />
        </div>
      </section>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="bg-blue-50 w-10 h-10 rounded-2xl flex items-center justify-center text-blue-500">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Worship Time</p>
            <p className="text-lg font-black text-gray-800 tracking-tight">10:30 AM</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm flex flex-col justify-between h-32">
          <div className="bg-emerald-50 w-10 h-10 rounded-2xl flex items-center justify-center text-emerald-500">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
            <p className="text-lg font-black text-gray-800 tracking-tight">지하 1층</p>
          </div>
        </div>
      </div>

      {/* Notice Feed */}
      <section className="space-y-5">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-black tracking-tight flex items-center">
            <Bell className="w-5 h-5 mr-2 text-indigo-600" /> 공지사항
          </h2>
          <Link to="/notices" className="text-sm font-bold text-gray-400 flex items-center hover:text-indigo-600 transition-colors">
            더보기 <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>
        </div>
        <div className="space-y-4">
          {notices.slice(0, 2).map(notice => (
            <Link key={notice.id} to={`/notice/${notice.id}`} className="block bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter ${
                  notice.category === 'event' ? 'bg-purple-50 text-purple-600' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {notice.category}
                </span>
                <span className="text-[11px] text-gray-300 font-medium">{notice.date}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2 tracking-tight">{notice.title}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{notice.content}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Weekly Schedule Widget */}
      <section className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
        <h2 className="text-xl font-black mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-3 text-indigo-400" /> 주간 일정
        </h2>
        <div className="space-y-6">
          {schedules.map((item, idx) => (
            <div key={idx} className="flex items-center group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-base mr-5 transition-all group-hover:scale-110 ${
                item.isMain ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-400'
              }`}>
                {item.day}
              </div>
              <div className="flex-1 border-b border-gray-800 pb-4">
                <h4 className="font-bold text-base mb-1">{item.title}</h4>
                <p className="text-xs text-gray-500 font-medium">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
