/**
 * 将数字类型的时间转换为字符串格式
 * @param {number} time 20210305
 * @returns '2021-03-05'
 */
export function longTimeToStr(time) {
  const y = Math.floor(time / 10000)
  time -= y * 10000
  const m = Math.floor(time / 100)
  time -= m * 100
  const d = time

  const ys = y + ''
  const ms = m < 10 ? ('0' + m) : (m + '')
  const ds = d < 10 ? ('0' + d) : (d + '')

  return ys + '-' + ms + '-' + ds
}

export function longTimeStrFormat(timeStr) {
  return timeStr.substr(0, 4) + '-' + timeStr.substr(4, 2) + '-' + timeStr.substr(6, 2)
}
