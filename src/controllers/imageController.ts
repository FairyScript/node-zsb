import Elysia from 'elysia'
import { renderImage } from '../utils/imageHelper.ts'

export const boardController = new Elysia().get(
  '/board/:code?',
  async ({ params, set }) => {
    const webp = await renderImage(params.code)

    set.headers = {
      'content-type': 'image/webp',
    }
    return webp
  },
)
