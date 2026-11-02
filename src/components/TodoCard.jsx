import React from 'react';
import { CheckSquare, Square, Calendar, Trash2 } from 'lucide-react';

const TodoCard = ({ todo, onToggleDetail, onDelete, onUpdateStatus }) => {
  const today = new Date();
  const targetDate = new Date(todo.tanggal_target);
  const diffTime = targetDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Dynamic Background Logic
  let bgClass = 'bg-white';
  if (todo.status === 'selesai') bgClass = 'bg-blue-50';
  else if (diffDays < 0) bgClass = 'bg-[#E7A491]'; // Terracotta
  else if (diffDays >= 0 && diffDays <= 2) bgClass = 'bg-[#F2C49B]'; // Peach
  else if (diffDays >= 2 && diffDays <= 3) bgClass = 'bg-[#EAD08D]'; // Gold
  else bgClass = 'bg-[#A8BBA2]'; // Sage

  const allDone = todo.details.length > 0 && todo.details.every(d => d.isDone);

  return (
    <div className={`rounded-3xl p-5 shadow-sm border border-[#EBE3D7] flex flex-col justify-between h-full ${bgClass}`}>
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-[16px] leading-tight">{todo.judul}</h3>
          <button onClick={() => onDelete(todo.id)} className="text-slate-700/50 hover:text-red-600"><Trash2 size={16} /></button>
        </div>
        <div className="flex items-center text-xs font-medium mb-4 opacity-70">
          <Calendar size={12} className="mr-1" />
          {todo.tanggal_target}
        </div>

        <div className="space-y-2 mb-6">
          {todo.details.map((detail) => (
            <div 
              key={detail.id} 
              className="flex items-center cursor-pointer"
              onClick={() => onToggleDetail(todo.id, detail.id)}
            >
              <div className="mr-2 text-slate-800">
                {detail.isDone ? <CheckSquare size={16} /> : <Square size={16} />}
              </div>
              <span className={`text-sm ${detail.isDone ? 'line-through text-slate-400' : ''}`}>
                {detail.teks}
              </span>
            </div>
          ))}
        </div>
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
  );
};

export default TodoCard;
