<script lang="ts">
  import { Toaster } from '$lib/components/ui/sonner';
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';
  import type { LayoutData } from './$types';
  import { onMount } from 'svelte';

  export let data: LayoutData;

  onMount(() => {
    console.log(JSON.stringify(data, null, 2));
  });
</script>

<ModeWatcher />

<Toaster />

<QueryClientProvider client={data.queryClient}>
  <slot />
</QueryClientProvider>
