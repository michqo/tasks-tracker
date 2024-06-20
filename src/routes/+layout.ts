import { browser } from '$app/environment';
import { token } from '$lib/utils/stores';
import { redirect } from '@sveltejs/kit';
import { QueryClient } from '@tanstack/svelte-query';
import { get } from 'svelte/store';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
  if (browser) {
    const jwt = get(token);
    if (jwt == '' && url.pathname != '/auth') {
      redirect(307, '/auth');
    } else if (jwt != '' && url.pathname == '/auth') {
      redirect(308, '/');
    }
  }
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        refetchOnWindowFocus: false,
      }
    }
  });
  return { queryClient };
};
