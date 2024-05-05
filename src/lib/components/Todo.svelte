<script lang="ts">
  import { Checkbox } from '$lib/components/ui/checkbox';
  import { formOpen, todos } from '$lib/utils/stores';
  import dayjs from 'dayjs';
  import FormModal from './FormModal.svelte';
  import TodoDropdown from './TodoDropdown.svelte';
  import Button from './ui/button/button.svelte';

  function onDelete(idx: number) {
    $todos.splice(idx, 1);
    $todos = $todos;
  }

  function onAdd(event: CustomEvent<Event>) {
    const formEl = event.detail.target as HTMLFormElement;
    const data = new FormData(formEl);
    const title = data.get('title') as string;
    
    $todos = [...$todos, {
      id: $todos.length + 1,
      title: title,
      description: '',
      completed: false,
      createdAt: dayjs().toDate()
    }];
  }
</script>

<FormModal on:submit={onAdd} />

<div class="p-4">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold">Todo List</h1>
    <Button on:click={() => ($formOpen = true)}>Create New</Button>
  </div>

  {#each $todos as todo, idx (todo.id)}
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
        <TodoDropdown bind:checked={todo.completed} on:delete={() => onDelete(idx)} />
      </div>
    </div>
  {/each}
</div>
