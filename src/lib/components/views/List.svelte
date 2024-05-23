<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { dropdownOpen, todos } from '$lib/utils/stores';
  import { GripVertical } from 'lucide-svelte';
  import TodoContextMenu from '../TodoContextMenu.svelte';
  import Button from '../ui/button/button.svelte';

  function onDelete(idx: number) {
    $todos.splice(idx, 1);
    $todos = $todos;
  }
</script>

{#each $todos as todo, idx (todo.id)}
  <TodoContextMenu bind:checked={todo.completed} on:delete={() => onDelete(idx)}>
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
        <Button on:click={() => ($dropdownOpen = true)} variant="outline" size="icon">
          <GripVertical size={20} />
        </Button>
      </div>
    </div>
  </TodoContextMenu>
{/each}
