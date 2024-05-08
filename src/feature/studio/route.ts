import { Hono } from "hono";
import { getAllStudio, getStudioById, createStudio, updateStudio, deleteStudio } from "./controller";

export const studioRoute = new Hono()

studioRoute.get('/', getAllStudio)
studioRoute.get('/:id', getStudioById)
studioRoute.post('/', createStudio)
studioRoute.put('/:id', updateStudio)
studioRoute.delete('/:id', deleteStudio)