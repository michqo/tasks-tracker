import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
  return {
    accessToken: locals.accessToken
  };
}) satisfies LayoutServerLoad;
