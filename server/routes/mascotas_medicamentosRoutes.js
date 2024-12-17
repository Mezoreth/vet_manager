const express = require('express');
const MascotasMedicamentosQueries = require('../queries/queriesMascotas_Medicamentos');  // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para obtener los medicamentos de tipo VACUNA de una mascota por id_mascota
router.get('/vacuna/:id_mascota', async (req, res) => {
    const { id_mascota } = req.params;  
    
    try {
      const medicamentos = await MascotasMedicamentosQueries.obtenerVacunas(id_mascota);
      if (medicamentos.message) {
        return res.status(404).json({ message: medicamentos.message });
      }
      res.json(medicamentos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
    }
  });

// Ruta para obtener un mascota_medicamento por id_mascotaMedicamento
router.get('/:id_mascotaMedicamento', async (req, res) => {
  const { id_mascotaMedicamento } = req.params;  

  try {
    // Llamamos a la función para obtener el medicamento por id_mascotaMedicamento
    const medicamento = await MascotasMedicamentosQueries.obtenerMascotaMedicamentoPorId(id_mascotaMedicamento);

    // Si no se encuentra el medicamento, retornamos un mensaje de error
    if (!medicamento) {
      return res.status(404).json({ message: 'Medicamento no encontrado.' });
    }

    // Si se encuentra el medicamento, lo regresamos en la respuesta
    res.json(medicamento);

  } catch (error) {
    console.error('Error al obtener el medicamento de la mascota por id:', error);
    res.status(500).json({ error: 'Hubo un error al obtener el medicamento de la mascota.' });
  }
});

// Ruta para obtener los medicamentos de tipo SUPRESOR de una mascota por id_mascota
router.get('/supresor/:id_mascota', async (req, res) => {
  const { id_mascota } = req.params;  
  try {
    const medicamentos = await MascotasMedicamentosQueries.obtenerSupresores(id_mascota);
    if (medicamentos.message) {
      return res.status(404).json({ message: medicamentos.message });
    }
    res.json(medicamentos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
  }
});

// Ruta para obtener los DESPARASITANTE de una mascota por id_mascota
router.get('/desparasitante/:id_mascota', async (req, res) => {
  const { id_mascota } = req.params; 
  
  try {
    const medicamentos = await MascotasMedicamentosQueries.obtenerDesparasitantes(id_mascota);
    if (medicamentos.message) {
      return res.status(404).json({ message: medicamentos.message });
    }
    res.json(medicamentos);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los medicamentos de tipo VACUNA.' });
  }
});

// Ruta para crear una nueva mascota_medicamento
router.post('/', async (req, res) => {
  try {
    const { id_mascota, id_medicamento, tipo, cantidad, precio, fecha_dosis, fecha_refuerzo, estado, tipo_pago } = req.body;
    const nuevoMascotaMedicamento = await MascotasMedicamentosQueries.createMascotaMedicamento(
      id_mascota, id_medicamento, tipo, cantidad, precio, fecha_dosis, fecha_refuerzo, estado, tipo_pago
    );
    res.status(201).json(nuevoMascotaMedicamento);  
  } catch (error) {
    console.error('Error al crear la relación entre mascota y medicamento:', error);
    res.status(500).json({ error: 'Error al crear la relación entre mascota y medicamento' });
  }
});

// Ruta para actualizar una mascota_medicamento
router.put('/:id_mascotaMedicamento', async (req, res) => {
  try {
    const { id_mascotaMedicamento } = req.params;
    const { id_mascota, id_medicamento, tipo, cantidad, precio, fecha_dosis, fecha_refuerzo, estado, tipo_pago } = req.body;
    const resultado = await MascotasMedicamentosQueries.updateMascotaMedicamento(
      id_mascotaMedicamento, id_mascota, id_medicamento, tipo, cantidad, precio, fecha_dosis, fecha_refuerzo, estado, tipo_pago
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
      res.status(404).json(resultado);  // Responde con 404 si no se encuentra la relación
    }
  } catch (error) {
    console.error('Error al eliminar la relación entre mascota y medicamento:', error);
    res.status(500).json({ message: 'Error al eliminar la relación entre mascota y medicamento', error: error.message });
  }
});

// Ruta para obtener los medicamentos de tipo VACUNA con estado 'PENDIENTE' de una mascota por id_mascota
router.get('/vacuna/pendiente/:id_mascota', async (req, res) => {
  try {
    const { id_mascota } = req.params;
    // Llamamos a la función para obtener las vacunas pendientes
    const vacunasPendientes = await obtenerVacunasPendientes(id_mascota);
    
    // Si no se encuentran resultados, devolvemos un mensaje
    if (vacunasPendientes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron vacunas pendientes.' });
    }
    
    // Devolvemos las vacunas pendientes
    res.json(vacunasPendientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener las vacunas pendientes.' });
  }
});


// Ruta para obtener los medicamentos de tipo SUPRESOR con estado 'PENDIENTE' de una mascota por id_mascota
router.get('/supresor/pendiente/:id_mascota', async (req, res) => {
  try {
    const { id_mascota } = req.params;
    // Llamamos a la función para obtener los supresores pendientes
    const supresoresPendientes = await obtenerSupresoresPendientes(id_mascota);
    
    // Si no se encuentran resultados, devolvemos un mensaje
    if (supresoresPendientes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron supresores pendientes.' });
    }
    
    // Devolvemos los supresores pendientes
    res.json(supresoresPendientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los supresores pendientes.' });
  }
});


// Ruta para obtener los medicamentos de tipo DESPARASITANTE con estado 'PENDIENTE' de una mascota por id_mascota
router.get('/desparasitante/pendiente/:id_mascota', async (req, res) => {
  try {
    const { id_mascota } = req.params;
    // Llamamos a la función para obtener los desparasitantes pendientes
    const desparasitantesPendientes = await obtenerDesparasitantesPendientes(id_mascota);
    
    // Si no se encuentran resultados, devolvemos un mensaje
    if (desparasitantesPendientes.length === 0) {
      return res.status(404).json({ message: 'No se encontraron desparasitantes pendientes.' });
    }
    
    // Devolvemos los desparasitantes pendientes
    res.json(desparasitantesPendientes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los desparasitantes pendientes.' });
  }
});



//lISTAR VACUNAS PROXIMAS A fecha_dosis
router.get('/vacuna/dosis/vencimiento', async (req, res) => {
  try {
    // Llamamos a la función para obtener las vacunas con dosis dentro de los próximos 15 días
    const vacunasProximas = await MascotasMedicamentosQueries.obtenerVacunasPorDosis();
    
    // Si no se encuentran resultados, devolvemos un mensaje
    if (vacunasProximas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron vacunas con dosis dentro de los próximos 15 días.' });
    }

    // Devolvemos las vacunas encontradas
    res.json(vacunasProximas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener las vacunas con dosis próximas.' });
  }
});



//LISTAR DESPARASITANTES PROXIMOS A fecha_dosis
router.get('/desparasitante/dosis/vencimiento', async (req, res) => {
  try {
    // Llamamos a la función para obtener las vacunas con dosis dentro de los próximos 15 días
    const vacunasProximas = await MascotasMedicamentosQueries.obtenerDesparasitantesPorDosis();
    
    // Si no se encuentran resultados, devolvemos un mensaje
    if (vacunasProximas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron desparasitantes con dosis dentro de los próximos 15 días.' });
    }

    // Devolvemos las vacunas encontradas
    res.json(vacunasProximas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los desparasitantes con dosis próximas.' });
  }
});

//LISTAR DESPARASITANTES PROXIMOS A fecha_dosis
router.get('/supresor/dosis/vencimiento', async (req, res) => {
  try {
    // Llamamos a la función para obtener las vacunas con dosis dentro de los próximos 15 días
    const vacunasProximas = await MascotasMedicamentosQueries.obtenerSupresoresPorDosis();
    
    // Si no se encuentran resultados, devolvemos un mensaje
    if (vacunasProximas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron desparasitantes con dosis dentro de los próximos 15 días.' });
    }

    // Devolvemos las vacunas encontradas
    res.json(vacunasProximas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener los desparasitantes con dosis próximas.' });
  }
});
module.exports = router;