// src/hooks/useTodos.ts
"use client";

import { useReducer, useEffect } from 'react';
import { Todo, TodoAction, TodoFilters } from '@/types/todo';

const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return [...state, newTodo];

    case 'UPDATE_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, ...action.payload.updates, updatedAt: new Date() }
          : todo
      );

    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);

    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
          : todo
      );

    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);

    case 'SET_TODOS':
      return action.payload;

    default:
      return state;
  }
};

const STORAGE_KEY = 'todos-app-data';

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedTodos = JSON.parse(stored).map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
          updatedAt: new Date(todo.updatedAt),
          dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
        }));
        dispatch({ type: 'SET_TODOS', payload: parsedTodos });
      }
    } catch (error) {
      console.error('Error loading todos from localStorage:', error);
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    dispatch({ type: 'UPDATE_TODO', payload: { id, updates } });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const getFilteredTodos = (filters: TodoFilters) => {
    return todos.filter(todo => {
      // Status filter
      if (filters.status === 'active' && todo.completed) return false;
      if (filters.status === 'completed' && !todo.completed) return false;

      // Priority filter
      if (filters.priority && todo.priority !== filters.priority) return false;

      // Category filter
      if (filters.category && todo.category !== filters.category) return false;

      // Search filter
      if (filters.searchTerm) {
        const searchTerm = filters.searchTerm.toLowerCase();
        return (
          todo.title.toLowerCase().includes(searchTerm) ||
          (todo.description && todo.description.toLowerCase().includes(searchTerm))
        );
      }

      return true;
    });
  };

  const getStats = () => {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const active = total - completed;
    const overdue = todos.filter(todo => 
      todo.dueDate && 
      new Date(todo.dueDate) < new Date() && 
      !todo.completed
    ).length;

    return { total, completed, active, overdue };
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    getFilteredTodos,
    getStats,
  };
};