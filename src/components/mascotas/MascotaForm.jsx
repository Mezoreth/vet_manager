import React, {useState} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const MascotaForm = () => {
    const [nombre, setNombre] = useState('')
    const [especie, setEspecie] = useState('')
    const [color, setColor] = useState('')
    const [raza, setRaza] = useState('')
    const [sexo, setSexo] = useState('')
    const [nacimiento, setNacimiento] = useState(null)
    const [reproductor, setReproductor] = useState(false)
    const [castrasdo, setCastrado] = useState(false)
    const [fcastrado, setFcastrado] = useState(null)
    const [fallecido, setFallecido] = useState(false)
    const [observaciones, setObservaciones] = useState('')

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        console.log(nombre, especie, color, nacimiento, raza) 
    }

    const handleCancel = () => {
        navigate(0);
    };
    
    return (
        <Box sx={{paddingLeft:5, paddingRight:5, bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary }} >
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                Registrar Mascota
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
                        label="Especie"
                        onChange={e => setEspecie(e.target.value.toUpperCase())}
                        value={especie}
                        fullWidth
                        required
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Raza"
                        onChange={e => setRaza(e.target.value.toUpperCase())}
                        value={raza}
                        fullWidth
                        sx={{mb: 4}}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Color"
                        onChange={e => setColor(e.target.value.toUpperCase())}
                        value={color}
                        fullWidth
                        sx={{mb: 4}}
                    />
                    <FormControl fullWidth >
                        <InputLabel id="select-label">Sexo</InputLabel>
                        <Select
                        value={sexo}
                        label="Sexo"
                        onChange={e => setSexo(e.target.value)}
                        >
                            <MenuItem value="">&nbsp;</MenuItem>
                            <MenuItem value='M'>M</MenuItem>
                            <MenuItem value='H'>H</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        type="date"
                        variant='outlined'
                        label="Fecha Nacimiento"
                        onChange={e => setNacimiento(e.target.value)}
                        value={nacimiento}
                        fullWidth
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={reproductor} onChange={e => setReproductor(e.target.checked)} color="success"/>} 
                        label="REPROODUCTOOR" 
                        labelPlacement="start" />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={castrasdo} onChange={e => setCastrado(e.target.checked)} color="success"/>} 
                        label="CASTRADO" 
                        labelPlacement="start" />
                    </FormGroup>
                    <TextField
                        type="date"
                        variant='outlined'
                        label="Fecha Castramiento"
                        size='small'
                        onChange={e => setFcastrado(e.target.value)}
                        value={fcastrado}
                        disabled= {!castrasdo}
                        required= {castrasdo}
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={fallecido} onChange={e => setFallecido(e.target.checked)} color="success"/>} 
                        label="FALLECIDO" 
                        labelPlacement="start" />
                    </FormGroup>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Observaciones"
                        color='info'
                        onChange={e => setObservaciones(e.target.value.toUpperCase())}
                        value={observaciones}
                        fullWidth
                    />
                </Stack>
                <Button variant="outlined"  color='success' type="submit">Registrar</Button>
                <Button variant="outlined"  color='error' onClick={handleCancel} >Cancelar</Button>
            </form> 
        </Box>
    )
}
 
export default MascotaForm;