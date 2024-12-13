const express = require('express');
const ConsultaQueries = require('../queries/queriesConsultas');  // Ajusta la ruta según tu estructura

const router = express.Router();

// Ruta para obtener todas las consultas
router.get('/', async (req, res) => {
  try {
    const consultas = await ConsultaQueries.getConsultas(); // Llama a la función que obtiene las consultas
    res.json(consultas); // Devuelve las consultas en formato JSON
  } catch (error) {
    console.error('Error al obtener las consultas:', error);
    res.status(500).json({ error: 'Error al obtener las consultas' });
  }
});

// Ruta para crear una nueva consulta
router.post('/', async (req, res) => {
  try {
    const { precio, descripcion, fecha, tipo_pago } = req.body;
    const nuevaConsulta = await ConsultaQueries.createConsulta(precio, descripcion, fecha, tipo_pago);
    res.status(201).json(nuevaConsulta); // Devuelve la consulta creada con el código de estado 201
  } catch (error) {
    console.error('Error al crear la consulta:', error);
    res.status(500).json({ error: 'Error al crear la consulta' });
  }
});

// Ruta para actualizar una consulta
router.put('/:id_consulta', async (req, res) => {
  try {
    const { id_consulta } = req.params; // Obtenemos el id_consulta desde los parámetros de la URL
    const { precio, descripcion, fecha, tipo_pago } = req.body; // Obtenemos los datos desde el cuerpo de la solicitud
    const consultaActualizada = await ConsultaQueries.updateConsulta(id_consulta, precio, descripcion, fecha, tipo_pago);
    res.json(consultaActualizada); // Respondemos con los datos actualizados
  } catch (error) {
    console.error('Error al actualizar la consulta:', error);
    res.status(500).json({ error: 'Error al actualizar los datos de la consulta' });
  }
});

// Ruta para eliminar una consulta
router.delete('/:id_consulta', async (req, res) => {
  try {
    const { id_consulta } = req.params; // Obtener el id_consulta desde los parámetros de la URL
    const result = await ConsultaQueries.deleteConsulta(id_consulta); // Llamar a la función deleteConsulta

    if (result.message === 'Consulta eliminada con éxito') {
      return res.status(200).json(result);  // Si la consulta fue eliminada, devolver mensaje de éxito
    } else {
      return res.status(404).json(result);  // Si no se encontró la consulta, devolver mensaje de error
    }
  } catch (error) {
    console.error('Error al eliminar la consulta en ruta:', error);
    return res.status(500).json({ message: 'Error al eliminar la consulta', error: error.message });
  }
});

module.exports = router;