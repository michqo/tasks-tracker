import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1).max(50)
});

type FormSchema = typeof formSchema;

export { formSchema, type FormSchema };
