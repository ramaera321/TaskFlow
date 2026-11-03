import React from 'react';
import TodoCard from './TodoCard';
import Footer from './Footer';
import { LogOut, Sun, Moon, Plus, RotateCw } from 'lucide-react';

const Dashboard = ({ 
  todos, 
  isDark, 
  toggleTheme, 
  logout, 
  onAddTodo, 
  onEditTodo, 
  onDeleteTodo, 
  onToggleDetail, 
  onUpdateStatus, 
  filterStatus, 
  setFilterStatus, 
  timeFilter, 
  setTimeFilter, 
  visibleCount, 
  setVisibleCount, 
  filteredTodos 
}) => {
  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#f1f2ec] text-slate-800'}`}>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow mb-4 bg-[#f6b327] text-slate-900">
        <div className="font-bold text-xl">TaskFlow</div>
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-black/10 cursor-pointer">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={logout} className="flex items-center gap-2 text-sm cursor-pointer font-medium"><LogOut size={16} /> Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-2 pb-10 md:pb-12">
        {/* Sub-header */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-end mb-6 md:mb-8">
          <div>
            <h1 className="text-[1.5rem] font-bold tracking-tight">To-Do List</h1>
            <p className="opacity-70">Catat dan kelola todo list-mu secara efisien</p>
          </div>
          <div className={`flex p-1 rounded-full border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            {['This Week', 'All Weeks'].map(t => (
              <button 
                key={t} 
                onClick={() => setTimeFilter(t)} 
                className={`px-4 py-1 rounded-full text-sm transition-all cursor-pointer hover:opacity-90 ${timeFilter === t && !isDark ? 'bg-[#fd671a] text-white' : timeFilter === t ? 'bg-slate-800 text-white' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-3 items-center mb-8">
          <button onClick={onAddTodo} className="cursor-pointer bg-[#fd671a] hover:bg-[#e0560f] active:scale-[0.98] text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md transition-all">
            <Plus size={18} /> Add Todo
          </button>
          <select 
            className={`border cursor-pointer rounded-xl px-4 py-2 bg-transparent ${isDark ? 'text-white border-slate-700' : 'text-slate-800 border-slate-300'}`} 
            onChange={(e) => setFilterStatus(e.target.value)}
            value={filterStatus}
          >
            <option className="text-slate-900">Semua Status</option>
            <option className="text-slate-900">Active</option>
            <option className="text-slate-900">Selesai</option>
            <option className="text-slate-900">Terlambat</option>
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredTodos.slice(0, visibleCount).map(todo => (
            <TodoCard 
              key={todo.id} 
              todo={todo} 
              onToggleDetail={onToggleDetail} 
              onDelete={onDeleteTodo} 
              onUpdateStatus={onUpdateStatus}
              onEdit={onEditTodo}
            />
          ))}
        </div>

        {filteredTodos.length > visibleCount && (
          <button onClick={() => setVisibleCount(prev => prev + 8)} className="flex items-center gap-2 text-[#fd671a] font-medium mx-auto mt-10 hover:text-[#e0560f] cursor-pointer">
            <RotateCw size={18} /> Reload todo lebih banyak
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
