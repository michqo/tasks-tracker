import { browser } from '$app/environment';
import { api, setAuthHeaders } from '$lib/shared/api';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ data, fetch, route }) => {
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
    const prefetchedUser = queryClient.prefetchQuery({
      queryKey: ['usersMe'],
      queryFn: () => api(fetch).getUsersMe(),
      initialData: data.user
    });
    const prefetchedTasks = queryClient.prefetchQuery({
      queryKey: ['taskLists'],
      queryFn: () => api(fetch).getTaskLists()
    });
    await Promise.all([prefetchedTasks, prefetchedUser]);
    return { queryClient, accessToken };
  }
  return { queryClient };
};
