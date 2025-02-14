import {useState }from 'react';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid2';

import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import CategoryIcon from '@mui/icons-material/Category';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import MedicamentosTable from './MedicamentosTable';
import ProductosTable from './ProductosTable';

export default function Inventario() {
  const [windowView, setWindowView ] = useState('med');
  const handleClick = (tipo) =>{
    console.log('Button clicked')
    setWindowView(tipo)
  }
    return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid size={12} >
                <BasicButtons handleClick= {handleClick} />
            </Grid>
            <Grid size={12}>
                <SearchBar />
            </Grid>
            <Grid size={12}>
            {windowView === 'product' ? (
              <ProductosTable />
            ) : (
              <MedicamentosTable />
            )}
            </Grid>
        </Grid>
      </Box>
    );
  }
  
function BasicButtons({ handleClick=()=> {} }) {
      return (
        <ButtonGroup variant='contained' aria-label="Basic button group"  fullWidth sx={{ height:'100%' , alignItems:'center', alignContent:'center', marginTop:2, border:0, bgcolor: (theme) => theme.palette.background.default }}>
          <Button color= 'success' startIcon={<MedicationLiquidIcon />}  onClick={() => handleClick('med')}>MEDICAMENTOS FARMACIA</Button>
          <Button color= 'warning' startIcon={<MedicationLiquidIcon />}  onClick={() => handleClick('med')}>MEDICAMENTOS CONSULTORIO</Button>
          <Button color= 'info' startIcon={<CategoryIcon />} onClick={() => handleClick('product')} >PET SHOP</Button>
        </ButtonGroup>
      );
  }

function SearchBar() {
      const [type, setType] = useState('codigo');
      const handleChange = (event) => {
        setType(event.target.value);
      }
      return (
        <Box sx={{ padding: 0.5 ,textAlign: 'center', border:0, bgcolor: (theme) => theme.palette.background.default }} >
        <FormControl sx={{ m: 1, minWidth: 75}}>
          <Select id="searchtype" onChange={handleChange} displayEmpty defaultValue={'codigo'} sx={{ width: 120, height: 34 ,fontSize: '0.9rem' , padding: '5px' }} >
          <MenuItem value={'codigo'}>Codigo</MenuItem>
          <MenuItem value={'nombre'}>Nombre</MenuItem>
          <MenuItem value={'vencer'}>Por vencer</MenuItem>
        </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 400}}>
        <TextField
          variant="outlined"
          placeholder= {`Buscar por ${type}`}
          fullWidth
          sx={{
            width: 300,  
            height: 34, 
            fontSize: '0.9rem', 
            '& .MuiInputBase-input': {
              padding: '5px'  
              }
          }}
          InputProps={{
            startAdornment: (
              <IconButton type="button" sx={{ p: '2px' }} aria-label="search">
              <SearchIcon />
              </IconButton>
            ),
          }}
        />
        </FormControl>
        </Box>
      );
    }