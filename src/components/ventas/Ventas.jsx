import { useState, useMemo } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CategoryIcon from '@mui/icons-material/Category';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import VentaForm from "./VentaForm";
import VentaReportes from "./VentaReportes";
import VentasAlerts from "./VentaAlerts"

export default function Ventas() {
    const [windowView, setWindowView ] = useState('');

    const handleClick = (tipo) =>{
      console.log('Button clicked')
      setWindowView(tipo)
    }

    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={12} >
              <PanelOptions handleClick= {handleClick}/>
          </Grid>
          <Grid size={12}>
            {windowView === 'form' ? (
              <VentaForm />
            ) : windowView === 'reportes' ? (
              <VentaReportes />
            ) : (
              <Grid size={12} >
              <Grid size={4} >
              <BasicButtons handleClick= {handleClick} />
              </Grid>
              <VentasAlerts/>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    );
}

function PanelOptions({ handleClick=()=> {} }) {
  return (
    <ButtonGroup variant='contained' aria-label="Basic button group"  fullWidth sx={{ height:'100%' , alignItems:'center', alignContent:'center', marginTop:2, border:0, bgcolor: (theme) => theme.palette.background.default }}>
      <Button color= 'info' startIcon={<MedicationLiquidIcon />}  onClick={() => handleClick('ventas')}>VENTAS</Button>
      <Button color= 'warning' startIcon={<CategoryIcon />} onClick={() => handleClick('reportes')} >REPORTES DE VENTAS</Button>
    </ButtonGroup>
  );
}

function BasicButtons({ handleClick=()=> {} }) {
    return (
      <ButtonGroup variant='contained' aria-label="Basic button group"  fullWidth sx={{ height:'100%' , alignItems:'center', alignContent:'center', marginTop:2, border:0, bgcolor: (theme) => theme.palette.background.default }}>
        <Button color= 'success' startIcon={<AddIcon />}  onClick={() => handleClick('form')}>REGISTRA VENTA</Button>
        <Button color= 'error' startIcon={<DeleteIcon />}  > ELIMINAR VENTA</Button>
      </ButtonGroup>
    );
}

function Background(){
    <Box sx={{paddingLeft:10, paddingRight:10, bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary }} >
    <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
        VENTAS PENDIENTES
    </Typography>
    </Box>
}