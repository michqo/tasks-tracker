<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { api } from '$lib/utils/api';
  import type { Task } from '$lib/utils/types';
  import { useQueryClient } from '@tanstack/svelte-query';
  import { GripVertical } from 'lucide-svelte';
  import { dragHandle, dragHandleZone, type DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import FormModal from '../FormModal.svelte';
  import TaskContextMenu from '../TaskContextMenu.svelte';
  import { buttonVariants } from '../ui/button';

  const flipDurationMs = 300;

  export let data: Task[];

  const client = useQueryClient();

  let taskEditId = -1;
  let taskEditName = '';
  let taskEditOpen = false;

  async function onDelete(id: number) {
    await api().deleteTask(id);
    client.invalidateQueries({ queryKey: ['tasks'] });
  }
  function onEdit(id: number) {
    taskEditId = id;
    taskEditOpen = true;
  }

  async function onEditSubmit(event: CustomEvent<string>) {
    await api().updateTask(taskEditId, { task: event.detail });
    client.invalidateQueries({ queryKey: ['tasks'] });
  }

  function handleSort(e: CustomEvent<DndEvent<Task>>) {
    // $taskList = e.detail.items;
  }
</script>

<FormModal bind:open={taskEditOpen} id="edit" text="Edit" on:submit={onEditSubmit} />

<section
  use:dragHandleZone={{ items: data, flipDurationMs, dropTargetStyle: {} }}
  on:consider={handleSort}
  on:finalize={handleSort}
>
  {#each data as task (task.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <TaskContextMenu
        bind:checked={task.completed}
        on:delete={() => onDelete(task.id)}
        on:edit={() => onEdit(task.id)}
      >
        <div
          class="group flex items-center justify-between border-b border-gray-300 py-2 {task.completed
            ? 'line-through'
            : ''}"
        >
          <div class="flex items-center gap-x-3">
            <Checkbox bind:checked={task.completed} />
            <span>{task.task}</span>
          </div>
          <div class="flex items-center gap-x-2">
            <div
              use:dragHandle
              aria-label="drag-handle for {task.id}"
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
