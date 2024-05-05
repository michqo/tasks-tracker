<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js';
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import { Input } from '$lib/components/ui/input/index.js';
  import { Label } from '$lib/components/ui/label/index.js';
  import { formOpen } from '$lib/utils/stores';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function onSubmit(event: Event) {
    dispatch('submit', event);
    $formOpen = false;
  }
</script>

<Dialog.Root bind:open={$formOpen}>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Create Todo</Dialog.Title>
      <Dialog.Description>Write your ideas here</Dialog.Description>
    </Dialog.Header>
    <form on:submit|preventDefault={onSubmit}>
      <div class="grid gap-4 py-4">
        <div class="grid grid-cols-4 items-center gap-4">
          <Label for="title" class="text-right">Title</Label>
          <Input id="title" name="title" class="col-span-3" />
        </div>
      </div>
      <Dialog.Footer>
        <Button type="submit">Add</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>
