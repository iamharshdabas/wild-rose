import { format } from 'date-fns'

export const getCurrentDate = () => {
  const currentDate = new Date()
  return format(currentDate, 'yyyy-MM-dd')
}
