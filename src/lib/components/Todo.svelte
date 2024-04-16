<script lang="ts">
  import type { Todo } from '$lib/utils/types';
  import dayjs from 'dayjs';
  import { Checkbox } from "$lib/components/ui/checkbox";

  let todos: Todo[] = [
    {
      id: 1,
      title: 'Buy groceries',
      description: '',
      completed: false,
      createdAt: dayjs('2024-04-12').toDate()
    },
    {
      id: 2,
      title: 'Walk the dog',
      description: '',
      completed: true,
      createdAt: dayjs('2024-04-12').toDate()
    },
    {
      id: 3,
      title: 'Do laundry',
      description: '',
      completed: false,
      createdAt: dayjs('2024-04-12').toDate()
    }
  ];
</script>

<div class="p-4">
  <h1 class="mb-4 text-2xl font-bold">Todo List</h1>

  {#each todos as todo, idx (todo.id)}
    <div
      class="flex items-center justify-between border-b border-gray-300 py-2 {todo.completed
        ? 'line-through'
        : ''}"
    >
      <span>{todo.title}</span>
      <Checkbox bind:checked={todo.completed} />
    </div>
  {/each}
</div>
