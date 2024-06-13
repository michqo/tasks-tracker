import { PUBLIC_API_URL } from '$env/static/public';
import type { Task, PostTask } from './types';

const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE4MzQ5MTY4LCJpYXQiOjE3MTgyNjI3NjgsImp0aSI6ImI5NzllYTliY2RmZjQyZDdhMWZiMzJiYzEyZjc3ODc1IiwidXNlcl9pZCI6M30.l5aDGHiKuftartJdbpdGTo-O4RIV6MT6QuVH2GXWtVU"

const api = (customFetch = fetch) => ({
  getTasks: async (): Promise<Task[]> => {
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/3`, {
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
    const response = await customFetch(`${PUBLIC_API_URL}/api/tasklists/3/`, {
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
