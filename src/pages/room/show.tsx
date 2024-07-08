import { Stack, Typography } from '@mui/material'
import { useShow } from '@refinedev/core'
import { DateField, NumberField, Show } from '@refinedev/mui'

export const RoomShow = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

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
          Name
        </Typography>
        <NumberField value={record?.name ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Price
        </Typography>
        <NumberField value={record?.price ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Bedroom
        </Typography>
        <img
          style={{ maxWidth: 200, width: '100%', height: 200 }}
          src={record?.bedroom}
        />
        <Typography variant="body1" fontWeight="bold">
          Bathroom
        </Typography>
        <img
          style={{ maxWidth: 200, width: '100%', height: 200 }}
          src={record?.bathroom}
        />
      </Stack>
    </Show>
  )
}
