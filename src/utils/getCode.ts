import { decode } from 'xiv-strat-board'

const defaultCode =
  '[stgy:a2mW7zYpGVGucnON7LpkuDJH66enQBnNYQkCKKUR6lrKMrVuduwvMbQ5lYPO7cdfHNJexQfOqhOOYwu6DnluGxbRieZQbd41xysoX6g-8ue0Z14MAXSqNr+xsHeqFlaZ6P3ng1n6dc1xLH]'

export function getCode(code = defaultCode) {
  try {
    const board = decode(code)
    return board
  } catch (error) {
    console.error(error)
    console.error('Failed to decode board code, using default.')
    console.error(code)
    return decode(defaultCode)
  }
}
