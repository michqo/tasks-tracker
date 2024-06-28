import { api } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ parent, fetch }) => {
  const { queryClient } = await parent();

  const tasks = queryClient.prefetchQuery({
    queryKey: ['taskLists'],
    queryFn: () => api(fetch).getTaskLists()
  });
  const user = queryClient.prefetchQuery({
    queryKey: ['usersMe'],
    queryFn: () => api(fetch).getUsersMe()
  });
  await Promise.all([tasks, user]);
}) satisfies PageLoad;
