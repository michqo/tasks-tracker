<script lang="ts">
  import { goto } from '$app/navigation';
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { api } from '$lib/utils/api';
  import type { TaskList } from '$lib/utils/types';
  import { createMutation } from '@tanstack/svelte-query';
  import { GripVertical } from 'lucide-svelte';
  import { dragHandle, dragHandleZone, type DndEvent } from 'svelte-dnd-action';
  import { flip } from 'svelte/animate';
  import FormModal from '../FormModal.svelte';
  import TaskListMenu from '../TaskListMenu.svelte';
  import { buttonVariants } from '../ui/button';

  const flipDurationMs = 300;

  export let data: TaskList[];

  let editId = -1;
  let editName = '';
  let editOpen = false;

  const deleteMutation = createMutation({
    mutationFn: (id: number) => {
      data = data.filter((task) => task.id !== id);
      return api().deleteTaskList(id);
    }
  });

  const editMutation = createMutation({
    mutationFn: (name: string) => {
      data = data.map((task) => {
        if (task.id == editId) {
          return { ...task, name };
        }
        return task;
      });
      return api().updateTaskList(editId, { name });
    }
  });

  async function updatePositions() {
    const positions = data.reduce((acc: Record<string, number>, task, idx) => {
      acc[task.id] = idx;
      return acc;
    }, {});
    await api().putPositions(positions, 'tasklists');
  }

  function onEdit(id: number) {
    editId = id;
    editOpen = true;
  }

  function handleSort(e: CustomEvent<DndEvent<TaskList>>) {
    data = e.detail.items;
    updatePositions();
  }
  function handleDrag(e: CustomEvent<DndEvent<TaskList>>) {
    data = e.detail.items;
  }
</script>

<FormModal
  id="editTaskList"
  text="Edit"
  type="tasklist"
  bind:open={editOpen}
  on:submit={(event) => $editMutation.mutate(event.detail)}
/>

<section
  use:dragHandleZone={{ items: data, flipDurationMs, dropTargetStyle: {} }}
  on:consider={handleDrag}
  on:finalize={handleSort}
>
  {#each data as task (task.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <TaskListMenu
        name={task.name}
        on:open={() => goto(`/tasks/${task.id}`)}
        on:delete={() => $deleteMutation.mutate(task.id)}
        on:edit={() => onEdit(task.id)}
      >
        <div
          class="group flex items-center justify-between border-b border-gray-300 py-2 {task.completed
            ? 'line-through'
            : ''}"
        >
          <div class="flex items-center gap-x-3">
            <Checkbox bind:checked={task.completed} />
            <a href="/tasks/{task.id}">{task.name}</a>
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
      </TaskListMenu>
    </div>
  {/each}
</section>