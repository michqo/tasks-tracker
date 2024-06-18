<script lang="ts">
  import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
  import { Pencil, Trash, ExternalLink, Share2 } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';

  export let name: string;

  const dispatch = createEventDispatcher();
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <slot />
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Group>
      <ContextMenu.Label>{name} actions</ContextMenu.Label>
      <ContextMenu.Separator />
      <ContextMenu.Item on:click={() => dispatch('open')}>
        <ExternalLink class="mr-2 h-4 w-4" />
        <span>Open</span>
      </ContextMenu.Item>
      <ContextMenu.Item on:click={() => dispatch('share')}>
        <Share2 class="mr-2 h-4 w-4" />
        <span>Share</span>
      </ContextMenu.Item>
      <ContextMenu.Item on:click={() => dispatch('edit')}>
        <Pencil class="mr-2 h-4 w-4" />
        <span>Edit</span>
      </ContextMenu.Item>
      <ContextMenu.Item on:click={() => dispatch('delete')}>
        <Trash class="mr-2 h-4 w-4 text-red-500" />
        <span>Delete</span>
      </ContextMenu.Item>
    </ContextMenu.Group>
  </ContextMenu.Content>
</ContextMenu.Root>
