import { browser } from '$app/environment';
import { api } from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
  if (browser) {
    try {
      await api(fetch).joinTaskList(params.token);
    } catch {}
    redirect(308, '/');
  }
};
