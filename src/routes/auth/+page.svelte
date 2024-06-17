<script lang="ts">
  import { goto } from '$app/navigation';
  import FormCard from '$lib/components/FormCard.svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import { api } from '$lib/utils/api';
  import { type LoginSchema } from '$lib/utils/schemas';
  import { token } from '$lib/utils/stores';
  import { createMutation } from '@tanstack/svelte-query';
  import { toast } from 'svelte-sonner';

  const loginMutation = createMutation({
    mutationFn: (data: CustomEvent<LoginSchema>) => {
      return api().createJwt(data.detail);
    },
    onSuccess: (data) => {
      toast.success('Successfully logged in.');
      $token = data.access;
      goto('/');
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

<main class="grid h-screen items-center justify-center">
  <Tabs.Root value="register" class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="register">Register</Tabs.Trigger>
      <Tabs.Trigger value="login">Log In</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="register">
      <FormCard id="register" on:submit={$registerMutation.mutate} />
    </Tabs.Content>
    <Tabs.Content value="login">
      <FormCard id="login" on:submit={$loginMutation.mutate} />
    </Tabs.Content>
  </Tabs.Root>
</main>
