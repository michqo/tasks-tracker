/**
 * Types
 */

interface Task {
  id: number;
  task: string;
  completed_at: string;
  completed: boolean;
  created_at: Date;
  position: number;
}

type PostTask = Partial<Task>;

interface TaskList {
  id: number;
  name: string;
  created_at: Date;
  completed_at: string;
  completed: true;
  position: number;
}

type PostTaskList = Partial<TaskList>;

interface ActionResponse {
  res: string;
}

interface LoginResponse {
  refresh: string;
  access: string;
}

export type { ActionResponse, LoginResponse, PostTask, PostTaskList, Task, TaskList };
