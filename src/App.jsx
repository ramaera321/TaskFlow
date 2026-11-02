import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useTodos } from './hooks/useTodos';
import TodoCard from './components/TodoCard';
import AddTodoModal from './components/AddTodoModal';
import { LogOut, Sun, Moon, Plus, RotateCw } from 'lucide-react';

function App() {
  const { user, login, register, logout } = useAuth();
  const { todos, addTodo, updateTodo, deleteTodo, toggleDetail } = useTodos();

  const [theme, setTheme] = useState(localStorage.getItem('app_theme') || 'dark');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [filterStatus, setFilterStatus] = useState('Semua Status');
  const [timeFilter, setTimeFilter] = useState('All Weeks');
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const isDark = theme === 'dark';

  const handleAuth = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      const res = login(email, password);
      if (!res.success) alert(res.message);
    } else {
      // Validasi Password
      if (password !== confirmPassword) {
        alert("Password dan konfirmasi password tidak cocok!");
        return;
      }

      // Validasi Email Duplikat
      const users = JSON.parse(localStorage.getItem('todo_users') || '[]');
      if (users.find(u => u.email === email)) {
        alert("Email sudah terdaftar!");
        return;
      }

      // Registrasi
      const newUser = { email, password };
      register(newUser);
      
      // Simpan ke todo_users (manual update karena hook read-only)
      users.push({ ...newUser, id: Date.now().toString() });
      localStorage.setItem('todo_users', JSON.stringify(users));
      
      setIsLogin(true);
      alert('Registrasi berhasil, silakan login.');
    }
  };

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

  useEffect(() => {
    // Memeriksa dan mengubah class pada tag <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Atau versi lebih ringkas:
    // document.documentElement.classList.toggle('dark', theme === 'dark');

    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const displayedTodos = filteredTodos.slice(0, visibleCount);

  if (!user) return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#FBF7F0] text-[#3D3535]'}`}>
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 rounded-full cursor-pointer bg-slate-800/50 backdrop-blur-md border border-white/10 hover:bg-slate-700 transition-all"
        >
          {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>

        <div className={`w-full max-w-sm backdrop-blur-2xl border rounded-2xl p-6 sm:p-7 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] ${isDark ? 'bg-slate-900/40 border-white/10' : 'bg-white/40 border-black/10'}`}>
          {/* Header */}
          <div className="mb-6 pt-4">
            <p className="text-3xl font-extrabold tracking-tight text-center mb-2">TODO LIST</p>
            <p className={`text-xs text-center mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Kelola tugas harianmu dengan lebih terstruktur dan efisien.</p>
          </div>

          {/* Sliding Tabs */}
          <div className={`p-1 rounded-xl border mb-6 flex w-full ${isDark ? 'bg-slate-950/80 border-white/5' : 'bg-slate-200/50 border-black/5'}`}>
            <button 
              onClick={() => setIsLogin(true)} 
              className={`flex-1 py-1.5 text-sm cursor-pointer font-medium rounded-lg transition-all ${isLogin ? (isDark ? 'bg-slate-900/90 text-white shadow-sm' : 'bg-white text-[#3D3535] shadow-sm') : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#3D3535]')}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)} 
              className={`flex-1 py-1.5 text-sm cursor-pointer font-medium rounded-lg transition-all ${!isLogin ? (isDark ? 'bg-slate-900/90 text-white shadow-sm' : 'bg-white text-[#3D3535] shadow-sm') : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#3D3535]')}`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Slider */}
          <div className="overflow-hidden">
            <div className={`flex transition-transform duration-300 ease-in-out ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
              {/* Login Form */}
              <form onSubmit={handleAuth} className="w-full flex-shrink-0">
                <label className="block text-xs font-medium mb-1.5 text-left">Email Address</label>
                <input type="email" placeholder="name@example.com" className={`w-full border focus:ring-1 focus:ring-blue-500 text-sm rounded-lg px-3.5 py-2 outline-none transition-all mb-4 ${isDark ? 'bg-slate-800/40 border-white/10 focus:border-blue-500 focus:bg-slate-800/60 text-white placeholder-slate-500' : 'bg-white/60 border-slate-300/60 focus:border-amber-600 text-[#3D3535] placeholder-slate-400'}`} onChange={e => setEmail(e.target.value)} required />
                
                <label className="block text-xs font-medium mb-1.5 text-left">Password</label>
                <input type="password" placeholder="••••••••" className={`w-full border focus:ring-1 focus:ring-blue-500 text-sm rounded-lg px-3.5 py-2 outline-none transition-all mb-4 ${isDark ? 'bg-slate-800/40 border-white/10 focus:border-blue-500 focus:bg-slate-800/60 text-white placeholder-slate-500' : 'bg-white/60 border-slate-300/60 focus:border-amber-600 text-[#3D3535] placeholder-slate-400'}`} onChange={e => setPassword(e.target.value)} required />
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm rounded-lg py-2.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer mt-2">
                  Sign In
                </button>
              </form>

              {/* Register Form */}
              <form onSubmit={handleAuth} className="w-full flex-shrink-0">
                <label className="block text-xs font-medium mb-1.5 text-left">Email Address</label>
                <input type="email" placeholder="name@example.com" className={`w-full border focus:ring-1 focus:ring-blue-500 text-sm rounded-lg px-3.5 py-2 outline-none transition-all mb-4 ${isDark ? 'bg-slate-800/40 border-white/10 focus:border-blue-500 focus:bg-slate-800/60 text-white placeholder-slate-500' : 'bg-white/60 border-slate-300/60 focus:border-amber-600 text-[#3D3535] placeholder-slate-400'}`} onChange={e => setEmail(e.target.value)} required />
                
                <label className="block text-xs font-medium mb-1.5 text-left">Password</label>
                <input type="password" placeholder="••••••••" className={`w-full border focus:ring-1 focus:ring-blue-500 text-sm rounded-lg px-3.5 py-2 outline-none transition-all mb-4 ${isDark ? 'bg-slate-800/40 border-white/10 focus:border-blue-500 focus:bg-slate-800/60 text-white placeholder-slate-500' : 'bg-white/60 border-slate-300/60 focus:border-amber-600 text-[#3D3535] placeholder-slate-400'}`} onChange={e => setPassword(e.target.value)} required />
                
                <label className="block text-xs font-medium mb-1.5 text-left">Confirm Password</label>
                <input type="password" placeholder="••••••••" className={`w-full border focus:ring-1 focus:ring-blue-500 text-sm rounded-lg px-3.5 py-2 outline-none transition-all mb-4 ${isDark ? 'bg-slate-800/40 border-white/10 focus:border-blue-500 focus:bg-slate-800/60 text-white placeholder-slate-500' : 'bg-white/60 border-slate-300/60 focus:border-amber-600 text-[#3D3535] placeholder-slate-400'}`} onChange={e => setConfirmPassword(e.target.value)} required />
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm rounded-lg py-2.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer mt-2">
                  Sign Up
                </button>
              </form>
            </div>
          </div>

          {/* Footer Link */}
          <p className={`text-xs text-center mt-5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
            <span onClick={() => setIsLogin(!isLogin)} className="text-blue-500 hover:underline font-medium cursor-pointer ml-1">
              {isLogin ? "Registrasi dulu" : "Login di sini"}
            </span>
          </p>
        </div>
      </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#FBF7F0] text-[#3D3535]'}`}>
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 shadow mb-4 bg-[#F2C49B] dark:bg-slate-900">
        <div className="font-bold text-xl">TaskFlow</div>
        <div className="flex gap-4">
          <button onClick={toggleTheme} className="p-2 rounded-full bg-slate-800/10">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
          <button onClick={logout} className="flex items-center gap-2 text-sm"><LogOut size={16} /> Logout</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-2">
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
          <button onClick={() => { setEditingTodo(null); setIsModalOpen(true); }} className="cursor-pointer bg-[#D97757] text-white px-2 md:px-4 py-2 rounded-xl flex items-center gap-1 md:gap-2 hover:opacity-90 transition-all">
            <Plus size={18} /> Add Todo
          </button>
          <select 
            className={`border cursor-pointer rounded-xl px-4 py-2 bg-transparent ${isDark ? 'text-slate-900 bg-white' : ''}`} 
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
