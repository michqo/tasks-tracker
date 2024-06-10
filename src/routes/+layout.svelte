<script lang="ts">
  import { QueryClientProvider } from '@tanstack/svelte-query';
  import { ModeWatcher } from 'mode-watcher';
  import '../app.pcss';
  import type { LayoutData } from './$types';

  export let data: LayoutData;
</script>

<ModeWatcher />
<QueryClientProvider client={data.queryClient}>
  <slot />
</QueryClientProvider>
