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
    let user: string;
    try {
      user = await api(fetch).getUsersMe();
    } catch (error) {
      console.error(error);
      return { queryClient };
    }
    const prefetchedUser = queryClient.prefetchQuery({
      queryKey: ['usersMe'],
      queryFn: () => api(fetch).getUsersMe(),
      initialData: user
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
