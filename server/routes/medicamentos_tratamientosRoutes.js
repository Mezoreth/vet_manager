const express = require('express');
const MedicamentosTratamientosQueries = require('../queries/queriesMedicamentos_Tratamientos'); // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para crear un medicamento_tratamiento
router.post('/', async (req, res) => {
  try {
    const { id_tratamiento, id_medicamento, dosis, via, costo, fecha } = req.body;

    const nuevoMedicamentoTratamientoId = await MedicamentosTratamientosQueries.createMedicamentoTratamiento(
      id_tratamiento, id_medicamento, dosis, via, costo, fecha
    );

    res.status(201).json({ id_medicamentoTratamiento: nuevoMedicamentoTratamientoId });
  } catch (error) {
    console.error('Error al crear el medicamento tratamiento:', error);
    res.status(500).json({ error: 'Error al crear el medicamento tratamiento' });
  }
});

// Ruta para actualizar un medicamento_tratamiento
router.put('/:id_medicamentoTratamiento', async (req, res) => {
  try {
    const { id_medicamentoTratamiento } = req.params;
    const { id_tratamiento, id_medicamento, dosis, via, costo, fecha } = req.body;

    const medicamentoTratamientoActualizado = await MedicamentosTratamientosQueries.updateMedicamentoTratamiento(
      id_medicamentoTratamiento, id_tratamiento, id_medicamento, dosis, via, costo, fecha
    );

    if (!medicamentoTratamientoActualizado) {
      return res.status(404).json({ error: 'Medicamento tratamiento no encontrado' });
    }

    res.status(200).json({ mensaje: 'Medicamento tratamiento actualizado exitosamente', medicamentoTratamiento: medicamentoTratamientoActualizado });
  } catch (error) {
    console.error('Error al actualizar el medicamento tratamiento:', error);
    res.status(500).json({ error: 'Error al actualizar el medicamento tratamiento' });
  }
});

// Ruta para eliminar un medicamento_tratamiento
router.delete('/:id_medicamentoTratamiento', async (req, res) => {
  try {
    const { id_medicamentoTratamiento } = req.params;
    const deletedMedicamentoTratamientoId = await MedicamentosTratamientosQueries.deleteMedicamentoTratamiento(id_medicamentoTratamiento);

    res.status(200).json({
      mensaje: 'Medicamento tratamiento eliminado exitosamente',
      id_medicamentoTratamiento: deletedMedicamentoTratamientoId
    });
  } catch (error) {
    console.error('Error al eliminar el medicamento tratamiento:', error);
    res.status(500).json({ error: 'Error al eliminar el medicamento tratamiento' });
  }
});

// Ruta para obtener un medicamento_tratamiento por id_tratamiento
router.get('/:id_tratamiento', async (req, res) => {
  try {
    const { id_tratamiento } = req.params;

    // Llamada a la nueva función que devuelve todos los medicamentos asociados al tratamiento
    const medicamentosTratamiento = await MedicamentosTratamientosQueries.getMedicamentosTratamientoByTratamiento(id_tratamiento);

    // Verificar si se encontraron medicamentos
    if (medicamentosTratamiento.length === 0) {
      return res.status(404).json({ error: 'No se encontraron medicamentos asociados al tratamiento' });
    }

    // Responder con los medicamentos encontrados
    res.status(200).json(medicamentosTratamiento);
  } catch (error) {
    console.error('Error al obtener los medicamentos asociados al tratamiento:', error);
    res.status(500).json({ error: 'Error al obtener los medicamentos asociados al tratamiento' });
  }
});

module.exports = router;