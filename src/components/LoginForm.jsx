import React from 'react';

const LoginForm = ({ onLogin, onSwitch, isDark, setEmail, setPassword }) => {
  return (
    <form onSubmit={onLogin} className="w-full flex-shrink-0">
      <label className="block text-xs font-medium mb-1.5 text-left">Email Address</label>
      <input 
        type="email" 
        placeholder="name@example.com" 
        className="w-full bg-[#1c4f4a]/40 dark:bg-slate-800/40 border border-white/20 focus:border-[#f6b327] text-white placeholder-slate-300 rounded-xl px-3.5 py-2 text-sm outline-none transition-all mb-4" 
        onChange={e => setEmail(e.target.value)} 
        required 
      />
      
      <label className="block text-xs font-medium mb-1.5 text-left">Password</label>
      <input 
        type="password" 
        placeholder="••••••••" 
        className="w-full bg-[#1c4f4a]/40 border dark:bg-slate-800/40 border-white/20 focus:border-[#f6b327] text-white placeholder-slate-300 rounded-xl px-3.5 py-2 text-sm outline-none transition-all mb-4" 
        onChange={e => setPassword(e.target.value)} 
        required 
      />
      
      <button className="w-full bg-[#fd671a] hover:bg-[#e0560f] active:scale-[0.98] text-white font-semibold text-sm rounded-xl py-2.5 shadow-md transition-all cursor-pointer mt-2">
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
