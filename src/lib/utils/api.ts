import { PUBLIC_API_URL } from '$env/static/public';
import { get } from 'svelte/store';
import type { LoginSchema } from './schemas';
import { token } from './stores';
import type { LoginResponse, PostTask, Task } from './types';

const headers = {
  Authorization: `JWT ${get(token)}`
};

const api = (customFetch = fetch) => ({
  getTasks: async (): Promise<Task[]> => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/1`, {
      headers
    });
    if (!response.ok) {
      throw response.status;
    }
    const data = (await response.json()).tasks as Task[];
    return data;
  },
  postTask: async (task: PostTask) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/1/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw response.status;
    }
  },
  deleteTask: async (id: number) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasks/${id}/`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) {
      throw response.status;
    }
    return response;
  },
  updateTask: async (id: number, task: PostTask) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasks/${id}/`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw response.status;
    }
  },
  createJwt: async (credentials: LoginSchema): Promise<LoginResponse> => {
    const response = await customFetch(`${PUBLIC_API_URL}/auth/jwt/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      throw response.status;
    }
    return response.json();
  },
  postUser: async (credentials: LoginSchema): Promise<number> => {
    const response = await customFetch(`${PUBLIC_API_URL}/auth/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      throw response.status;
    }
    return response.status;
  }
});

export { api };
