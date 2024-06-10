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

export type { ActionResponse, PostTask, Task };

