import dayjs from 'dayjs';
import { writable, type Writable } from 'svelte/store';
import type { Todo } from './types';

/**
 * Writable store for todo form visibility
 */
const formOpen = writable(false);

/**
 * Writable store for todo dropdown menu visibility
 */
const dropdownOpen = writable(false);

/**
 * Create a writable store for todos
 */
const todos: Writable<Todo[]> = writable([
  {
    id: 1,
    title: 'Buy groceries',
    description: '',
    completed: false,
    createdAt: dayjs('2024-04-12').toDate()
  },
  {
    id: 2,
    title: 'Walk the dog',
    description: '',
    completed: true,
    createdAt: dayjs('2024-04-12').toDate()
  },
  {
    id: 3,
    title: 'Do laundry',
    description: '',
    completed: false,
    createdAt: dayjs('2024-04-12').toDate()
  }
]);

/**
 * Create a writable store for the selected todo
 */
const selectedTodo = writable(null);

/**
 * Create a readable store for the user's authentication status
 */
const isAuthenticated = writable(false);

/**
 * Create a writable store for the user's settings
 */
const settings = writable({});

export { formOpen, dropdownOpen, isAuthenticated, selectedTodo, settings, todos };
