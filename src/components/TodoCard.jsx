import React from 'react';
import { CheckSquare, Square, Calendar, Trash2, RefreshCw } from 'lucide-react';

const TodoCard = ({ todo, onToggleDetail, onDelete, onUpdateStatus }) => {
  // Konfigurasi warna berdasarkan status (sesuai CONVENTIONS.md)
  const statusStyles = {
    inactive: 'bg-gray-100 border-gray-300 text-gray-700',
    active: 'bg-green-50 border-green-500 text-green-900',
    selesai: 'bg-blue-50 border-blue-500 text-blue-900',
    terlambat: 'bg-red-50 border-red-500 text-red-900',
  };

  const currentStyle = statusStyles[todo.status] || statusStyles.inactive;

  return (
    <div className={`p-4 border-l-4 rounded-lg shadow-sm ${currentStyle}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-lg">{todo.judul}</h3>
          <div className="flex items-center text-sm mt-1 opacity-80">
            <Calendar size={14} className="mr-1" />
            <span>Target: {todo.tanggal_target}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => onUpdateStatus(todo)}
            className="p-1 hover:bg-black/10 rounded"
            title="Ubah Status"
          >
            <RefreshCw size={18} />
          </button>
          <button 
            onClick={() => onDelete(todo.id)}
            className="p-1 hover:bg-black/10 rounded text-red-600"
            title="Hapus"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="space-y-2 mt-4">
        {todo.details.map((detail) => (
          <div 
            key={detail.id} 
            className="flex items-center cursor-pointer hover:opacity-70"
            onClick={() => onToggleDetail(todo.id, detail.id)}
          >
            {detail.isDone ? (
              <CheckSquare size={18} className="mr-2" />
            ) : (
              <Square size={18} className="mr-2" />
            )}
            <span className={detail.isDone ? 'line-through' : ''}>
              {detail.teks}
            </span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-xs font-semibold uppercase tracking-wider">
        Status: {todo.status}
      </div>
    </div>
  );
};

export default TodoCard;
