import { useState, useEffect } from 'react';
import type { CarData } from "../types";
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getCars, deleteCar } from '../carapi';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Snackbar from '@mui/material/Snackbar';
import AddCar from './AddCar';
import UpdateCar from './UpdateCar';

function CarList() {
  const [cars, setCars] = useState<CarData[] | null>();
  const [open, setOpen] = useState(false);

  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', flex: 1 },
    { field: 'model',  headerName: 'Model', flex: 1 },
    { field: 'color',  headerName: 'Color' },
    { field: 'fuel',  headerName: 'Fuel' },
    { field: 'modelYear', headerName: 'Model year' },
    { field: 'price',  headerName: 'Price (€)' },
    {
      field: '_links.car.href',
      headerName: ' ',
      renderCell: (params: GridRenderCellParams) =>
        <UpdateCar fetchCars={fetchCars} car={params.row} />
    },
    {
        field: '_links.self.href',
        headerName: ' ',
        renderCell: (params: GridRenderCellParams) =>
            <IconButton onClick={() => handleDelete(params.row._links.self.href)}>
                <DeleteIcon color="error" />
            </IconButton>
    }
  ]

  const fetchCars = () => {
    getCars()
    .then(data => setCars(data._embedded.cars))
    .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchCars();
  }, []);

  const handleDelete = (url: string) => {
    deleteCar(url)
    .then(() => {
        fetchCars();
        setOpen(true);
    })
    .catch(err => console.error(err))
  }

  return(
    <>
        <AddCar fetchCars={fetchCars} />
        <div style={{ width: '90%', height: 500, marginTop: 10 }}>
            <DataGrid 
                rows={cars || []}
                columns={columns}
                getRowId={ row => row._links.self.href}
                autoPageSize
                disableRowSelectionOnClick
            />
        </ div>
        <Snackbar 
            open={open}
            message="Car deleted successfully"
            autoHideDuration={3000}
            onClose={() => setOpen(false)}
        />
    </>
  );
}

export default CarList