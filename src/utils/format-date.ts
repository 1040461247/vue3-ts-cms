import dayjs from 'dayjs'

export function formatUTC(utcStr: string, formatStr: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(utcStr).format(formatStr)
}
