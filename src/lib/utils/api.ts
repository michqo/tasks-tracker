import { PUBLIC_API_URL } from '$env/static/public';
import type { Task, PostTask } from './types';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MTI1ODMyLCJpYXQiOjE3MTgwMzk0MzIsImp0aSI6IjA3OWM2NjNmZjI5MDQ1YTViMWQxOTY3ZTlmZjVkNDk3IiwidXNlcl9pZCI6N30.-aXBLOhgndFI8QQhC5yF9gI6rp7ZjK48E9txqbI-9Yo"

const api = (customFetch = fetch) => ({
  getTasks: async (): Promise<Task[]> => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/6`, {
      headers: {
        "Authorization": `JWT ${JWT}`
      }
    });
    if (!response.ok) {
      throw response.status;
    }
    const data = (await response.json()).tasks as Task[];
    return data;
  },
  postTask: async (task: PostTask) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/6/`, {
      method: "POST",
      headers: {
        "Authorization": `JWT ${JWT}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw response.status;
    }
  },
  deleteTask: async (id: number) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasks/${id}/`, {
      method: "DELETE",
      headers: {
        "Authorization": `JWT ${JWT}`,
      }
    });
    if (!response.ok) {
      throw response.status;
    }
    return response;
  },
  updateTask: async (id: number, task: PostTask) => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasks/${id}/`, {
      method: "PUT",
      headers: {
        "Authorization": `JWT ${JWT}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    });
    if (!response.ok) {
      throw response.status;
    }
  }
});

export { api };
