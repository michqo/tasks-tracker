<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { api } from '$lib/utils/api';
  import type { Task } from '$lib/utils/types';
  import { createMutation } from '@tanstack/svelte-query';
  import { GripVertical } from 'lucide-svelte';
  import { dragHandle, dragHandleZone, type DndEvent } from 'svelte-dnd-action';
  import { toast } from 'svelte-sonner';
  import { flip } from 'svelte/animate';
  import FormModal from '../FormModal.svelte';
  import TaskMenu from '../TaskMenu.svelte';
  import { buttonVariants } from '../ui/button';

  const flipDurationMs = 300;

  export let data: Task[];

  let taskEditId = -1;
  let taskEditName = '';
  let taskEditOpen = false;

  const deleteMutation = createMutation({
    mutationFn: (id: number) => {
      data = data.filter((task) => task.id !== id);
      return api().deleteTask(id);
    },
    onSuccess: () => {
      toast.success('Task successfully deleted.');
    }
  });

  const editMutation = createMutation({
    mutationFn: (name: string) => {
      data = data.map((task) => {
        if (task.id == taskEditId) {
          return { ...task, task: name };
        }
        return task;
      });
      return api().updateTask(taskEditId, { task: name });
    }
  });

  const checkboxMutation = createMutation({
    mutationFn: (idx: number) => {
      const item = data[idx];
      return api().updateTask(item.id, { task: item.task, completed: item.completed });
    }
  });

  async function updatePositions() {
    const positions = data.reduce((acc: Record<string, number>, task, idx) => {
      acc[task.id] = idx;
      return acc;
    }, {});
    await api().putPositions(positions, 'tasks');
  }

  function onEdit(id: number) {
    taskEditId = id;
    taskEditOpen = true;
  }

  function handleSort(e: CustomEvent<DndEvent<Task>>) {
    data = e.detail.items;
    updatePositions();
  }
  function handleDrag(e: CustomEvent<DndEvent<Task>>) {
    data = e.detail.items;
  }
</script>

<FormModal
  id="edit"
  text="Edit"
  type="task"
  bind:open={taskEditOpen}
  on:submit={(event) => $editMutation.mutate(event.detail)}
/>

<section
  use:dragHandleZone={{ items: data, flipDurationMs, dropTargetStyle: {} }}
  on:consider={handleDrag}
  on:finalize={handleSort}
>
  {#each data as task, idx (task.id)}
    <div animate:flip={{ duration: flipDurationMs }}>
      <TaskMenu
        bind:checked={task.completed}
        on:delete={() => $deleteMutation.mutate(task.id)}
        on:edit={() => onEdit(task.id)}
      >
        <div
          class="group flex items-center justify-between border-b border-gray-300 py-2 {task.completed
            ? 'line-through'
            : ''}"
        >
          <div class="flex items-center gap-x-3">
            <Checkbox
              bind:checked={task.completed}
              on:click={() => $checkboxMutation.mutate(idx)}
            />
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
      </TaskMenu>
    </div>
  {/each}
</section>
