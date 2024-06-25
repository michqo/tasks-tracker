import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';
import { api } from '$lib/utils/api';

export const load: LayoutLoad = async ({ data, fetch }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        enabled: browser,
        refetchOnWindowFocus: false
      }
    }
  });

  const accessToken = data.accessToken;
  if (accessToken) {
    console.log(accessToken);
    const user = await api(fetch, {
      Authorization: `JWT ${accessToken}`
    }).getUsersMe();
    return { queryClient, accessToken, user };
  }
  return { queryClient };
};
