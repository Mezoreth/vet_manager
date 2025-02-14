import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

export default function Notificaciones() {
  return (
    <div>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          VACUNAS
        </AccordionSummary>
        <AccordionDetails>
          <DataTable/>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          DESPARACITACIONES
        </AccordionSummary>
        <AccordionDetails>
          <DataTable2/>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          SUPRESOR DE CELO
        </AccordionSummary>
        <AccordionDetails>
          <DataTable3/>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          MEDICAMENTOS
        </AccordionSummary>
        <AccordionDetails>
          TABLE
        </AccordionDetails>
        <AccordionActions>
          <Button>Cancel</Button>
          <Button>Agree</Button>
        </AccordionActions>
      </Accordion>
    </div>
  );
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Vacuna 1', '02/05/10', '02/07/10', 24, 4.0),
  createData('Vacuna 2', '02/05/10', '02/07/10', 37, 4.3),
  createData('Vacuna 3', '02/05/10', '02/07/10', 24, 6.0),
  createData('Vacuna 4', '02/05/10', '02/07/10', 67, 4.3),
  createData('Vacuna 5', '02/05/10', '02/07/10', 49, 3.9),
  createData('Vacuna 5', '02/05/10', '02/07/10', 49, 3.9),
];

function DataTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Vacuna </TableCell>
            <TableCell align="right">Fecha Dosis</TableCell>
            <TableCell align="right">Fecha Refuerzo</TableCell>
            <TableCell align="right">Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">
                <IconButton  aria-label="go to pet" size="small" color='success' >
                  <VisibilityOutlinedIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const rows2 = [
  createData('Vacuna 1', '02/05/10', '02/07/10', 24, 4.0),
  createData('Vacuna 2', '02/05/10', '02/07/10', 37, 4.3),
  createData('Vacuna 3', '02/05/10', '02/07/10', 24, 6.0),
  createData('Vacuna 4', '02/05/10', '02/07/10', 67, 4.3),

];

function DataTable2() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Desperacitador </TableCell>
            <TableCell align="right">Fecha Dosis</TableCell>
            <TableCell align="right">Fecha Refuerzo</TableCell>
            <TableCell align="right">Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">
                <IconButton  aria-label="go to pet" size="small" color='success' >
                  <VisibilityOutlinedIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const rows3 = [
  createData('Vacuna 1', '02/05/10', '02/07/10', 24, 4.0),
  createData('Vacuna 2', '02/05/10', '02/07/10', 37, 4.3),
  createData('Vacuna 3', '02/05/10', '02/07/10', 24, 6.0),
  createData('Vacuna 4', '02/05/10', '02/07/10', 67, 4.3),
];

function DataTable3() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Supresor </TableCell>
            <TableCell align="right">Fecha Dosis</TableCell>
            <TableCell align="right">Fecha Refuerzo</TableCell>
            <TableCell align="right">Ver</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">
                <IconButton  aria-label="go to pet" size="small" color='success' >
                  <VisibilityOutlinedIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}