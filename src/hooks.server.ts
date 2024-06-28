import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const accessToken = event.cookies.get('access_token');
  event.locals.accessToken = accessToken;

  const isAuth = event.url.pathname.startsWith('/auth');
  if (!accessToken && !isAuth) {
    redirect(307, '/auth');
  } else if (accessToken && isAuth) {
    redirect(308, '/');
  }

  const response = await resolve(event);
  return response;
};
