<script lang="ts">
  import { goto } from '$app/navigation';
  import * as Card from '$lib/components/ui/card';
  import * as Form from '$lib/components/ui/form';
  import { Input } from '$lib/components/ui/input';
  import * as Tabs from '$lib/components/ui/tabs';
  import { api } from '$lib/utils/api';
  import { loginSchema } from '$lib/utils/schemas';
  import { token } from '$lib/utils/stores';
  import { defaults, superForm } from 'sveltekit-superforms';
  import { zod, zodClient } from 'sveltekit-superforms/adapters';

  const form = superForm(defaults(zod(loginSchema)), {
    SPA: true,
    validators: zodClient(loginSchema),
    onUpdate: async ({ form: f }) => {
      if (f.valid) {
        const res = await api().createJwt(f.data);
        $token = res.access;
        goto('/');
      } else {
        console.error('Please fix the errors in the form.');
      }
    }
  });

  const { form: formData, enhance } = form;
</script>

<main class="grid h-screen items-center justify-center">
  <Tabs.Root value="register" class="w-[400px]">
    <Tabs.List class="grid w-full grid-cols-2">
      <Tabs.Trigger value="register">Register</Tabs.Trigger>
      <Tabs.Trigger value="login">Log In</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="register">
      <p>todo</p>
    </Tabs.Content>
    <Tabs.Content value="login">
      <Card.Root>
        <Card.Header>
          <Card.Title>Log in to tasks tracker</Card.Title>
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
                <Input {...attrs} bind:value={$formData.password} />
              </Form.Control>
              <Form.FieldErrors />
            </Form.Field>
          </Card.Content>
          <Card.Footer>
            <Form.Button>Login</Form.Button>
          </Card.Footer>
        </form>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>
</main>
