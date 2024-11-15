import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

export default function BasicButtons({variant='contained', handleNewClick=()=> {}, handleEditClick=()=> {}, handleDeleteClick=()=> {}}) {
    return (
      <ButtonGroup variant={variant} aria-label="Basic button group" fullWidth sx={{ height:'100%' , alignItems:'center', alignContent:'center', border:0, bgcolor: (theme) => theme.palette.background.default }}>
        <Button color= 'success' startIcon={<AddIcon />} onClick={() => handleNewClick()} >Nuevo</Button>
        <Button color= 'info' startIcon={<EditIcon />}  onClick={() => handleEditClick()} >Editar</Button>
        <Button color= 'error' startIcon={<DeleteIcon />}  onClick={() => handleDeleteClick()} >Eliminar</Button>
      </ButtonGroup>
    );
  }