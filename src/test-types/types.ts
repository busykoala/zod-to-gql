import {z} from "zod";

export const author = z.object({
  name: z.string(),
  bio: z.string().optional(),
});

export const book = z.object({
  name: z.string(),
  author: author,
  isbn: z.number(),
});

export const library = z.object({
  id: z.number(),
  name: z.string(),
  books: z.array(book),
});
