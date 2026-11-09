import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { driveId } from './lib/drive';

// One photo or video shown in the project's media gallery. Give exactly one of:
//   drive: a Google Drive share link or bare file ID (file shared "Anyone with the link")
//   src:   a file in public/, e.g. /media/warman/run.mp4 (put it at public/media/warman/run.mp4)
const media = z
  .object({
    type: z.enum(['image', 'video']),
    drive: z
      .string()
      .transform((v, ctx) => {
        try {
          return driveId(v);
        } catch (e) {
          ctx.addIssue({ code: 'custom', message: (e as Error).message });
          return z.NEVER;
        }
      })
      .optional(),
    src: z
      .string()
      .regex(/^\//, 'src must be a path inside public/ starting with "/", e.g. /media/warman/run.mp4')
      .optional(),
    caption: z.string().optional(),
  })
  .refine((m) => Boolean(m.drive) !== Boolean(m.src), {
    message: 'Each media item needs exactly one of `drive` or `src`.',
  });

// Collection is still called `archives` internally (the template's name);
// files live in src/content/projects and are served at /projects.
const archives = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/projects'
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),          // used for sorting (newest first)
    period: z.string().optional(),  // shown instead of the date, e.g. "May 2025 – Nov 2025"
    repo: z.url().optional(),
    tags: z.array(z.string()).default([]),
    media: z.array(media).default([]),
    draft: z.boolean().optional().default(false),
    ogImage: z.string().optional()
  })
});

export const collections = { archives };
