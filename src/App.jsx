import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { useTodos } from './hooks/useTodos';
import TodoCard from './components/TodoCard';

function App() {
  const { user, login, register, logout } = useAuth();
  const { todos, addTodo, updateTodo, deleteTodo, toggleDetail } = useTodos();

  // State untuk Auth
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State untuk Form Todo
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
      details: details.split(',').map(d => ({ 
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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form onSubmit={handleAuth} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
          <h2 className="text-9xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
          <input type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" onChange={e => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" onChange={e => setPassword(e.target.value)} required />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {isLogin ? 'Login' : 'Daftar'}
          </button>
          <p className="mt-4 text-sm text-center cursor-pointer text-blue-500" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Belum punya akun? Daftar di sini' : 'Sudah punya akun? Login di sini'}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <nav className="flex justify-between items-center mb-8 bg-white p-4 rounded shadow-sm">
        <h1 className="font-bold text-xl">Todo Checklist</h1>
        <button onClick={logout} className="text-red-500 hover:text-red-700 font-medium">Logout</button>
      </nav>

      <form onSubmit={handleAddTodo} className="bg-white p-6 rounded shadow-sm mb-8 max-w-2xl mx-auto">
        <h2 className="font-bold mb-4">Tambah Todo Baru</h2>
        <input placeholder="Judul Todo" className="w-full p-2 mb-2 border rounded" value={judul} onChange={e => setJudul(e.target.value)} required />
        <input type="date" className="w-full p-2 mb-2 border rounded" value={tanggal} onChange={e => setTanggal(e.target.value)} required />
        <input placeholder="Detail (pisahkan dengan koma, contoh: Beli susu, Cuci baju)" className="w-full p-2 mb-4 border rounded" value={details} onChange={e => setDetails(e.target.value)} />
        <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Simpan Todo</button>
      </form>

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
    </div>
  );
}

export default App;
