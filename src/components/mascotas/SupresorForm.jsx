import React, {useState, forwardRef} from 'react';
import { TextField, Button, Container, Stack, Typography, setRef } from '@mui/material';
import { Link } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function SupresorForm({ open, onClose }) {
    const [supresor, setSupresor] = useState('')
    const [fdosis, setFdosis] = useState('')
    const [frefuerzo, setFrefuerzo] = useState('')
    // sumando 5 meses despues de la fecha inicial
    function handleFdosisCustom(date){
        const fdosisDate = new Date(date);
        setFdosis(date);
        const frefuerzoDate = new Date(fdosisDate);
        frefuerzoDate.setMonth(fdosisDate.getMonth() + 5);
        setFrefuerzo(frefuerzoDate.toISOString().split('T')[0]);
    }

    function handleSubmit(event) {
        event.preventDefault();
    };

    return (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          onClose={onClose}
        >
          <DialogContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                SUPRESOR
            </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
            <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Supresor"
                        onChange={e => setSupresor(e.target.value.toUpperCase())}
                        value={supresor}
                        fullWidth
                        required
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        label="Fecha dosis"
                        onChange={e => handleFdosisCustom(e.target.value)}
                        value={fdosis}
                        fullWidth
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        label="Fecha Refuerzo"
                        onChange={e => setFrefuerzo(e.target.value)}
                        value={frefuerzo}
                        fullWidth
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                </Stack>
                <Button variant="outlined"  color='success' type="submit">Registrar</Button>
                <Button onClick={onClose} color='error'>Cancelar</Button>
            </form> 
          </DialogContent>
        </Dialog>
    )
}