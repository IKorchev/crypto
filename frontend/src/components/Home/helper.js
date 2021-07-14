export const filterFunction = (el, bool, array, searchInput) => {
  if (el.name.toLowerCase().includes(searchInput.toLowerCase())) {
    if (!bool) {
      return true
    } else {
      return array.includes(el.name)
    }
  }
  if (el.symbol.toLowerCase().includes(searchInput.toLowerCase())) {
    if (!bool) {
      return true
    } else {
      return array.includes(el.name)
    }
  }
  return false
}

export const fixNumber = (number) => {
  if (number > 5 && number < 10) {
    return number.toFixed(3)
  }
  if (number < 4.99 && number > 1) {
    return number.toFixed(4)
  }
  if (number < 1 && number > 0.01) {
    return number.toFixed(4)
  }
  if (number < 0.01 && number > 0.00001) {
    return number.toFixed(6)
  }
  if (number < 0.000009 && number > 0.0000001) {
    return number.toFixed(9)
  }
  return number.toFixed(2)
}
