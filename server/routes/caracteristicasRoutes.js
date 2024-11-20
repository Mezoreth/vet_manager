const express = require('express');
const CaracteristicasQueries = require('../queries/queriesCaracteristicas');  

const router = express.Router();

// Ruta para crear una característica 
router.post('/', async (req, res) => {
    try {
      const { tipo, descripcion } = req.body;
      const nuevaCaracteristica = await CaracteristicasQueries.createCaracteristicas(tipo, descripcion);
      res.status(201).json(nuevaCaracteristica);
    } catch (error) {
      console.error('Error al crear la característica:', error);
      res.status(500).json({ error: 'Error al crear la característica' });
    }
});
  
// Ruta para actualizar una característica existente
router.put('/:id', async (req, res) => {
    const { id } = req.params; 
    const { tipo, descripcion } = req.body;  
    try {
      const caracteristicaActualizada = await CaracteristicasQueries.updateCaracteristicas(id, tipo, descripcion);
      if (!caracteristicaActualizada) {
        return res.status(404).json({ error: 'Característica no encontrada' });
      }
      res.status(200).json(caracteristicaActualizada);
    } catch (error) {
      console.error('Error al actualizar la característica:', error);
      res.status(500).json({ error: 'Error al actualizar la característica' });
    }
});

// Ruta para eliminar una característica existente
router.delete('/:id', async (req, res) => {
    const { id } = req.params;  
    try {
      const result = await CaracteristicasQueries.deleteCaracteristicas(id);
      if (!result) {
        return res.status(404).json({ error: 'Característica no encontrada' });
      }
      res.status(200).json({ message: 'Característica eliminada con éxito' });
    } catch (error) {
      console.error('Error al eliminar la característica:', error);
      res.status(500).json({ error: 'Error al eliminar la característica' });
    }
});
  

module.exports = router;