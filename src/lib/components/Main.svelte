<script lang="ts">
  import { formOpen, todos } from '$lib/utils/stores';
  import dayjs from 'dayjs';
  import FormModal from './FormModal.svelte';
  import Button from './ui/button/button.svelte';
  import List from './views/List.svelte';

  function onAdd(event: CustomEvent<Event>) {
    const formEl = event.detail.target as HTMLFormElement;
    const data = new FormData(formEl);
    const title = data.get('title') as string;

    $todos = [
      ...$todos,
      {
        id: $todos.length + 1,
        title: title,
        description: '',
        completed: false,
        createdAt: dayjs().toDate()
      }
    ];
  }
</script>

<FormModal on:submit={onAdd} />

<div class="p-4">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold">Tasks</h1>
    <Button on:click={() => ($formOpen = true)}>Create New</Button>
  </div>

  <List />
</div>
