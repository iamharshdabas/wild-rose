import { Stack, Typography } from '@mui/material'
import { useOne, useShow } from '@refinedev/core'
import {
  BooleanField,
  DateField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from '@refinedev/mui'

export const BookingShow = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: roomData, isLoading: roomIsLoading } = useOne({
    resource: 'rooms',
    id: record?.roomID || '',
    queryOptions: {
      enabled: !!record,
    },
  })

  const { data: guestData, isLoading: guestIsLoading } = useOne({
    resource: 'guests',
    id: record?.guestID || '',
    queryOptions: {
      enabled: !!record,
    },
  })

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          Id
        </Typography>
        <NumberField value={record?.id ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Created At
        </Typography>
        <DateField value={record?.created_at} />
        <Typography variant="body1" fontWeight="bold">
          Start Date
        </Typography>
        <DateField value={record?.startDate} />
        <Typography variant="body1" fontWeight="bold">
          End Date
        </Typography>
        <DateField value={record?.endDate} />
        <Typography variant="body1" fontWeight="bold">
          Total Nights
        </Typography>
        <NumberField value={record?.totalNights ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Total Guests
        </Typography>
        <NumberField value={record?.totalGuests ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Price
        </Typography>
        <NumberField value={record?.price ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Paid
        </Typography>
        <BooleanField value={record?.paid} />
        <Typography variant="body1" fontWeight="bold">
          Status
        </Typography>
        <TextField value={record?.status} />
        <Typography variant="body1" fontWeight="bold">
          Room
        </Typography>

        {roomIsLoading ? <>Loading...</> : <>{roomData?.data?.name}</>}
        <Typography variant="body1" fontWeight="bold">
          Guest
        </Typography>

        {guestIsLoading ? <>Loading...</> : <>{guestData?.data?.name}</>}
      </Stack>
    </Show>
  )
}
