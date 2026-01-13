
export const SCENE_WIDTH = 1024
export const SCENE_HEIGHT = 768



export const updateScale = () => {
  // Get container width
  const containerWidth = document.documentElement.clientWidth
  const containerHeight = document.documentElement.clientHeight

  // Calculate scale
  const scaleWidth = containerWidth / SCENE_WIDTH
  const scaleHeight = containerHeight / SCENE_HEIGHT
  const newScale = Math.min(scaleWidth, scaleHeight)

  return newScale
}