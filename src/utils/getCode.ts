import { decode } from 'xiv-strat-board'

const defaultCode =
  '[stgy:a2mW7zYpGVGucnON7LpkuDJH66enQBnNYQkCKKUR6lrKMrVuduwvMbQ5lYPO7cdfHNJexQfOqhOOYwu6DnluGxbRieZQbd41xysoX6g-8ue0Z14MAXSqNr+xsHeqFlaZ6P3ng1n6dc1xLH]'

const codeRegex = /^\[stgy:/
export function getCode(code = defaultCode) {
  if (!codeRegex.test(code)) {
    console.error('Invalid board code format, using default.')
    console.error(`Provided code: ${code}`)
    code = defaultCode
  }
  try {
    return decode(code)
  } catch (error) {
    console.error(error)
    console.error('Failed to decode board code, using default.')
    console.error(`Provided code: ${code}`)
    return decode(defaultCode)
  }
}
