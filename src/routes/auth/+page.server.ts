import { loginSchema } from '$lib/utils/schemas';
import { fail, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { api, authApi } from '$lib/utils/api';
import { error } from '@sveltejs/kit';
import type { PostUserErrorResponse } from '$lib/utils/types';

export const load = (async () => {
  return {
    form: await superValidate(zod(loginSchema))
  };
}) satisfies PageServerLoad;

export const actions = {
  default: async (event) => {
    const form = await superValidate(event, zod(loginSchema));
    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const { fetch, cookies } = event;
    switch (form.id) {
      case 'login':
        try {
          const res = await authApi(fetch).createJwt(form.data);
          cookies.set('access_token', res.access, { path: '/' });
          cookies.set('refresh_token', res.refresh, { path: '/' });
        } catch {
          error(401);
        }
        break;
      case 'register':
        try {
          await authApi(fetch).postUser(form.data);
        } catch (error) {
          const e = error as PostUserErrorResponse;
          if (e.username) {
            setError(form, 'username', e.username);
          }
          if (e.password) {
            setError(form, 'password', e.password);
          }
        }
        break;
      default:
        break;
    }

    return {
      form
    };
  }
} satisfies Actions;
