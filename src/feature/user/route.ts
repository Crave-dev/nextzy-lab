import { Hono } from "hono";
import { getAllUser, getUserById, createUser, deleteUser } from "./controller";

export const userRoute = new Hono()

userRoute.get('/', getAllUser)
userRoute.get('/:id', getUserById)
userRoute.post('/', createUser)
userRoute.delete('/:id', deleteUser)
