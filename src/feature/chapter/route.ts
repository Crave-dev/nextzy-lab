import { Hono } from "hono";
import { getAllChapter, getChapterById, createChapter, updateChapter, deleteChapter } from "./controller";

export const chapterRoute = new Hono()

chapterRoute.get('/', getAllChapter)
chapterRoute.get('/:id', getChapterById)
chapterRoute.post('/', createChapter)
chapterRoute.put('/:id', updateChapter)
chapterRoute.delete('/:id', deleteChapter)
