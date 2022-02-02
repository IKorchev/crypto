const yesterdaysDate = () => {
  const today = new Date()
  const month = today.getMonth() + 1
  const yesterday = today.getDate() - 1
  const year = today.getFullYear()
  const format_month = month > 10 ? month : `0${month}`
  return `${year}-${format_month}-${yesterday}`
}

module.exports = { yesterdaysDate }
