import { serverApi } from '$lib/utils/api';
import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies, fetch, params }) => {
  const accessToken = cookies.get('access_token');
  try {
    await serverApi(fetch, accessToken!).joinTaskList(params.token);
  } catch {}
  redirect(308, '/');
};
