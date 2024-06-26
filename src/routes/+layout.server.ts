import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ route, locals }) => {
  if (!locals.accessToken && route.id != '/auth') {
    redirect(307, '/auth');
  } else if (locals.accessToken && route.id == '/auth') {
    redirect(308, '/');
  }

  return {
    accessToken: locals.accessToken
  };
}) satisfies LayoutServerLoad;
