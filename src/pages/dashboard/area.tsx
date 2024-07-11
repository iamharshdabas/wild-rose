import { LineChart } from '@mui/x-charts'
import { Card, CardContent, Typography } from '@mui/material'

const LineChartComponent = ({ date }) => {
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
          width={1000}
          height={300}
          margin={{ top: 40, right: 10, bottom: 20, left: 80 }}
        />
      </CardContent>
    </Card>
  )
}

export default LineChartComponent
