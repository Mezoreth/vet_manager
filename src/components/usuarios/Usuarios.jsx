import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, textFieldClasses } from '@mui/material';

import BasicButtons from '../CrudButtons';
import SearchBar from '../SearchBar';

export default function Usuarios() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={4} >
          <SearchBar />
          </Grid>
          <Grid size={8}>
          <BasicButtons variant='contained'/>

          </Grid>
          <Grid size={4}>
            <UsuariosList />
          </Grid>
          <Grid size={8}>
            <UsuarioCard />
          </Grid>
        </Grid>
      </Box>
    );
  }

  function UsuariosList() {
    const [selectedIndex, setSelectedIndex] = React.useState(1);
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
    };
  
    return (
      <Box sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary, border:0}} >
          <Typography variant="h6" component="div" sx={{ marginBottom: 1, marginTop: 2, textAlign: 'center', color: 'primary.main'}}>
            Lista de Usuarios
          </Typography>
        <List component="nav" aria-label="lista-de-clientes" >
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="Admin" sx={{ textAlign: 'center'}}/>
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="User 1" sx={{ textAlign: 'center'}} />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="User 2" sx={{ textAlign: 'center'}} />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemText primary="User 3" sx={{ textAlign: 'center'}} />
          </ListItemButton>
        </List>
        <Divider />
      </Box>
    );
  }
  
  /* function UsuarioCard() {
    return (
        <Card maxWidth sx={{paddingRight:3, paddingLeft: 3, border:0 }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
              Información general: Usuario
            </Typography>
  
            <Grid container spacing={2} sx={{textAlign: 'left'}}>
              <Grid size={6}>
                  <Typography variant="body1">
                    <strong>Usuario:</strong> Admin
                  </Typography>
              </Grid>
              <Grid size={6}>
                  <Typography variant="body1">
                    <strong>Contraseña:</strong> AS4567890
                  </Typography>
              </Grid>
              <Grid size={6}>
                  <Typography variant="body1">
                    <strong>Correo:</strong> admin@example.com
                  </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
    );
  }  */

// Asegúrate de que 'window.electronAPI.openFile' esté disponible en tu entorno
function UsuarioCard() {
  const [message, setMessage] = useState('');

  const openFile = async () => {
    if (!window.electronAPI) {
      const response = await window.electronAPI.openFile(); // Llama a la API
      setMessage(response); // Almacena el mensaje en el estado
    } else {
      console.error('electronAPI is not defined');
      setMessage('ElectronApi is not defined');
    }
  };

  return (
    <Box sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary, border:0}} >
      <button type="button" onClick={openFile}>Open a File</button>
      <div>
        File path: <strong>{message}</strong>
      </div>
    </Box>
  );
};
