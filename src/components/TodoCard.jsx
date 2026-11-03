import React from 'react';
import { CheckSquare, Square, Calendar, Trash2, Pencil } from 'lucide-react';

const TodoCard = ({ todo, onToggleDetail, onDelete, onUpdateStatus, onEdit }) => {
  const today = new Date();
  const targetDate = new Date(todo.tanggal_target);
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Dynamic Header Background Logic
  let headerBg = 'bg-white';
  if (todo.status === 'selesai') headerBg = 'bg-blue-50';
  else if (diffDays < 0) headerBg = 'bg-[#E7A491]'; // Terracotta
  else if (diffDays >= 0 && diffDays <= 2) headerBg = 'bg-[#F2C49B]'; // Peach
  else if (diffDays >= 2 && diffDays <= 3) headerBg = 'bg-[#EAD08D]'; // Gold
  else headerBg = 'bg-[#A8BBA2]'; // Sage

  const allDone = todo.details.length > 0 && todo.details.every(d => d.isDone);

  return (
    <div className="rounded-3xl shadow-sm border border-[#EBE3D7] dark:border-slate-800 flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className={`p-5 ${headerBg}`}>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg text-slate-800 leading-tight">{todo.judul}</h3>
          <div className="flex gap-2">
            <button onClick={() => onEdit(todo)} className="cursor-pointer text-slate-700/50 hover:text-blue-600"><Pencil size={16} /></button>
            <button onClick={() => onDelete(todo.id)} className="cursor-pointer text-slate-700/50 hover:text-red-600"><Trash2 size={16} /></button>
          </div>
        </div>
        <div className="flex items-center text-xs font-medium text-slate-800">
          <Calendar size={14} className="mr-1 mt-0.5" />
          {todo.tanggal_target}
        </div>
      </div>

      {/* Body */}
      <div className="bg-white dark:bg-[#171d2a] p-5 flex-1 flex flex-col justify-between border-t border-slate-100 dark:border-slate-800">
        <div className="max-h-48 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden space-y-2 mb-4">
          {todo.details.map((detail) => (
            <div 
              key={detail.id} 
              className="flex items-center cursor-pointer"
              onClick={() => onToggleDetail(todo.id, detail.id)}
            >
              <div className={`mr-2 ${detail.isDone ? 'text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'}`}>
                {detail.isDone ? <CheckSquare size={16} /> : <Square size={16} />}
              </div>
              <span className={`text-sm ${detail.isDone ? 'line-through text-slate-400 dark:text-slate-600' : 'text-slate-600 dark:text-slate-400'}`}>
                {detail.teks}
              </span>
            </div>
          ))}
        </div>

        {todo.status !== 'selesai' && (
          <button 
            disabled={!allDone}
            onClick={() => onUpdateStatus({ ...todo, status: 'selesai' })}
            className={`w-full py-2 rounded-xl font-medium transition-all ${allDone ? 'bg-[#D97757] hover:bg-[#C26244] text-white' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}
          >
            Selesai
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoCard;
