import { createHash } from 'crypto'
import Elysia from 'elysia'
import { getCache, renderShape, renderWebp } from '../utils/imageHelper.ts'

export const boardController = new Elysia().get(
  '/board/:code?',
  async ({ params, set }) => {
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
      'Cache-Control': 'public, max-age=31536000',
    }
    return webp
  },
)
