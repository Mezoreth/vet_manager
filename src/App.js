import './App.css';
import NavigationMenu from './components/NavMenu.jsx'
import { Routes, Route, Navigate } from 'react-router-dom';
import Clientes from './components/clientes/Clientes.jsx';
import Mascotas from './components/mascotas/Mascotas.jsx';
import Inventario from './components/inventario/Inventario.jsx';
import Servicios from './components/servicios/Servicios.jsx';
import Ventas from './components/ventas/Ventas.jsx';
import Notificaciones from './components/notificaciones/notificaciones.jsx';
import Usuario from './components/usuarios/Usuarios.jsx';
import Login from './components/login/Login.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles/index.js';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { useAuth } from './AuthContext';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
       <CssBaseline />
        <body  >
          <NavigationMenu />
            <Box>
            {isAuthenticated && <NavigationMenu />}
            
            <Routes>
              <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />

              <Route path='/clientes' element={isAuthenticated ? <Clientes /> : <Navigate to='/login' />} />
              <Route path='/mascotas' element={isAuthenticated ? <Mascotas /> : <Navigate to='/login' />} />
              <Route path='/inventario' element={isAuthenticated ? <Inventario /> : <Navigate to='/login' />} />
              <Route path='/usuarios' element={isAuthenticated ? <Usuario /> : <Navigate to='/login' />} />
              <Route path='/servicios' element={isAuthenticated ? <Servicios /> : <Navigate to='/login' />} />
              <Route path='/ventas' element={isAuthenticated ? <Ventas /> : <Navigate to='/login' />} />
              <Route path='/notificaciones' element={isAuthenticated ? <Notificaciones /> : <Navigate to='/login' />} />
            </Routes>
            </Box>
        </body>
    </ThemeProvider>
  );
}

export default App;