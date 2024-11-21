const express = require('express');
const MascotasMedicamentosQueries = require('../queries/queriesMascotas_Medicamentos');  // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para obtener los medicamentos de tipo VACUNA de una mascota por id_mascota
router.get('/vacuna/:id_mascota', async (req, res) => {
    const { id_mascota } = req.params;  
    
    try {
      const medicamentos = await MascotasMedicamentosQueries.obtenerMedicamentosPorMascotaVacuna(id_mascota);
      if (medicamentos.message) {
        return res.status(404).json({ message: medicamentos.message });
      }
      res.json(medicamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
    }
  });


// Ruta para obtener los medicamentos de tipo SUPRESOR de una mascota por id_mascota
router.get('/supresor/:id_mascota', async (req, res) => {
  const { id_mascota } = req.params;  
  try {
    const medicamentos = await MascotasMedicamentosQueries.obtenerMedicamentosPorMascotaSupresor(id_mascota);
    if (medicamentos.message) {
      return res.status(404).json({ message: medicamentos.message });
    }
    res.json(medicamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
  }
});

// Ruta para obtener los medicamentos de tipo DESPARASITANTE de una mascota por id_mascota
router.get('/desparasitante/:id_mascota', async (req, res) => {
  const { id_mascota } = req.params; 
  
  try {
    const medicamentos = await MascotasMedicamentosQueries.obtenerMedicamentosPorMascotaDesparasitante(id_mascota);
    if (medicamentos.message) {
      return res.status(404).json({ message: medicamentos.message });
    }
    res.json(medicamentos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
  }
});

// Ruta para crear una nueva  mascota_medicamento
router.post('/', async (req, res) => {
  try {
    const { id_mascota, id_medicamento, tipo, cantidad, fecha_dosis, fecha_refuerzo } = req.body;
    const nuevoMascotaMedicamento = await MascotasMedicamentosQueries.createMascotaMedicamento(
      id_mascota, id_medicamento, tipo, cantidad, fecha_dosis, fecha_refuerzo
    );
    res.status(201).json(nuevoMascotaMedicamento);  
  } catch (error) {
    console.error('Error al crear la relación entre mascota y medicamento:', error);
    res.status(500).json({ error: 'Error al crear la relación entre mascota y medicamento' });
  }
});

// Ruta para actualizar una  mascota_medicamento
router.put('/:id_mascotaMedicamento', async (req, res) => {
  try {
    const { id_mascotaMedicamento } = req.params;
    const { id_mascota, id_medicamento, tipo, cantidad, fecha_dosis, fecha_refuerzo } = req.body;
    const resultado = await MascotasMedicamentosQueries.updateMascotaMedicamento(
      id_mascotaMedicamento, id_mascota, id_medicamento, tipo, cantidad, fecha_dosis, fecha_refuerzo
    );
    res.json(resultado);  
  } catch (error) {
    console.error('Error al actualizar la relación entre mascota y medicamento:', error);
    res.status(500).json({ error: 'Error al actualizar la relación entre mascota y medicamento' });
  }
});

// Ruta para eliminar una mascota_medicamento
router.delete('/:id_mascotaMedicamento', async (req, res) => {
  try {
    const { id_mascotaMedicamento } = req.params;      
    const resultado = await MascotasMedicamentosQueries.deleteMascotaMedicamento(id_mascotaMedicamento);
    if (resultado.message === 'Relación entre mascota y medicamento eliminada con éxito') {
      res.status(200).json(resultado);  
    } else {
      res.status(404).json(resultado);  
    }
  } catch (error) {
    console.error('Error al eliminar la relación entre mascota y medicamento:', error);
    res.status(500).json({ message: 'Error al eliminar la relación entre mascota y medicamento', error: error.message });
  }
});


module.exports = router;