/**
 * Types
 */


interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

export type { Todo };
