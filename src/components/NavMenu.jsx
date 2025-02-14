import { useState } from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import PersonIcon from '@mui/icons-material/Person';
import PetsIcon from '@mui/icons-material/Pets';
import InventoryIcon from '@mui/icons-material/Inventory';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import { Link } from "react-router-dom";

export default function NavigationMenu() {
  const [value, setValue] = useState(null);

  return (
    <Box sx={{ width: 800 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction component={Link} to="/clientes" label="CLIENTES" icon={<PersonIcon fontSize= 'large' />} />
        <BottomNavigationAction component={Link} to="/mascotas" label="MASCOTAS" icon={<PetsIcon fontSize= 'large' />} />
        <BottomNavigationAction component={Link} to="/inventario" label="INVENTARIO" icon={<InventoryIcon fontSize='large' />} />
        <BottomNavigationAction component={Link} to="/servicios" label="SERVICIOS" icon={<ContentCutIcon fontSize= 'large' />} />
        <BottomNavigationAction component={Link} to="/ventas" label="VENTAS" icon={<PointOfSaleIcon fontSize= 'large' />} />
        <BottomNavigationAction component={Link} to="/notificaciones" label="NOTIFICACIONES" icon={<NotificationsIcon fontSize= 'large' />} />
        <BottomNavigationAction component={Link} to="/usuarios" label="USUARIOS" icon={<AccountCircleIcon fontSize= 'large' />} />
        <BottomNavigationAction component={Link} to="/configuraciones" label="CONFIGURACION" icon={<SettingsIcon fontSize= 'large' />} />
      </BottomNavigation>
    </Box>
  );
}