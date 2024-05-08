import { Context } from "hono";
import { userSchema, uuidSchema } from "../../utils/validate";
import { usersMock } from "../../mock";
import type { User } from "../../types";
import { v4 } from "uuid";

let users = usersMock

async function getAllUser(c: Context) {
  try {
    c.status(200)
    const allUsers = users.map((user) => ({ id: user.id, login: user.login }))
    return c.json(allUsers)
  } catch(err) {
    return c.status(500)
  }
}

async function getUserById(c: Context) {
  try {
    const id = c.req.param('id')
    console.log('id', id)
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = users.find((user) => user.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    c.status(200)
    return c.json(target)
  } catch(err) {
    return c.status(500)
  }
}

async function createUser(c: Context) {
  try {
    const body = await c.req.json()
    const bodyValidated = userSchema.safeParse(body)
    const target = users.find((user) => user.login === bodyValidated.data?.login)
    if (bodyValidated.success === false) {
      return c.text(bodyValidated.error.message, 404)
    }
    if (target) {
      return c.text('User alreadt exist!.', 400)
    }
    const newUser: User = {
      id: v4(),
      login: bodyValidated?.data?.login,
      password: bodyValidated?.data?.password
    }
    users.push(newUser)
    c.status(201)
    return c.json(newUser)
  } catch(err) {
    return c.status(500)
  }
}

async function deleteUser(c: Context) {
  try {
    const id = c.req.param('id')
    const isUUID = uuidSchema.safeParse(id)
    if (isUUID.success === false) {
      return c.text(isUUID.error.message, 400)
    }
    const target = usersMock.find((user) => user.id === isUUID.data)
    if (!target) {
      return c.text('Not Found!.', 404)
    }
    users = users.filter((user) => user.id === isUUID.data)
    return c.newResponse(null, 204)
  } catch(err) {
    return c.status(500)
  }
}

export {
  getAllUser,
  getUserById,
  createUser,
  deleteUser
}