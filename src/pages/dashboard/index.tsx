import {
  BarChartRounded,
  BusinessCenterRounded,
  CalendarMonthRounded,
  CurrencyRupeeRounded,
} from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { useList } from '@refinedev/core'
import { NumberField } from '@refinedev/mui'
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import theme from '../../theme'
import { Tables } from '../../types/supabase'
import { getCurrentDate } from '../../utility/getCurrentDate'
import { getPastDate } from '../../utility/getPastDate'
import LineChartComponent from './area'

const Dashboard = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedRange, setSelectedRange] = useState('7')

  const { data, isLoading } = useList<Tables<'bookings'>>({
    resource: 'bookings',
    filters: [
      {
        field: 'startDate',
        operator: 'gt',
        value: getPastDate(parseInt(selectedRange)),
      },
      { field: 'startDate', operator: 'lt', value: getCurrentDate() },
    ],
    pagination: { mode: 'off' },
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const range = params.get('range') || '7'
    setSelectedRange(range)
  }, [location.search])

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

  const handleChange = (event) => {
    const value = event.target.value
    const params = new URLSearchParams(location.search)
    params.set('range', value)
    navigate({ search: params.toString() })
  }

  return (
    <Card sx={{ p: 2 }}>
      <CardHeader
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '.MuiCardHeader-action': {
            margin: 0,
            alignSelf: 'center',
          },
        }}
        title="Dashboard"
        action={
          <Select
            labelId="time-range-label"
            id="time-range-select"
            value={selectedRange}
            onChange={handleChange}
          >
            <MenuItem value="7">Last 7 Days</MenuItem>
            <MenuItem value="30">Last 30 Days</MenuItem>
            <MenuItem value="90">Last 90 Days</MenuItem>
            <MenuItem value="365">Last 365 Days</MenuItem>
          </Select>
        }
      />
      <CardContent>
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 4, flexDirection: 'column' }}>
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  flexGrow: '1',
                  justifyContent: 'space-between',
                }}
              >
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
                              {stat.title === 'Sales' && (
                                <CurrencyRupeeRounded />
                              )}
                              <NumberField variant="h6" value={stat.value} />
                            </Box>
                          ) : (
                            <Typography variant="h6">
                              Something went wrong
                            </Typography>
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  )
                })}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-around',
                }}
              >
                {date && <LineChartComponent date={date} />}
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default Dashboard
