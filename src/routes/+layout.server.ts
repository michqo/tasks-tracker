import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ fetch, cookies, route }) => {
  const jwt = cookies.get('access_token');
  if (jwt == '' && route.id != '/auth') {
    redirect(307, '/auth');
  } else if (jwt != '' && route.id == '/auth') {
    redirect(308, '/');
  }

  return {
    accessToken: jwt
  };
}) satisfies LayoutServerLoad;
