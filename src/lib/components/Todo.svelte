<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { todos } from '$lib/utils/stores';
  import { Pencil, Trash } from 'lucide-svelte';
  import Button from './ui/button/button.svelte';
</script>

<div class="p-4">
  <h1 class="mb-4 text-2xl font-bold">Todo List</h1>

  {#each $todos as todo (todo.id)}
    <div
      class="flex items-center justify-between border-b border-gray-300 py-2 {todo.completed
        ? 'line-through'
        : ''}"
    >
      <div class="flex items-center gap-x-3">
        <Checkbox bind:checked={todo.completed} />
        <span>{todo.title}</span>
      </div>
      <div class="flex items-center gap-x-2">
        <Button variant="outline" size="icon">
          <Pencil size={20} />
        </Button>
        <Button variant="destructive" size="icon">
          <Trash size={20} />
        </Button>
      </div>
    </div>
  {/each}
</div>
