import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material'
import { Create, useAutocomplete } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import { Controller } from 'react-hook-form'

export const BookingCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm()

  const { autocompleteProps: roomAutocompleteProps } = useAutocomplete({
    resource: 'rooms',
  })

  const { autocompleteProps: guestAutocompleteProps } = useAutocomplete({
    resource: 'guests',
  })

  const options = ['unpaid', 'checked-in', 'checked-out', 'checked-out-due']

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete="off"
      >
        <TextField
          type="date"
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
        <TextField
          type="date"
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
        <Controller
          control={control}
          name="status"
          rules={{ required: 'This field is required' }}
          render={({ field }) => (
            <Autocomplete
              options={options}
              getOptionLabel={(option) => option}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(_, value) => field.onChange(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Status"
                  margin="normal"
                  variant="outlined"
                  error={!!errors.status}
                  helperText={(errors as any)?.status?.message}
                  required
                />
              )}
            />
          )}
        />
        <Controller
          control={control}
          name="roomID"
          rules={{ required: 'This field is required' }}
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
    </Create>
  )
}
