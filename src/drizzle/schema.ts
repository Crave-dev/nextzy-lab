import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable('users', {
  id: uuid('id').primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  salt: text('salt').notNull().unique()
})

export const studioTable = pgTable('studios', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  website: text('website'),
})

export const chapterTable = pgTable('chapters', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  animeId: text('anime_id')
})

export const animeTable = pgTable('animes', {
  id: uuid('id').primaryKey(),
  name: text('name').notNull(),
  year: integer('year').notNull(),
  studioId: text('studio_id')
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