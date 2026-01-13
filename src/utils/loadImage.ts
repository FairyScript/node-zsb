import { Image } from 'skia-canvas'

const cache = new Map<string, Image>()
const handlers = new Set<string>()


export function loadImage(url: string, callback?: (img: Image) => void) {
  const imageObj = new Image()
  imageObj.src = url
  handlers.add(url)
  cache.set(url, imageObj)
  imageObj.onload = () => {
    if (callback) {
      callback(imageObj)
    }
    handlers.delete(url)
    if (handlers.size === 0) {
      // all images are loaded
      console.log('All images loaded')
    }
  }
}

export function onImageLoad(callback: () => void) {

}