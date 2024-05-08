import { Context } from "hono";
import { studioSchema, uuidSchema } from "../../utils/validate";
import { studioMock } from "../../mock";
import { Studio } from "../../types";
import { v4 } from "uuid";

let studios = studioMock

async function getAllStudio(c: Context) {
  try {
    return c.json(studios, 200)
  } catch(err) {
    return c.text('', 500)
  }
}

async function getStudioById(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = studios.find((studio) => studio.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    return c.json(target, 200)
  } catch(err) {
    return c.text('', 500)
  }
}

async function createStudio(c: Context) {
  try {
    const body = await c.req.json()
    const bodyValidated = studioSchema.safeParse(body)
    if (bodyValidated.success === false) {
      return c.text(bodyValidated.error.message, 400)
    }
    const newEntity: Studio = {
      id: v4(),
      name: bodyValidated.data.name,
      website: bodyValidated.data.website
    }
    studios.push(newEntity)
    return c.json(newEntity, 201)
  } catch(err) {
    return c.text('', 500)
  }
}

async function updateStudio(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = studios.find((studio) => studio.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    const body = await c.req.json()
    const bodyValidated = studioSchema.partial().safeParse(body)
    if (bodyValidated.success === false) {
      return c.text(bodyValidated.error.message, 400)
    }
    if (bodyValidated.data.name) {
      target.name = bodyValidated.data.name
    }
    if (bodyValidated.data.website) {
      target.name = bodyValidated.data.website
    }
    return c.json(target, 200)
  } catch(err) {
    return c.text('', 500)
  }
}

async function deleteStudio(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = studios.find((studio) => studio.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    studios = studios.filter((studio) => studio.id === isUUID.data)
    return c.newResponse(null, 204)
  } catch(err) {
    return c.text('', 400)
  }
}

export {
  getAllStudio,
  getStudioById,
  createStudio,
  updateStudio,
  deleteStudio,
}