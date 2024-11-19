const express = require('express');
const TratamientosQueries = require('../queries/queriesTratamientos');  // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para obtener los tratamientos por id_mascota
router.get('/por-mascota/:id_mascota', async (req, res) => {
    

    try {
      const { id_mascota } = req.params;
      // Obtenemos los tratamientos de la mascota
      const tratamientos = await TratamientosQueries.obtenerTratamientosPorMascota(id_mascota);
      
      // Si no hay tratamientos, devolvemos un mensaje adecuado
      if (tratamientos.length === 0) {
        return res.status(200).json({ message: 'No hay tratamientos registrados para esta mascota.' });
      }
  
      // Si hay tratamientos, devolvemos los resultados
      res.status(200).json(tratamientos);
    } catch (error) {
      console.error('Error al obtener tratamientos:', error);
      res.status(500).json({ message: 'Error al obtener tratamientos', error: error.message });
    }
  });

module.exports = router;