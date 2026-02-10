
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Post } from '../types';
import { MessageSquare, Heart, Plus, MessageCircle, Sparkles } from 'lucide-react';

interface CommunityPageProps {
  user: User;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const CommunityPage: React.FC<CommunityPageProps> = ({ user, posts, setPosts }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'prayer' | 'talk'>('all');
  const [isPosting, setIsPosting] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', content: '', category: 'talk' as 'talk' | 'prayer' });

  const filteredPosts = posts.filter(p => activeTab === 'all' || p.category === activeTab);

  const handleCreatePost = () => {
    if (!newPost.title || !newPost.content) return;
    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      content: newPost.content,
      authorId: user.id,
      authorName: user.name,
      category: newPost.category,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: []
    };
    setPosts([post, ...posts]);
    setIsPosting(false);
    setNewPost({ title: '', content: '', category: 'talk' });
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-2xl font-black">커뮤니티</h1>
        <button 
          onClick={() => setIsPosting(true)}
          className="bg-indigo-600 text-white p-3 rounded-2xl shadow-lg active:scale-90 transition-transform"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <div className="flex space-x-2 bg-gray-100 p-1.5 rounded-2xl">
        <TabButton label="전체" active={activeTab === 'all'} onClick={() => setActiveTab('all')} />
        <TabButton label="기도제목" active={activeTab === 'prayer'} onClick={() => setActiveTab('prayer')} />
        <TabButton label="자유수다" active={activeTab === 'talk'} onClick={() => setActiveTab('talk')} />
      </div>

      <div className="space-y-4">
        {filteredPosts.map(post => (
          <Link key={post.id} to={`/post/${post.id}`} className="block bg-white p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-[0.99]">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-black text-[10px] mr-3">
                {post.authorName[0]}
              </div>
              <div>
                <p className="text-xs font-black text-gray-800">{post.authorName}</p>
                <p className="text-[9px] text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="ml-auto">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                  post.category === 'prayer' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-gray-50 text-gray-500'
                }`}>
                  {post.category === 'prayer' ? '🙏 기도제목' : '💬 자유수다'}
                </span>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
            <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{post.content}</p>
            <div className="flex items-center space-x-4 border-t border-gray-50 pt-4">
              <button 
                onClick={(e) => toggleLike(post.id, e)}
                className="flex items-center space-x-1.5 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className="w-4 h-4" />
                <span className="text-[10px] font-black">{post.likes}</span>
              </button>
              <div className="flex items-center space-x-1.5 text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span className="text-[10px] font-black">{post.comments.length}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Write Modal */}
      {isPosting && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-end sm:items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-black">새 글 쓰기</h2>
              <button onClick={() => setIsPosting(false)} className="bg-gray-50 p-2 rounded-full text-gray-400"><Plus className="w-6 h-6 rotate-45" /></button>
            </div>
            <div className="space-y-5">
              <div className="flex space-x-2">
                <button onClick={() => setNewPost({...newPost, category: 'talk'})} className={`flex-1 py-3 rounded-2xl text-xs font-black transition-all ${newPost.category === 'talk' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>자유수다</button>
                <button onClick={() => setNewPost({...newPost, category: 'prayer'})} className={`flex-1 py-3 rounded-2xl text-xs font-black transition-all ${newPost.category === 'prayer' ? 'bg-amber-500 text-white shadow-lg' : 'bg-gray-50 text-gray-400'}`}>기도제목</button>
              </div>
              <input 
                placeholder="제목"
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-5 font-bold focus:ring-2 focus:ring-indigo-500"
                value={newPost.title}
                onChange={e => setNewPost({...newPost, title: e.target.value})}
              />
              <textarea 
                placeholder="내용을 입력하세요..."
                className="w-full h-48 bg-gray-50 border-none rounded-2xl py-4 px-5 text-sm resize-none focus:ring-2 focus:ring-indigo-500"
                value={newPost.content}
                onChange={e => setNewPost({...newPost, content: e.target.value})}
              />
              <button 
                onClick={handleCreatePost}
                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-xl active:scale-95 transition-all flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 mr-2" /> 게시하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TabButton = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-2.5 text-xs font-black rounded-xl transition-all ${
      active ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400 hover:text-gray-700'
    }`}
  >
    {label}
  </button>
);

export default CommunityPage;
