export function getBoardUrl(boardName: string): string {
  if(process) return `src/assets/background/${boardName}.webp`
  return new URL(`../assets/background/${boardName}.webp`, import.meta.url).href
}

export function getIconUrl(iconName: string): string {
  if(process) return `src/assets/objects/${iconName}.webp`
  return new URL(`../assets/objects/${iconName}.webp`, import.meta.url).href
}
