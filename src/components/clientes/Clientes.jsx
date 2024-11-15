import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, textFieldClasses } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import BasicButtons from '../CrudButtons';
import SearchBar from '../SearchBar';
import ClienteForm from './ClienteForm';

import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import axios from  'axios';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function Clientes() {
  const [windowView, setWindowView ] = useState('');
  const [clientes, setClientes]= useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = () =>{
    setWindowView('form')
  }

  const handleListItemClick = (cliente) => {
    setSelectedCliente(cliente);
    setSelectedId(cliente.id_cliente);
    setWindowView('');
  };

  useEffect(()=>{
    axios.get('http://127.0.0.1:3000/api/clientes')
      .then(response =>{
        setClientes(response.data);
        console.log(JSON.stringify(response.data))
      })
      .catch(error =>{
        console.error('Hubo un error al obtener los datos', error);
      });
  },[])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={4} >
          <SearchBar />
        </Grid>
        <Grid size={8}>
          <BasicButtons handleNewClick= {handleClick} />
        </Grid>
        <Grid size={4}>
          <ClientesList clientes={clientes} selectedId = {selectedId} handleListItemClick={handleListItemClick}/>
        </Grid>
        <Grid size={8}>
        {windowView === 'form' ? (
            <ClienteForm />
          ) : (
            <div>
              <ClienteCard  cliente = {selectedCliente} />
              <MascotaCard />
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function ClientesList({clientes, selectedId, handleListItemClick }) {

  return (
    <Box sx={{ width: '100%', maxHeight: '80vh' , overflowY: 'auto' , bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary, border:0}} >
        <Typography variant="h6" component="div" sx={{ marginBottom: 1, marginTop: 2, textAlign: 'center', color: 'primary.main'}}>
          LISTA DE CLIENTES
        </Typography>
      <List component="nav" aria-label="lista-de-clientes" >
        { clientes.length <= 0 ? (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress />
            </Box>
        ) 
        : (
          clientes.map((cliente, index) => (
            <ListItemButton selected={cliente.id_cliente === selectedId} onClick={(event) => handleListItemClick(cliente)}>
              <ListItemText primary= {cliente.nombre_cliente} sx={{ textAlign: 'center',  border: cliente.observaciones ? '2px solid red' : '0'}} />
            </ListItemButton>
          ))
        )}
      </List>
      <Divider />
    </Box>
  );
}

function ClienteCard({cliente}) {
  if (!cliente) return <Typography>No hay cliente seleccionado</Typography>;
  return (
      <Card maxWidth sx={{paddingRight:3, paddingLeft: 3, border:0 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
            INFORMACION GENERAL: CLIENTE
          </Typography>

          <Grid container spacing={2} sx={{textAlign: 'left'}}>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>NOMBRE:</strong> {cliente.nombre_cliente}
                </Typography>
            </Grid>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>TELEFONOO:</strong> {cliente.telefono }
                </Typography>
            </Grid>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>DIRECCION:</strong> {cliente.direccion }
                </Typography>
            </Grid>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>CUMPLEAÑOS:</strong> {cliente.cumpleanos }
                </Typography>
            </Grid>
            <Grid size={12}>
                <Typography variant="body1">
                  <strong>OBSERVACIONES:</strong> {cliente.observaciones }
                </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
  );
}

function MascotaCard() {
  const navigatePet = useNavigate();

  const handleClickPet=() => {
    navigatePet("/mascotas");
  }
  return (
      <Card maxWidth sx={{paddingRight:3, paddingLeft: 3  }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2, textAlign: 'left', color: 'primary.main'}}>
             MASCOTAS
          </Typography>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> NOMBRE </TableCell>
                  <TableCell align="center">ESPECIE</TableCell>
                  <TableCell align="center">RAZA</TableCell>
                  <TableCell align="center">COLOR</TableCell>
                  <TableCell align="right">VER</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.nombre}
                    </TableCell>
                    <TableCell align="center">{row.especie}</TableCell>
                    <TableCell align="center">{row.raza}</TableCell>
                    <TableCell align="center">{row.color}</TableCell>
                    <TableCell align="right">
                      <IconButton id={row.id} aria-label="go to pet" size="small" color='success' onClick={handleClickPet} >
                        <VisibilityOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
  );
}

function createData(nombre, especie, raza, color, id) {
  return { nombre, especie, raza, color, id };
}

const rows = [
  createData('MAX', 'CANINO', 'MESTIZOO', 'M', 5),
  createData('MILO', 'FELINO', 'PERSA', 'H', 2),
];
