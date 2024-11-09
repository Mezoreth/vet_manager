import { useState } from 'react';
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
  console.log('Cliente cargadoo')
  const [windowView, setWindowView ] = useState('');
  const handleClick = () =>{
    setWindowView('form')
  }
  console.log('valor del state '+windowView)
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
          <ClientesList setWindowView= {setWindowView}/>
        </Grid>
        <Grid size={8}>
        {windowView === 'form' ? (
            <ClienteForm />
          ) : (
            <div>
              <ClienteCard />
              <MascotaCard />
            </div>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

function ClientesList({windowView, setWindowView }) {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex('index');
    setWindowView('');
  };

  return (
    <Box sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary, border:0}} >
        <Typography variant="h6" component="div" sx={{ marginBottom: 1, marginTop: 2, textAlign: 'center', color: 'primary.main'}}>
          LISTA DE CLIENTES
        </Typography>
      <List component="nav" aria-label="lista-de-clientes" >
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemText primary="JUAN PEREZ" sx={{ textAlign: 'center'}}/>
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="JAVIER MARTINEZ" sx={{ textAlign: 'center',  border: '2px solid red'}} />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="CARLOS ROMERO" sx={{ textAlign: 'center'}} />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemText primary="ELENA VARGAS" sx={{ textAlign: 'center'}} />
        </ListItemButton>
      </List>
      <Divider />
    </Box>
  );
}

function ClienteCard() {
  return (
      <Card maxWidth sx={{paddingRight:3, paddingLeft: 3, border:0 }}>
        <CardContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
            INFORMACION GENERAL: CLIENTE
          </Typography>

          <Grid container spacing={2} sx={{textAlign: 'left'}}>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>NOMBRE:</strong> JUAN PEREZ PARDO
                </Typography>
            </Grid>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>TELEFONOO:</strong> 4567890
                </Typography>
            </Grid>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>DIRECCION:</strong> 123 CALLE , CIUDAD
                </Typography>
            </Grid>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>CUMPLEAÑOS:</strong> 01 DE ENERO, 1990
                </Typography>
            </Grid>
            <Grid size={6}>
                <Typography variant="body1">
                  <strong>OBSERVACIONES:</strong>
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
