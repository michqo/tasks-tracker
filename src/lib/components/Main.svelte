<script lang="ts">
  import { api } from '$lib/utils/api';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';
  import FormModal from './FormModal.svelte';
  import ThemeToggle from './ThemeToggle.svelte';
  import Button from './ui/button/button.svelte';
  import List from './views/List.svelte';

  const client = useQueryClient();
  let formOpen = false;

  const query = createQuery({
    queryKey: ['tasks'],
    queryFn: () => api().getTasks()
  });

  const postMutation = createMutation({
    mutationFn: (task: string) => {
      return api().postTask({ task });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['tasks'] });
    }
  });
</script>

<FormModal
  bind:open={formOpen}
  id="create"
  text="Create"
  on:submit={(event) => $postMutation.mutate(event.detail)}
/>

<div class="p-4">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold">Tasks</h1>
    <div class="flex gap-x-2">
      <ThemeToggle />
      <Button on:click={() => (formOpen = true)}>Create New</Button>
    </div>
  </div>
  {#if $query.data}
    <List data={$query.data} />
  {/if}
</div>
