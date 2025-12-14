import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    snippetone: z.string(),
    category: z.string(),
    SEOTitle: z.string(),
    lang: z.string(),
    date: z.date(),
    imageUrl: z.string().optional(),
    tags: z.array(z.string()).optional(),
  })
})

export const collections = {
  posts,
}