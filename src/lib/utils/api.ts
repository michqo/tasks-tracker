import { PUBLIC_API_URL } from '$env/static/public';
import type { LoginSchema } from './schemas';
import type {
  LoginResponse,
  PostTask,
  PostTaskList,
  RefreshJWTResponse,
  Task,
  TaskList,
  Transformable
} from './types';

const authApi = (customFetch = fetch) => ({
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
  postUser: async (credentials: LoginSchema): Promise<any> => {
    const response = await customFetch(`${PUBLIC_API_URL}/auth/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      throw await response.json();
    }
    return await response.json();
  },
  refreshJwt: async (refresh: string): Promise<RefreshJWTResponse> => {
    const response = await customFetch(`${PUBLIC_API_URL}/auth/jwt/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh })
    });
    if (!response.ok) {
      throw response.status;
    }
    return await response.json();
  }
});

let headers = {};

const setAuthHeaders = (token: string) => {
  headers = {
    Authorization: `JWT ${token}`
  };
};

const api = (customFetch = fetch) => ({
  getUsersMe: async (): Promise<string> => {
    const response = await customFetch(`${PUBLIC_API_URL}/auth/users/me/`, {
      headers
    });
    if (!response.ok) {
      throw await response.json();
    }
    return (await response.json()).username;
  },
  getTaskLists: async (): Promise<TaskList[]> => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists`, {
      headers
    });
    if (!response.ok) {
      throw response.status;
    }
    return (await response.json()).results;
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

const transformItems = <T extends Transformable>(items: T[]): T[] =>
  items
    .map((item) => ({ ...item, completed: item.completed_at != null }))
    .sort((a, b) => a.position - b.position);

export { api, authApi, setAuthHeaders, transformItems };
