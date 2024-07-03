import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
  cookies.delete('access_token', { path: '/' });
  cookies.delete('refresh_token', { path: '/' });
  redirect(308, '/auth');
};
