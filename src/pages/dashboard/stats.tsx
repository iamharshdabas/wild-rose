import {
  BarChartRounded,
  BusinessCenterRounded,
  CalendarMonthRounded,
  CurrencyRupeeRounded,
} from '@mui/icons-material'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { NumberField } from '@refinedev/mui'
import { useMemo } from 'react'
import theme from '../../theme'

const DashboardStats = ({ data }) => {
  const stats = useMemo(() => {
    return [
      {
        title: 'Bookings',
        color: theme.palette.primary.main,
        icon: <BusinessCenterRounded />,
        value: data?.data.length,
      },
      // BUG: these values never changes
      {
        title: 'Sales',
        color: theme.palette.success.main,
        icon: <CurrencyRupeeRounded />,
        value: data?.data?.reduce((acc, obj) => {
          if (obj.price != null && obj.paid) {
            return acc + obj.price
          } else {
            return acc
          }
        }, 0),
      },
      {
        title: 'Checkins',
        color: theme.palette.secondary.main,
        icon: <CalendarMonthRounded />,
        value: data?.data?.reduce((acc, obj) => {
          if (obj.paid) {
            return acc + 1
          } else {
            return acc
          }
        }, 0),
      },
      {
        title: 'Guests',
        color: theme.palette.warning.main,
        icon: <BarChartRounded />,
        value: data?.data?.reduce((acc, obj) => {
          if (obj.totalGuests != null && obj.paid) {
            return acc + obj.totalGuests
          } else {
            return acc
          }
        }, 0),
      },
    ]
  }, [data?.data])

  return (
    <>
      {stats.map((stat) => {
        return (
          <Card key={stat.title}>
            <CardContent sx={{ display: 'flex', gap: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: stat.color,
                  borderRadius: '24px',
                  p: 2,
                  height: '60px',
                  width: '60px',
                }}
              >
                {stat.icon}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexGrow: '1',
                  flexDirection: 'column',
                  pl: 2,
                }}
              >
                <Typography variant="h6">{stat.title}</Typography>
                {stat.value ? (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {stat.title === 'Sales' && <CurrencyRupeeRounded />}
                    <NumberField variant="h6" value={stat.value} />
                  </Box>
                ) : (
                  <Typography variant="h6">Something went wrong</Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        )
      })}
    </>
  )
}

export default DashboardStats
