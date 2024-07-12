import { PieChart } from '@mui/x-charts'
import theme from '../../theme'

const DashboardPiChart = ({ data }) => {
  const initialStays = [
    { label: '1-2 nights', value: 0, color: theme.palette.error.main },
    { label: '2-7 nights', value: 0, color: theme.palette.warning.main },
    { label: '7-14 nights', value: 0, color: theme.palette.secondary.main },
    { label: '14-21 nights', value: 0, color: theme.palette.primary.main },
    { label: '21+ nights', value: 0, color: theme.palette.success.main },
  ]

  function incrementStays() {
    if (!data || !data.data) {
      return [] // Return empty array if data or data.data is undefined
    }

    const counts = data.data.reduce(
      (acc, booking) => {
        const totalNights = booking.totalNights ?? 0

        if (totalNights <= 2) {
          acc['1-2 nights']++
        } else if (totalNights <= 7) {
          acc['2-7 nights']++
        } else if (totalNights <= 14) {
          acc['7-14 nights']++
        } else if (totalNights <= 21) {
          acc['14-21 nights']++
        } else {
          acc['21+ nights']++
        }

        return acc
      },
      {
        '1-2 nights': 0,
        '2-7 nights': 0,
        '7-14 nights': 0,
        '14-21 nights': 0,
        '21+ nights': 0,
      }
    )

    // Map counts to initialStays format and filter out entries with value 0
    const updatedStays = initialStays
      .map((stay) => ({
        ...stay,
        value: counts[stay.label],
      }))
      .filter((stay) => stay.value !== 0)

    return updatedStays
  }

  const updatedStays = incrementStays()

  return (
    <PieChart
      series={[
        {
          data: updatedStays,
        },
      ]}
      width={600}
      height={300}
    />
  )
}

export default DashboardPiChart
