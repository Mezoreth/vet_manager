import React, {useState, useEffect} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

export default function ClienteForm( {setViewForm} ){
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState(null)
    const [direccion, setDireccion] = useState('')
    const [cumple, setCumple] = useState(null)
    const [observaciones, setObservaciones] = useState('')
    const [open, setOpen] = useState(false);
    const [alertMessage, setAlertMessage]= useState('')
    const [alertColor, setAlertColor]= useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        
        const clienteData = {
            nombre_cliente: nombre + ' ' + apellido,
            telefono: telefono ? telefono : null,
            direccion: direccion,
            cumpleanos: cumple? cumple: null,
            observaciones: observaciones,
          };

        axios.post('http://127.0.0.1:3000/api/clientes', clienteData)
        .then(response => {
            setAlertMessage('Se registro al cliente con exito');
            setAlertColor('success');
            setOpen(true);
            //setViewForm('');
        })
        .catch(error => {
            console.error('Hubo un error al registrar al cliente:', error);
            setAlertMessage('Error no se logro registrar al cliente');
            setAlertColor('error');
            setOpen(true);
        });
    }

    function handleCancel(){
        setViewForm('');
    }

    useEffect(() => {
        const fetchDate = async () => {
          try {
            const response = await fetch('http://worldtimeapi.org/api/timezone/America/La_Paz');
            const data = await response.json();
            const date = new Date(data.datetime);
            setCumple(date.toISOString().split('T')[0]);
          } catch (error) {
            console.error('Error fetching date:', error);
          }
        };
    
        fetchDate();
      }, []);

    return (
        <Box sx={{paddingLeft:5, paddingRight:5 }}>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                Registrar Cliente
            </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Nombre"
                        onChange={e => setNombre(e.target.value.toUpperCase())}
                        value={nombre}
                        fullWidth
                        required
                        autoFocus
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Apellidos"
                        onChange={e => setApellido(e.target.value.toUpperCase())}
                        value={apellido}
                        fullWidth
                        required
                    />
                    <TextField
                        type="number"
                        variant='outlined'
                        label="Telefono"
                        onChange={e => setTelefono(e.target.value)}
                        value={telefono}
                        fullWidth
                        slotProps={{
                            htmlInput: {
                              max: 999999999,
                            }
                          }}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Direccion"
                        onChange={e => setDireccion(e.target.value.toUpperCase())}
                        value={direccion}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        label="Cumpleaños"
                        onChange={e => setCumple(e.target.value)}
                        value={cumple}
                        fullWidth
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type= 'text'
                        variant='outlined'
                        label="Observaciones"
                        onChange={e => setObservaciones(e.target.value.toUpperCase())}
                        value={observaciones}
                        fullWidth
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{ marginTop: 2 }}>
                    <Button variant="outlined" color="success" type="submit">Registrar</Button>
                    <Button variant="outlined" color="error" onClick={handleCancel}>Cancelar</Button>
                </Stack>
            </form> 
            <Snackbar
                anchorOrigin= {{ vertical: 'botton', horizontal: 'center' }}
                TransitionComponent= {Slide}
                open={open}
                autoHideDuration={3000}
                onClose={() => setOpen(false)} >
                <Alert
                    onClose={() => setOpen(false)}
                    severity={alertColor}
                    variant="filled"
                    sx={{ width: '100%' }}
                    >
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Box>
    )
}
