import React, {useState, forwardRef, useMemo} from 'react';
import { TextField, InputAdornment , Button, Container, Stack, Typography, setRef } from '@mui/material';
import { Link } from "react-router-dom"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Slide from '@mui/material/Slide';
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


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  
export default function MedSearchForm({ open, onClose }) {
    const [medicamento, setMedicamento] = useState('')
    const [dosis, setDosis] = useState('')
    const [via, setVia] = useState('SC')
    const [precio, setPrecio] = useState('')
    const [fecha, setFecha] = useState()
    const [dia, setDia] = useState('')

    function handleSubmit(event) {
        event.preventDefault();
    };

    return (
        <Dialog
            maxWidth= "300px"
            open={open}
            TransitionComponent={Transition}
            onClose={onClose}
        >
          <DialogContent>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                BUSCAR MEDICAMENTO FARMACIA
            </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
            <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Buscar Medicamento"
                        onChange={e => setMedicamento(e.target.value.toUpperCase())}
                        value={medicamento}
                        fullWidth
                        required
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                Buscar
                              </InputAdornment>
                            ),
                          }}
                    />
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Dosis ml"
                        onChange={e => setDosis(e.target.value)}
                        value={dosis}
                        required
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Via"
                        onChange={e => setVia(e.target.value)}
                        value={via}
                        fullWidth
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        label="Fecha"
                        onChange={e => setFecha(e.target.value)}
                        value={fecha}
                        fullWidth
                        required
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Frecuencia de aplicacion"
                        onChange={e => setDia(e.target.value)}
                        value={dia}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Tiempo"
                        onChange={e => setDia(e.target.value)}
                        value={dia}
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="cantidad"
                        onChange={e => setDia(e.target.value)}
                        value={dia}
                        required
                        fullWidth
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Precio"
                        onChange={e => setDia(e.target.value)}
                        value={dia}
                        required
                        fullWidth
                    />
                </Stack>
                <Button variant="outlined"  color='success' >Seleccionar</Button>
                <Button onClick={onClose} color='error'>Cancelar</Button>
            </form> 
            <MedicSearchTable />
          </DialogContent>
        </Dialog>
    )
}


function createData(id, medicamento, tipo, precio, vencimiento, cantidad) {
    return {
      id,
      medicamento,
      tipo,
      precio,
      vencimiento,
      cantidad
    };
  }

  const rows = [
    createData(1, "Medicamento A", 25, "oral", 25.00, "2024-10-01", 1),
    createData(2, "Medicamento B", 30, "intravenosa", 30.00, "2024-10-02", 1),
    createData(3, "Medicamento A", 40, "oral", 40.00, "2024-10-03", 1),
    createData(4, "Medicamento C", 50, "intramuscular", 50.00, "2024-10-04", 1),
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
      id: 'tipo',
      numeric: false,
      disablePadding: false,
      label: 'TIPO',
    },
    {
      id: 'precio',
      numeric: false,
      disablePadding: false,
      label: 'PRECIO',
    },
    {
        id: 'vencimiento',
        numeric: false,
        disablePadding: false,
        label: 'VENCIMIENTO',
    },
    {
      id: 'cantidad',
      numeric: false,
      disablePadding: false,
      label: 'CANTIDAD',
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
  
  function MedicSearchTable() {
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
                      <TableCell align="left">{row.tipo}</TableCell>
                      <TableCell align="left">{ row.precio}</TableCell>
                      <TableCell align="left">{ row.vencimiento}</TableCell>
                      <TableCell align="left">{row.cantidad}</TableCell>
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