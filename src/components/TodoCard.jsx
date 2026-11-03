import React, { useState, useRef, useEffect } from 'react';
import { CheckSquare, Square, Calendar, Trash2, Pencil, MoreVertical, RotateCcw } from 'lucide-react';

const TodoCard = ({ todo, onToggleDetail, onDelete, onUpdateStatus, onEdit, onReset }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const targetDate = new Date(todo.tanggal_target);
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Utility isOverdue check
  const isOverdue = (() => {
    if (todo.status === 'selesai') {
      return todo.tanggal_selesai && todo.tanggal_selesai > todo.tanggal_target;
    }
    if (todo.status === 'active') {
      return todayStr > todo.tanggal_target;
    }
    return todo.status === 'terlambat';
  })();

  // Dynamic Header Background Logic
  let headerBg = 'bg-[#f6b327] text-slate-900'; // Default
  if (todo.status === 'selesai') headerBg = 'bg-[#86bfb9] text-slate-900'; // Success
  else if (isOverdue || diffDays < 0) headerBg = 'bg-[#d0745d] text-white'; // Terracotta
  else if (diffDays >= 0 && diffDays <= 2) headerBg = 'bg-[#F2C49B] text-slate-800'; // Peach
  else if (diffDays >= 2 && diffDays <= 3) headerBg = 'bg-[#EAD08D] text-slate-800'; // Gold
  else headerBg = 'bg-[#A8BBA2] text-slate-800'; // Sage

  const allDone = todo.details.length > 0 && todo.details.every(d => d.isDone);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatCardTitle = (title) => {  
    if (!title) return '';  
    const words = title.split(' ');  
    if (words.length > 6) {  
      return words.slice(0, 6).join(' ') + '...';  
    }  
    return title;  
  };

  return (
    <div className="rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className={`p-5 ${headerBg}`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg leading-tight" title={todo.judul}>{formatCardTitle(todo.judul)}</h3>
          
          {/* Kebab Menu */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer opacity-70 hover:opacity-100 p-1 rounded-full hover:bg-black/5"
            >
              <MoreVertical size={18} />
            </button>
            
            {isMenuOpen && (
              <div className="absolute right-0 top-8 w-36 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-lg z-20 py-1 text-sm">
                <button 
                  onClick={() => { onEdit(todo); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                >
                  <Pencil size={14} /> Edit
                </button>
                <button 
                  onClick={() => { onReset(todo.id); setIsMenuOpen(false); }}
                  disabled={todo.status !== 'selesai'}
                  className={`w-full text-left px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 ${todo.status !== 'selesai' ? 'opacity-40 cursor-not-allowed' : ''}`}
                >
                  <RotateCcw size={14} /> Reset
                </button>
                <button 
                  onClick={() => { onDelete(todo.id); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-950/40 text-red-500 flex items-center gap-2"
                >
                  <Trash2 size={14} /> Hapus
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center text-xs font-medium">
          <Calendar size={14} className="mr-1 mt-0.5" />
          {todo.tanggal_target}
          {isOverdue && (
            <span className="text-red-600 font-extrabold text-xs ml-2 uppercase tracking-wider bg-white rounded px-1.5">Overdue</span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="bg-white dark:bg-[#1a202e] p-5 flex-1 flex flex-col justify-between border-t border-slate-100 dark:border-slate-800">
        <div className="max-h-48 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-2 mb-4">
          {todo.details.map((detail) => (
            <div 
              key={detail.id} 
              className={`flex items-center ${todo.status === 'selesai' ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => todo.status !== 'selesai' && onToggleDetail(todo.id, detail.id)}
            >
              <div className={`mr-2 ${detail.isDone ? 'text-slate-400 dark:text-slate-400' : 'text-slate-600 dark:text-slate-200'}`}>
                {detail.isDone ? <CheckSquare size={16} /> : <Square size={16} />}
              </div>
              <span className={`text-sm ${detail.isDone ? 'line-through text-slate-400 dark:text-slate-400' : 'text-slate-600 dark:text-slate-200'}`}>
                {detail.teks}
              </span>
            </div>
          ))}
        </div>

        {todo.status !== 'selesai' && (
          <button 
            disabled={!allDone}
            onClick={() => onUpdateStatus({ ...todo, status: 'selesai' })}
            className={`w-full py-2 rounded-xl font-medium transition-all ${allDone ? 'bg-[#fd671a] hover:bg-[#e0560f] text-white shadow-md' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
          >
            Selesai
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
