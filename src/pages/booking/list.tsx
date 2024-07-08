import { Checkbox } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useMany } from '@refinedev/core'
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from '@refinedev/mui'
import React from 'react'

export const BookingList = () => {
  const { dataGridProps } = useDataGrid()

  const { data: roomData, isLoading: roomIsLoading } = useMany({
    resource: 'rooms',
    ids: dataGridProps?.rows?.map((item: any) => item?.roomID) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  })

  const { data: guestData, isLoading: guestIsLoading } = useMany({
    resource: 'guests',
    ids: dataGridProps?.rows?.map((item: any) => item?.guestID) ?? [],
    queryOptions: {
      enabled: !!dataGridProps?.rows,
    },
  })

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: 'id',
        headerName: 'Id',
        type: 'number',
        minWidth: 50,
      },
      {
        field: 'created_at',
        flex: 1,
        headerName: 'Created At',
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />
        },
      },
      {
        field: 'startDate',
        flex: 1,
        headerName: 'Start Date',
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />
        },
      },
      {
        field: 'endDate',
        flex: 1,
        headerName: 'End Date',
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />
        },
      },
      {
        field: 'totalNights',
        headerName: 'Total Nights',
        type: 'number',
        minWidth: 100,
      },
      {
        field: 'totalGuests',
        headerName: 'Total Guests',
        type: 'number',
        minWidth: 100,
      },
      {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        minWidth: 100,
      },
      {
        field: 'paid',
        headerName: 'Paid',
        minWidth: 100,
        renderCell: function render({ value }) {
          return <Checkbox checked={!!value} />
        },
      },
      {
        field: 'status',
        flex: 1,
        headerName: 'Status',
        minWidth: 150,
      },
      {
        field: 'roomID',
        headerName: 'Room',
        minWidth: 100,
        renderCell: function render({ value }) {
          return roomIsLoading ? (
            <>Loading...</>
          ) : (
            roomData?.data?.find((item) => item.id === value)?.name
          )
        },
      },
      {
        field: 'guestID',
        flex: 1.5,
        headerName: 'Guest',
        minWidth: 200,
        renderCell: function render({ value }) {
          return guestIsLoading ? (
            <>Loading...</>
          ) : (
            guestData?.data?.find((item) => item.id === value)?.name
          )
        },
      },
      {
        field: 'actions',
        flex: 1,
        headerName: 'Actions',
        sortable: false,
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          )
        },
        align: 'center',
        headerAlign: 'center',
        minWidth: 150,
      },
    ],
    [roomIsLoading, roomData?.data, guestIsLoading, guestData?.data]
  )

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  )
}
