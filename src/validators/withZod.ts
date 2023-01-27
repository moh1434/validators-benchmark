import { User } from '../types';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2),
  password: z.string().min(4),
  posts: z.array(
    z.object({
      title: z.string().min(2),
      content: z.string().min(6),
      userId: z.number(),
    }),
  ),
});
export const withZod = (data: User) => {
  return userSchema.parse(data);
};
