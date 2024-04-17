<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function onSubmit(form: any) {
    dispatch('submit', form);
  }
</script>

<div class="mt-5 flex w-full justify-center">
  <form
    class="flex w-full max-w-md flex-col items-center gap-y-3"
    method="POST"
    on:submit|preventDefault={onSubmit}
  >
    <h1 class="text-3xl">Todo form</h1>
    <Label for="title" class="text-xl">Title</Label>
    <Input id="title" />
    <Button type="submit">Add</Button>
  </form>
</div>
