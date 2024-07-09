import { CurrencyRupee } from '@mui/icons-material'
import { Stack, Typography } from '@mui/material'
import { useShow } from '@refinedev/core'
import { DateField, Show } from '@refinedev/mui'
import ImageField from '../../components/field/image'
import { Tables } from '../../types/supabase'
import { BookingList } from '../booking'

export const RoomShow = () => {
  const { queryResult } = useShow<Tables<'rooms'>>()
  const { data: roomData, isLoading } = queryResult

  const room = roomData?.data

  return (
    <>
      <Show isLoading={isLoading}>
        <Stack gap={1}>
          <Stack direction="row" justifyContent="space-between">
            <Stack>
              <Typography variant="h5" fontWeight="bold">
                Rooms no. {room?.name}
              </Typography>
              <Typography
                display="flex"
                alignItems="center"
                variant="h5"
                fontWeight="bold"
              >
                <CurrencyRupee />
                {room?.price}
              </Typography>
            </Stack>
            <Stack>
              <Typography fontFamily="monospace" variant="h5">
                ID: {room?.id}
              </Typography>
              <DateField
                fontFamily="monospace"
                variant="h5"
                value={room?.created_at}
              />
            </Stack>
          </Stack>
          <Stack direction="row" gap={4}>
            <ImageField name="bedroom" src={room?.bedroom ?? ''} />
            <ImageField name="bathroom" src={room?.bathroom ?? ''} />
          </Stack>
        </Stack>
      </Show>
      {!isLoading && (
        <BookingList
          filters={[{ field: 'roomID', operator: 'eq', value: room?.id }]}
        />
      )}
    </>
  )
}
