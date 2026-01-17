import { file } from 'elysia'
import { existsSync, mkdirSync } from 'fs'
import sharp from 'sharp'
import { renderBoard } from '../standalone/renderer.ts'

export function getCache(path: string) {
  if (existsSync(path)) {
    return file(path)
  }
}

export async function renderShape(code?: string) {
  const stage = await renderBoard(code)
  stage.draw()
  const data = stage.toDataURL()
  const buffer = Buffer.from(data.split(',')[1] as string, 'base64')
  return buffer
}

export async function renderWebp(buffer: Buffer, path: string) {
  const webp = sharp(buffer).webp({ quality: 80 })

  if (!existsSync('./cache')) {
    mkdirSync('./cache')
  }
  await webp.toFile(path)
  const bufferWebp = await webp.toBuffer()
  return bufferWebp
}
