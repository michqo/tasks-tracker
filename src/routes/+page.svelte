<script lang="ts">
  import { goto } from '$app/navigation';
  import FormModal from '$lib/components/FormModal.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import TaskLists from '$lib/components/views/TaskLists.svelte';
  import { api, transformItems } from '$lib/utils/api';
  import { token } from '$lib/utils/stores';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

  const client = useQueryClient();
  let formOpen = false;

  const query = createQuery({
    queryKey: ['taskLists'],
    queryFn: () => api().getTaskLists(),
    select: transformItems
  });

  const postMutation = createMutation({
    mutationFn: (task: string) => {
      return api().postTaskList({ name: task });
    },
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ['taskLists'] });
    }
  });

  function logOut() {
    $token = '';
    goto('/auth');
  }
</script>

<svelte:head>
  <title>Tasklists</title>
</svelte:head>

<FormModal
  bind:open={formOpen}
  id="create"
  text="Create"
  type="tasklist"
  on:submit={(event) => $postMutation.mutate(event.detail)}
/>

<div class="p-4">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold">Tasklists</h1>
    <div class="flex gap-x-2">
      <ThemeToggle />
      <Button variant="secondary" on:click={logOut}>Log out</Button>
      <Button on:click={() => (formOpen = true)}>Create New</Button>
    </div>
  </div>
  <TaskLists data={$query.data ? $query.data : []} />
</div>
