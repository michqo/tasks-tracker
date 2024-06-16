/**
 * Types
 */

interface Task {
  id: number;
  task: string;
  completed: boolean;
  created_at: Date;
  position: number;
}

type PostTask = Pick<Task, 'task'>;

interface TaskList {
  id: number;
  name: string;
  created_at: Date;
  completed: true;
  position: number;
}

type PostTaskList = Pick<TaskList, 'name'>;

interface ActionResponse {
  res: string;
}

interface LoginResponse {
  refresh: string;
  access: string;
}

export type { ActionResponse, LoginResponse, PostTask, PostTaskList, Task, TaskList };
