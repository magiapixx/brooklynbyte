import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    description: z.string().optional(),
    client: z.string(),
    category: z.enum(['branding', 'web', 'product', 'campaign']),
    categoryLabel: z.string(),
    year: z.number(),
    order: z.number(),
    role: z.string(),
    result: z.string(),
    cover: image(),
    coverAlt: z.string(),
    challenge: z.string(),
    approach: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).length(3),
    gallery: z.array(image()),
    quote: z.string(),
    quoteBy: z.string(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    tag: z.enum(['Engineering', 'Branding', 'Design', 'Product']),
    date: z.coerce.date(),
    readingTime: z.string(),
    author: z.string(),
    cover: image(),
    coverAlt: z.string(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
