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
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#FBF7F0] text-[#3D3535]'}`}>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow mb-4 bg-[#F2C49B] dark:bg-slate-900">
        <div className="font-bold text-xl">TaskFlow</div>
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-800/10 cursor-pointer">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={logout} className="flex items-center gap-2 text-sm cursor-pointer"><LogOut size={16} /> Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-2 pb-10 md:pb-12">
        {/* Sub-header */}
        <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-end mb-6 md:mb-8">
          <div>
            <h1 className="text-[1.5rem] font-bold tracking-tight">To-Do List</h1>
            <p className="opacity-70">Catat dan kelola todo list-mu secara efisien</p>
          </div>
          <div className={`flex p-1 rounded-full border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#EBE3D7] shadow-sm'}`}>
            {['This Week', 'All Weeks'].map(t => (
              <button 
                key={t} 
                onClick={() => setTimeFilter(t)} 
                className={`px-4 py-1 rounded-full text-sm transition-all cursor-pointer hover:opacity-90 ${timeFilter === t && !isDark ? 'bg-[#D97757] text-white' : timeFilter === t ? 'bg-slate-800' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-3 items-center mb-8">
          <button onClick={onAddTodo} className="cursor-pointer bg-[#D97757] text-white px-2 md:px-4 py-2 rounded-xl flex items-center gap-1 md:gap-2 hover:opacity-90 transition-all">
            <Plus size={18} /> Add Todo
          </button>
          <select 
            className={`border cursor-pointer rounded-xl px-4 py-2 bg-transparent ${isDark ? 'text-slate-900 bg-white' : ''}`} 
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
          <button onClick={() => setVisibleCount(prev => prev + 8)} className="flex items-center gap-2 text-blue-600 font-medium mx-auto mt-10 hover:text-blue-700 cursor-pointer">
            <RotateCw size={18} /> Reload todo lebih banyak
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
