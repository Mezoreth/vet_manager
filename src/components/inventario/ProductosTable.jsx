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

function createData(id, codigo, nombre, tipo, descripcion, fechaV, precioC, precioV, cantidad) {
    return {
      id,
      codigo,
      nombre,
      tipo,
      descripcion,
      fechaV,
      precioC,
      precioV,
      cantidad
    };
  }
    
  const rows = [
    createData("FC-001", "COLLAR_REFLECTANTE", "Collar Reflectante", "Collar", "Collar ajustable con material reflectante.", "", 10, 20.00, 15),
    createData("FC-002", "COMIDA_PERROS_ADULTOS", "Comida Perros Adultos", "Alimento", "Alimento seco para perros adultos, sabor pollo.", "2024-10-02", 5, 45.00, 10),
    createData("FC-003", "JUGUETE_PELOTA", "Pelota de Goma", "Juguete", "Pelota resistente para perros, ideal para jugar.", "", 20, 12.50, 25),
    createData("FC-004", "COLLAR_CUERO", "Collar de Cuero", "Collar", "Collar de cuero genuino para perros grandes.", "", 15, 30.00, 8),
    createData("FC-005", "COMIDA_GATOS_ADULTOS", "Comida Gatos Adultos", "Alimento", "Alimento seco para gatos adultos, sabor atún.", "2024-10-05", 8, 40.00, 12),
    createData("FC-006", "JUGUETE_RATON", "Ratón de Juguete", "Juguete", "Ratón de juguete con catnip para gatos.", "", 30, 5.00, 30),
    createData("FC-007", "ACCESORIO_PLATO", "Plato Antideslizante", "Accesorio", "Plato para comida con base antideslizante.", "", 12, 15.00, 20),
    createData("FC-008", "COMIDA_SNACKS_PERROS", "Snacks para Perros", "Alimento", "Snacks saludables para perros, sabor carne.", "2024-10-08", 25, 10.00, 50),
    createData("FC-009", "CAMA_MASCOTAS", "Cama para Mascotas", "Mueble", "Cama cómoda y suave para perros y gatos.", "", 10, 70.00, 5),
    createData("FC-010", "ACCESORIO_ARNES", "Arneses Ajustables", "Accesorio", "Arnés ajustable para perros de diferentes tamaños.", "", 15, 25.00, 10),
    createData("FC-011", "COMIDA_GATOS_CACHORROS", "Comida Gatos Cachorros", "Alimento", "Alimento seco para gatos cachorros, sabor pollo.", "2024-10-11", 12, 50.00, 7),
    createData("FC-012", "JUGUETE_FRISBEE", "Frisbee de Plástico", "Juguete", "Frisbee ligero y duradero para perros.", "", 18, 18.00, 15),
    createData("FC-013", "COLLAR_TELA", "Collar de Tela", "Collar", "Collar de tela suave con estampados coloridos.", "", 20, 22.00, 12),
    createData("FC-014", "COMIDA_PERROS_CACHORROS", "Comida Perros Cachorros", "Alimento", "Alimento seco para cachorros, sabor cordero.", "2024-10-14", 10, 55.00, 8),
    createData("FC-015", "ACCESORIO_CEPILLO", "Cepillo para Mascotas", "Accesorio", "Cepillo para deshedding y mantenimiento del pelaje.", "", 22, 14.00, 18),
    createData("FC-016", "JUGUETE_TIRA", "Tira de Juguete", "Juguete", "Tira de juguete resistente para jugar a tirar.", "", 15, 8.00, 20),
    createData("FC-017", "COLLAR_ANTILADRIDOS", "Collar Antiladridos", "Collar", "Collar con control de ladridos para perros.", "", 5, 65.00, 3),
    createData("FC-018", "COMIDA_ROEDORES", "Comida para Roedores", "Alimento", "Alimento especial para roedores, mezcla de semillas.", "2024-10-18", 30, 25.00, 15),
    createData("FC-019", "ACCESORIO_TRANSPORTADORA", "Transportadora para Mascotas", "Accesorio", "Transportadora ligera y cómoda para mascotas.", "", 8, 90.00, 4),
    createData("FC-020", "COMIDA_AVES", "Comida para Aves", "Alimento", "Mezcla de semillas nutritivas para aves.", "2024-10-20", 50, 18.00, 25),
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
            id: 'codigo',
            numeric: false,
            disablePadding: false,
            label: 'CODIGO',
          },
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
          id: 'descripcion',
          numeric: false,
          disablePadding: false,
          label: 'DESCRIPCION',
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
                LISTA DE PRODUCTOS
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
      
 export default function ProductosTable() {
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
                            {row.codigo}
                          </TableCell>
                          <TableCell align="left">{row.nombre}</TableCell>
                          <TableCell align="left">{row.tipo}</TableCell>
                          <TableCell align="left">{row.descripcion}</TableCell>
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