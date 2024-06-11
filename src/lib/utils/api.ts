import { PUBLIC_API_URL } from '$env/static/public';
import type { Task, PostTask } from './types';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MjIyNjkzLCJpYXQiOjE3MTgxMzYyOTMsImp0aSI6ImNmZmRiMjM2Njg2ZTQzYjNhNjExYjUxNWM2ZjRhNzBmIiwidXNlcl9pZCI6N30.pxnkNeh1EgFSxnt81lTKKD_J0EmkPBD_qhrHgg5n1gg"

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
