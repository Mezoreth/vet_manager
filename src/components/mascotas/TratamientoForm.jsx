import React, {useState, forwardRef, useMemo} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from "react-router-dom"
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ButtonGroup from '@mui/material/ButtonGroup';

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
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import MedSearchForm from "../inventario/MedSearchForm.jsx"


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function DiagnosticoForm({ open, onClose }) {
    const [comer, setComer] = useState(false)
    const [comerInfo, setComerInfo] = useState('')
    const [vomitos, setVomitos] = useState(false)
    const [vomitosFecha, setVomitosFecha] = useState('')
    const [diarrea, setDiarrea] = useState(false)
    const [diarreaFecha, setDiarreFecha] = useState('')
    const [diarreaInfo, setDiarreaInfo] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [diagnostico, setDiagnostico] = useState('')
    const [diferencial, setDiferencial] = useState('')

    const [visual, setVisual] = useState('')
    const [ganglios, setGanglios] = useState('')
    const [temperatura, setTemperatura] = useState('')
    const [mucosas, setMucosas] = useState('')
    const [piel, setPiel] = useState('')
    const [fcardiaca, setFcardiaca] = useState('')
    const [fonendo, setFonendo] = useState('')
    const [abdominal, setAbdominal] = useState('')
    const [frespiratoria, setFrespiratoria] = useState('')
    const [peso, setPeso] = useState('')

    const [medicamento, setMedicamento] = useState('')
    const [dosis, setDosis] = useState('')
    const [via, setVia] = useState('')
    const [costo, setCosto] = useState(0)
    const [fecha, setFecha] = useState(null)

    const [openMedForm, setOpenMedForm] = useState(false);

    function handleSubmit(event) {
        //event.preventDefault();
        //console.log(nombre, especie, color, nacimiento, raza) 
    }

    const handleClickOpenMedForm = () => {
        setOpenMedForm(true);
    };
    const handleCloseMedForm = () => {
        setOpenMedForm(false);
    };

    return (
        <Dialog
          fullScreen
          open={open}
          TransitionComponent={Transition}
          onClose={onClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                SINTOMAS
            </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={comer} onChange={e => setComer(e.target.checked)} color="success"/>} 
                        label="Apetencia" 
                        labelPlacement="start" />
                    </FormGroup>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Que come/como?"
                        onChange={e => setComerInfo(e.target.value.toUpperCase())}
                        value={comerInfo}
                        fullWidth
                        disabled= {!comer}
                    />
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={vomitos} onChange={e => setVomitos(e.target.checked)} color="success"/>} 
                        label="Emesis" 
                        labelPlacement="start" />
                    </FormGroup>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Desde Cuando?"
                        onChange={e => setVomitosFecha(e.target.value.toUpperCase())}
                        value={vomitosFecha}
                        fullWidth
                        disabled= {!vomitos}
                    />
                    <FormGroup>
                        <FormControlLabel 
                        control={<Checkbox checked={diarrea} onChange={e => setDiarrea(e.target.checked)} color="success"/>} 
                        label="Enterorrea" 
                        labelPlacement="start" />
                    </FormGroup>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Desde Cuando?"
                        onChange={e => setDiarreFecha(e.target.value.toUpperCase())}
                        value={diarreaFecha}
                        fullWidth
                        disabled= {!diarrea}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Como es?"
                        onChange={e => setDiarreaInfo(e.target.value.toUpperCase())}
                        value={diarreaInfo}
                        fullWidth
                        disabled= {!diarrea}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 2 }}>              
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Otros sintomas"
                        onChange={e => setSintomas(e.target.value.toUpperCase())}
                        value={sintomas}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="DIAGNOSTICO"
                        onChange={e => setDiagnostico(e.target.value.toUpperCase())}
                        value={diagnostico}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="D.DIFERENCIAL"
                        onChange={e => setDiferencial(e.target.value.toUpperCase())}
                        value={diferencial}
                        fullWidth
                    />
                </Stack>
                <Stack>
                <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                        EXPLORACION
                    </Typography>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="VISUAL"
                        onChange={e => setVisual(e.target.value.toUpperCase())}
                        value={visual}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="GANGLIOS"
                        onChange={e => setGanglios(e.target.value.toUpperCase())}
                        value={ganglios}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="TEMPERATURA"
                        onChange={e => setTemperatura(e.target.value.toUpperCase())}
                        value={temperatura}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="MUCOSAS"
                        onChange={e => setMucosas(e.target.value.toUpperCase())}
                        value={mucosas}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="PIEL Y ANEXOS"
                        onChange={e => setPiel(e.target.value.toUpperCase())}
                        value={piel}
                        fullWidth
                    />
                    </Stack>
                    <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="F. CARDIACA"
                        onChange={e => setFcardiaca(e.target.value.toUpperCase())}
                        value={fcardiaca}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="FONENDO"
                        onChange={e => setFonendo(e.target.value.toUpperCase())}
                        value={fonendo}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="PAL. ABD."
                        onChange={e => setAbdominal(e.target.value.toUpperCase())}
                        value={abdominal}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="F. RESPIRATORIA"
                        onChange={e => setFrespiratoria(e.target.value.toUpperCase())}
                        value={frespiratoria}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="PESO"
                        onChange={e => setPeso(e.target.value.toUpperCase())}
                        value={peso}
                        fullWidth
                    />
                    </Stack>
                <Stack>
                <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                        TRATAMIENTO
                    </Typography>
                </Stack>
                <Stack spacing={1} direction="column" sx={{marginBottom: 4, marginRight: 10, marginLeft: 10 }}>
                <ButtonGroup variant="outlined" aria-label="Basic button group" fullWidth>
                  <Button color='success' onClick={handleClickOpenMedForm} >AGREGAR MEDICAMENTO CONSULTORIO</Button>
                  <Button color='success' onClick={handleClickOpenMedForm} >AGREGAR MEDICAMENTO FARMACIA</Button>
                </ButtonGroup>
                    <MedicTable />
                    <MedSearchForm open={openMedForm} onClose={handleCloseMedForm}/>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                </Stack>
                <Button variant="outlined"  color='success' type="submit">Registrar</Button>
                <Button onClick={onClose} color='error'>Cancelar</Button>
            </form> 
          </DialogContent>
        </Dialog>
    )
}

