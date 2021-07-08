export const filterFunction = (el, bool, array, searchInput) => {
  if (el.name.toLowerCase().includes(searchInput.toLowerCase())) {
    if (!bool) {
      return true
    } else {
      return array.includes(el.name)
    }
  }
  if (el.symbol.toLowerCase().includes(searchInput.toLowerCase())) {
    if (bool) {
      return true
    } else {
      return array.includes(el.name)
    }
  }
  return false
}
