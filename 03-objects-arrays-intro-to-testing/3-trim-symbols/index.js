/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  const arr = string.split('')

  let newArr = []

  let flag = 0

  if (!size) newArr = [...arr]

  if (size == 0) newArr.splice(0, newArr.length)

  for (let i = 0; i < arr.length; i++) {

      if (arr[i] == arr[i+1] && flag < size && size !== 0) {
          newArr.push(arr[i])
          flag++ }
      else if (arr[i] !== arr[i+1]) {
          if (flag < size) {
          newArr.push(arr[i])
      }
      flag = 0
  }
  }

  return newArr.join('')
}
