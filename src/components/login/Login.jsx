import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { TextField, Stack} from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import axios from  'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    let usuarioData = {
      usuario: usuario,
      pass: password,
    };

    axios.post('http://127.0.0.1:3000/api/auth', usuarioData)
    .then(response =>{
      if (response.data === 'admin'){
        setIsAuthenticated(true);  
        navigate('/clientes');  
      }
      else{
        console.log('Credenciales incorrectas')
      }
    })
    .catch(error =>{
      console.error('Hubo un error al obtener los datos', error);
    });
  }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={4} >
          </Grid>
          <Grid size={8}>

          </Grid>
          <Grid size={4}>
            
          </Grid>
          <Grid size={8}>
            <UsuarioCard handleSubmit={handleSubmit} usuario={usuario} setUsuario={setUsuario} password={password} setPassword={setPassword} />
          </Grid>
        </Grid>
      </Box>
    );
  }
  
  function UsuarioCard({ handleSubmit, usuario, setUsuario, password, setPassword }) {
    return (
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader title="LOGIN" sx={{ textAlign: 'center' }} />
        <CardContent>
          <form>
            <Stack spacing={2} direction="column" sx={{ paddingRight: 6, paddingLeft: 6, paddingBottom: 3 }}>
              <TextField
                type="text"
                variant="standard"
                label="USUARIO"
                onChange={(e) => setUsuario(e.target.value.toUpperCase())}
                value={usuario}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                type="password"
                variant="standard"
                label="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Stack>
          </form>
        </CardContent>
        <CardActions>
          <Button onClick={handleSubmit} variant="contained" color="success" fullWidth>
            INGRESAR
          </Button>
        </CardActions>
      </Card>
    );
  }