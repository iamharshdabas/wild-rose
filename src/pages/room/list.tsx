import { Avatar } from '@nextui-org/avatar'
import { Button } from '@nextui-org/button'
import { Image } from '@nextui-org/image'
import { Input } from '@nextui-org/input'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal'
import { Pagination } from '@nextui-org/pagination'
import { Spinner } from '@nextui-org/spinner'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table'
import { cn } from '@nextui-org/theme'
import { useQueryClient } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Search, Trash } from 'lucide-react'

import RoomCreate from './create'
import RoomPopulate from './populate'
import RoomShow from './show'
import RoomEdit from './edit'

import { RoomColumnProps, RoomProps } from '@/types/room'
import { subtitle, title } from '@/config/primitives'
import useGetRoomsQuery from '@/hooks/rooms/useGetRoomsQuery'
import useDeleteRoomMutation from '@/hooks/rooms/useDeleteRoomMutation'
import { siteConfig } from '@/config/site'
import formatDate from '@/utils/formatDate'

const RoomList = () => {
  const queryClient = useQueryClient()

  const { data: rooms, isLoading } = useGetRoomsQuery()

  const { mutate, isPending } = useDeleteRoomMutation({
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [siteConfig.queryKey.rooms] })
      queryClient.invalidateQueries({
        queryKey: [siteConfig.queryKey.lastRoom],
      })
    },
  })

  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const filteredItems = useMemo(() => {
    if (!rooms) return []

    let filteredRooms = rooms

    if (hasSearchFilter) {
      filteredRooms = filteredRooms.filter((room) =>
        room.name.toString().toLowerCase().includes(filterValue.toLowerCase())
      )
    }

    return filteredRooms
  }, [rooms, filterValue])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    []
  )

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
          <div className="flex justify-end gap-4">
            <RoomPopulate />
            <RoomCreate />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {rooms?.length} rooms
          </span>
          <label className="flex items-center gap-2 text-small text-default-400">
            Rows per page:
            <select
              className="rounded-lg px-2 py-1 text-small text-default-400 outline-none"
              value={rowsPerPage}
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    rowsPerPage,
    rooms?.length,
    hasSearchFilter,
  ])

  const bottomContent = useMemo(() => {
    return (
      <div className="flex w-full justify-center">
        <Pagination
          loop
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          variant="bordered"
          onChange={(page) => setPage(page)}
        />
      </div>
    )
  }, [page, pages])

  const columns: {
    key: RoomColumnProps
    label: string
  }[] = useMemo(
    () => [
      { key: 'bedroom', label: 'Image' },
      { key: 'id', label: 'ID' },
      { key: 'created_at', label: 'Created At' },
      { key: 'name', label: 'Name' },
      { key: 'price', label: 'Price' },
      { key: 'actions', label: 'Actions' },
    ],
    []
  )

  const renderCell = useCallback(
    (rooms: RoomProps, columnKey: RoomColumnProps) => {
      const cellValue = rooms[columnKey]

      switch (columnKey) {
        case 'bedroom':
          return (
            <div className="flex justify-center">
              <Avatar
                isBordered
                className="cursor-pointer"
                radius="sm"
                size="lg"
                src={cellValue.toString()}
                onClick={() => {
                  onOpen()
                  setSelectedImage(cellValue.toString())
                }}
              />
            </div>
          )
        case 'id':
          return <h2 className={subtitle()}>{cellValue}</h2>
        case 'created_at':
          return (
            <h2 className={subtitle()}>{formatDate(cellValue.toString())}</h2>
          )
        case 'name':
          return <h2 className={subtitle()}>{cellValue}</h2>
        case 'price':
          return (
            <h2 className={subtitle()}>
              <span>$</span>
              {cellValue}
            </h2>
          )
        case 'actions':
          return (
            <>
              <div className="relative flex items-center justify-center gap-2">
                <RoomShow id={rooms.id} />
                <RoomEdit id={rooms.id} />
                <Button
                  isIconOnly
                  color="danger"
                  disabled={isPending}
                  variant="light"
                  onPress={() => mutate(rooms.id)}
                >
                  <Trash />
                </Button>
              </div>
            </>
          )
        default:
          return cellValue
      }
    },
    []
  )

  return (
    <>
      <div className="w-full max-w-7xl text-center">
        <h1 className={title()}>Rooms</h1>
      </div>
      <div className="w-full max-w-7xl pb-16 text-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            aria-label="rooms table"
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            topContent={topContent}
            topContentPlacement="outside"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.key}
                  className={cn(subtitle(), 'text-center')}
                >
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={'No rows to display.'} items={items}>
              {(item: RoomProps) => (
                <TableRow key={item.id}>
                  {(columnKey) => (
                    <TableCell>
                      {renderCell(item, columnKey as RoomColumnProps)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <Modal isOpen={isOpen} size="5xl" onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col">Bedroom</ModalHeader>
                <ModalBody>
                  <Image
                    isBlurred
                    alt="Room image"
                    height={1024}
                    src={selectedImage}
                    width={1536}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default RoomList
