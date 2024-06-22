import { loginSchema } from '$lib/utils/schemas';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { api } from '$lib/utils/api';
import { error } from '@sveltejs/kit';

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
    if (form.id == 'login') {
      try {
        const res = await api(fetch).createJwt(form.data);
        cookies.set('access_token', res.access, { path: '/' });
        cookies.set('refresh_token', res.refresh, { path: '/' });
      } catch {
        error(401);
      }
    }

    return {
      form
    };
  }
} satisfies Actions;
