import { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useTodos } from './hooks/useTodos';
import AddTodoModal from './components/AddTodoModal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import { Sun, Moon } from 'lucide-react';

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
      if (password !== confirmPassword) {
        alert("Password dan konfirmasi password tidak cocok!");
        return;
      }

      const users = JSON.parse(localStorage.getItem('todo_users') || '[]');
      if (users.find(u => u.email === email)) {
        alert("Email sudah terdaftar!");
        return;
      }

      const newUser = { email, password };
      register(newUser);
      
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
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  if (!user) return (
    <div className={`min-h-screen w-full flex items-center justify-center p-4 md:p-8 overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#0b0f17] text-white' : 'bg-[#f1f2ec] text-slate-800'}`}>
        <button 
          onClick={toggleTheme}
          className="fixed top-4 right-4 z-50 p-2 rounded-full cursor-pointer bg-slate-800/50 backdrop-blur-md border border-white/10 hover:bg-slate-700 transition-all"
        >
          {isDark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
        </button>

        <div className="w-full max-w-sm bg-[#1c4f4a]/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white rounded-3xl p-6 sm:p-7 shadow-2xl">
          <div className="mb-6 pt-4">
            <p className="text-3xl font-extrabold tracking-tight text-center mb-2">TODO LIST</p>
            <p className="text-xs text-center mb-6 text-slate-300">Kelola tugas harianmu dengan lebih terstruktur dan efisien.</p>
          </div>

          <div className="p-1 rounded-xl border border-white/10 mb-6 flex w-full dark:bg-slate-950/80 bg-[#0e3733]">
            <button 
              onClick={() => setIsLogin(true)} 
              className={`flex-1 py-1.5 text-sm cursor-pointer font-medium rounded-lg transition-all ${isLogin ? 'dark:bg-slate-900/90 text-white shadow-sm bg-[#1c4f4a]' : 'text-slate-200 hover:text-white'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)} 
              className={`flex-1 py-1.5 text-sm cursor-pointer font-medium rounded-lg transition-all ${!isLogin ? 'dark:bg-slate-900/90 text-white shadow-sm bg-[#1c4f4a]' : 'text-slate-200 hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>

          <div className="overflow-hidden">
            <div className={`flex transition-transform duration-300 ease-in-out ${isLogin ? 'translate-x-0' : '-translate-x-full'}`}>
              <LoginForm onLogin={handleAuth} isDark={isDark} setEmail={setEmail} setPassword={setPassword} />
              <RegisterForm onRegister={handleAuth} isDark={isDark} setEmail={setEmail} setPassword={setPassword} setConfirmPassword={setConfirmPassword} />
            </div>
          </div>

          <p className="text-xs text-center mt-5 text-slate-300">
            {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}
            <span onClick={() => setIsLogin(!isLogin)} className="text-[#f6b327] hover:underline font-medium cursor-pointer ml-1">
              {isLogin ? "Registrasi dulu" : "Login di sini"}
            </span>
          </p>
        </div>
      </div>
  );

  return (
    <>
      <Dashboard 
        todos={todos}
        isDark={isDark}
        toggleTheme={toggleTheme}
        logout={logout}
        onAddTodo={() => { setEditingTodo(null); setIsModalOpen(true); }}
        onEditTodo={handleEdit}
        onDeleteTodo={deleteTodo}
        onToggleDetail={toggleDetail}
        onUpdateStatus={updateTodo}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        visibleCount={visibleCount}
        setVisibleCount={setVisibleCount}
        filteredTodos={filteredTodos}
      />

      <AddTodoModal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingTodo(null); }} 
        onSave={handleSaveTodo}
        todoToEdit={editingTodo}
      />
    </>
  );
}

export default App;
