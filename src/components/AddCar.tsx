import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import type { CarData } from '../types';
import CarForm from './CarForm';

type AddCarProps = {
  fetchCars: () => void;
}

export default function AddCar(props: AddCarProps) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState<CarData>({} as CarData);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    fetch(import.meta.env.VITE_API_URL + "/cars", {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body: JSON.stringify(car)
    })
    .then(response => {
      if (!response.ok)
        throw new Error("Something went wrong in addition");

      return response.json();
    })
    .then(() => props.fetchCars())
    handleClose();
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Car
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Car</DialogTitle>
        <CarForm car={car} setCar={setCar} />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}