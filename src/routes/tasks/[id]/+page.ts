import { api } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ['tasks', params.id],
    queryFn: () => api().getTasks(params.id)
  });
}) satisfies PageLoad;
