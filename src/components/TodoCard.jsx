import React from 'react';
import { CheckSquare, Square, Calendar, Trash2, RefreshCw } from 'lucide-react';

const TodoCard = ({ todo, onToggleDetail, onDelete, onUpdateStatus }) => {
  // Konfigurasi warna badge status (Enterprise SaaS style)
  const statusStyles = {
    inactive: 'bg-slate-800 text-slate-400 border-slate-700',
    active: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    selesai: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    terlambat: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const badgeStyle = statusStyles[todo.status] || statusStyles.inactive;

  return (
    <div className="group bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-5 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-slate-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-slate-100 text-lg leading-tight">{todo.judul}</h3>
          <div className="flex items-center text-xs text-slate-500 mt-2 font-medium">
            <Calendar size={12} className="mr-1.5" />
            <span>{todo.tanggal_target}</span>
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            onClick={() => onUpdateStatus(todo)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-indigo-400 transition-colors"
            title="Ubah Status"
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={() => onDelete(todo.id)}
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-400 transition-colors"
            title="Hapus"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-2.5 mt-4">
        {todo.details.map((detail) => (
          <div 
            key={detail.id} 
            className="flex items-center cursor-pointer group/item"
            onClick={() => onToggleDetail(todo.id, detail.id)}
          >
            <div className={`mr-3 transition-colors ${detail.isDone ? 'text-emerald-500' : 'text-slate-600 group-hover/item:text-slate-400'}`}>
              {detail.isDone ? <CheckSquare size={18} /> : <Square size={18} />}
            </div>
            <span className={`text-sm transition-all ${detail.isDone ? 'line-through text-slate-600' : 'text-slate-300'}`}>
              {detail.teks}
            </span>
          </div>
        ))}
      </div>
      
      <div className={`mt-6 inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${badgeStyle}`}>
        {todo.status}
      </div>
    </div>
  );
};

export default TodoCard;
