import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { userRoute } from './feature/user/route'
import { studioRoute } from './feature/studio/route'
import { chapterRoute } from './feature/chapter/route'
import { animeRoute } from './feature/anime/route'
import { logger } from 'hono/logger'

const app = new Hono()

app.use(logger())

app.get('/', async (c) => {
  c.status(200)
  return c.json('Hello Hono!')
})

app.route('/user', userRoute)
app.route('/chapter', chapterRoute)
app.route('/studio', studioRoute)
app.route('/anime', animeRoute)

const port = Number(process.env.PORT)
console.log(`Server is running on port ${port}`)

// client.connect()
//   .then(() => serve({
//     fetch: app.fetch,
//     port
//   }))
//   .catch((err) => console.log(err))

serve({
  fetch: app.fetch,
  port
})

