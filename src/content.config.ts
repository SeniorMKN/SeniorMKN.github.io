import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    track: z.enum(['Active Directory', 'Linux']),
    order: z.number(),
    level: z.enum(['Foundation', 'Intermediate']),
    readingTime: z.string(),
    published: z.coerce.date(),
  }),
});

export const collections = { notes };
