import Elysia, { t } from 'elysia'
import { renderImage, renderImageOffline } from '../utils/imageHelper.ts'

export const boardController = new Elysia()
  .get(
    '/board/:code?',
    async ({ params, set }) => {
      const webp = await renderImage(params.code)

      set.headers = {
        'content-type': 'image/webp',
      }
      return webp
    },
    {
      detail: {
        description: '根据战术板代码渲染战术板图片,返回webp格式图片',
      },
    }
  )
  .post(
    '/board/render',
    async ({ body }) => {
      const info = await renderImageOffline(body.code)
      return {
        ok: true,
        data: info,
      }
    },
    {
      body: t.Object({
        code: t.String({ description: '战术板代码' }),
      }),
      detail: {
        description:
          '解析战术板,并返回图片hash和缩略图.注意本接口没有并发缓解机制,请勿频繁调用',
      },
    }
  )
