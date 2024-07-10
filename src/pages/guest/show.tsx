import { Stack, Typography } from '@mui/material'
import { useShow } from '@refinedev/core'
import { DateField, EmailField, NumberField, Show } from '@refinedev/mui'
import { Tables } from '../../types/supabase'
import { calculateAge } from '../../utility'
import { BookingList } from '../booking'

export const GuestShow = () => {
  const { queryResult } = useShow<Tables<'guests'>>()
  const { data, isLoading } = queryResult

  const guest = data?.data

  return (
    <>
      <Show isLoading={isLoading}>
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={2}>
            <Stack direction="row" gap={2}>
              <Typography
                variant="h5"
                bgcolor="#444444"
                px={1}
                borderRadius={2}
                fontFamily="monospace"
              >
                {calculateAge(guest?.dob || '')}
                {guest?.gender === 'male' ? 'M' : 'F'}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {guest?.name}
              </Typography>
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h5">Email :</Typography>
              <EmailField variant="h5" fontWeight="bold" value={guest?.email} />
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h5">Date of birth :</Typography>
              <DateField
                format="LL"
                fontFamily="monospace"
                variant="h5"
                value={guest?.dob}
              />
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h5">Phone number :</Typography>
              <NumberField variant="h5" value={guest?.phoneNumber || ''} />
            </Stack>
            <Stack direction="row" gap={2}>
              <Typography variant="h5">Address :</Typography>
              <Typography variant="h5">{guest?.address}</Typography>
            </Stack>
          </Stack>
          <Stack alignItems="end">
            <Typography fontFamily="monospace" variant="h5">
              ID: {guest?.id}
            </Typography>
            <DateField
              format="LLL"
              fontFamily="monospace"
              variant="h5"
              value={guest?.created_at}
            />
          </Stack>
        </Stack>
      </Show>
      {!isLoading && (
        <BookingList
          filters={[{ field: 'guestID', operator: 'eq', value: guest?.id }]}
        />
      )}
    </>
  )
}
