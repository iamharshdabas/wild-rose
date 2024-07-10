import { East } from '@mui/icons-material'
import { Chip, Stack, Typography } from '@mui/material'
import { useOne, useShow } from '@refinedev/core'
import { DateField, NumberField, Show } from '@refinedev/mui'
import { Tables } from '../../types/supabase'
import { BookingList } from './list'

export const BookingShow = () => {
  const { queryResult } = useShow<Tables<'bookings'>>()
  const { data, isLoading } = queryResult

  const booking = data?.data

  const { data: roomData, isLoading: roomIsLoading } = useOne({
    resource: 'rooms',
    id: booking?.roomID || '',
    queryOptions: {
      enabled: !!booking,
    },
  })

  const { data: guestData, isLoading: guestIsLoading } = useOne({
    resource: 'guests',
    id: booking?.guestID || '',
    queryOptions: {
      enabled: !!booking,
    },
  })

  return (
    <>
      <Show isLoading={isLoading}>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={2}>
            <Stack gap={1}>
              <Typography variant="h5">
                {guestIsLoading ? 'Loading...' : guestData?.data?.name}
              </Typography>
              <Typography variant="h5">
                {roomIsLoading
                  ? 'Loading...'
                  : `Room no. ${roomData?.data?.name}`}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="h5">Price :</Typography>
              <NumberField
                variant="h5"
                fontFamily="monospace"
                value={booking?.price ?? ''}
              />
              <Chip
                sx={{ fontSize: '1.5rem' }}
                label={booking?.paid ? 'Paid' : 'Unpaid'}
                variant="outlined"
                color={booking?.paid ? 'success' : 'warning'}
              />

              <Chip
                sx={{ fontSize: '1.5rem' }}
                label={booking?.status}
                variant="outlined"
                color={
                  booking?.status === 'unpaid'
                    ? 'warning'
                    : booking?.status === 'checked-in'
                      ? 'primary'
                      : booking?.status === 'checked-out'
                        ? 'success'
                        : 'error'
                }
              />
            </Stack>
            <Stack direction="row" alignItems="center" gap={1}>
              <NumberField
                variant="h5"
                fontFamily="monospace"
                value={booking?.totalNights ?? ''}
              />
              <Typography variant="h5">nights for</Typography>
              <NumberField
                variant="h5"
                fontFamily="monospace"
                value={booking?.totalNights ?? ''}
              />
              <Typography variant="h5">
                {booking?.totalGuests && booking.totalGuests > 1
                  ? 'guests'
                  : 'guest'}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={2}>
              <DateField variant="h5" format="LLL" value={booking?.startDate} />
              <East />
              <DateField variant="h5" format="LLL" value={booking?.endDate} />
            </Stack>
          </Stack>
          <Stack alignItems="end">
            <Typography fontFamily="monospace" variant="h5">
              ID: {booking?.id}
            </Typography>
            <DateField
              format="LLL"
              fontFamily="monospace"
              variant="h5"
              value={booking?.created_at}
            />
          </Stack>
        </Stack>
      </Show>
      {!isLoading && (
        <BookingList
          filters={[
            { field: 'guestID', operator: 'eq', value: booking?.guestID },
          ]}
        />
      )}
    </>
  )
}
