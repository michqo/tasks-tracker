import { writable } from 'svelte/store';
import { persisted } from 'svelte-persisted-store'

/**
 * Create a readable store for the user's authentication status
 */
const isAuthenticated = writable(false);

/**
 * Create a writable store for the user's settings
 */
const settings = writable({});

/**
 * Create a persisted store for JWT
 */
const token = persisted('token', '');

export { isAuthenticated, settings, token };
