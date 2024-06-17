<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import FormModal from '$lib/components/FormModal.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Tasks from '$lib/components/views/Tasks.svelte';
  import { api, sortTasks } from '$lib/utils/api';
  import { token } from '$lib/utils/stores';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

  const client = useQueryClient();
  let formOpen = false;

  const query = createQuery({
    queryKey: ['tasks', $page.params.id],
    queryFn: () => api().getTasks($page.params.id),
    select: sortTasks
  });

  const postMutation = createMutation({
    mutationFn: (task: string) => {
      return api().postTask({ task }, $page.params.id);
    },
    onSuccess: () => {
      return client.invalidateQueries({ queryKey: ['tasks', $page.params.id] });
    }
  });

  function logOut() {
    $token = '';
    invalidateAll();
  }
</script>

<FormModal
  bind:open={formOpen}
  id="create"
  text="Create"
  type="task"
  on:submit={(event) => $postMutation.mutate(event.detail)}
/>

<div class="p-4">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold">Tasks</h1>
    <div class="flex gap-x-2">
      <ThemeToggle />
      <Button variant="secondary" on:click={logOut}>Log out</Button>
      <Button on:click={() => (formOpen = true)}>Create New</Button>
    </div>
  </div>
  {#if $query.data}
    <Tasks data={$query.data} />
  {/if}
</div>
