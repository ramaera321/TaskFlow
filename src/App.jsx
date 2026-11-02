import { useState } from 'react';
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
  const [editingTodo, setEditingTodo] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [timeFilter, setTimeFilter] = useState('All Weeks');
  const [visibleCount, setVisibleCount] = useState(8);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const isDark = theme === 'dark';

  const handleSaveTodo = (todoData) => {
    if (editingTodo) {
      updateTodo(todoData);
    } else {
      addTodo(todoData);
    }
    setEditingTodo(null);
    setIsModalOpen(false);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const filteredTodos = todos.filter(todo => {
    const matchesStatus = filterStatus === 'Semua Status' || todo.status === filterStatus.toLowerCase();
    return matchesStatus;
  });

  const displayedTodos = filteredTodos.slice(0, visibleCount);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Please Login</div>;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#FBF7F0] text-[#3D3535]'}`}>
      {/* Header */}
      <header className="flex justify-between items-center p-6 mb-4">
        <div className="font-bold text-xl">TaskFlow</div>
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-800/10">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={logout} className="flex items-center gap-2 text-sm"><LogOut size={16} /> Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-2">
        {/* Sub-header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-[1.5rem] font-bold tracking-tight">To-Do List</h1>
            <p className="opacity-70">Catat dan kelola todo list-mu secara efisien</p>
          </div>
          <div className={`flex p-1 rounded-full border ${isDark ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-[#EBE3D7] shadow-sm'}`}>
            {['This Week', 'All Weeks'].map(t => (
              <button 
                key={t} 
                onClick={() => setTimeFilter(t)} 
                className={`px-4 py-1 rounded-full text-sm transition-all cursor-pointer hover:opacity-90 ${timeFilter === t ? 'bg-[#D97757] text-white' : ''}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => { setEditingTodo(null); setIsModalOpen(true); }} className="bg-[#D97757] text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:opacity-90 transition-all">
            <Plus size={18} /> Add Todo
          </button>
          <select 
            className={`border rounded-xl px-4 py-2 bg-transparent ${isDark ? 'text-slate-900 bg-white' : ''}`} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option className="text-slate-900">Semua Status</option>
            <option className="text-slate-900">Active</option>
            <option className="text-slate-900">Selesai</option>
            <option className="text-slate-900">Terlambat</option>
          </select>
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
              onEdit={handleEdit}
            />
          ))}
        </div>

        {filteredTodos.length > visibleCount && (
          <button onClick={() => setVisibleCount(prev => prev + 8)} className="flex items-center gap-2 text-blue-600 font-medium mx-auto mt-10 hover:text-blue-700">
            <RotateCw size={18} /> Reload todo lebih banyak
          </button>
        )}
      </main>

      <AddTodoModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTodo(null); }} 
        onSave={handleSaveTodo}
        todoToEdit={editingTodo}
      />
    </div>
  );
}

export default App;
