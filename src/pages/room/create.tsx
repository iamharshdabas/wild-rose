import { Box, TextField } from '@mui/material'
import { Create } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'

export const RoomCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm()

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: 'flex', flexDirection: 'column' }}
        autoComplete="off"
      >
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
        <TextField
          {...register('name', {
            required: 'This field is required',
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Name"
          name="name"
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
      </Box>
    </Create>
  )
}
