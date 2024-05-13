<script lang="ts">
  import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
  import { Pencil, Trash } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';

  export let checked: boolean;

  const dispatch = createEventDispatcher();
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger>
    <slot />
  </ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Group>
      <ContextMenu.Label>Todo Actions</ContextMenu.Label>
      <ContextMenu.Separator />
      <ContextMenu.CheckboxItem bind:checked>Done</ContextMenu.CheckboxItem>
      <ContextMenu.Item>
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
