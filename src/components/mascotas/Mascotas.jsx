import {useState, forwardRef, Fragment }from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, textFieldClasses } from '@mui/material';

import BasicButtons from '../CrudButtons';
import SearchBar from '../SearchBar';
import MascotaForm from './MascotaForm';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BiotechIcon from '@mui/icons-material/Biotech';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import EmergencyIcon from '@mui/icons-material/Emergency';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from "react-router-dom";

import DiagnosticoForm from './TratamientoForm';
import VacunaForm from './VacunaForm';
import DesparForm from './DesparasitacionForm';
import SupresorForm from './SupresorForm';

export default function Mascotas() {
  const [windowView, setWindowView ] = useState('');
  const handleClick = () =>{
    setWindowView('form')
  }
    return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
        <Grid size={4} >
          <SearchBar />
        </Grid>
        <Grid size={8}>
          <BasicButtons variant='contained' handleNewClick={handleClick}/>
        </Grid>
        <Grid size={4}>
            <MascotasList setWindowView={setWindowView}/>
        </Grid>
        <Grid size={8}>
        {windowView === 'form' ? (
            <MascotaForm />
          ) : (
            <div>
              <MascotasCard/>
              <MascotasTabs />
            </div>
          )}
        </Grid>
      </Grid>
      </Box>
    );
  }

  function MascotasList({setWindowView}) {
    const [selectedIndex, setSelectedIndex] = useState(1);
  
    const handleListItemClick = (event, index) => {
      setSelectedIndex(index);
      setWindowView('');
    };
  
    return (
      <Box sx={{ width: '100%', bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary, border:0}} >
          <Typography variant="h6" component="div" sx={{ marginBottom: 1, marginTop: 2, textAlign: 'center', color: 'primary.main'}}>
            LISTA DE MASCOTAS
          </Typography>
        <List component="nav" aria-label="lista-de-clientes" >
          <ListItemButton
            selected={selectedIndex === 1}
            onClick={(event) => handleListItemClick(event, 1)}
          >
            <ListItemText primary="MILO" secondary="DUEÑO: JUAN PEREZ" sx={{ textAlign: 'center'}}/>
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 2}
            onClick={(event) => handleListItemClick(event, 2)}
          >
            <ListItemText primary="MAX" secondary="DUEÑO: JUAN PEREZ" sx={{ textAlign: 'center'}} />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 3}
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemText primary="COCO" secondary="DUEÑO: JUAN PEREZ" sx={{ textAlign: 'center'}} />
          </ListItemButton>
          <ListItemButton
            selected={selectedIndex === 4}
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemText primary="DAISY" secondary="DUEÑO: JUAN PEREZ" sx={{ textAlign: 'center'}} />
          </ListItemButton>
        </List>
        <Divider />
      </Box>
    );
  }

  function MascotasCard() {
    return (
        <Card maxWidth sx={{paddingRight:3, paddingLeft: 3, border:0 }}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
              INFORMACION GENERAL: MASCOTA
            </Typography>
  
            <Grid container spacing={2} sx={{textAlign: 'left'}}>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>NOMBRE:</strong> MILO
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>ESPECIE:</strong>  FELINO
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>RAZA:</strong> MESTIZO
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>COLOR:</strong> ATIGRADO
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>SEXO:</strong> M
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>NACIMIENTO:</strong> 01/05/2020
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>EDAD:</strong> 4 AÑOS
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>FALLECIDO:</strong> NO
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>REPRODUCTOR:</strong> NO
                  </Typography>
              </Grid>
              <Grid size={3}>
                  <Typography variant="body2">
                    <strong>CASTRADO:</strong> SI
                  </Typography>
              </Grid>
              <Grid size={4}>
                  <Typography variant="body2">
                    <strong>F. CASTRADO:</strong> 01/05/2020
                  </Typography>
              </Grid>
              <Grid size={12}>
                  <Typography variant="body2">
                    <strong>OBSERVACIONES:</strong> ...
                  </Typography>
              </Grid>
              <Grid size={12}>
                <Typography variant="h6" component="div" sx={{ textAlign: 'left', color: 'primary.main'}}>
                  DUEÑO
                </Typography>
              </Grid>
              <Grid size={6}>
                  <Typography variant="body2">
                    <strong>NOMBRE:</strong> JUAN PEREZ
                  </Typography>
              </Grid>
              <Grid size={6}>
                  <Typography variant="body2">
                    <strong>TELEFONO:</strong> 4567890
                  </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
    );
  }
  
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function MascotasTabs() {
  const [value, setValue] = useState(0);
  const [openTrat, setOpenTrat] = useState(false);
  const [openVac, setOpenVac] = useState(false);
  const [openDesp, setOpenDesp] = useState(false);
  const [openSupr, setOpenSupr] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const handleClickOpenTrat = () => {
    setOpenTrat(true);
  };
  const handleCloseTrat = () => {
    setOpenTrat(false);
  };

  const handleClickOpenVac = () => {
    setOpenVac(true);
  };
  const handleCloseVac = () => {
    setOpenVac(false);
  };

  const handleClickOpenDesp = () => {
    setOpenDesp(true);
  };
  const handleCloseDesp = () => {
    setOpenDesp(false);
  };

  const handleClickOpenSupr = () => {
    setOpenSupr(true);
  };
  const handleCloseSupr = () => {
    setOpenSupr(false);
  };

  return (
    <Card maxWidth sx={{paddingRight:3, paddingLeft: 3, border:0 }}>
    <CardContent>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<MedicalInformationIcon />} label="Tratamientos" {...a11yProps(0)} />
          <Tab icon={<VaccinesIcon />} label="Vacunas" {...a11yProps(1)} />
          <Tab icon={<MedicationLiquidIcon />} label="Desparasitaciones" {...a11yProps(2)} />
          <Tab icon={<EmergencyIcon />} label="Supresor de Celo" {...a11yProps(3)} />
          <Tab icon={<BiotechIcon />} label="Laboratorios" {...a11yProps(4)} />
        </Tabs>
      </Box>
        <CustomTabPanel value={value} index={0}>
          <ButtonGroup variant="contained"  sx={{marginBottom: 3 }} >
            <Button color= 'success' size="small" onClick={ handleClickOpenTrat } >Agregar</Button>
            <Button color= 'info' size="small"  >Modificar</Button>
            <Button color= 'error' size="small"  >Eliminar</Button>
          </ButtonGroup>
          <DiagnosticoForm open={openTrat} onClose={handleCloseTrat} />
          <DenseTable />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <ButtonGroup variant="contained" sx={{marginBottom: 3 }} >
            <Button color= 'success' size="small" onClick={ handleClickOpenVac}>Agregar</Button>
            <Button color= 'info' size="small"  >Modificar</Button>
            <Button color= 'error' size="small"  >Eliminar</Button>
          </ButtonGroup>
          <VacunaForm open={openVac} onClose={handleCloseVac} />
          <VacunaTable />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ButtonGroup variant="contained"  sx={{marginBottom: 3 }} >
            <Button color= 'success' size="small" onClick={ handleClickOpenDesp }>Agregar</Button>
            <Button color= 'info' size="small"  >Modificar</Button>
            <Button color= 'error' size="small"  >Eliminar</Button>
          </ButtonGroup>
          <DesparForm open={openDesp} onClose={handleCloseDesp} />
          <DesparTable />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
        <ButtonGroup variant="contained"  sx={{marginBottom: 3 }} >
            <Button color= 'success' size="small" onClick={ handleClickOpenSupr}>Agregar</Button>
            <Button color= 'info' size="small"  >Modificar</Button>
            <Button color= 'error' size="small"  >Eliminar</Button>
          </ButtonGroup>
          <SupresorForm open={openSupr} onClose={handleCloseSupr} />
          <SuprTable/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          Lab
        </CustomTabPanel>
      </CardContent>
      </Card>
  );
}


