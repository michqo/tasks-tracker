import { PUBLIC_API_URL } from '$env/static/public';
import { get } from 'svelte/store';
import type { LoginSchema } from './schemas';
import { token } from './stores';
import type { LoginResponse, PostTask, PostTaskList, Task, TaskList } from './types';

const headers = {
  Authorization: `JWT ${get(token)}`
};

const api = (customFetch = fetch) => ({
  getTaskLists: async (): Promise<TaskList[]> => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists`, {
      headers
    });
    if (!response.ok) {
      throw response.status;
    }
    const data = (await response.json()).results;
    return data;
  },
  postTaskList: async (task: PostTaskList) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/`, {
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
  deleteTaskList: async (id: number) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/${id}/`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) {
      throw response.status;
    }
  },
  updateTaskList: async (id: number, task: PostTaskList) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/${id}/`, {
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
  shareTaskList: async (id: number): Promise<string> => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklist/share/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tasklist: id,
        role: 'Editor'
      })
    });
    if (!response.ok) {
      throw response.status;
    }
    return (await response.json()).link;
  },
  joinTaskList: async (token: string) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklist/join/${token}/`, {
      headers: {
        ...headers
      }
    });
    if (!response.ok) {
      throw await response.json();
    }
  },
  getTasks: async (id: string): Promise<Task[]> => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/${id}`, {
      headers
    });
    if (!response.ok) {
      throw response.status;
    }
    const data = (await response.json()).tasks as Task[];
    return data;
  },
  postTask: async (task: PostTask, id: string) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/${id}/`, {
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
  },
  putPositions: async (positions: Record<string, number>, type: 'tasks' | 'tasklists') => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/positions/${type}/`, {
      method: 'PUT',
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(positions)
    });
    if (!response.ok) {
      throw response.status;
    }
  }
});

interface Transformable {
  completed: boolean;
  completed_at: string;
  position: number;
}

const transformItems = <T extends Transformable>(items: T[]): T[] =>
  items
    .map((item) => ({ ...item, completed: item.completed_at != null }))
    .sort((a, b) => a.position - b.position);

export { api, transformItems };
