import { writable, type Writable } from 'svelte/store';
import type { api } from './api';

/**
 * Create a readable store for the user's authentication status
 */
const isAuthenticated = writable(false);

/**
 * Create a writable store for the user's settings
 */
const settings = writable({});

const fetcher: Writable<typeof api> = writable();

export { isAuthenticated, settings, fetcher };
