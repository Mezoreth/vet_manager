const express = require('express');
const ServiciosQueries = require('../queries/queriesServicios'); 
const router = express.Router();


// Ruta para crear un servicio
router.post('/', async (req, res) => {
    try {
      const { corte, bano, estetica, cepillado, limp_oidos, precio, observaciones, fecha_servicio, estado, tipo_pago } = req.body;
  
      const nuevoServicioId = await ServiciosQueries.createServicio(
        corte, bano, estetica, cepillado, limp_oidos, precio, observaciones, fecha_servicio, estado, tipo_pago
      );
  
      res.status(201).json({ id_servicio: nuevoServicioId });
    } catch (error) {
      console.error('Error al crear el servicio:', error);
      res.status(500).json({ error: 'Error al crear el servicio' });
    }
  });
  
  // Ruta para actualizar un servicio
  router.put('/:id_servicio', async (req, res) => {
    try {
      const { id_servicio } = req.params; // Extraemos el id del servicio desde los parámetros de la URL
      const { corte, bano, estetica, cepillado, limp_oidos, precio, observaciones, fecha_servicio, estado, tipo_pago } = req.body;
  
      const servicioActualizado = await ServiciosQueries.updateServicio(
        id_servicio, corte, bano, estetica, cepillado, limp_oidos, precio, observaciones, fecha_servicio, estado, tipo_pago
      );
  
      if (!servicioActualizado) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
  
      res.status(200).json({ mensaje: 'Servicio actualizado exitosamente', id_servicio: servicioActualizado });
    } catch (error) {
      console.error('Error al actualizar el servicio:', error);
      res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
  });
  
  // Ruta para eliminar un servicio
  router.delete('/:id_servicio', async (req, res) => {
    try {
      const { id_servicio } = req.params; // Extraemos el id del servicio desde los parámetros de la URL
      const deletedServicioId = await ServiciosQueries.deleteServicio(id_servicio);
  
      res.status(200).json({
        mensaje: 'Servicio eliminado exitosamente',
        id_servicio: deletedServicioId
      });
    } catch (error) {
      console.error('Error al eliminar el servicio:', error);
      res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
  });
  
  // Ruta para obtener un servicio por id
  router.get('/:id_servicio', async (req, res) => {
    try {
      const { id_servicio } = req.params;
  
      const servicio = await ServiciosQueries.getServicio(id_servicio);
  
      if (!servicio) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }
  
      res.status(200).json(servicio);
    } catch (error) {
      console.error('Error al obtener el servicio:', error);
      res.status(500).json({ error: 'Error al obtener el servicio' });
    }
  });
  
  // Ruta para obtener todos los servicios
  router.get('/', async (req, res) => {
    try {
      const servicios = await ServiciosQueries.obtenerServicios();
  
      if (servicios.length === 0) {
        return res.status(200).json({ message: 'No hay servicios registrados.' });
      }
  
      res.status(200).json(servicios);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
      res.status(500).json({ error: 'Error al obtener los servicios' });
    }
  });
  
  // Ruta para obtener todos los servicios con estado "PENDIENTE"
  router.get('/pendientes', async (req, res) => {
    try {
      const serviciosPendientes = await ServiciosQueries.obtenerServiciosPendientes();
  
      if (serviciosPendientes.length === 0) {
        return res.status(200).json({ message: 'No hay servicios pendientes.' });
      }
  
      res.status(200).json(serviciosPendientes);
    } catch (error) {
      console.error('Error al obtener los servicios pendientes:', error);
      res.status(500).json({ error: 'Error al obtener los servicios pendientes' });
    }
  });
module.exports = router;