import { Box, Stack, TextField } from '@mui/material'
import { Create } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import ImageField from '../../components/field/image'
import { getRandomImage } from '../../utility'

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
        <Stack direction="row" gap={4}>
          <ImageField
            control={control}
            src={getRandomImage('bedroom')}
            name="bedroom"
            changeable
          />
          <ImageField
            control={control}
            src={getRandomImage('bathroom')}
            name="bathroom"
            changeable
          />
        </Stack>
      </Box>
    </Create>
  )
}
