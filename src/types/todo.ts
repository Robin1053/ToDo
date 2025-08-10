// src/types/todo.ts
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category?: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export interface TodoFilters {
  status: 'all' | 'active' | 'completed';
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  searchTerm?: string;
}

export type TodoAction = 
  | { type: 'ADD_TODO'; payload: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'> }
  | { type: 'UPDATE_TODO'; payload: { id: string; updates: Partial<Todo> } }
  | { type: 'DELETE_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_TODOS'; payload: Todo[] };