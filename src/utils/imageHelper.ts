import { file } from 'elysia'
import { existsSync, mkdirSync } from 'fs'
import sharp from 'sharp'
import { renderBoard } from '../standalone/renderer.ts'
import { createHash } from 'crypto'
import { getCode } from './getCode.ts'

const rendererCache = new Map<string, Promise<Buffer>>()

// 外部调用接口
export function renderImage(code = 'default') {
  const { hash, filePath } = getHashKey(code)
  const cache = getCache(hash)
  if (cache) {
    return cache
  }

  const renderPromise = renderStage(code, hash, filePath)
  rendererCache.set(hash, renderPromise)
  return renderPromise
}

export function getCache(hash: string) {
  // check static cache
  const path = getPath(hash)
  if (existsSync(path)) {
    return file(path)
  }

  // check processing cache
  if (rendererCache.has(hash)) {
    return rendererCache.get(hash)!
  }
  return null
}

async function renderStage(code: string, hash: string, filePath: string) {
  const boardData = getCode(code)

  // render board image
  const stage = await renderBoard(boardData)
  stage.draw()
  const data = stage.toDataURL()
  const buffer = Buffer.from(data.split(',')[1] as string, 'base64')

  // convert to webp and save to cache
  const webp = sharp(buffer).webp({ quality: 80 })

  // save to file
  // Ensure cache directory exists
  if (!existsSync('./cache')) {
    mkdirSync('./cache')
  }
  webp.toFile(filePath).then(() => {
    rendererCache.delete(hash)
  })

  return webp.toBuffer()
}

export function getHashKey(code: string) {
  const hash = createHash('sha256').update(code).digest('hex')

  const filePath = getPath(hash)
  return { hash, filePath }
}

function getPath(hash: string) {
  return `./cache/${hash}.webp`
}
