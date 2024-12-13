const express = require('express');
const TratamientosQueries = require('../queries/queriesTratamientos'); // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para crear un tratamiento
router.post('/', async (req, res) => {
  try {
    const {
      fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas,
      diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos,
      f_cardiaca, fonendo, pal_abd, f_respiratoria, peso, id_mascota, estado,  tipo_pago
    } = req.body;

    const nuevoTratamientoId = await TratamientosQueries.createTratamiento(
      fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas,
      diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos,
      f_cardiaca, fonendo, pal_abd, f_respiratoria, peso, id_mascota, estado, tipo_pago
    );

    res.status(201).json({ id_tratamiento: nuevoTratamientoId });
  } catch (error) {
    console.error('Error al crear el tratamiento:', error);
    res.status(500).json({ error: 'Error al crear el tratamiento' });
  }
});

// Ruta para actualizar un tratamiento
router.put('/:id_tratamiento', async (req, res) => {
  try {
    const { id_tratamiento } = req.params; // Extraemos el id del tratamiento desde los parámetros de la URL
    const {
      fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas,
      diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos,
      f_cardiaca, fonendo, pal_abd, f_respiratoria, peso, id_mascota, estado, tipo_pago
    } = req.body;

    const tratamientoActualizado = await TratamientosQueries.updateTratamiento(
      id_tratamiento, fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas,
      diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos,
      f_cardiaca, fonendo, pal_abd, f_respiratoria, peso, id_mascota, estado, tipo_pago
    );

    if (!tratamientoActualizado) {
      return res.status(404).json({ error: 'Tratamiento no encontrado' });
    }

    res.status(200).json({ mensaje: 'Tratamiento actualizado exitosamente', tratamiento: tratamientoActualizado });
  } catch (error) {
    console.error('Error al actualizar el tratamiento:', error);
    res.status(500).json({ error: 'Error al actualizar el tratamiento' });
  }
});

// Ruta para eliminar un tratamiento
router.delete('/:id_tratamiento', async (req, res) => {
  try {
    const { id_tratamiento } = req.params; // Extraemos el id del tratamiento desde los parámetros de la URL
    const deletedTratamientoId = await TratamientosQueries.deleteTratamiento(id_tratamiento);

    res.status(200).json({
      mensaje: 'Tratamiento eliminado exitosamente',
      id_tratamiento: deletedTratamientoId
    });
  } catch (error) {
    console.error('Error al eliminar el tratamiento:', error);
    res.status(500).json({ error: 'Error al eliminar el tratamiento' });
  }
});

// Ruta para obtener un tratamiento por id
router.get('/:id_tratamiento', async (req, res) => {
  try {
    const { id_tratamiento } = req.params;

    const tratamiento = await TratamientosQueries.getTratamiento(id_tratamiento);

    if (!tratamiento) {
      return res.status(404).json({ error: 'Tratamiento no encontrado' });
    }

    res.status(200).json(tratamiento);
  } catch (error) {
    console.error('Error al obtener el tratamiento:', error);
    res.status(500).json({ error: 'Error al obtener el tratamiento' });
  }
});

// Ruta para obtener los tratamientos de una mascota por su id
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

// Ruta para obtener todos los tratamientos con estado "PENDIENTE"
router.get('/pendientes', async (req, res) => {
  try {
    const tratamientosPendientes = await TratamientosQueries.obtenerTratamientosPendientes();

    if (tratamientosPendientes.length === 0) {
      return res.status(200).json({ message: 'No hay tratamientos pendientes.' });
    }

    res.status(200).json(tratamientosPendientes);
  } catch (error) {
    console.error('Error al obtener tratamientos pendientes:', error);
    res.status(500).json({ message: 'Error al obtener tratamientos pendientes', error: error.message });
  }
});

module.exports = router;