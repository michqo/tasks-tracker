<script lang="ts">
  import Button from '$lib/components/ui/button/button.svelte';
  import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
  import { GripVertical, Pencil, Trash } from 'lucide-svelte';
  import { createEventDispatcher } from 'svelte';

  export let checked: boolean;

  const dispatch = createEventDispatcher();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="outline" size="icon">
      <GripVertical size={20} />
    </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Todo Actions</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.CheckboxItem bind:checked>Done</DropdownMenu.CheckboxItem>
      <DropdownMenu.Item>
        <Pencil class="mr-2 h-4 w-4" />
        <span>Edit</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item on:click={() => dispatch('delete')}>
        <Trash class="mr-2 h-4 w-4 text-red-500" />
        <span>Delete</span>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
