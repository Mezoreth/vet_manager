const express = require('express');
const MascotasMedicamentosQueries = require('../queries/queriesMascotas_Medicamentos');  // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para obtener los medicamentos de tipo VACUNA de una mascota por id_mascota
router.get('/vacuna/:id_mascota', async (req, res) => {
    const { id_mascota } = req.params;  // Obtenemos el id_mascota desde los parámetros de la URL
    
    try {
      // Llamamos a la función para obtener los medicamentos de tipo VACUNA para la mascota
      const medicamentos = await MascotasMedicamentosQueries.obtenerMedicamentosPorMascotaVacuna(id_mascota);
  
      if (medicamentos.message) {
        // Si no se encontraron resultados
        return res.status(404).json({ message: medicamentos.message });
      }
  
      // Retornamos los medicamentos encontrados
      res.json(medicamentos);
  
    } catch (error) {
      // Manejo de errores en la ruta
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
    }
  });


  // Ruta para obtener los medicamentos de tipo SUPRESOR de una mascota por id_mascota
router.get('/supresor/:id_mascota', async (req, res) => {
  const { id_mascota } = req.params;  // Obtenemos el id_mascota desde los parámetros de la URL
  
  try {
    // Llamamos a la función para obtener los medicamentos de tipo VACUNA para la mascota
    const medicamentos = await MascotasMedicamentosQueries.obtenerMedicamentosPorMascotaSupresor(id_mascota);

    if (medicamentos.message) {
      // Si no se encontraron resultados
      return res.status(404).json({ message: medicamentos.message });
    }

    // Retornamos los medicamentos encontrados
    res.json(medicamentos);

  } catch (error) {
    // Manejo de errores en la ruta
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
  }
});


// Ruta para obtener los medicamentos de tipo DESPARASITANTE de una mascota por id_mascota
router.get('/desparasitante/:id_mascota', async (req, res) => {
  const { id_mascota } = req.params;  // Obtenemos el id_mascota desde los parámetros de la URL
  
  try {
    // Llamamos a la función para obtener los medicamentos de tipo VACUNA para la mascota
    const medicamentos = await MascotasMedicamentosQueries.obtenerMedicamentosPorMascotaDesparasitante(id_mascota);

    if (medicamentos.message) {
      // Si no se encontraron resultados
      return res.status(404).json({ message: medicamentos.message });
    }

    // Retornamos los medicamentos encontrados
    res.json(medicamentos);

  } catch (error) {
    // Manejo de errores en la ruta
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
  }
});

module.exports = router;