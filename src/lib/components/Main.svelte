<script lang="ts">
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import Button from '$lib/components/ui/button/button.svelte';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  export let username: string;
  export let formOpen: boolean;
  export let title: string;
</script>

<div class="p-4">
  <div class="mb-8 flex items-center justify-between">
    <h1 class="text-2xl font-bold">{title}</h1>
    <div class="flex items-center gap-x-2">
      <p>{username}</p>
      <Button variant="secondary" on:click={() => dispatch('logout')}>Log out</Button>
      <Button on:click={() => (formOpen = true)}>Create New</Button>
      <ThemeToggle />
    </div>
  </div>
  <slot />
</div>
