import { z } from "zod";

const uuidSchema = z.string().uuid()

const userSchema = z.object({
  login: z.string(),
  password: z.string()
})

const studioSchema = z.object({
  name: z.string(),
  website: z.string(),
})

const chapterSchema = z.object({
  name: z.string(),
  studioId: z.string().uuid().nullable(),
  animeId: z.string().uuid().nullable(),
  duration: z.number()
})

const animeSchema = z.object({
  name: z.string(),
  year: z.number(),
  studioId: z.string().uuid().nullable()
})

export {
  uuidSchema,
  userSchema,
  studioSchema,
  chapterSchema,
  animeSchema,
}