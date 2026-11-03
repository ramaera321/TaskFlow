import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

const AddTodoModal = ({ isOpen, onClose, onSave, todoToEdit }) => {
  const [judul, setJudul] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [details, setDetails] = useState([{ id: Date.now(), teks: '', isDone: false }]);
  const subtaskContainerRef = useRef(null);

  useEffect(() => {
    if (todoToEdit) {
      setJudul(todoToEdit.judul);
      setTanggal(todoToEdit.tanggal_target);
      setDetails(todoToEdit.details);
    } else {
      setJudul('');
      setTanggal('');
      setDetails([{ id: Date.now(), teks: '', isDone: false }]);
    }
  }, [todoToEdit, isOpen]);

  useEffect(() => {  
    if (subtaskContainerRef.current) {  
      subtaskContainerRef.current.scrollTo({  
        top: subtaskContainerRef.current.scrollHeight,  
        behavior: 'smooth'  
      });  
    }  
  }, [details.length]);

  if (!isOpen) return null;

  const handleAddDetail = () => {
    setDetails([...details, { id: Date.now() + Math.random(), teks: '', isDone: false }]);
  };

  const handleRemoveDetail = (id) => {
    setDetails(details.filter(d => d.id !== id));
  };

  const handleDetailChange = (id, value) => {
    setDetails(details.map(d => d.id === id ? { ...d, teks: value } : d));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const todoData = {
      judul,
      tanggal_target: tanggal,
      status: todoToEdit ? todoToEdit.status : 'active',
      details: details.filter(d => d.teks.trim() !== ''),
      ...(todoToEdit && { id: todoToEdit.id })
    };
    onSave(todoData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">{todoToEdit ? 'Edit Task' : 'Add New Task'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            required 
            placeholder="Task Title" 
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            value={judul}
            onChange={(e) => setJudul(e.target.value)}
          />
          <input 
            required 
            type="date" 
            className="w-full p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Subtasks</label>
            <div ref={subtaskContainerRef} className="max-h-40 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {details.map((detail, index) => (
                <div key={detail.id} className="flex gap-2 mb-2">
                  <input 
                    className="flex-1 p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm"
                    placeholder={`Item ${index + 1}`}
                    value={detail.teks}
                    onChange={(e) => handleDetailChange(detail.id, e.target.value)}
                  />
                  <button type="button" onClick={() => handleRemoveDetail(detail.id)} className="text-red-400 hover:text-red-600"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddDetail} className="flex items-center gap-1 text-sm text-blue-600 font-medium mt-2">
              <Plus size={16} /> Add Item
            </button>
          </div>

          <button type="submit" className="w-full bg-[#D97757] hover:bg-[#C26244] text-white font-bold py-3 rounded-xl mt-4 transition-all">
            {todoToEdit ? 'Update Task' : 'Save Task'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTodoModal;
