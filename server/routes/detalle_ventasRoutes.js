const express = require('express');
const DetalleVentaQueries = require('../queries/queriesDetalle_Ventas'); 
const router = express.Router();

// Ruta para crear un detalle de venta
router.post('/', async (req, res) => {
  try {
    const { id_venta, tipo_item, id_item, cantidad, precio_unitario, subtotal } = req.body;

    const nuevoDetalleVenta = await DetalleVentaQueries.createDetalleVenta(
      id_venta,
      tipo_item,
      id_item,
      cantidad,
      precio_unitario,
      subtotal
    );

    res.status(201).json(nuevoDetalleVenta);
  } catch (error) {
    console.error('Error al crear el detalle de venta:', error);
    res.status(500).json({ error: 'Error al crear el detalle de venta' });
  }
});

// Ruta para actualizar un detalle de venta
router.put('/:id_detalle', async (req, res) => {
  try {
    const { id_detalle } = req.params; // Obtenemos el id_detalle desde los parámetros de la URL
    const { id_venta, tipo_item, id_item, cantidad, precio_unitario, subtotal } = req.body; // Obtenemos los datos desde el cuerpo de la solicitud

    const detalleVentaActualizado = await DetalleVentaQueries.updateDetalleVenta(
      id_detalle,
      id_venta,
      tipo_item,
      id_item,
      cantidad,
      precio_unitario,
      subtotal
    );

    res.json(detalleVentaActualizado);
  } catch (error) {
    console.error('Error al actualizar el detalle de venta:', error);
    res.status(500).json({ error: 'Error al actualizar el detalle de venta' });
  }
});

// Ruta para eliminar un detalle de venta
router.delete('/:id_detalle', async (req, res) => {
  try {
    const { id_detalle } = req.params; // Obtener el id_detalle desde los parámetros de la URL
    const result = await DetalleVentaQueries.deleteDetalleVenta(id_detalle); // Llamar a la función deleteDetalleVenta

    if (result.message === 'Detalle de venta eliminado con éxito') {
      return res.status(200).json(result); // Si el detalle de venta fue eliminado, devolver mensaje de éxito
    } else {
      return res.status(404).json(result); // Si no se encontró el detalle de venta, devolver mensaje de error
    }
  } catch (error) {
    console.error('Error al eliminar el detalle de venta:', error);
    return res.status(500).json({ message: 'Error al eliminar el detalle de venta', error: error.message });
  }
});

module.exports = router;