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
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />
        },
      },
      {
        field: 'name',
        flex: 1.5,
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
        minWidth: 150,
        renderCell: function render({ value }) {
          return <DateField value={value} />
        },
      },
      {
        field: 'phoneNumber',
        flex: 1,
        headerName: 'Phone Number',
        type: 'number',
        minWidth: 150,
      },
      {
        field: 'address',
        flex: 2,
        headerName: 'Address',
        minWidth: 250,
      },
      {
        field: 'gender',
        headerName: 'Gender',
        minWidth: 100,
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
    []
  )

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} autoHeight />
    </List>
  )
}
