import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { Edit, useAutocomplete } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import { Controller } from 'react-hook-form'

export const BookingEdit = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult },
    register,
    control,
    formState: { errors },
  } = useForm()

  const bookingsData = queryResult?.data?.data

  const { autocompleteProps: roomAutocompleteProps } = useAutocomplete({
    resource: 'rooms',
    defaultValue: bookingsData?.roomID,
  })

  const { autocompleteProps: guestAutocompleteProps } = useAutocomplete({
    resource: 'guests',
    defaultValue: bookingsData?.guestID,
  })

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete="off"
      >
        <TextField
          {...register('id', {
            required: 'This field is required',
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.id}
          helperText={(errors as any)?.id?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Id"
          name="id"
          disabled
        />
        {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
        <TextField
          {...register('created_at', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.created_at}
          helperText={(errors as any)?.created_at?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Created At"
          name="created_at"
        />

        {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
        <TextField
          {...register('startDate', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.startDate}
          helperText={(errors as any)?.startDate?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Start Date"
          name="startDate"
        />

        {/*
                    DatePicker component is not included in "@refinedev/mui" package.
                    To use a <DatePicker> component, you can follow the official documentation for Material UI.

                    Docs: https://mui.com/x/react-date-pickers/date-picker/#basic-usage
                */}
        <TextField
          {...register('endDate', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.endDate}
          helperText={(errors as any)?.endDate?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="End Date"
          name="endDate"
        />
        <TextField
          {...register('totalNights', {
            required: 'This field is required',
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.totalNights}
          helperText={(errors as any)?.totalNights?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Total Nights"
          name="totalNights"
        />
        <TextField
          {...register('totalGuests', {
            required: 'This field is required',
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.totalGuests}
          helperText={(errors as any)?.totalGuests?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Total Guests"
          name="totalGuests"
        />
        <TextField
          {...register('price', {
            required: 'This field is required',
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.price}
          helperText={(errors as any)?.price?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Price"
          name="price"
        />
        <Controller
          control={control}
          name="paid"
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <FormControlLabel
              label="Paid"
              control={
                <Checkbox
                  {...field}
                  checked={field.value}
                  onChange={(event) => {
                    field.onChange(event.target.checked)
                  }}
                />
              }
            />
          )}
        />
        <TextField
          {...register('status', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.status}
          helperText={(errors as any)?.status?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Status"
          name="status"
        />
        <Controller
          control={control}
          name="roomID"
          rules={{ required: 'This field is required' }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...roomAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value)
              }}
              getOptionLabel={(item) => {
                return (
                  roomAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.name ?? ''
                )
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Room"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.roomID}
                  helperText={(errors as any)?.roomID?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="guestID"
          rules={{ required: 'This field is required' }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...guestAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value?.id ?? value)
              }}
              getOptionLabel={(item) => {
                return (
                  guestAutocompleteProps?.options?.find(
                    (p) => p?.id?.toString() === (item?.id ?? item)?.toString()
                  )?.name ?? ''
                )
              }}
              isOptionEqualToValue={(option, value) =>
                value === undefined ||
                option?.id?.toString() === (value?.id ?? value)?.toString()
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Guest"
                  margin="normal"
                  variant="outlined"
                  error={!!(errors as any)?.guestID}
                  helperText={(errors as any)?.guestID?.message}
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Edit>
  )
}
