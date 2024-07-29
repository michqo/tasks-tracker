<script lang="ts">
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';
  import FormModal from '$lib/components/FormModal.svelte';
  import Main from '$lib/components/Main.svelte';
  import Tasks from '$lib/components/views/Tasks.svelte';
  import { api, transformItems } from '$lib/shared/api';
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
  on:logout={() => goto('/logout')}
  bind:formOpen
  username={$userQuery.data ? $userQuery.data : ''}
  title="Tasks"
>
  <Tasks data={$dataQuery.data ? $dataQuery.data : []} />
</Main>
