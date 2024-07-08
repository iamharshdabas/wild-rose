import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  DateField,
  DeleteButton,
  EditButton,
  EmailField,
  List,
  ShowButton,
  useDataGrid,
} from '@refinedev/mui'
import React from 'react'

export const GuestList = () => {
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
        minWidth: 200,
      },
      {
        field: 'email',
        flex: 1,
        headerName: 'Email',
        minWidth: 250,
        renderCell: function render({ value }) {
          return <EmailField value={value} />
        },
      },
      {
        field: 'dob',
        flex: 1,
        headerName: 'Dob',
        minWidth: 250,
        renderCell: function render({ value }) {
          return <DateField value={value} />
        },
      },
      {
        field: 'phoneNumber',
        flex: 1,
        headerName: 'Phone Number',
        type: 'number',
        minWidth: 200,
      },
      {
        field: 'address',
        flex: 1,
        headerName: 'Address',
        minWidth: 200,
      },
      {
        field: 'gender',
        flex: 1,
        headerName: 'Gender',
        minWidth: 200,
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
