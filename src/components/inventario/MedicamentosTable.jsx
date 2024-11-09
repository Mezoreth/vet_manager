import { useState, useMemo } from "react";
import Box from '@mui/material/Box';
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
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

function createData(id, nombre, tipo, composicion, presentacion, fechaV, precioC, precioV, cantidad) {
    return {
      id,
      nombre,
      tipo,
      composicion,
      presentacion,
      fechaV,
      precioC,
      precioV,
      cantidad
    };
  }
    
  const rows = [
    createData(1, "ANTIBIÓTICO CANINO", "TABLETAS", "ORAL", "CÁPSULAS", "2024-10-01", 10, 20.00, 15),
    createData(2, "DESPARASITANTE FELINO", "LIQUIDO", "ORAL", "FRASCOS", "2024-10-02", 11, 25.00, 20),
    createData(3, "VACUNA PARVOVIRUS", "INYECCIÓN", "SUBCUTÁNEA", "AMPOLLETAS", "2024-10-03", 9, 30.00, 10),
    createData(4, "ANTINFLAMATORIO", "TABLETAS", "ORAL", "BLISTERS", "2024-10-04", 8, 10.00, 25),
    createData(5, "ANTIPULGAS", "SPOT-ON", "EXTERNO", "TUBOS", "2024-10-05", 16, 30.00, 5),
    createData(6, "SUPLEMENTO ARTICULAR", "TABLETAS", "ORAL", "BOTES", "2024-10-06", 8, 12.00, 18),
    createData(7, "ANTIBIÓTICO FELINO", "TABLETAS", "ORAL", "BLISTERS", "2024-10-07", 12, 20.00, 12),
    createData(8, "VACUNA RABIA", "INYECCIÓN", "SUBCUTÁNEA", "AMPOLLETAS", "2024-10-08", 20, 25.00, 9),
    createData(9, "SUPLEMENTO OMEGA-3", "TABLETAS", "ORAL", "BOTES", "2024-10-09", 20, 40.00, 6),
    createData(10, "ANTIDIARREICO", "TABLETAS", "ORAL", "BLISTERS", "2024-10-10", 15, 25.00, 7),
    createData(11, "INMUNOESTIMULANTE", "POLVO", "ORAL", "BOTES", "2024-10-11", 20, 30.00, 8),
    createData(12, "ALERGIAS FELINAS", "TABLETAS", "ORAL", "BLISTERS", "2024-10-12", 17, 15.00, 20),
    createData(13, "ANALGÉSICO", "TABLETAS", "ORAL", "BLISTERS", "2024-10-13", 17, 20.00, 13),
    createData(14, "ANTIPULGAS CANINO", "SPOT-ON", "EXTERNO", "TUBOS", "2024-10-14", 9, 10.00, 25),
    createData(15, "SUPLEMENTO DIGESTIVO", "TABLETAS", "ORAL", "BOTES", "2024-10-15", 30, 35.00, 5),
    createData(16, "VACUNA MOQUILLO", "INYECCIÓN", "SUBCUTÁNEA", "AMPOLLETAS", "2024-10-16", 9, 20.00, 17),
    createData(17, "ANTIBIÓTICO DE AMPOLLA", "LIQUIDO", "INTRAVENOSA", "AMPOLLETAS", "2024-10-17", 13, 15.00, 22),
    createData(18, "SUPLEMENTO DE CALCIO", "TABLETAS", "ORAL", "BOTES", "2024-10-18", 12, 25.00, 11),
    createData(19, "ANTIFÚNGICO", "TABLETAS", "ORAL", "BLISTERS", "2024-10-19", 25, 35.00, 9),
    createData(20, "SUERO ORAL", "LIQUIDO", "ORAL", "BOLSAS", "2024-10-20", 15, 20.00, 14),
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
          id: 'tipo',
          numeric: false,
          disablePadding: false,
          label: 'TIPO',
        },
        {
          id: 'composicion',
          numeric: false,
          disablePadding: false,
          label: 'COMPOSICION',
        },
        {
          id: 'presentacion',
          numeric: false,
          disablePadding: false,
          label: 'PRESENTACION',
        },
        {
          id: 'fechaV',
          numeric: false,
          disablePadding: false,
          label: 'VENCIMIENTO',
        },
        {
          id: 'precioV',
          numeric: true,
          disablePadding: false,
          label: 'P. COMPRA',
        },
        {
          id: 'precioC',
          numeric: true,
          disablePadding: false,
          label: 'P. VENTA',
        },
        {
          id: 'cantidad',
          numeric: true,
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
      
 export default function MedicamentosTable() {
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
                          <TableCell align="left">{row.tipo}</TableCell>
                          <TableCell align="left">{row.composicion}</TableCell>
                          <TableCell align="left">{row.presentacion}</TableCell>
                          <TableCell align="left">{row.fechaV}</TableCell>
                          <TableCell align="center">{row.precioC}</TableCell>
                          <TableCell align="center">{row.precioV}</TableCell>
                          <TableCell align="center">{row.cantidad}</TableCell>
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