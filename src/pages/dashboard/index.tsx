import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  MenuItem,
  Select,
} from '@mui/material'
import { useList } from '@refinedev/core'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tables } from '../../types/supabase'
import { getCurrentDate } from '../../utility/getCurrentDate'
import { getPastDate } from '../../utility/getPastDate'
import DashboardAreaChart from './area'
import DashboardPiChart from './pi'
import DashboardStats from './stats'

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
                flexDirection: 'column',
                gap: 2,
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexGrow: '1',
                  justifyContent: 'space-between',
                }}
              >
                <DashboardStats data={data} />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {data && (
                  <>
                    <DashboardAreaChart
                      data={data}
                      selectedRange={selectedRange}
                    />
                    <DashboardPiChart data={data} />
                  </>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  )
}

export default Dashboard
