<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { loginSchema } from '$lib/utils/schemas';
  import { createEventDispatcher } from 'svelte';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod, zodClient } from 'sveltekit-superforms/adapters';

  export let id: 'login' | 'register';

  const actionWord = id == 'login' ? 'Log in' : 'Register';

  const dispatch = createEventDispatcher();

  const form = superForm(defaults(zod(loginSchema)), {
    id: id,
    SPA: true,
    validators: zodClient(loginSchema),
    onUpdate: async ({ form: f }) => {
      if (f.valid) {
        dispatch('submit', f.data);
      } else {
        console.error('Please fix the errors in the form.');
      }
    }
  });

  const { form: formData, enhance } = form;
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>{actionWord} to tasks tracker</Card.Title>
    <Card.Description>Enter your credentials.</Card.Description>
  </Card.Header>
  <form method="POST" use:enhance>
    <Card.Content>
      <Form.Field {form} name="username">
        <Form.Control let:attrs>
          <Form.Label>Username</Form.Label>
          <Input {...attrs} bind:value={$formData.username} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
      <Form.Field {form} name="password">
        <Form.Control let:attrs>
          <Form.Label>Password</Form.Label>
          <Input {...attrs} type="password" bind:value={$formData.password} />
        </Form.Control>
        <Form.FieldErrors />
      </Form.Field>
    </Card.Content>
    <Card.Footer>
      <Form.Button>{actionWord}</Form.Button>
    </Card.Footer>
  </form>
</Card.Root>
