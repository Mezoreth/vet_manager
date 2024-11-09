import logo from './logo.svg';
import './App.css';
import NavigationMenu from './components/NavMenu.jsx'
import {Routes, Route } from 'react-router-dom';
import Clientes from './components/clientes/Clientes.jsx';
import Mascotas from './components/mascotas/Mascotas.jsx';
import Inventario from './components/inventario/Inventario.jsx';
import Servicios from './components/servicios/Servicios.jsx';
import Notificaciones from './components/notificaciones/notificaciones.jsx';
import Usuario from './components/usuarios/Usuarios.jsx';
import TratamientoForm from './components/mascotas/TratamientoForm.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles/index.js';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
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
            <Routes>
              <Route path='/clientes' element={<Clientes/>} />
              <Route path='/mascotas' element={<Mascotas/>} />
              <Route path='/inventario' element={<Inventario/>} />
              <Route path='/usuarios' element={<Usuario/>} />
              <Route path='/servicios' element={<Servicios/>} />
              <Route path='/notificaciones' element={<Notificaciones/>} />
            </Routes>
        </body>
    </ThemeProvider>
  );
}

export default App;