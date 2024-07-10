import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from '@mui/material'
import { Create } from '@refinedev/mui'
import { useForm } from '@refinedev/react-hook-form'
import { Controller } from 'react-hook-form'

export const GuestCreate = () => {
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
          })}
          error={!!(errors as any)?.name}
          helperText={(errors as any)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
        />
        <TextField
          {...register('email', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.email}
          helperText={(errors as any)?.email?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="email"
          label="Email"
          name="email"
        />
        <TextField
          type="date"
          {...register('dob', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.dob}
          helperText={(errors as any)?.dob?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          label="Dob"
          name="dob"
        />
        <TextField
          {...register('phoneNumber', {
            required: 'This field is required',
            valueAsNumber: true,
          })}
          error={!!(errors as any)?.phoneNumber}
          helperText={(errors as any)?.phoneNumber?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="number"
          label="Phone Number"
          name="phoneNumber"
        />
        <TextField
          {...register('address', {
            required: 'This field is required',
          })}
          error={!!(errors as any)?.address}
          helperText={(errors as any)?.address?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Address"
          name="address"
        />
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup {...field}>
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          )}
        />
      </Box>
    </Create>
  )
}
