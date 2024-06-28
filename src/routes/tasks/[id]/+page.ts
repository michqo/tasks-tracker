import { api } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params }) => {
  const { queryClient } = await parent();

  const tasks = queryClient.prefetchQuery({
    queryKey: ['tasks', params.id],
    queryFn: () => api().getTasks(params.id)
  });
  const user = queryClient.prefetchQuery({
    queryKey: ['usersMe'],
    queryFn: () => api(fetch).getUsersMe()
  });
  await Promise.all([tasks, user]);
}) satisfies PageLoad;
