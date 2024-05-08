import type { Anime, Chapter, Studio, User } from "./types";

export const usersMock: User[] = [
  { id: '0e73252e-9d02-4a9c-9820-be4dd390c329', login: 'test', password: '1234'},
  { id: 'f7f95e65-739e-48e5-af5c-57c0a2ed9793', login: 'test2', password: '1234'}
]

export const studioMock: Studio[] = [
  { id: '8373074b-c9d3-4008-bf0e-d8d9837962dd', name: 'studio1', website: 'http://localhost:4000' },
  { id: '1c44b4d7-6099-46b0-992c-307e6f1436ee', name: 'studio2', website: 'http://localhost:4000' }
]

export const chapterMock: Chapter[] = [
  { id: 'bdc2f734-88c4-49d3-8f44-b31a8f6e3808', name: 'A ep. 1', studioId:'8373074b-c9d3-4008-bf0e-d8d9837962dd', animeId: '', duration: 2200 },
  { id: 'b1dad444-aac2-4ee4-84a0-be66d792259e', name: 'A ep. 2', studioId:'8373074b-c9d3-4008-bf0e-d8d9837962dd', animeId: '', duration: 2200 },
  { id: 'bdd4a524-e19c-4f28-836c-d3ddc64bd7cb', name: 'B ep. 1', studioId:'1c44b4d7-6099-46b0-992c-307e6f1436ee', animeId: '', duration: 2400 },
  { id: '22841b2f-79d7-45c7-b2a4-7cc1426c620c', name: 'B ep. 2', studioId:'1c44b4d7-6099-46b0-992c-307e6f1436ee', animeId: '', duration: 2400 },
]

export const animeMock: Anime[] = [
  { id: '8ad318e1-833a-4bec-b10b-fe7faa568d0b', name: 'A', year: 2023, studioId: '8373074b-c9d3-4008-bf0e-d8d9837962dd'},
  { id: '8f66996d-274c-4e5c-ba4c-597258754922', name: 'B', year: 2024, studioId: '1c44b4d7-6099-46b0-992c-307e6f1436ee'},
]