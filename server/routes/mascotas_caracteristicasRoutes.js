const express = require('express');
const Mascotas_CaracteristicasQueries = require('../queries/queriesMascota'); 
const router = express.Router();


// Ruta para crear una relación entre una mascota y una característica
router.post('/', async (req, res) => {
  try {
    const { id_mascota, id_caracteristica } = req.body;
    // Verificamos que se hayan pasado ambos parámetros
    if (!id_mascota || !id_caracteristica) {
      return res.status(400).json({ error: 'Se requieren los parámetros id_mascota y id_caracteristica.' });
    }

    // Llamamos a la función para crear la relación
    const nuevaRelacion = await Mascotas_CaracteristicasQueries.createMascotasCaracteristicas(id_mascota, id_caracteristica);
    
    // Respondemos con éxito si la relación se creó correctamente
    res.status(201).json({
      message: 'Relación creada exitosamente.',
      nuevaRelacion,
    });
  } catch (error) {
    // Si hay un error, devolvemos un mensaje de error
    res.status(500).json({
      error: 'Error al crear la relación entre la mascota y la característica.',
      message: error.message,
    });
  }
});

module.exports = router;