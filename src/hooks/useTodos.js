import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';

export const useTodos = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);

  // Helper untuk mengecek status 'terlambat'
  const checkStatus = (todo) => {
    const today = new Date().toISOString().split('T')[0];
    if (todo.status !== 'selesai' && todo.tanggal_target < today) {
      return { ...todo, status: 'terlambat' };
    }
    return todo;
  };

  // Memuat todos dari localStorage
  const loadTodos = useCallback(() => {
    if (!user) return;
    const allData = JSON.parse(localStorage.getItem('todos') || '[]');
    const userTodos = allData
      .filter((t) => t.userId === user.id)
      .map(checkStatus);
    setTodos(userTodos);
  }, [user]);

  useEffect(() => {
    loadTodos();
  }, [loadTodos]);

  // Helper untuk menyimpan ke localStorage
  const saveTodos = (newTodos) => {
    const allData = JSON.parse(localStorage.getItem('todos') || '[]');
    const otherUsersTodos = allData.filter((t) => t.userId !== user.id);
    localStorage.setItem('todos', JSON.stringify([...otherUsersTodos, ...newTodos]));
    setTodos(newTodos);
  };

  const addTodo = (todo) => {
    const newTodo = { 
      ...todo, 
      userId: user.id, 
      id: Date.now().toString(),
      tanggal_dibuat: new Date().toISOString().split('T')[0]
    };
    saveTodos([...todos, newTodo]);
  };

  const updateTodo = (updatedTodo) => {
    const newTodos = todos.map((t) => (t.id === updatedTodo.id ? updatedTodo : t));
    saveTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    saveTodos(newTodos);
  };

  const toggleDetail = (todoId, detailId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        const newDetails = todo.details.map((d) =>
          d.id === detailId ? { ...d, isDone: !d.isDone } : d
        );
        return { ...todo, details: newDetails };
      }
      return todo;
    });
    saveTodos(newTodos);
  };

  return { todos, addTodo, updateTodo, deleteTodo, toggleDetail };
};
