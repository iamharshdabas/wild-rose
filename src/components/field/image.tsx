import { Button, Stack, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'
import getRandomImage from '../../utility/getRandomImage'

const ImageField = ({
  control,
  name,
  src,
  changeable = false,
}: {
  control?: any
  name: string
  src: string | undefined
  changeable?: boolean
}) => {
  if (!changeable) {
    return (
      <Stack gap={1} justifyContent="center" alignItems="center">
        <Typography variant="subtitle1">{name}</Typography>
        <img width="100%" alt={`${name} image`} src={src} />
      </Stack>
    )
  }

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={src}
      render={({ field }) => (
        <Stack gap={4} justifyContent="center" alignItems="center">
          <img width="100%" alt={`${name} image`} src={field.value} />
          <Button onClick={() => field.onChange(getRandomImage(name))}>
            Get Random Image
          </Button>
        </Stack>
      )}
    />
  )
}

export default ImageField
