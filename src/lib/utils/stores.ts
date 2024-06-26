import { writable } from 'svelte/store';

/**
 * Create a readable store for the user's authentication status
 */
const isAuthenticated = writable(false);

/**
 * Create a writable store for the user's settings
 */
const settings = writable({});

export { isAuthenticated, settings };
