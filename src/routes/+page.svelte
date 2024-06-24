<script lang="ts">
  import { goto } from '$app/navigation';
  import FormModal from '$lib/components/FormModal.svelte';
  import Main from '$lib/components/Main.svelte';
  import { api, transformItems } from '$lib/utils/api';
  import { createMutation, createQuery, useQueryClient } from '@tanstack/svelte-query';

  const client = useQueryClient();
  let formOpen = false;

  const dataQuery = createQuery({
    queryKey: ['taskLists'],
    queryFn: () => api().getTaskLists(),
    select: transformItems
  });

  const userQuery = createQuery({
    queryKey: ['usersMe'],
    queryFn: () => api().getUsersMe()
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

<Main
  on:logout={logOut}
  bind:formOpen
  type="tasklists"
  query={dataQuery}
  username={$userQuery.data ? $userQuery.data : ''}
  title="Tasklists"
/>
