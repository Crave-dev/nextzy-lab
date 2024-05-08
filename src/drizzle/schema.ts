import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const userTable = pgTable('users', {
  id: serial('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  salt: text('salt').notNull().unique()
})

export const studioTable = pgTable('studios', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  website: text('website'),
})

export const chapterTable = pgTable('chapters', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  animeId: integer('anime_id')
})

export const animeTable = pgTable('animes', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  year: integer('year').notNull(),
  studioId: integer('studio_id')
})

export const chapterRelation = relations(chapterTable, ({ one }) => ({
  animeId: one(animeTable, {
    fields: [chapterTable.animeId],
    references: [animeTable.id]
  })
}))

export const animeRelation = relations(animeTable, ({ one }) => ({
    studioId: one(studioTable, {
    fields: [animeTable.studioId],
    references: [studioTable.id]
  }),
}))