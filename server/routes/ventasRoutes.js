const express = require('express');
const VentaQueries = require('../queries/queriesVentas');  // Ajusta la ruta según tu estructura
const router = express.Router();


// Ruta para crear una venta
router.post('/', async (req, res) => {
  try {
    const { fecha_venta, total_venta, observaciones, id_cliente, estado, tipo_pago } = req.body;
    const nuevaVenta = await crearVenta(fecha_venta, total_venta, observaciones, id_cliente, estado, tipo_pago);
    res.status(201).json(nuevaVenta);
  } catch (error) {
    console.error('Error al crear la venta:', error);
    res.status(500).json({ error: 'Error al crear la venta' });
  }
});

// Ruta para actualizar una venta
router.put('/:id_venta', async (req, res) => {
  try {
    const { id_venta } = req.params; // Obtener el id_venta desde los parámetros de la URL
    const { fecha_venta, total_venta, observaciones, id_cliente, estado, tipo_pago } = req.body; 
    const ventaActualizada = await actualizarVenta(id_venta, fecha_venta, total_venta, observaciones, id_cliente, estado, tipo_pago);
    res.json(ventaActualizada);
  } catch (error) {
    console.error('Error al actualizar la venta:', error);
    res.status(500).json({ error: 'Error al actualizar la venta' });
  }
});

// Ruta para eliminar una venta
router.delete('/:id_venta', async (req, res) => {
  try {
    const { id_venta } = req.params;  
    const result = await eliminarVenta(id_venta);  
    if (result.message === 'Venta eliminada con éxito') {
      return res.status(200).json(result);  // Si la venta fue eliminada, devolver mensaje de éxito
    } else {
      return res.status(404).json(result);  // Si no se encontró la venta, devolver mensaje de error
    }
  } catch (error) {
    console.error('Error al eliminar la venta:', error);
    return res.status(500).json({ message: 'Error al eliminar la venta', error: error.message });
  }
});

// Ruta para obtener todas las ventas
router.get('/', async (req, res) => {
    try {
        const ventas = await VentaQueries.obtenerTodasLasVentas();
        res.json(ventas);
    } catch (error) {
        console.error('Error al obtener las ventas:', error);
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
});

// Ruta para obtener ventas pendientes
router.get('/pendientes', async (req, res) => {
    try {
        const ventasPendientes = await VentaQueries.obtenerVentasPendientes();
        res.json(ventasPendientes);
    } catch (error) {
        console.error('Error al obtener las ventas pendientes:', error);
        res.status(500).json({ error: 'Error al obtener las ventas pendientes' });
    }
});




// Ruta para obtener reporte de ventas por periodo (diario, mensual, anual)
router.get('/reporte/ventas/:cantidad/:tipoPeriodo', async (req, res) => {
  try {
    const cantidad = parseInt(req.params.cantidad, 10);  // Convierte 'cantidad' a número entero
    const tipoPeriodo = req.params.tipoPeriodo;  // El 'tipoPeriodo' ya es un string

    // Validar que 'cantidad' sea un número
    if (isNaN(cantidad)) {
      return res.status(400).json({ error: 'Cantidad debe ser un número válido' });
    }

    // Llamar a la función de consulta para obtener el reporte de ventas
    const reporteVentas = await VentaQueries.reporteVentasPeriodo(cantidad, tipoPeriodo);

    // Enviar la respuesta con los resultados
    res.json(reporteVentas);

  } catch (error) {
    console.error('Error al obtener el reporte de ventas:', error);
    res.status(500).json({ error: 'Error al obtener el reporte de ventas' });
  }
});


// Ruta para obtener reporte de ventas por intervalo de fechas
router.get('/reporte/ventas/fechas/:fechaInicio/:fechaFin', async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.params;

    // Validar que las fechas sean correctas
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Las fechas de inicio y fin son requeridas' });
    }

    // Llamar a la función de consulta para obtener el reporte de ventas por fechas
    const reporteVentas = await VentaQueries.reporteVentasFechas(fechaInicio, fechaFin);
    res.json(reporteVentas);

  } catch (error) {
    console.error('Error al obtener el reporte de ventas por fechas:', error);
    res.status(500).json({ error: 'Error al obtener el reporte de ventas por fechas' });
  }
});

