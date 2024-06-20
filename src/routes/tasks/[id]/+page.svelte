<script lang="ts">
  import { invalidateAll } from '$app/navigation';
  import { page } from '$app/stores';
  import FormModal from '$lib/components/FormModal.svelte';
  import Main from '$lib/components/Main.svelte';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import Tasks from '$lib/components/views/Tasks.svelte';
  import { api, transformItems } from '$lib/utils/api';
  import { token } from '$lib/utils/stores';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

  const client = useQueryClient();
  let formOpen = false;

  const dataQuery = createQuery({
    queryKey: ['tasks', $page.params.id],
    queryFn: () => api().getTasks($page.params.id),
    select: transformItems
  });

  const userQuery = createQuery({
    queryKey: ['usersMe'],
    queryFn: () => api().getUsersMe()
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

<svelte:head>
  <title>Tasks</title>
</svelte:head>

<FormModal
  bind:open={formOpen}
  id="create"
  text="Create"
  type="task"
  on:submit={(event) => $postMutation.mutate(event.detail)}
/>

<Main
  on:logout={logOut}
  bind:formOpen
  type="tasks"
  query={dataQuery}
  username={$userQuery.data ? $userQuery.data : ''}
  title="Tasks"
/>
