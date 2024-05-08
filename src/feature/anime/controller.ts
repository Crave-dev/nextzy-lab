import { Context } from "hono";
import { animeSchema, uuidSchema } from "../../utils/validate";
import { animeMock } from "../../mock";

import type { Anime } from "../../types";
import { v4 } from "uuid";

let animes = animeMock

async function getAllAnime(c: Context) {
  try {
    c.status(200)
    return c.json(animes)
  } catch(err) {
    return c.text('', 400)
  }
}

async function getAnimeById(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = animes.find((anime) => anime.id === isUUID.data)
    if (!target) {
      return c.text('Not found!.', 404)
    }
    return c.json(target, 200)
  } catch(err) {
    return c.status(500)
  }
}

async function createAnime(c: Context) {
  try {
    const body = await c.req.json()
    const bodyValidated = animeSchema.safeParse(body)
    if (bodyValidated.success === false) {
      return c.text(bodyValidated.error.message, 400)
    }
    const newEntity: Anime = {
      id: v4(),
      name: bodyValidated.data.name,
      year: bodyValidated.data.year,
      studioId: bodyValidated.data.studioId,
    }
    animes.push(newEntity)
    c.status(201)
    return c.json(newEntity)
  } catch(err) {
    return c.status(500)
  }
}

async function updateAnime(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = animes.find((anime) => anime.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    const body = await c.req.json()
    const bodyValidated = animeSchema.safeParse(body)
    if (bodyValidated.success === false) {
      return c.text(bodyValidated.error.message, 400)
    }
    if (bodyValidated.data.name) {
      target.name = bodyValidated.data.name
    }
    if (bodyValidated.data.studioId) {
      target.studioId = bodyValidated.data.studioId
    }
    if (bodyValidated.data.year) {
      target.year = bodyValidated.data.year
    }
    return c.json(target, 200)
  } catch(err) {
    return c.status(500)
  }
}

async function deleteAnime(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = animes.find((anime) => anime.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    animes = animes.filter((anime) => anime.id !== isUUID.data)
    return c.newResponse(null, 204)
  } catch(err) {
    return c.status(500)
  }
}

export {
  getAllAnime,
  getAnimeById,
  createAnime,
  updateAnime,
  deleteAnime
}