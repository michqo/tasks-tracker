<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { todos } from '$lib/utils/stores';
  import type { Todo } from '$lib/utils/types';
  import { GripVertical } from 'lucide-svelte';
  import { dragHandle, dragHandleZone, type DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import FormModal from '../FormModal.svelte';
  import TaskContextMenu from '../TaskContextMenu.svelte';
  import { buttonVariants } from '../ui/button';

  const flipDurationMs = 300;

  let taskEditIdx = -1;
  let taskEditName = '';
  let taskEditOpen = false;

  function onDelete(idx: number) {
    $todos.splice(idx, 1);
    $todos = $todos;
  }
  function onEdit(idx: number) {
    const task = $todos[idx];
    taskEditIdx = idx;
    taskEditName = task.name;
    taskEditOpen = true;
  }

  function onEditSubmit(event: CustomEvent<string>) {
    $todos[taskEditIdx].name = event.detail;
  }

  function handleSort(e: CustomEvent<DndEvent<Todo>>) {
    $todos = e.detail.items;
  }
</script>

<FormModal id="edit" bind:open={taskEditOpen} on:submit={onEditSubmit} />

<section
  use:dragHandleZone={{ items: $todos, flipDurationMs, dropTargetStyle: {} }}
  on:consider={handleSort}
  on:finalize={handleSort}
>
  {#each $todos as todo, idx (todo.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <TaskContextMenu
        bind:checked={todo.completed}
        on:delete={() => onDelete(idx)}
        on:edit={() => onEdit(idx)}
      >
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
      </TaskContextMenu>
    </div>
  {/each}
</section>