// Ruta para obtener reporte de tratamientos por periodo (diario, mensual, anual)
router.get('/reporte/tratamientos/:cantidad/:tipoPeriodo', async (req, res) => {
  try {
    const cantidad = parseInt(req.params.cantidad, 10);  // Convierte 'cantidad' a número entero
    const tipoPeriodo = req.params.tipoPeriodo;  // El 'tipoPeriodo' ya es un string

    // Validar que 'cantidad' sea un número
    if (isNaN(cantidad)) {
      return res.status(400).json({ error: 'Cantidad debe ser un número válido' });
    }

    // Llamar a la función de consulta para obtener el reporte de tratamientos
    const reporteTratamientos = await VentaQueries.reporteTratamientosPeriodo(cantidad, tipoPeriodo);
    res.json(reporteTratamientos);

  } catch (error) {
    console.error('Error al obtener el reporte de tratamientos:', error);
    res.status(500).json({ error: 'Error al obtener el reporte de tratamientos' });
  }
});

// Ruta para obtener reporte de tratamientos por intervalo de fechas
router.get('/reporte/tratamientos/fechas/:fechaInicio/:fechaFin', async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.params;

    // Validar que las fechas sean correctas
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Las fechas de inicio y fin son requeridas' });
    }

    // Llamar a la función de consulta para obtener el reporte de tratamientos por fechas
    const reporteTratamientos = await VentaQueries.reporteTratamientosFechas(fechaInicio, fechaFin);
    res.json(reporteTratamientos);

  } catch (error) {
    console.error('Error al obtener el reporte de tratamientos por fechas:', error);
    res.status(500).json({ error: 'Error al obtener el reporte de tratamientos por fechas' });
  }
});

// Ruta para obtener reporte de servicios por periodo (diario, mensual, anual)
router.get('/reporte/servicios/:cantidad/:tipoPeriodo', async (req, res) => {
  try {
    const cantidad = parseInt(req.params.cantidad, 10);  // Convierte 'cantidad' a número entero
    const tipoPeriodo = req.params.tipoPeriodo;  // El 'tipoPeriodo' ya es un string

    // Validar que 'cantidad' sea un número
    if (isNaN(cantidad)) {
      return res.status(400).json({ error: 'Cantidad debe ser un número válido' });
    }

    // Llamar a la función de consulta para obtener el reporte
    const ventasReporte = await VentaQueries.reporteServiciosPeriodo(cantidad, tipoPeriodo);

    // Enviar la respuesta con los resultados
    res.json(ventasReporte);

  } catch (error) {
    console.error('Error al obtener el reporte de ventas:', error);
    res.status(500).json({ error: 'Error al obtener el reporte de ventas' });
  }
});

// Ruta para obtener reporte de servicios por intervalo de fechas
router.get('/reporte/servicios/fechas/:fechaInicio/:fechaFin', async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.params;

    // Validar que las fechas sean correctas
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Las fechas de inicio y fin son requeridas' });
    }

    // Llamar a la función de consulta para obtener el reporte de servicios por fechas
    const reporteServicios = await VentaQueries.reporteServiciosFechas(fechaInicio, fechaFin);
    res.json(reporteServicios);

  } catch (error) {
    console.error('Error al obtener el reporte de servicios por fechas:', error);
    res.status(500).json({ error: 'Error al obtener el reporte de servicios por fechas' });
  }
});

// Ruta para obtener reporte de consultas por periodo (diario, mensual, anual)
router.get('/reporte/consultas/:cantidad/:tipoPeriodo', async (req, res) => {
  try {
    const cantidad = parseInt(req.params.cantidad, 10);  // Convierte 'cantidad' a número entero
    const tipoPeriodo = req.params.tipoPeriodo;  // El 'tipoPeriodo' ya es un string

    // Validar que 'cantidad' sea un número
    if (isNaN(cantidad)) {
      return res.status(400).json({ error: 'Cantidad debe ser un número válido' });
    }

    // Llamar a la función de consulta para obtener el reporte de consultas
    const reporteConsultas = await VentaQueries.reporteConsultasPeriodo(cantidad, tipoPeriodo);
    res.json(reporteConsultas);

  } catch (error) {
    console.error('Error al obtener el reporte de consultas:', error);
    res.status(500).json({ error: 'Error al obtener el reporte de consultas' });
  }
});

// Ruta para obtener reporte de consultas por intervalo de fechas
router.get('/reporte/consultas/fechas/:fechaInicio/:fechaFin', async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.params;

    // Validar que las fechas sean correctas
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Las fechas de inicio y fin son requeridas' });
    }

    // Llamar a la función de consulta para obtener el reporte de consultas por fechas
    const reporteConsultas = await VentaQueries.reporteConsultasFechas(fechaInicio, fechaFin);
    res.json(reporteConsultas);

  } catch (error) {
    console.error('Error al obtener el reporte de consultas por fechas:', error);
    res.status(500).json({ error: 'Error al obtener el reporte de consultas por fechas' });
  }
});

module.exports = router;
