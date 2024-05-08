import { Context } from "hono";
import { chapterSchema, uuidSchema } from "../../utils/validate";
import { chapterMock } from "../../mock";
import { Chapter } from "../../types";
import { v4 } from "uuid";

let chapters = chapterMock

async function getAllChapter(c: Context) {
  try {
    return c.json(chapters, 200)
  } catch(err) {
    return c.text('', 500)
  }
}

async function getChapterById(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = chapters.find((chapter) => chapter.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    return c.json(target, 200)
  } catch(err) {
    return c.text('', 500)
  }
}

async function createChapter(c: Context) {
  try {
    const body = await c.req.json()
    const bodyValidated = chapterSchema.safeParse(body)
    if (bodyValidated.success === false) {
      return c.text(bodyValidated.error.message, 400)
    }
    const newEntity: Chapter = {
      id: v4(),
      studioId: bodyValidated.data.studioId,
      animeId: bodyValidated.data.animeId,
      duration: bodyValidated.data.duration,
      name: bodyValidated.data.name,
    }
    chapters.push(newEntity)
    return c.json(newEntity, 201)
  } catch(err) {
    return c.text('', 500)
  }
}

async function updateChapter(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = chapters.find((chapter) => chapter.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    const body = await c.req.json()
    const bodyValidated = chapterSchema.safeParse(body)
    if (bodyValidated.success === false) {
      return c.text(bodyValidated.error.message, 404)
    }
    if (bodyValidated.data.name) {
      target.name = bodyValidated.data.name
    } 
    if (bodyValidated.data.duration) {
      target.duration = bodyValidated.data.duration
    } 
    if (bodyValidated.data.animeId) {
      target.animeId = bodyValidated.data.animeId
    } 
    if (bodyValidated.data.studioId) {
      target.studioId = bodyValidated.data.studioId
    }
    return c.json(target, 200)
  } catch(err) {
    return c.text('', 500)
  }
}

async function deleteChapter(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = chapterMock.find((chapter) => chapter.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    chapters = chapters.filter((chapter) => chapter.id !== isUUID.data)
    return c.newResponse(null, 204)
  } catch(err) {
    return c.text('', 500)
  }
}

export {
  getAllChapter,
  getChapterById,
  createChapter,
  updateChapter,
  deleteChapter
}
