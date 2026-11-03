import React, { useMemo } from 'react';
import TodoCard from './TodoCard';
import Footer from './Footer';
import { LogOut, Sun, Moon, Plus, RotateCw } from 'lucide-react';

const Dashboard.jsx = ({ 
  todos, 
  isDark, 
  toggleTheme, 
  logout, 
  onAddTodo, 
  onEditTodo, 
  onDeleteTodo, 
  onResetTodo,
  onToggleDetail, 
  onUpdateStatus, 
  filterStatus, 
  setFilterStatus, 
  timeFilter, 
  setTimeFilter, 
  visibleCount, 
  setVisibleCount,
  user
}) => {

  // Helper: Cek apakah tanggal berada di minggu ini (Senin - Minggu)
  const isThisWeek = (dateString) => {
    const target = new Date(dateString);
    const now = new Date();
    const day = now.getDay();
    // Hitung hari Senin minggu ini
    const diffToMonday = now.getDate() - (day === 0 ? 6 : day - 1);
    const startOfWeek = new Date(now.setDate(diffToMonday));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return target >= startOfWeek && target <= endOfWeek;
  };

  const todayStr = new Date().toISOString().split('T')[0];

  const isItemTerlambat = (todo) => {
    // Kasus 1: Card aktif yang tanggal targetnya sudah terlewat hari ini
    const isActiveLate = todo.status === 'active' && todayStr > todo.tanggal_target;
    // Kasus 2: Card selesai yang tanggal selesainya melebihi tanggal target
    const isCompletedLate = todo.status === 'selesai' && todo.tanggal_selesai && todo.tanggal_selesai > todo.tanggal_target;
    // Kasus 3: Card yang status eksplisitnya 'terlambat'
    const isExplicitLate = todo.status === 'terlambat';

    return isActiveLate || isCompletedLate || isExplicitLate;
  };

  // Chained Filtering Logic
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      // 1. Week Filter Check
      const matchesWeek = timeFilter === 'All Weeks' || isThisWeek(todo.tanggal_target);

      // 2. Status Filter Check
      let matchesStatus = true;
      if (filterStatus === 'Semua Status') {
        matchesStatus = true;
      } else if (filterStatus.toLowerCase() === 'terlambat') {
        matchesStatus = isItemTerlambat(todo);
      } else {
        matchesStatus = todo.status === filterStatus.toLowerCase();
      }

      return matchesWeek && matchesStatus;
    });
  }, [todos, timeFilter, filterStatus, todayStr]);

  // Slice data untuk pagination
  const visibleTodos = filteredTodos.slice(0, visibleCount);

  // Handler untuk mengubah filter dan mereset pagination
  const handleFilterChange = (setter, value) => {
    setter(value);
    setVisibleCount(8);
  };

  const rawUsername = user?.email ? user.email.split('@')[0] : 'User';
  const truncatedUsername = rawUsername.length > 7 ? rawUsername.slice(0, 7) + '...' : rawUsername;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#f1f2ec] text-slate-800'}`}>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow mb-4 bg-[#86bfb9] dark:bg-[#141a25] text-slate-900 dark:text-slate-200">
        <div className="font-bold text-xl">TaskFlow</div>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-sm sm:inline block sm:mr-1">
            <span className="sm:hidden">{truncatedUsername}</span>
            <span className="hidden sm:inline">{rawUsername}</span>
          </span>
          <button onClick={toggleTheme} className="p-2 rounded-full bg-black/10 cursor-pointer">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={logout} className="p-2 rounded-xl hover:bg-black/10 dark:hover:bg-white/10 transition-all cursor-pointer" title="Logout">
            <LogOut size={18} strokeWidth={2.5} />
          </button>
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
                onClick={() => handleFilterChange(setTimeFilter, t)} 
                className={`px-4 py-1 rounded-full text-sm transition-all cursor-pointer hover:opacity-90 ${timeFilter === t && !isDark ? 'bg-[#fd671a] text-white' : timeFilter === t ? 'bg-slate-800 text-white' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-3 items-center mb-8">
          <button onClick={onAddTodo} className="cursor-pointer bg-[#fd671a] hover:bg-[#e0560f] active:scale-[0.98] text-white px-2 md:px-4 py-2 rounded-xl flex items-center gap-1 md:gap-2 shadow-md transition-all">
            <Plus size={18} /> Add Todo
          </button>
          <select 
            className={`border cursor-pointer rounded-xl px-4 py-2 bg-transparent ${isDark ? 'text-white border-slate-700' : 'text-slate-800 border-slate-300'}`} 
            onChange={(e) => handleFilterChange(setFilterStatus, e.target.value)}
            value={filterStatus}
          >
            <option className="text-slate-900">Semua Status</option>
            <option className="text-slate-900">Active</option>
            <option className="text-slate-900">Selesai</option>
            <option className="text-slate-900">Terlambat</option>
          </select>
        </div>

        {/* Grid */}
        {filteredTodos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visibleTodos.map(todo => (
              <TodoCard 
                key={todo.id} 
                todo={todo} 
                onToggleDetail={onToggleDetail} 
                onDelete={onDeleteTodo} 
                onUpdateStatus={onUpdateStatus}
                onEdit={onEditTodo}
                onReset={onResetTodo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            <p>Tidak ada todo yang sesuai dengan filter ini.</p>
          </div>
        )}

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
