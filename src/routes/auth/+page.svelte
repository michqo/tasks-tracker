<script lang="ts">
  import { goto } from '$app/navigation';
  import FormCard from '$lib/components/FormCard.svelte';
  import * as Tabs from '$lib/components/ui/tabs';
  import { api } from '$lib/utils/api';
  import { type LoginSchema } from '$lib/utils/schemas';
  import { token } from '$lib/utils/stores';

  async function onLogin(data: CustomEvent<LoginSchema>) {
    const res = await api().createJwt(data.detail);
    $token = res.access;
    goto('/');
  }

  async function onRegister(data: CustomEvent<LoginSchema>) {
    await api().postUser(data.detail);
    const res = await api().createJwt(data.detail);
    $token = res.access;
    goto('/');
  }
</script>

<main class="grid h-screen items-center justify-center">
  <Tabs.Root value="register" class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="register">Register</Tabs.Trigger>
      <Tabs.Trigger value="login">Log In</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="register">
      <FormCard id="register" on:submit={onRegister} />
    </Tabs.Content>
    <Tabs.Content value="login">
      <FormCard id="login" on:submit={onLogin} />
    </Tabs.Content>
  </Tabs.Root>
</main>
