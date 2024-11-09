import { useState, useMemo } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import BasicButtons from '../CrudButtons';
import SearchBar from '../SearchBar';
import ServicioForm from './ServicioForm';

export default function Servicios(){
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
            <BasicButtons handleNewClick= {handleClick} />
          </Grid>
          <Grid size={12}>
          {windowView === 'form' ? (
            <ServicioForm />
          ) : (
            <EnhancedTable/>
          )}
          </Grid>
          <Grid size={8}>

          </Grid>
        </Grid>
      </Box>
    );
}

function createData(id, corte, baño, estetica, cepillado, fecha, hora, precio, obs) {
    return {
      id,
      corte,
      baño,
      estetica,
      cepillado,
      fecha,
      hora,
      precio,
      obs
    };
  }

  const rows = [
    createData(1, true, true, true, true, "2024-10-01", "10:00", 25.00, ""),
    createData(2, false, false, false, false, "2024-10-02", "11:00", 30.00, ""),
    createData(3, true, true, true, true, "2024-10-03", "09:00", 40.00, ""),
    createData(4, false, true, true, true, "2024-10-04", "14:00", 50.00, ""),
    createData(5, true, false, false, true, "2024-10-05", "16:00", 35.00, ""),
    createData(6, false, true, false, false, "2024-10-06", "12:00", 20.00, ""),
    createData(7, true, false, false, false, "2024-10-07", "10:30", 15.00, ""),
    createData(8, false, true, true, true, "2024-10-08", "17:00", 18.00, ""),
    createData(9, true, false, false, true, "2024-10-09", "15:00", 22.00, ""),
    createData(10, false, true, true, true, "2024-10-10", "13:00", 55.00, ""),
    createData(11, true, false, false, false, "2024-10-11", "09:30", 20.00, ""),
    createData(12, true, true, true, true, "2024-10-12", "11:30", 45.00, ""),
    createData(13, false, true, true, true, "2024-10-13", "14:30", 60.00, ""),
    createData(14, true, false, false, false, "2024-10-14", "10:15", 12.00, ""),
    createData(15, false, true, true, true, "2024-10-15", "16:30", 38.00, ""),
    createData(1, true, true, true, true, "2024-10-01", "10:00", 25.00, ""),
    createData(2, false, false, false, false, "2024-10-02", "11:00", 30.00, ""),
    createData(3, true, true, true, true, "2024-10-03", "09:00", 40.00, ""),
    createData(4, false, true, true, true, "2024-10-04", "14:00", 50.00, ""),
    createData(5, true, false, false, true, "2024-10-05", "16:00", 35.00, ""),
    createData(6, false, true, false, false, "2024-10-06", "12:00", 20.00, ""),
    createData(7, true, false, false, false, "2024-10-07", "10:30", 15.00, ""),
    createData(8, false, true, true, true, "2024-10-08", "17:00", 18.00, ""),
    createData(9, true, false, false, true, "2024-10-09", "15:00", 22.00, ""),
    createData(10, false, true, true, true, "2024-10-10", "13:00", 55.00, ""),
    createData(11, true, false, false, false, "2024-10-11", "09:30", 20.00, ""),
    createData(12, true, true, true, true, "2024-10-12", "11:30", 45.00, ""),
    createData(13, false, true, true, true, "2024-10-13", "14:30", 60.00, ""),
    createData(14, true, false, false, false, "2024-10-14", "10:15", 12.00, ""),
    createData(15, false, true, true, true, "2024-10-15", "16:30", 38.00, "")
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
      id: 'nombre',
      numeric: false,
      disablePadding: false,
      label: 'NOMBRE',
    },
    {
      id: 'telefono',
      numeric: false,
      disablePadding: false,
      label: 'TELEFONO',
    },
    {
      id: 'mascota',
      numeric: false,
      disablePadding: false,
      label: 'MASCOTA',
    },
    {
      id: 'corte',
      numeric: false,
      disablePadding: false,
      label: 'CORTE',
    },
    {
      id: 'baño',
      numeric: false,
      disablePadding: false,
      label: 'BAÑO',
    },
    {
      id: 'estetica',
      numeric: false,
      disablePadding: false,
      label: 'ESTETICA',
    },
    {
      id: 'cepillado',
      numeric: false,
      disablePadding: false,
      label: 'CEPILLADO',
    },
    {
      id: 'limpoidos',
      numeric: false,
      disablePadding: false,
      label: 'LIMP. OIDOS',
    },
    {
      id: 'fecha',
      numeric: false,
      disablePadding: false,
      label: 'FECHA',
    },
    {
      id: 'hora',
      numeric: false,
      disablePadding: false,
      label: 'HORA',
    },
    {
      id: 'precio',
      numeric: true,
      disablePadding: false,
      label: 'PRECIO',
    },
    {
      id: 'obs',
      numeric: false,
      disablePadding: false,
      label: 'OBSERVACIONES',
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
            LISTA DE SERVICIOS
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
  
  function EnhancedTable() {
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
                        {row.nombre} 
                      </TableCell>
                      <TableCell align="left">{row.telefono}</TableCell>
                      <TableCell align="left">{row.mascota}</TableCell>
                      <TableCell align="left">{ row.corte ? <CheckIcon/> : <CloseIcon/> }</TableCell>
                      <TableCell align="left">{ row.baño ? <CheckIcon/> : <CloseIcon/> }</TableCell>
                      <TableCell align="left">{row.estetica ? <CheckIcon/> : <CloseIcon/> }</TableCell>
                      <TableCell align="left">{row.cepillado ? <CheckIcon/> : <CloseIcon/>}</TableCell>
                      <TableCell align="left">{row.limpoidos ? <CheckIcon/> : <CloseIcon/>}</TableCell>
                      <TableCell align="left">{row.fecha}</TableCell>
                      <TableCell align="left">{row.hora}</TableCell>
                      <TableCell align="center">{row.precio}</TableCell>
                      <TableCell align="left">{row.obs}</TableCell>
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