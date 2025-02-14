import React, {useState, useEffect} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function ServicioForm(){
    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState(0)
    const [mascota, setMascota] = useState('')
    const [full, setFull] = useState(false)
    const [corte, setCorte] = useState(false)
    const [baño, setBaño] = useState(false)
    const [estetica, setEstetica] = useState(false)
    const [cepillado, setCepillado] = useState(false)
    const [limpoidos, setLimpoidos] = useState(false)
    const [fecha, setFecha] = useState(null)
    const [hora, setHora] = useState(null)
    const [precio, setPrecio] = useState(0.0)
    const [tipoPago, setTipoPago] = useState('')
    const [observaciones, setObservaciones] = useState('')
 
    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleFull(checked) {
        setFull(checked)
        setCorte(checked);
        setBaño(checked);
        setEstetica(checked);
        setCepillado(checked);
        setLimpoidos(checked);
    }

    useEffect(() => {
        const fetchDate = async () => {
          try {
            const response = await fetch('http://worldtimeapi.org/api/timezone/America/La_Paz');
            const data = await response.json();
            const date = new Date(data.datetime);
            setFecha(date.toISOString().split('T')[0]);
          } catch (error) {
            console.error('Error fetching date:', error);
          }
        };
    
        fetchDate();
      }, []);

    return (
        <Box sx={{paddingLeft:5, paddingRight:5, bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary }}>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                Registrar Servicio
            </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 1 }}>
                    <TextField
                        variant='outlined'
                        label="CLIENTE"
                        onChange={e => setNombre(e.target.value.toUpperCase())}
                        value={nombre}
                        fullWidth
                        required
                    />
                    <TextField
                        variant='outlined'
                        label="TELEFONO"
                        onChange={e => setTelefono(e.target.value.toUpperCase())}
                        value={telefono}
                        fullWidth
                        required
                    />
                    <TextField
                        variant='outlined'
                        label="MASCOTA"
                        onChange={e => setMascota(e.target.value.toUpperCase())}
                        value={mascota}
                        fullWidth
                        required
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 1 }}>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={full} onChange={e => handleFull(e.target.checked)} color="success"/>} 
                        label="SERVICIO COMPLETO" 
                        labelPlacement="start" />
                    </FormGroup>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={corte} onChange={e => {setCorte(e.target.checked); if(corte) setFull(false); }} color="success"/>} 
                        label="CORTE" 
                        labelPlacement="start" />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={baño} onChange={e => {setBaño(e.target.checked); if(baño) setFull(false);}} color="success"/>} 
                        label="BAÑO" 
                        labelPlacement="start" />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={estetica} onChange={e => {setEstetica(e.target.checked); if(estetica) setFull(false);}} color="success"/>} 
                        label="ESTETICA" 
                        labelPlacement="start" />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={cepillado} onChange={e => {setCepillado(e.target.checked); if(cepillado) setFull(false);}} color="success"/>} 
                        label="CEPILLADO" 
                        labelPlacement="start" />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={limpoidos} onChange={e => {setLimpoidos(e.target.checked); if(limpoidos) setFull(false);}} color="success"/>} 
                        label="LIMP. OIDOS" 
                        labelPlacement="start" />
                    </FormGroup>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="number"
                        variant='outlined'
                        label="PRECIO"
                        onChange={e => setPrecio(e.target.value.toUpperCase())}
                        value={precio}
                        fullWidth
                        required
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Forma de pago"
                        onChange={e => setTipoPago(e.target.value.toUpperCase())}
                        value={tipoPago}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        label="FECHA"
                        onChange={e => setFecha(e.target.value)}
                        value={fecha}
                        fullWidth
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                    <TextField
                        type="time"
                        variant='outlined'
                        label="HORA"
                        onChange={e => setHora(e.target.value)}
                        value={hora}
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