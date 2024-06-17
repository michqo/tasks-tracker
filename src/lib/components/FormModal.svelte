<script lang="ts">
  import * as Dialog from '$lib/components/ui/dialog/index.js';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input/index.js';
  import { formSchema } from '$lib/utils/schemas';
  import { createEventDispatcher } from 'svelte';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod, zodClient } from 'sveltekit-superforms/adapters';

  const dispatch = createEventDispatcher();

  export let open: boolean;
  export let id: string;
  export let text: string;
  export let type: 'task' | 'tasklist';

  const form = superForm(defaults(zod(formSchema)), {
    id: id,
    SPA: true,
    validators: zodClient(formSchema),
    onUpdate: ({ form: f }) => {
      if (f.valid) {
        dispatch('submit', f.data.name);
        open = false;
      } else {
        console.error('Please fix the errors in the form.');
      }
    }
  });

  const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>{text} {type}</Dialog.Title>
    </Dialog.Header>
    <form method="POST" use:enhance>
      <Form.Field {form} name="name">
        <Form.Control let:attrs>
          <Form.Label>Name</Form.Label>
          <Input {...attrs} bind:value={$formData.name} />
        </Form.Control>
        <Form.Description>This is your {type} name.</Form.Description>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Button>{text}</Form.Button>
    </form>
  </Dialog.Content>
</Dialog.Root>
