export const debounce = (fn: TimerHandler, initial: number) => {
  let timer: number
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, initial)
  }
}