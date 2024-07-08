import { Stack, Typography } from '@mui/material'
import { useShow } from '@refinedev/core'
import {
  DateField,
  EmailField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from '@refinedev/mui'

export const GuestShow = () => {
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
        <TextField value={record?.name} />
        <Typography variant="body1" fontWeight="bold">
          Email
        </Typography>
        <EmailField value={record?.email} />
        <Typography variant="body1" fontWeight="bold">
          Dob
        </Typography>
        <DateField value={record?.dob} />
        <Typography variant="body1" fontWeight="bold">
          Phone Number
        </Typography>
        <NumberField value={record?.phoneNumber ?? ''} />
        <Typography variant="body1" fontWeight="bold">
          Address
        </Typography>
        <TextField value={record?.address} />
        <Typography variant="body1" fontWeight="bold">
          Gender
        </Typography>
        <TextField value={record?.gender} />
      </Stack>
    </Show>
  )
}
