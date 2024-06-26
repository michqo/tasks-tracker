import { api } from '$lib/utils/api';
import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
  const { queryClient } = await parent();

  await queryClient.prefetchQuery({
    queryKey: ['taskLists'],
    queryFn: () => api().getTaskLists()
  });
}) satisfies PageLoad;
