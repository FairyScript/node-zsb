import 'konva/skia-backend'
import { renderBoard } from './src/standalone/renderer.ts'
import Elysia, { file } from 'elysia'
import openapi, { fromTypes } from '@elysiajs/openapi'
import { node } from '@elysiajs/node'
import { existsSync, writeFileSync, mkdirSync } from 'fs'
import { createHash } from 'crypto'

const app = new Elysia({ adapter: node() })
  .use(
    openapi({
      references: fromTypes(),
    })
  )
  .get('/board/:code?', async ({ params, set }) => {
    const cacheKey = createHash('sha256')
      .update(params.code || 'default')
      .digest('hex')

    const filePath = `./cache/${cacheKey}.png`
    if (existsSync(filePath)) {
      return file(filePath)
    }

    const stage = await renderBoard(params.code)
    stage.draw()
    const data = stage.toDataURL()

    const buffer = Buffer.from(data.split(',')[1] as string, 'base64')
    if (!existsSync('./cache')) {
      mkdirSync('./cache')
    }
    writeFileSync(filePath, buffer)
    set.headers = {
      'Content-Type': 'image/png',
    }
    return buffer
  })
  .listen({
    hostname: 'localhost',
    port: 3000,
  })

console.log(`Server running at http://localhost:${app.server?.port}`)
