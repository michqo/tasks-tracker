import dayjs from 'dayjs';
import { writable, type Writable } from 'svelte/store';
import type { Task } from './types';

/**
 * Create a writable store for tasks
 */
const taskList: Writable<Task[]> = writable([
  {
    id: 1,
    name: 'Buy groceries',
    description: '',
    completed: false,
    createdAt: dayjs('2024-04-12').toDate()
  },
  {
    id: 2,
    name: 'Walk the dog',
    description: '',
    completed: true,
    createdAt: dayjs('2024-04-12').toDate()
  },
  {
    id: 3,
    name: 'Do laundry',
    description: '',
    completed: false,
    createdAt: dayjs('2024-04-12').toDate()
  }
]);

/**
 * Create a readable store for the user's authentication status
 */
const isAuthenticated = writable(false);

/**
 * Create a writable store for the user's settings
 */
const settings = writable({});

export { isAuthenticated, settings, taskList };
