import 'konva/skia-backend'
import Elysia from 'elysia'
import openapi, { fromTypes } from '@elysiajs/openapi'
import { node } from '@elysiajs/node'
import { createHash } from 'crypto'
import { getCache, renderShape, renderWebp } from './src/utils/imageHelper.ts'

const serverInfo = {
  hostname: 'localhost',
  port: 3000,
}

const app = new Elysia({ adapter: node() })
  .use(
    openapi({
      references: fromTypes(),
    }),
  )
  .get('/board/:code?', async ({ params, set }) => {
    const cacheKey = createHash('sha256')
      .update(params.code || 'default')
      .digest('hex')

    const filePath = `./cache/${cacheKey}.webp`

    const cached = getCache(filePath)
    if (cached) {
      return cached
    }

    const imageBuffer = await renderShape(params.code)
    const webp = await renderWebp(imageBuffer, filePath)

    set.headers = {
      'Content-Type': 'image/webp',
    }
    return webp
  })
  .listen(serverInfo)

console.log(
  `Server running at http://${serverInfo.hostname}:${serverInfo.port}`,
)
