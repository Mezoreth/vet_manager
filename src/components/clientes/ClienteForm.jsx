import React, {useState, useEffect} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
export default function ClienteForm(){
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [cumple, setCumple] = useState('')
    const [observaciones, setObservaciones] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
        //console.log(nombre, apellido, direccion, cumple, telefono) 
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
                <Button variant="outlined" color="success" type="submit">Registrar</Button>
            </form> 
        </Box>
    )
}
