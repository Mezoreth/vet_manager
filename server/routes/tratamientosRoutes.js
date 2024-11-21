const express = require('express');
const TratamientosQueries = require('../queries/queriesTratamientos');  // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para obtener los tratamientos por id_mascota
router.get('/por-mascota/:id_mascota', async (req, res) => {
    try {
      const { id_mascota } = req.params;
      const tratamientos = await TratamientosQueries.obtenerTratamientosPorMascota(id_mascota);
      if (tratamientos.length === 0) {
        return res.status(200).json({ message: 'No hay tratamientos registrados para esta mascota.' });
      }
      res.status(200).json(tratamientos);
    } catch (error) {
      console.error('Error al obtener tratamientos:', error);
      res.status(500).json({ message: 'Error al obtener tratamientos', error: error.message });
    }
  });


// Ruta para crear un tratamiento
router.post('/', async (req, res) => {
  try {
    const {
      fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas, diagnostico,
      d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos, f_cardiaca, fonendo, 
      pal_abd, f_respiratoria, peso, id_mascota, dosis, via
    } = req.body;
    const nuevoTratamiento = await TratamientosQueries.createTratamiento(
      fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas, diagnostico,
      d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos, f_cardiaca, fonendo,
      pal_abd, f_respiratoria, peso, id_mascota, dosis, via
    );
    res.status(201).json(nuevoTratamiento); N
  } catch (error) {
    console.error('Error al crear el tratamiento:', error);
    res.status(500).json({ error: 'Error al crear el tratamiento' });
  }
});

// Ruta para actualizar un tratamiento
router.put('/:id_tratamiento', async (req, res) => {
  try {
    const { id_tratamiento } = req.params;
    const {
      fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas, diagnostico,
      d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos, f_cardiaca, fonendo,
      pal_abd, f_respiratoria, peso, id_mascota, dosis, via
    } = req.body;  
    const tratamientoActualizado = await TratamientosQueries.updateTratamiento(
      id_tratamiento, fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas,
      diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos, f_cardiaca,
      fonendo, pal_abd, f_respiratoria, peso, id_mascota, dosis, via
    );
    res.json(tratamientoActualizado);
  } catch (error) {
    console.error('Error al actualizar el tratamiento:', error);
    res.status(500).json({ error: 'Error al actualizar los datos del tratamiento' });
  }
});

// Ruta para eliminar un tratamiento
router.delete('/:id_tratamiento', async (req, res) => {
  try {
    const { id_tratamiento } = req.params;  
    const result = await TratamientosQueries.deleteTratamiento(id_tratamiento);  
    if (result.message === 'Tratamiento eliminado con éxito') {
      return res.status(200).json(result);  
    } else {
      return res.status(404).json(result);  
    }
  } catch (error) {
    console.error('Error al eliminar el tratamiento:', error);
    return res.status(500).json({ message: 'Error al eliminar el tratamiento', error: error.message });
  }
});
module.exports = router;