import { browser } from '$app/environment';
import { api, setAuthHeaders } from '$lib/utils/api';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';

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
    setAuthHeaders(accessToken);
    const tasks = queryClient.prefetchQuery({
      queryKey: ['taskLists'],
      queryFn: () => api(fetch).getTaskLists()
    });
    const user = queryClient.prefetchQuery({
      queryKey: ['usersMe'],
      queryFn: () => api(fetch).getUsersMe()
    });
    await Promise.all([tasks, user]);
    return { queryClient, accessToken };
  }
  return { queryClient };
};