function createData(id, medicamento, dosis, via, precio, fecha, dia) {
    return {
      id,
      medicamento,
      dosis,
      via,
      precio,
      fecha,
      dia
    };
  }

  const rows = [
    createData(1, "Medicamento A", 25, "oral", 25.00, "2024-10-01", 1),
    createData(2, "Medicamento B", 30, "intravenosa", 30.00, "2024-10-02", 1),
    createData(3, "Medicamento A", 40, "oral", 40.00, "2024-10-03", 1),
    createData(4, "Medicamento C", 50, "intramuscular", 50.00, "2024-10-04", 1),
    createData(5, "Medicamento A", 35, "oral", 35.00, "2024-10-05", 1),
    createData(6, "Medicamento B", 20, "subcutánea", 20.00, "2024-10-06", 1),
  ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  const headCells = [
    {
      id: 'medicamento',
      numeric: false,
      disablePadding: false,
      label: 'MEDICAMENTO',
    },
    {
      id: 'dosis',
      numeric: false,
      disablePadding: false,
      label: 'DOSIS',
    },
    {
      id: 'via',
      numeric: false,
      disablePadding: false,
      label: 'VIA',
    },
    {
      id: 'precio',
      numeric: false,
      disablePadding: false,
      label: 'PRECIO',
    },
    {
      id: 'fecha',
      numeric: false,
      disablePadding: false,
      label: 'FECHA',
    },
    {
      id: 'dia',
      numeric: false,
      disablePadding: false,
      label: 'DIA',
    },
  ];
  
  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'center' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };
  
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;
    return (
      <Toolbar
        sx={[
          {
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
          },
          numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          },
        ]}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            LISTA DE MEDICAMENTOS
          </Typography>
        )}
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  
  function MedicTable() {
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('calories');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        );
      }
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const visibleRows = useMemo(
      () =>
        [...rows]
          .sort(getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
      [order, orderBy, page, rowsPerPage],
    );
  
    return (
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2, overflow: 'hidden' }}>
          <EnhancedTableToolbar numSelected={selected.length} />
          <TableContainer sx={{ maxHeight: 450 }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size='small'
              stickyHeader
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
  
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="left"
                      >
                        {row.medicamento} 
                    </TableCell>
                      <TableCell align="left">{row.dosis}</TableCell>
                      <TableCell align="left">{row.via}</TableCell>
                      <TableCell align="left">{ row.precio}</TableCell>
                      <TableCell align="left">{ row.fecha}</TableCell>
                      <TableCell align="left">{row.dia}</TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 33 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[25, 35]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </Paper>
      </Box>
    );
  }