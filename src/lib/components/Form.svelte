<script lang="ts">
  import { Button } from '$lib/components/ui/button';
  import { Label } from '$lib/components/ui/label';
  import { Input } from '$lib/components/ui/input';
</script>

<div class="mt-5 flex w-full justify-center">
  <form class="flex w-full max-w-md flex-col items-center gap-y-3">
    <h1 class="text-3xl">Todo form</h1>
    <Label for="title" class="text-xl">Title</Label>
    <Input id="title" />
    <Button>Add</Button>
  </form>
</div>
