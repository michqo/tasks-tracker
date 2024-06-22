<script lang="ts">
  import FormCard from '$lib/components/FormCard.svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import { api } from '$lib/utils/api';
  import { type LoginSchema } from '$lib/utils/schemas';
  import { token } from '$lib/utils/stores';
  import { createMutation } from '@tanstack/svelte-query';
  import { toast } from 'svelte-sonner';
  import type { PageData } from './$types';

  export let data: PageData;

  const loginMutation = createMutation({
    mutationFn: (data: CustomEvent<LoginSchema>) => {
      return api().createJwt(data.detail);
    },
    onSuccess: (data) => {
      toast.success('Successfully logged in.');
      $token = data.access;
      window.location.replace('/');
    },
    onError: () => {
      toast.error('Incorrect username or password.');
    }
  });

  const registerMutation = createMutation({
    mutationFn: (data: CustomEvent<LoginSchema>) => {
      return api().postUser(data.detail);
    },
    onSuccess: () => {
      toast.success('Successfully created account.');
    },
    onError: () => {
      toast.error('Check for errors in the form.');
    }
  });
</script>

<svelte:head>
  <title>Tasks Authentication</title>
</svelte:head>

<main class="grid h-screen items-center justify-center">
  <Tabs.Root value="register" class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="register">Register</Tabs.Trigger>
      <Tabs.Trigger value="login">Log In</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="register">
      <FormCard id="register" data={data.form} />
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
