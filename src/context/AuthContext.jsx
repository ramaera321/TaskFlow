import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user dari localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const savedUser = localStorage.getItem('activeUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const register = (userData) => {
    // Simulasi penyimpanan user ke database (localStorage)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = { ...userData, id: Date.now().toString() };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    return newUser;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('activeUser', JSON.stringify(foundUser));
      return { success: true, user: foundUser };
    }
    return { success: false, message: 'Email atau password salah' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('activeUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
