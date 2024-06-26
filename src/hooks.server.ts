import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.accessToken = event.cookies.get('access_token');

  const response = await resolve(event);
  return response;
};
