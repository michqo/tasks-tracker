import { browser } from '$app/environment';
import { token } from '$lib/utils/stores';
import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import type { PageLoad } from './$types';

export const load = (() => {
  if (browser) {
    const jwt = get(token);
    if (!jwt) {
      redirect(307, '/auth');
    }
  }
}) satisfies PageLoad;
