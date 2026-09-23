import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({
    base: './src/content/projects',
    pattern: '**/*.md',
  }),

  schema: z.object({
    name: z.string(),
    description: z.string(),
    period: z.string().optional(),

    tags: z.array(z.string()).default([]),

    github: z.string().url().optional(),
    site: z.string().url().optional(),

    draft: z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({
    base: './src/content/posts',
    pattern: '**/*.md',
  }),

  schema: z.object({
    title: z.string(),
    description: z.string(),

    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),

    category: z.enum([
      'technology',
      'media',
      'work',
      'personal',
    ]),

    type: z.enum([
      'retrospective',
      'study',
      'essay',
      'project-log',
      'note',
    ]),

    tags: z.array(z.string()).default([]),

    project: reference('projects').optional(),

    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts,
  projects,
};