<script lang="ts">
  import { taskList } from '$lib/utils/stores';
  import dayjs from 'dayjs';
  import FormModal from './FormModal.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import Button from './ui/button/button.svelte';
  import List from './views/List.svelte';

  let formOpen = false;

  function onAdd(event: CustomEvent<string>) {
    $taskList = [
      ...$taskList,
      {
        id: $taskList.length + 1,
        name: event.detail,
        completed: false,
        createdAt: dayjs().toDate()
      }
    ];
  }
</script>

<FormModal bind:open={formOpen} id="create" text="Create" on:submit={onAdd} />

<div class="p-4">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold">Tasks</h1>
    <div class="flex gap-x-2">
      <ThemeToggle />
      <Button on:click={() => (formOpen = true)}>Create New</Button>
    </div>
  </div>

  <List />
</div>
