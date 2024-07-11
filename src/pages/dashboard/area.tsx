import { Card, CardContent, Typography } from '@mui/material'
import { LineChart } from '@mui/x-charts'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'

const DashboardAreaChart = ({ data, selectedRange }) => {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), parseInt(selectedRange) - 1),
    end: new Date(),
  })

  const date: { label: string; totalSales: number }[] = allDates.map((date) => {
    return {
      label: format(date, 'MMM dd'),
      totalSales: data?.data
        ?.filter((bookings) =>
          isSameDay(date, new Date(bookings?.startDate || ''))
        )
        .reduce((acc, obj) => {
          if (obj.price !== null) {
            return acc + obj.price
          } else {
            return acc
          }
        }, 0),
    }
  })

  const labels = date.map((data) => data.label)
  const values = date.map((data) => data.totalSales)

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Sales Over Time</Typography>
        <LineChart
          series={[
            {
              data: values,
              label: 'Total Sales',
              area: true,
            },
          ]}
          xAxis={[
            {
              data: labels,
              scaleType: 'band',
            },
          ]}
          yAxis={[
            {
              scaleType: 'linear',
            },
          ]}
          width={800}
          height={400}
          margin={{ top: 40, right: 10, bottom: 20, left: 80 }}
        />
      </CardContent>
    </Card>
  )
}

export default DashboardAreaChart
