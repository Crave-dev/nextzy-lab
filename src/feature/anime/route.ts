import { Hono } from "hono";
import { getAllAnime, getAnimeById, createAnime, updateAnime, deleteAnime } from "./controller";

export const animeRoute = new Hono()

animeRoute.get('/', getAllAnime)
animeRoute.get('/:id', getAnimeById)
animeRoute.post('/', createAnime)
animeRoute.put('/:id', updateAnime)
animeRoute.delete('/:id', deleteAnime)
