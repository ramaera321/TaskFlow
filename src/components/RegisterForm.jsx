import React from 'react';

const RegisterForm = ({ onRegister, onSwitch, isDark, setEmail, setPassword, setConfirmPassword }) => {
  return (
    <form onSubmit={onRegister} className="w-full flex-shrink-0">
      <label className="block text-xs font-medium mb-1.5 text-left">Email Address</label>
      <input 
        type="email" 
        placeholder="name@example.com" 
        className={`w-full border focus:ring-1 focus:ring-blue-500 text-sm rounded-lg px-3.5 py-2 outline-none transition-all mb-4 ${isDark ? 'bg-slate-800/40 border-white/10 focus:border-blue-500 focus:bg-slate-800/60 text-white placeholder-slate-500' : 'bg-white/60 border-slate-300/60 focus:border-amber-600 text-[#3D3535] placeholder-slate-400'}`} 
        onChange={e => setEmail(e.target.value)} 
        required 
      />
      
      <label className="block text-xs font-medium mb-1.5 text-left">Password</label>
      <input 
        type="password" 
        placeholder="••••••••" 
        className={`w-full border focus:ring-1 focus:ring-blue-500 text-sm rounded-lg px-3.5 py-2 outline-none transition-all mb-4 ${isDark ? 'bg-slate-800/40 border-white/10 focus:border-blue-500 focus:bg-slate-800/60 text-white placeholder-slate-500' : 'bg-white/60 border-slate-300/60 focus:border-amber-600 text-[#3D3535] placeholder-slate-400'}`} 
        onChange={e => setPassword(e.target.value)} 
        required 
      />
      
      <label className="block text-xs font-medium mb-1.5 text-left">Confirm Password</label>
      <input 
        type="password" 
        placeholder="••••••••" 
        className={`w-full border focus:ring-1 focus:ring-blue-500 text-sm rounded-lg px-3.5 py-2 outline-none transition-all mb-4 ${isDark ? 'bg-slate-800/40 border-white/10 focus:border-blue-500 focus:bg-slate-800/60 text-white placeholder-slate-500' : 'bg-white/60 border-slate-300/60 focus:border-amber-600 text-[#3D3535] placeholder-slate-400'}`} 
        onChange={e => setConfirmPassword(e.target.value)} 
        required 
      />
      
      <button className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-sm rounded-lg py-2.5 shadow-md shadow-blue-600/20 transition-all cursor-pointer mt-2">
        Sign Up
      </button>
    </form>
  );
};

export default RegisterForm;
