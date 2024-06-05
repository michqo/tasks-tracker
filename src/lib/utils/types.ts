/**
 * Types
 */

interface Task {
  id: number;
  name: string;
  completed: boolean;
  createdAt: Date;
}

export type { Task };
