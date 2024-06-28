<script lang="ts">
  import * as Card from '$lib/components/ui/card';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import { loginSchema, type LoginSchema } from '$lib/utils/schemas';
  import { createEventDispatcher } from 'svelte';
  import { superForm, type SuperValidated } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';

  export let id: 'login' | 'register';
  export let data: SuperValidated<LoginSchema>;

  const actionWord = id == 'login' ? 'Log in' : 'Register';

  const dispatch = createEventDispatcher();

  const form = superForm(data, {
    id: id,
    validators: zodClient(loginSchema),
    onUpdated: ({ form: f }) => {
      if (f.valid) {
        dispatch('success');
      } else {
        dispatch('failed');
      }
    },
    onError: () => dispatch('failed')
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
