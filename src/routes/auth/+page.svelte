<script lang="ts">
  import { page } from '$app/stores';
  import FormCard from '$lib/components/FormCard.svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import { toast } from 'svelte-sonner';
  import type { PageData } from './$types';

  export let data: PageData;

  const forParam = $page.url.searchParams.get('for');
</script>

<svelte:head>
  <title>Tasks Authentication</title>
</svelte:head>

<main class="grid h-screen items-center justify-center">
  <Tabs.Root value={forParam ? forParam : 'register'} class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="register">Register</Tabs.Trigger>
      <Tabs.Trigger value="login">Log In</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="register">
      <FormCard
        on:success={() => toast.success('Successfully created account.')}
        on:failed={() => toast.error('Check for errors in the form.')}
        id="register"
        data={data.form}
      />
    </Tabs.Content>
    <Tabs.Content value="login">
      <FormCard
        on:success={() => toast.success('Successfully logged in.')}
        on:failed={() => toast.error('Incorrect username or password.')}
        id="login"
        data={data.form}
      />
    </Tabs.Content>
  </Tabs.Root>
</main>
