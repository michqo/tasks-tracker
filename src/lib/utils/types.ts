/**
 * Types
 */

interface Task {
  id: number;
  task: string;
  completed: boolean;
  created_at: Date;
}

interface PostTask {
  task: string;
}

interface ActionResponse {
  res: string;
}

interface LoginResponse {
  refresh: string;
  access: string;
}

export type { ActionResponse, LoginResponse, PostTask, Task };
