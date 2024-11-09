import {useState} from 'react';
import Box from '@mui/material/Box';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SearchBar() {
    const [type, setType] = useState('');
    const handleChange = (event) => {
      setType(event.target.value);
    }
    return (
      <div>
      <Box sx={{ padding: 0.5 ,textAlign: 'center', border:0, bgcolor: (theme) => theme.palette.background.default }} >
      <FormControl sx={{ m: 1, minWidth: 115}}>
        <Select id="searchtype" onChange={handleChange} displayEmpty defaultValue={'nombre'} sx={{ height: 34 ,fontSize: '0.9rem' , padding: '5px' }} >
        <MenuItem value={'nombre'}>Nombre</MenuItem>
        <MenuItem value={'telefono'}>Telefono</MenuItem>
      </Select>
      </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200}}>
      <TextField
        variant="standard"
        placeholder= {`Buscar por ${type}`}
        fullWidth
        color="success"
        focused 
        sx={{
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
      </div>
    );
  }