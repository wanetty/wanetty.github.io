import { defineCollection, z } from 'astro:content';
import { date } from 'astro:schema';

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
  })
})

export const collections = {
  posts,
}