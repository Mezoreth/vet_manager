import React, {useState, useEffect, useMemo} from 'react';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Autocomplete from '@mui/material/Autocomplete';

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
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

export default function VentaForm(){
    const [producto, setProducto] = useState('')
    const [codigo, setCodigo] = useState('')
    const [precio, setPrecio] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [tipo, setTipo] = useState('')
    const [cantidadStock, setCantidadStock] = useState('')
    const [fechaVenta, setFechaVenta] = useState(null)
    const [fechaVenc, setFechaVenc] = useState(null)

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
    }

    const handleCancel = () => {
        navigate(0);
    };
    const products = [
        { label: 'Antipulgas y garrapatas' },
        { label: 'Desparasitante interno' },
        { label: 'Alimento medicinal para mascotas' },
        { label: 'Antiinflamatorio para perros' },
        { label: 'Suplemento articular' },
        { label: 'Shampoo dermatológico' },
        { label: 'Pomada cicatrizante' },
        { label: 'Vitaminas para perros y gatos' },
        { label: 'Lentes de contacto veterinarios' },
        { label: 'Solución limpiadora para oídos' },
    ]

    useEffect(() => {
      const fetchDate = async () => {
        try {
          const response = await fetch('http://worldtimeapi.org/api/timezone/America/La_Paz');
          const data = await response.json();
          const date = new Date(data.datetime);
          setFechaVenta(date.toISOString().split('T')[0]);
        } catch (error) {
          console.error('Error fetching date:', error);
        }
      };
  
      fetchDate();
    }, []);
    
    return (
        <Box sx={{paddingLeft:10, paddingRight:10, bgcolor: (theme) => theme.palette.background.default, color: (theme) => theme.palette.text.primary }} >
            <Typography variant="h6" component="div" sx={{ marginBottom: 2 , textAlign: 'left', color: 'primary.main'}}>
                Registrar Venta
            </Typography>
            <form onSubmit={handleSubmit} action={<Link to="/login" />}>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                <Autocomplete
                    disablePortal
                    options={products}
                    fullWidth
                    renderInput={(params) => 
                        <TextField
                        {...params}
                        type="text"
                        variant='outlined'
                        label="Producto"
                        onChange={e => setProducto(e.target.value.toUpperCase())}
                        value={producto}
                        fullWidth
                        required
                        />}
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Codigo"
                        onChange={e => setCodigo(e.target.value.toUpperCase())}
                        value={codigo}
                        fullWidth
                        required
                        autoFocus
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Precio"
                        onChange={e => setPrecio(e.target.value.toUpperCase())}
                        value={precio}
                        fullWidth
                        required
                        autoFocus
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Cantidad"
                        onChange={e => setCantidad(e.target.value.toUpperCase())}
                        value={cantidad}
                        required
                        fullWidth
                    />
                <Button color='success' type="submit">Agregar</Button>
                </Stack>
                <Stack spacing={2} direction="row" sx={{marginBottom: 4 }}>
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Presentación/Tipo"
                        onChange={e => setTipo(e.target.value.toUpperCase())}
                        value={tipo}
                        fullWidth
                        disabled
                    />
                    <TextField
                        type="text"
                        variant='outlined'
                        label="Cantidad en stock"
                        onChange={e => setCantidadStock(e.target.value.toUpperCase())}
                        value={cantidadStock}
                        fullWidth
                        disabled
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        label="Fecha de vencimiento"
                        onChange={e => setFechaVenc(e.target.value.toUpperCase())}
                        value={fechaVenc}
                        fullWidth
                        disabled
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                    <TextField
                        type="date"
                        variant='outlined'
                        label="Fecha de venta"
                        onChange={e => setFechaVenta(e.target.value.toUpperCase())}
                        value={fechaVenta}
                        fullWidth
                        slotProps={{
                            inputLabel: {
                            shrink: true,
                            },
                        }}
                    />
                </Stack>
                <Button variant="outlined"  color='success' type="submit">Registrar Venta</Button>
                <Button variant="outlined"  color='error' onClick={handleCancel} >Cancelar</Button>
            </form> 
            <VentaTable/>
        </Box>
    )
}


function createData(id, producto, cantidad, precio, subtotal) {
    return {
      id,
      producto,
      cantidad,
      precio,
      subtotal,
    };
  }

  const rows = [
    createData(1, "producto A", 1, 25.00, 25.00),
    createData(2, "producto B", 2, 30.00, 60.00),
    createData(3, "producto A", 1, 40.00, 40.00),
    createData(4, "producto C", 3, 50.00, 150.00),
    createData(5, "producto A", 1, 35.00, 35.00),
    createData(6, "producto B", 1, 20.00, 20.00),
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
      id: 'producto',
      numeric: false,
      disablePadding: false,
      label: 'PRODUCTO',
    },
    {
      id: 'cantidad',
      numeric: false,
      disablePadding: false,
      label: 'CANTIDAD',
    },
    {
      id: 'precio',
      numeric: false,
      disablePadding: false,
      label: 'PRECIO (unit)',
    },
    {
        id: 'subtotal',
        numeric: false,
        disablePadding: false,
        label: 'SUBTOTAL',
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
            LISTA DE PRODUCTOS AGREGADOS
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
  
  function VentaTable() {
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
                        {row.producto} 
                    </TableCell>
                      <TableCell align="left">{row.cantidad}</TableCell>
                      <TableCell align="left">{ row.precio}</TableCell>
                      <TableCell align="left">{ row.subtotal}</TableCell>
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