import { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import { useTodos } from './hooks/useTodos';
import TodoCard from './components/TodoCard';
import { CheckCircle2, Plus, LogOut, LayoutDashboard, Sun, Moon } from 'lucide-react';

function App() {
  const { user, login, register, logout } = useAuth();
  const { todos, addTodo, updateTodo, deleteTodo, toggleDetail } = useTodos();

  const [theme, setTheme] = useState(localStorage.getItem('app_theme') || 'dark');
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [judul, setJudul] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [details, setDetails] = useState('');

  useEffect(() => {
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

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

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      judul,
      tanggal_target: tanggal,
      status: 'active',
      details: details.split(',').filter(d => d.trim() !== '').map(d => ({ 
        id: Date.now().toString() + Math.random(), 
        teks: d.trim(), 
        isDone: false 
      }))
    };
    addTodo(newTodo);
    setJudul(''); setTanggal(''); setDetails('');
  };

  const handleUpdateStatus = (todo) => {
    const statuses = ['inactive', 'active', 'selesai', 'terlambat'];
    const currentIndex = statuses.indexOf(todo.status);
    const nextStatus = statuses[(currentIndex + 1) % statuses.length];
    updateTodo({ ...todo, status: nextStatus });
  };

  const isDark = theme === 'dark';

  if (!user) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#FBF7F0] text-[#3D3535]'}`}>
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-white/10 hover:bg-slate-700 transition-all"
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
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${isLogin ? (isDark ? 'bg-slate-900/90 text-white shadow-sm' : 'bg-white text-[#3D3535] shadow-sm') : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#3D3535]')}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)} 
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-all ${!isLogin ? (isDark ? 'bg-slate-900/90 text-white shadow-sm' : 'bg-white text-[#3D3535] shadow-sm') : (isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-[#3D3535]')}`}
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
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-200' : 'bg-[#FBF7F0] text-[#3D3535]'}`}>
      {/* Theme Toggle */}
      <button 
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 rounded-full bg-slate-800/50 backdrop-blur-md border border-white/10 hover:bg-slate-700 transition-all"
      >
        {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
      </button>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className={`flex justify-between items-center mb-12 backdrop-blur-xl border p-4 rounded-2xl shadow-lg ${isDark ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white/50 border-slate-200'}`}>
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-indigo-500" />
            <h1 className="font-bold text-lg">TaskFlow</h1>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-rose-400 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </nav>

        <form onSubmit={handleAddTodo} className={`backdrop-blur-xl border p-6 rounded-2xl mb-12 shadow-xl ${isDark ? 'bg-slate-900/50 border-slate-800/80' : 'bg-white border-slate-200'}`}>
          <h2 className="font-semibold mb-4">Create New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Task title" className={`border p-3 rounded-xl ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'}`} value={judul} onChange={e => setJudul(e.target.value)} required />
            <input type="date" className={`border p-3 rounded-xl ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'}`} value={tanggal} onChange={e => setTanggal(e.target.value)} required />
          </div>
          <input placeholder="Details (comma separated)" className={`w-full border p-3 rounded-xl mt-4 ${isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'}`} value={details} onChange={e => setDetails(e.target.value)} />
          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold p-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <Plus size={18} /> Add Task
          </button>
        </form>

        {todos.length === 0 ? (
          <div className={`border-2 border-dashed rounded-3xl p-12 text-center flex flex-col items-center ${isDark ? 'border-slate-800' : 'border-slate-300'}`}>
            <CheckCircle2 size={48} className="text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold">No tasks yet</h3>
            <p className="text-slate-500 mt-2">Get started by creating your first task above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todos.map(todo => (
              <TodoCard 
                key={todo.id} 
                todo={todo} 
                onToggleDetail={toggleDetail} 
                onDelete={deleteTodo} 
                onUpdateStatus={handleUpdateStatus} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
