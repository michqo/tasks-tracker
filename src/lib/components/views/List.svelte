<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { todos } from '$lib/utils/stores';
  import type { Todo } from '$lib/utils/types';
  import { GripVertical } from 'lucide-svelte';
  import { dragHandle, dragHandleZone, type DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import TodoContextMenu from '../TodoContextMenu.svelte';
  import { buttonVariants } from '../ui/button';

  const flipDurationMs = 300;

  function onDelete(idx: number) {
    $todos.splice(idx, 1);
    $todos = $todos;
  }
  function handleSort(e: CustomEvent<DndEvent<Todo>>) {
    $todos = e.detail.items;
  }
</script>

<section
  use:dragHandleZone={{ items: $todos, flipDurationMs, dropTargetStyle: {} }}
  on:consider={handleSort}
  on:finalize={handleSort}
>
  {#each $todos as todo, idx (todo.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <TodoContextMenu bind:checked={todo.completed} on:delete={() => onDelete(idx)}>
        <div
          class="group flex items-center justify-between border-b border-gray-300 py-2 {todo.completed
            ? 'line-through'
            : ''}"
        >
          <div class="flex items-center gap-x-3">
            <Checkbox bind:checked={todo.completed} />
            <span>{todo.name}</span>
          </div>
          <div class="flex items-center gap-x-2">
            <div
              use:dragHandle
              aria-label="drag-handle for {todo.id}"
              class={buttonVariants({
                variant: 'outline',
                size: 'icon',
                className: 'handle md:invisible md:group-hover:visible'
              })}
            >
              <GripVertical size={20} />
            </div>
          </div>
        </div>
      </TodoContextMenu>
    </div>
  {/each}
</section>
