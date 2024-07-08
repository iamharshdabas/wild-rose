import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from '@refinedev/mui'
import React from 'react'

export const RoomList = () => {
  const { dataGridProps } = useDataGrid()

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
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />
        },
      },
      {
        field: 'name',
        flex: 1,
        headerName: 'Name',
        type: 'number',
        minWidth: 200,
      },
      {
        field: 'price',
        flex: 1,
        headerName: 'Price',
        type: 'number',
        minWidth: 200,
      },
      {
        field: 'bedroom',
        flex: 1,
        headerName: 'Bedroom',
        minWidth: 100,
        renderCell: function render({ value }) {
          return (
            <img src={value} style={{ height: '50px', maxWidth: '100px' }} />
          )
        },
      },
      {
        field: 'bathroom',
        flex: 1,
        headerName: 'Bathroom',
        minWidth: 100,
        renderCell: function render({ value }) {
          return (
            <img src={value} style={{ height: '50px', maxWidth: '100px' }} />
          )
        },
      },
      {
        field: 'actions',
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
        minWidth: 80,
      },
    ],
    []
  )

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  )
}
