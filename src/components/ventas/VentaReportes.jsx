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
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BiotechIcon from '@mui/icons-material/Biotech';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import EmergencyIcon from '@mui/icons-material/Emergency';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import VoiceChatIcon from '@mui/icons-material/VoiceChat';


export default function VentaReportes(){

    return(
        <div>
        <ReportePanel/>
        <ReportesTable />
        </div>
    )
}

function ReportePanel(){
    const [type, setType] = useState('');
    const {dias, setDias} = useState('');
    const handleChange = (event) => {
      setType(event.target.value);
      if(type === 'dia'){
        setDias('1')
      }
      else if(type==='mes'){
        setDias('31')
      }
    }
    return(
        <Card maxWidth sx={{paddingRight:3, paddingLeft: 3, border:0 }}>
        <CardContent>
        <ReporteTabs />
        <Typography variant="h6" component="div" sx={{ marginBottom: 1 , textAlign: 'left', color: 'primary.main'}}>
            BUSCAR REPORTE
          </Typography>
        <FormControl sx={{ m: 1, minWidth: 115}}>
            <Select id="searchtype" onChange={handleChange} displayEmpty defaultValue={'nombre'} sx={{ height: 34 ,fontSize: '0.9rem' , padding: '5px' }} >
                <MenuItem value={'dia'}>DIA</MenuItem>
                <MenuItem value={'mes'}>MES</MenuItem>
            </Select>
        </FormControl>
      <FormControl sx={{ m: 1, minWidth: 200}}>
      <TextField 
        variant="standard" placeholder= {`Ingrese la cantidad en dias ${type}`} fullWidth color="success" focused 
        InputProps={{
          startAdornment: (
            <IconButton type="button" sx={{ p: '2px' }} aria-label="search">
            <SearchIcon />
            </IconButton>
          ),
        }}
      />
      </FormControl>
          <Typography variant="h6" component="div" sx={{ marginBottom: 2, marginTop:4 , textAlign: 'left', color: 'primary.main'}}>
            REPORTE DE VENTAS
          </Typography>
          <Grid container spacing={0} sx={{textAlign: 'left'}}>
            <Grid size={3}>
                <Typography variant="body1">
                  <strong>TOTAL DE VENTAS DE MES</strong> 
                </Typography>
            </Grid>
            <Grid size={3}>
                <Typography variant="body1">
                  <strong>BS 5000:</strong> 
                </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
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
function ReporteTabs() {
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
        <Tabs value={value} onChange={handleChange} >
          <Tab icon={<MedicalInformationIcon />} label="Reporte Productos" {...a11yProps(0)} />
          <Tab icon={<VaccinesIcon />} label="Reporte Tratamientos" {...a11yProps(1)} />
          <Tab icon={<MedicationLiquidIcon />} label="Reporte Peluqueria" {...a11yProps(2)} />
        </Tabs>
      </Box>
        <CustomTabPanel value={value} index={0}>
          <ButtonGroup variant="contained"  sx={{marginBottom: 3 }} >
            <Button color= 'success' size="small" onClick={ handleClickOpenTrat } >Agregar</Button>
            <Button color= 'info' size="small"  >Modificar</Button>
            <Button color= 'error' size="small"  >Eliminar</Button>
          </ButtonGroup>

        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
        <ButtonGroup variant="contained" sx={{marginBottom: 3 }} >
            <Button color= 'success' size="small" onClick={ handleClickOpenVac}>Agregar</Button>
            <Button color= 'info' size="small"  >Modificar</Button>
            <Button color= 'error' size="small"  >Eliminar</Button>
          </ButtonGroup>

        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <ButtonGroup variant="contained"  sx={{marginBottom: 3 }} >
            <Button color= 'success' size="small" onClick={ handleClickOpenDesp }>Agregar</Button>
            <Button color= 'info' size="small"  >Modificar</Button>
            <Button color= 'error' size="small"  >Eliminar</Button>
          </ButtonGroup>

        </CustomTabPanel>
      </CardContent>
      </Card>
  );
}


function createData(id, productos, cantidad, precio , total, fecha) {
    return {
      id,
      productos,
      cantidad,
      precio,
      total,
      fecha,
    };
  }

  const rows = [
    { id: 1, productos: "PRODUCTO 1", cantidad: 2, precio: 25.00, total: 50.00, fecha: "2024-10-01" },
    { id: 2, productos: "PRODUCTO 2", cantidad: 1, precio: 30.00, total: 30.00, fecha: "2024-10-02" },
    { id: 3, productos: "PRODUCTO 3", cantidad: 3, precio: 40.00, total: 120.00, fecha: "2024-10-03" },
    { id: 4, productos: "PRODUCTO 4", cantidad: 2, precio: 50.00, total: 100.00, fecha: "2024-10-04" },
    { id: 5, productos: "PRODUCTO 5", cantidad: 1, precio: 35.00, total: 35.00, fecha: "2024-10-05" },
    { id: 6, productos: "PRODUCTO 6", cantidad: 2, precio: 20.00,  total: 40.00, fecha: "2024-10-06" },
    { id: 7, productos: "PRODUCTO 7", cantidad: 4, precio: 15.00, total: 60.00, fecha: "2024-10-07" },
    { id: 8, productos: "PRODUCTO 8", cantidad: 3, precio: 18.00,  total: 54.00, fecha: "2024-10-08" },
    { id: 9, productos: "PRODUCTO 9", cantidad: 2, precio: 22.00,  total: 44.00, fecha: "2024-10-09" },
    { id: 10, productos: "PRODUCTO 10", cantidad: 5, precio: 55.00, total: 275.00, fecha: "2024-10-10" },
    { id: 11, productos: "PRODUCTO 1", cantidad: 3, precio: 20.00,  total: 60.00, fecha: "2024-10-11" },
    { id: 12, productos: "PRODUCTO 2", cantidad: 1, precio: 45.00,  total: 45.00, fecha: "2024-10-12" },
    { id: 13, productos: "PRODUCTO 3", cantidad: 2, precio: 60.00, total: 120.00, fecha: "2024-10-13" },
    { id: 14, productos: "PRODUCTO 4", cantidad: 1, precio: 12.00, total: 12.00, fecha: "2024-10-14" },
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
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'ID',
      },
    {
      id: 'productos',
      numeric: false,
      disablePadding: false,
      label: 'PRODUCTOS',
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
      label: 'PRECIO UNIT',
    },
    {
      id: 'total',
      numeric: false,
      disablePadding: false,
      label: 'TOTAL VENTA',
    },
    {
      id: 'fecha',
      numeric: false,
      disablePadding: false,
      label: 'FECHA',
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
            LISTA DE VENTAS
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
  
function ReportesTable() {
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
      <Box sx={{ width: '100%', paddingRight:3, paddingLeft: 3 }}>
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
                        {row.id} 
                      </TableCell>
                      <TableCell align="left">{row.productos}</TableCell>
                      <TableCell align="left">{row.cantidad}</TableCell>
                      <TableCell align="left">{ row.precio }</TableCell>
                      <TableCell align="left">{row.total }</TableCell>
                      <TableCell align="left">{row.fecha}</TableCell>
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