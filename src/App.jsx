import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useTodos } from './hooks/useTodos';
import TodoCard from './components/TodoCard';
import AddTodoModal from './components/AddTodoModal';
import { LogOut, Sun, Moon, Plus, RotateCw } from 'lucide-react';

function App() {
  const { user, logout } = useAuth();
  const { todos, addTodo, updateTodo, deleteTodo, toggleDetail } = useTodos();

  const [theme, setTheme] = useState(localStorage.getItem('app_theme') || 'dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [timeFilter, setTimeFilter] = useState('All Weeks');
  const [visibleCount, setVisibleCount] = useState(8);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const isDark = theme === 'dark';

  // Filter Logic
  const filteredTodos = todos.filter(todo => {
    const matchesStatus = filterStatus === 'Semua Status' || todo.status === filterStatus.toLowerCase();
    const matchesTime = timeFilter === 'All Weeks' ? true : true; // Simplified for example
    return matchesStatus && matchesTime;
  });

  const displayedTodos = filteredTodos.slice(0, visibleCount);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Please Login</div>;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#FBF7F0] text-[#3D3535]'}`}>
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div className="font-bold text-xl">TaskFlow</div>
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-800/10">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={logout} className="flex items-center gap-2 text-sm"><LogOut size={16} /> Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Sub-header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-extrabold">To-Do List</h1>
            <p className="opacity-70">Catat dan kelola todo list-mu secara efisien</p>
          </div>
          <div className="flex bg-slate-200 dark:bg-slate-800 p-1 rounded-full">
            {['This Week', 'All Weeks'].map(t => (
              <button key={t} onClick={() => setTimeFilter(t)} className={`px-4 py-1 rounded-full text-sm ${timeFilter === t ? 'bg-white dark:bg-slate-700 shadow-sm' : ''}`}>{t}</button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-end gap-4 mb-8">
          <select className="bg-transparent border rounded-xl px-4 py-2" onChange={(e) => setFilterStatus(e.target.value)}>
            <option>Semua Status</option>
            <option>Active</option>
            <option>Selesai</option>
            <option>Terlambat</option>
          </select>
          <button onClick={() => setIsModalOpen(true)} className="bg-[#D97757] text-white px-4 py-2 rounded-xl flex items-center gap-2">
            <Plus size={18} /> Add Todo
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {displayedTodos.map(todo => (
            <TodoCard 
              key={todo.id} 
              todo={todo} 
              onToggleDetail={toggleDetail} 
              onDelete={deleteTodo} 
              onUpdateStatus={updateTodo} 
            />
          ))}
        </div>

        {filteredTodos.length > visibleCount && (
          <button onClick={() => setVisibleCount(prev => prev + 8)} className="flex items-center gap-2 text-blue-600 font-medium mx-auto mt-10 hover:text-blue-700">
            <RotateCw size={18} /> Reload todo lebih banyak
          </button>
        )}
      </main>

      <AddTodoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={addTodo} />
    </div>
  );
}

export default App;
