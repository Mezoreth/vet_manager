import React, {useState, forwardRef} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function DiagnosticoForm({ open, onClose }) {
    const [comer, setComer] = useState(false)
    const [comerInfo, setComerInfo] = useState('')
    const [vomitos, setVomitos] = useState(false)
    const [vomitosFecha, setVomitosFecha] = useState('')
    const [diarrea, setDiarrea] = useState(false)
    const [diarreaFecha, setDiarreFecha] = useState('')
    const [diarreaInfo, setDiarreaInfo] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [diagnostico, setDiagnostico] = useState('')
    const [diferencial, setDiferencial] = useState('')

    const [visual, setVisual] = useState('')
    const [ganglios, setGanglios] = useState('')
    const [temperatura, setTemperatura] = useState('')
    const [mucosas, setMucosas] = useState('')
    const [piel, setPiel] = useState('')
    const [fcardiaca, setFcardiaca] = useState('')
    const [fonendo, setFonendo] = useState('')
    const [abdominal, setAbdominal] = useState('')
    const [frespiratoria, setFrespiratoria] = useState('')
    const [peso, setPeso] = useState('')

    function handleSubmit(event) {
        //event.preventDefault();
        //console.log(nombre, especie, color, nacimiento, raza) 
    }

    return (
        <Dialog
          fullScreen
          open={open}
          TransitionComponent={Transition}
          onClose={onClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                SINTOMAS
            </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={comer} onChange={e => setComer(e.target.checked)} color="success"/>} 
                        label="Comer" 
                        labelPlacement="start" />
                    </FormGroup>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Que come/como?"
                        onChange={e => setComerInfo(e.target.value.toUpperCase())}
                        value={comerInfo}
                        fullWidth
                        disabled= {!comer}
                    />
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={vomitos} onChange={e => setVomitos(e.target.checked)} color="success"/>} 
                        label="Vomitos" 
                        labelPlacement="start" />
                    </FormGroup>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Desde Cuando?"
                        onChange={e => setVomitosFecha(e.target.value.toUpperCase())}
                        value={vomitosFecha}
                        fullWidth
                        disabled= {!vomitos}
                    />
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={diarrea} onChange={e => setDiarrea(e.target.checked)} color="success"/>} 
                        label="Diarrea" 
                        labelPlacement="start" />
                    </FormGroup>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Desde Cuando?"
                        onChange={e => setDiarreFecha(e.target.value.toUpperCase())}
                        value={diarreaFecha}
                        fullWidth
                        disabled= {!diarrea}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Como es?"
                        onChange={e => setDiarreaInfo(e.target.value.toUpperCase())}
                        value={diarreaInfo}
                        fullWidth
                        disabled= {!diarrea}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 2 }}>              
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Otros sintomas"
                        onChange={e => setSintomas(e.target.value.toUpperCase())}
                        value={sintomas}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="DIAGNOSTICO"
                        onChange={e => setDiagnostico(e.target.value.toUpperCase())}
                        value={diagnostico}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="D.DIFERENCIAL"
                        onChange={e => setDiferencial(e.target.value.toUpperCase())}
                        value={diferencial}
                        fullWidth
                    />
                </Stack>
                <Stack>
                <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                        EXPLORACION
                    </Typography>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="VISUAL"
                        onChange={e => setVisual(e.target.value.toUpperCase())}
                        value={visual}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="GANGLIOS"
                        onChange={e => setGanglios(e.target.value.toUpperCase())}
                        value={ganglios}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="TEMPERATURA"
                        onChange={e => setTemperatura(e.target.value.toUpperCase())}
                        value={temperatura}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="MUCOSAS"
                        onChange={e => setMucosas(e.target.value.toUpperCase())}
                        value={mucosas}
                        fullWidth
                    />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="PIEL Y ANEXOS"
                        onChange={e => setPiel(e.target.value.toUpperCase())}
                        value={piel}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="F. CARDIACA"
                        onChange={e => setFcardiaca(e.target.value.toUpperCase())}
                        value={fcardiaca}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="FONENDO"
                        onChange={e => setFonendo(e.target.value.toUpperCase())}
                        value={fonendo}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="PAL. ABD."
                        onChange={e => setAbdominal(e.target.value.toUpperCase())}
                        value={abdominal}
                        fullWidth
                    />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="F. RESPIRATORIA"
                        onChange={e => setFrespiratoria(e.target.value.toUpperCase())}
                        value={frespiratoria}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="PESO"
                        onChange={e => setPeso(e.target.value.toUpperCase())}
                        value={peso}
                        fullWidth
                    />
                </Stack>
                <Button variant="outlined"  color='success' type="submit">Registrar</Button>
                <Button onClick={onClose} color='error'>Cancelar</Button>
            </form> 
          </DialogContent>
        </Dialog>
    )
}
