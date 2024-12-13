const express = require('express');
const MedicamentoQueries = require('../queries/queriesMedicamentos');  

const router = express.Router();

// Ruta para obtener todos los medicamentos de FARMACIA
router.get('/farmacia', async (req, res) => {
  try {
    const medicamentos = await MedicamentoQueries.getMedicamentosFarmacia(); 
    res.json(medicamentos); 
  } catch (error) {
    console.error('Error al obtener medicamentos de farmacia:', error);
    res.status(500).json({ error: 'Error al obtener medicamentos de farmacia' });
  }
});

// Ruta para obtener todos los medicamentos de CONSULTORIO
router.get('/consultorio', async (req, res) => {
  try {
    const medicamentos = await MedicamentoQueries.getMedicamentosConsultorio(); 
    res.json(medicamentos); 
  } catch (error) {
    console.error('Error al obtener medicamentos de consultorio:', error);
    res.status(500).json({ error: 'Error al obtener medicamentos de consultorio' });
  }
});

// Ruta para obtener medicamentos de FARMACIA por nombre
router.get('/farmacia/nombre/:nombre', async (req, res) => {
  const { nombre } = req.params;
  try {
    const medicamentos = await MedicamentoQueries.getMedicamentosFarmaciaPorNombre(nombre);
    if (medicamentos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron medicamentos en farmacia con ese nombre.' });
    }
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos de farmacia por nombre:', error);
    res.status(500).json({ message: 'Error al obtener medicamentos', error });
  }
});

// Ruta para obtener medicamentos de CONSULTORIO por nombre
router.get('/consultorio/nombre/:nombre', async (req, res) => {
  const { nombre } = req.params;
  try {
    const medicamentos = await MedicamentoQueries.getMedicamentosConsultorioPorNombre(nombre);
    if (medicamentos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron medicamentos en consultorio con ese nombre.' });
    }
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos de consultorio por nombre:', error);
    res.status(500).json({ message: 'Error al obtener medicamentos', error });
  }
});

// Ruta para obtener medicamentos de FARMACIA por código
router.get('/farmacia/codigo/:codigo', async (req, res) => {
  const { codigo } = req.params;
  try {
    const medicamentos = await MedicamentoQueries.getMedicamentosFarmaciaPorCodigo(codigo);
    if (medicamentos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron medicamentos en farmacia con ese código.' });
    }
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos de farmacia por código:', error);
    res.status(500).json({ message: 'Error al obtener medicamentos', error });
  }
});

// Ruta para obtener medicamentos de CONSULTORIO por código
router.get('/consultorio/codigo/:codigo', async (req, res) => {
  const { codigo } = req.params;
  try {
    const medicamentos = await MedicamentoQueries.getMedicamentosConsultorioPorCodigo(codigo);
    if (medicamentos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron medicamentos en consultorio con ese código.' });
    }
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos de consultorio por código:', error);
    res.status(500).json({ message: 'Error al obtener medicamentos', error });
  }
});

// Ruta para obtener medicamentos de FARMACIA por fecha de vencimiento
router.get('/farmacia/vencimiento/:fecha_vencimiento', async (req, res) => {
  const { fecha_vencimiento } = req.params;
  try {
    const medicamentos = await MedicamentoQueries.getMedicamentosFarmaciaPorFecha(fecha_vencimiento);
    if (medicamentos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron medicamentos de farmacia con esa fecha de vencimiento.' });
    }
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos de farmacia por fecha de vencimiento:', error);
    res.status(500).json({ message: 'Error al obtener medicamentos', error });
  }
});

// Ruta para obtener medicamentos de CONSULTORIO por fecha de vencimiento
router.get('/consultorio/vencimiento/:fecha_vencimiento', async (req, res) => {
  const { fecha_vencimiento } = req.params;
  try {
    const medicamentos = await MedicamentoQueries.getMedicamentosConsultorioPorFecha(fecha_vencimiento);
    if (medicamentos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron medicamentos de consultorio con esa fecha de vencimiento.' });
    }
    res.status(200).json(medicamentos);
  } catch (error) {
    console.error('Error al obtener medicamentos de consultorio por fecha de vencimiento:', error);
    res.status(500).json({ message: 'Error al obtener medicamentos', error });
  }
});

// Ruta para crear un medicamento
router.post('/', async (req, res) => {
  const { codigo, nombre_medicamento, tipo, composicion, presentacion, fecha_vencimiento, precio_compra, precio_venta, tipo_unidad, cantidad } = req.body;
  try {
    const nuevoMedicamento = await MedicamentoQueries.createMedicamento(codigo, nombre_medicamento, tipo, composicion, presentacion, fecha_vencimiento, precio_compra, precio_venta, tipo_unidad, cantidad);
    res.status(201).json(nuevoMedicamento);
  } catch (error) {
    console.error('Error al crear medicamento:', error);
    res.status(500).json({ error: 'Error al crear medicamento' });
  }
});

// Ruta para actualizar un medicamento
router.put('/:id_medicamento', async (req, res) => {
  const { id_medicamento } = req.params;
  const { codigo, nombre_medicamento, tipo, composicion, presentacion, fecha_vencimiento, precio_compra, precio_venta, tipo_unidad, cantidad } = req.body;
  try {
    const resultado = await MedicamentoQueries.updateMedicamento(id_medicamento, codigo, nombre_medicamento, tipo, composicion, presentacion, fecha_vencimiento, precio_compra, precio_venta, tipo_unidad, cantidad);
    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al actualizar medicamento:', error);
    res.status(500).json({ error: 'Error al actualizar medicamento' });
  }
});

// Ruta para eliminar un medicamento
router.delete('/:id_medicamento', async (req, res) => {
  const { id_medicamento } = req.params;
  try {
    const result = await MedicamentoQueries.deleteMedicamento(id_medicamento);
    if (result.message === 'Medicamento eliminado con éxito') {
      return res.status(200).json(result);
    } else {
      return res.status(404).json(result);
    }
  } catch (error) {
    console.error('Error al eliminar medicamento:', error);
    return res.status(500).json({ message: 'Error al eliminar medicamento', error: error.message });
  }
});

module.exports = router;