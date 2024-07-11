import { subDays, format } from 'date-fns'

export const getPastDate = (daysAgo: number) => {
  const pastDate = subDays(new Date(), daysAgo)
  return format(pastDate, 'yyyy-MM-dd')
}
