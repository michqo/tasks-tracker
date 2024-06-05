<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { taskList } from '$lib/utils/stores';
  import type { Task } from '$lib/utils/types';
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
    $taskList.splice(idx, 1);
    $taskList = $taskList;
  }
  function onEdit(idx: number) {
    const task = $taskList[idx];
    taskEditIdx = idx;
    taskEditName = task.name;
    taskEditOpen = true;
  }

  function onEditSubmit(event: CustomEvent<string>) {
    $taskList[taskEditIdx].name = event.detail;
  }

  function handleSort(e: CustomEvent<DndEvent<Task>>) {
    $taskList = e.detail.items;
  }
</script>

<FormModal bind:open={taskEditOpen} id="edit" text="Edit" on:submit={onEditSubmit} />

<section
  use:dragHandleZone={{ items: $taskList, flipDurationMs, dropTargetStyle: {} }}
  on:consider={handleSort}
  on:finalize={handleSort}
>
  {#each $taskList as task, idx (task.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <TaskContextMenu
        bind:checked={task.completed}
        on:delete={() => onDelete(idx)}
        on:edit={() => onEdit(idx)}
      >
        <div
          class="group flex items-center justify-between border-b border-gray-300 py-2 {task.completed
            ? 'line-through'
            : ''}"
        >
          <div class="flex items-center gap-x-3">
            <Checkbox bind:checked={task.completed} />
            <span>{task.name}</span>
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