function createData(id, name, calories, fat, carbs, protein) {
  return {id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, 'Otitis externa', 'Infección de oído, Parásitos', '2024-01-15'),
  createData(2, 'Dermatitis alérgica', 'Infección secundaria, Dermatitis por contacto', '2024-02-20'),
  createData(3, 'Gastritis', 'Infección gastrointestinal, Intoxicación', '2024-03-10'),
  createData(4, 'Infección urinaria', 'Cálculos urinarios, Diabetes', '2024-04-05'),
  createData(5, 'Parvovirus', 'Gastroenteritis, Intoxicación', '2024-05-01'),
  createData(6, 'Leptospirosis', 'Brucelosis, Enfermedad de Lyme', '2024-06-15'),
  createData(7, 'Flebite', 'Infección, Traumatismo', '2024-07-20'),
  createData(8, 'Hipotiroidismo', 'Hiperadrenocorticismo, Diabetes mellitus', '2024-08-25'),
  createData(9, 'Alergia alimentaria', 'Dermatitis, Infección intestinal', '2024-09-10'),
  createData(10, 'Tinción de ojos', 'Conjuntivitis, Glaucoma', '2024-09-30'),
];

function DenseTable() {
  const navigateTrat= useNavigate();
  const handleClickTrat=() => {
    navigateTrat("/mascotas");
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Diagnostico</TableCell>
            <TableCell align="left">D.diferencial</TableCell>
            <TableCell align="right">Fecha&nbsp;</TableCell>
            <TableCell align="right">Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">
                      <IconButton id={rows.id} aria-label="go to pet" size="small" color='success' onClick={handleClickTrat} >
                        <VisibilityOutlinedIcon fontSize="inherit" />
                      </IconButton>
                    </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const rowsV = [
  createData('Vacuna contra la rabia', '2024-01-10', '2024-01-25'),
  createData('Vacuna parvovirus', '2024-02-15', '2024-03-01'),
  createData('Vacuna contra leptospirosis', '2024-03-20', '2024-04-04'),

];
function VacunaTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>PRODUCTO</TableCell>
            <TableCell align="left">FECHA INICIO</TableCell>
            <TableCell align="right">FECHA REFUERZO&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsV.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const rowsD = [
  createData('Desparasitante intestinal A', 'Interno', '2024-01-05', '2024-01-20'),
  createData('Desparasitante externo A', 'Externo', '2024-01-15', '2024-01-30'),
  createData('Desparasitante intestinal B', 'Interno', '2024-02-10', '2024-02-25'),
  createData('Desparasitante externo B', 'Externo', '2024-02-20', '2024-03-06'),
];
function DesparTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>PRODUCTO</TableCell>
            <TableCell align="left">FECHA INICIO</TableCell>
            <TableCell align="right">FECHA REFUERZO&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsD.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const rowsS = [
  createData('Desparasitante intestinal A', 'Interno', '2024-01-05', '2024-01-20'),
  createData('Desparasitante externo A', 'Externo', '2024-01-15', '2024-01-30'),
  createData('Desparasitante intestinal B', 'Interno', '2024-02-10', '2024-02-25'),
  createData('Desparasitante externo B', 'Externo', '2024-02-20', '2024-03-06'),
];
function SuprTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>PRODUCTO</TableCell>
            <TableCell align="left">FECHA INICIO</TableCell>
            <TableCell align="right">FECHA REFUERZO&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsD.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}