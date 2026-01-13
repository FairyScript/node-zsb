import { useLayoutEffect } from "react"
import { debounce } from "./debounce"
import { updateScale } from "./resize"

export function useResize(cb: (scale: number) => void) {
    useLayoutEffect(() => {
      const updateScale = debounce(() => {
        const newScale = updateScale()
        cb(newScale)
      }, 100)
      updateScale()
      window.addEventListener('resize', updateScale)
    }, [])
}