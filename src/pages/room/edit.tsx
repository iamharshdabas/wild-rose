import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from '@nextui-org/modal'
import { Edit } from 'lucide-react'
import { Spinner } from '@nextui-org/spinner'
import { Image } from '@nextui-org/image'
import { Input } from '@nextui-org/input'
import { Slider } from '@nextui-org/slider'
import { Controller, useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import useGetRoomQuery from '@/hooks/rooms/useGetRoomQuery'
import { RoomCreateProps } from '@/types/room'
import getRandomImage from '@/utils/getRandomImage'
import useUpdateRoomMutation from '@/hooks/rooms/useUpdateRoomMutation'
import { siteConfig } from '@/config/site'
import useGetSettingsQuery from '@/hooks/settings/useGetSettingsQuery'

const RoomEdit = ({ id }: { id: number }) => {
  const queryClient = useQueryClient()
  const { data: room, isLoading: isRoomLoading } = useGetRoomQuery(id)
  const { data: settings } = useGetSettingsQuery()
  const { mutate, isPending } = useUpdateRoomMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [siteConfig.queryKey.rooms] })
      queryClient.invalidateQueries({
        queryKey: [siteConfig.queryKey.rooms, id],
      })
      onClose()
    },
  })

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RoomCreateProps>()

  useEffect(() => {
    if (room) {
      setValue('name', room.name)
      setValue('price', room.price)
      setValue('bedroom', room.bedroom)
      setValue('bathroom', room.bathroom)
    }
  }, [room, setValue])

  const onSubmit = (data: RoomCreateProps) => {
    const newRoom: RoomCreateProps = {
      name: data.name,
      price: data.price,
      bedroom: data.bedroom,
      bathroom: data.bathroom,
    }

    mutate({ id: room?.id || id, room: newRoom })
    onClose()
  }

  return (
    <>
      <Button isIconOnly variant="light" onPress={onOpen}>
        <Edit />
      </Button>
      <Modal
        isOpen={isOpen}
        scrollBehavior="outside"
        size="3xl"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">Room details</ModalHeader>
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  {isRoomLoading ? (
                    <Spinner />
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Controller
                        control={control}
                        name="name"
                        render={({ field }) => (
                          <Input
                            {...field}
                            isRequired
                            description={
                              'Use 1 if there is no data in the table.'
                            }
                            errorMessage={errors.name?.message}
                            label="Name"
                            type="text"
                            value={field.value.toString()}
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        )}
                        rules={{ required: 'This field is required' }}
                      />
                      <Controller
                        control={control}
                        name="price"
                        render={({ field }) => (
                          <div>
                            <Slider
                              {...field}
                              showTooltip
                              formatOptions={{
                                style: 'currency',
                                currency: 'INR',
                              }}
                              label="Price"
                              maxValue={settings?.priceMax}
                              minValue={settings?.priceMin}
                              step={settings?.priceStep}
                              tooltipValueFormatOptions={{
                                style: 'currency',
                                currency: 'INR',
                              }}
                              onChange={(value) => field.onChange(value)}
                            />
                          </div>
                        )}
                      />
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Controller
                            control={control}
                            name="bedroom"
                            render={({ field }) => (
                              <>
                                <Image
                                  isBlurred
                                  alt="Bedroom image"
                                  height={1024}
                                  src={field.value}
                                  width={1536}
                                />
                                <Button
                                  onPress={() =>
                                    field.onChange(getRandomImage('bedroom'))
                                  }
                                >
                                  Get Random image
                                </Button>
                              </>
                            )}
                          />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-2">
                          <Controller
                            control={control}
                            name="bathroom"
                            render={({ field }) => (
                              <>
                                <Image
                                  isBlurred
                                  alt="Bathroom image"
                                  height={1024}
                                  src={field.value}
                                  width={1536}
                                />
                                <Button
                                  onPress={() =>
                                    field.onChange(getRandomImage('bathroom'))
                                  }
                                >
                                  Get Random image
                                </Button>
                              </>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    type="reset"
                    variant="light"
                    onPress={onClose}
                  >
                    Close
                  </Button>
                  <Button color="primary" isLoading={isPending} type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default RoomEdit
