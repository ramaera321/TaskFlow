import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useTodos } from './hooks/useTodos';
import TodoCard from './components/TodoCard';
import { CheckCircle2, Plus, LogOut, LayoutDashboard } from 'lucide-react';

function App() {
  const { user, login, register, logout } = useAuth();
  const { todos, addTodo, updateTodo, deleteTodo, toggleDetail } = useTodos();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [judul, setJudul] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [details, setDetails] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLogin) {
      const res = login(email, password);
      if (!res.success) alert(res.message);
    } else {
      register({ email, password });
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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
        <div className="w-full max-w-md bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">{isLogin ? 'Welcome back' : 'Create account'}</h2>
          <form onSubmit={handleAuth} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={e => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="w-full bg-slate-950 border border-slate-800 text-white p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" onChange={e => setPassword(e.target.value)} required />
            <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold p-3 rounded-xl transition-all">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-slate-500 cursor-pointer hover:text-indigo-400" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Don\'t have an account? Sign up' : 'Already have an account? Sign in'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="flex justify-between items-center mb-12 bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-4 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2">
            <LayoutDashboard className="text-indigo-500" />
            <h1 className="font-bold text-lg text-white">TaskFlow</h1>
          </div>
          <button onClick={logout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-rose-400 transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </nav>

        <form onSubmit={handleAddTodo} className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 p-6 rounded-2xl mb-12 shadow-xl">
          <h2 className="font-semibold text-white mb-4">Create New Task</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input placeholder="Task title" className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-white" value={judul} onChange={e => setJudul(e.target.value)} required />
            <input type="date" className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-white" value={tanggal} onChange={e => setTanggal(e.target.value)} required />
          </div>
          <input placeholder="Details (comma separated)" className="w-full bg-slate-950 border border-slate-800 p-3 rounded-xl mt-4 text-white" value={details} onChange={e => setDetails(e.target.value)} />
          <button className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold p-3 rounded-xl transition-all flex items-center justify-center gap-2">
            <Plus size={18} /> Add Task
          </button>
        </form>

        {todos.length === 0 ? (
          <div className="border-2 border-dashed border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center">
            <CheckCircle2 size={48} className="text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-300">No tasks yet</h3>
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
