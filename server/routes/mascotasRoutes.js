const express = require('express');
const MascotasQueries = require('../queries/queriesMascota');  // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para obtener todas las mascotas con detalles asociados (cliente, características, medicamentos)
router.get('/', async (req, res) => {
    try {
        const mascotas = await MascotasQueries.obtenerMascotasConDetalles();  // Llama a la función que obtiene las mascotas con detalles
        res.json(mascotas);  // Devuelve las mascotas en formato JSON
    } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        res.status(500).json({ error: 'Error al obtener las mascotas' });
    }
});

// Ruta para obtener las mascotas de un cliente específico
router.get('/:idCliente', async (req, res) => {
    try {
        const { idCliente } = req.params; 
        const mascotas = await MascotasQueries.obtenerMascotasPorCliente(idCliente);
        res.json(mascotas);  
    } catch (error) {
        console.error('Error al obtener las mascotas del cliente:', error);
        res.status(500).json({ error: 'Error al obtener las mascotas del cliente' });
    }
});

// Ruta para búsqueda de mascotas por nombre del cliente
router.get('/buscar/:nombre_cliente', async (req, res) => {
    try {
      const { nombre_cliente } = req.params; // Obtener el nombre del cliente desde la URL
      const mascotas = await MascotasQueries.obtenerMascotasPorNombreCliente(nombre_cliente);  // Pasamos el nombre_cliente
      res.json(mascotas);  // Devolvemos las mascotas encontradas en formato JSON
    } catch (error) {
      console.error('Error al obtener las mascotas del cliente:', error);
      res.status(500).json({ error: 'Error al obtener las mascotas del cliente' });
    }
});
// Ruta para búsqueda de mascotas por telefono del cliente
router.get('/buscar/telefono/:telefono', async (req, res) => {
    try {
        const { telefono } = req.params;  
        const mascotas = await MascotasQueries.obtenerMascotasPorTelefono(telefono); 
        res.json(mascotas);  
    } catch (error) {
        console.error('Error al obtener las mascotas por teléfono:', error);
        res.status(500).json({ error: 'Error al obtener las mascotas por teléfono' });
    }
});  
// Ruta para búsqueda de mascotas por nombre de la mascota
router.get('/buscar/nombre/:nombre_mascota', async (req, res) => {
  const { nombre_mascota } = req.params;  // Obtener el nombre de la mascota desde los parámetros de la URL

  if (!nombre_mascota) {
    return res.status(400).json({ error: 'El parámetro nombre_mascota es obligatorio' });
  }

  try {
    // Llamar a la función para obtener las mascotas filtradas por nombre
    const mascotas = await MascotasQueries.obtenerMascotasPorNombre(nombre_mascota);

    if (mascotas.length === 0) {
      return res.status(404).json({ message: 'No se encontraron mascotas con ese nombre' });
    }

    // Retornar las mascotas encontradas
    res.json(mascotas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un error al obtener las mascotas' });
  }
});


router.post('/crear', async (req, res) => {
    const { 
      nombre_mascota, 
      sexo, 
      fecha_nacimiento, 
      id_cliente, 
      observaciones, 
      reproductor, 
      castrado, 
      fecha_castramiento, 
      fallecimiento, 
      id_raza, 
      id_especie, 
      id_color 
    } = req.body;
  
    // Aseguramos que los datos de la mascota y las características estén presentes
    if (!nombre_mascota || !id_raza || !id_especie || !id_color) {
      return res.status(400).json({ error: 'Se requieren el nombre de la mascota y las tres características (raza, especie, color).' });
    }
  
    try {
      // Llamamos a la función de creación, pasando los parámetros por separado
      const nuevaMascota = await createMascotaConCaracteristicas(
        nombre_mascota, 
        sexo, 
        fecha_nacimiento, 
        id_cliente, 
        observaciones, 
        reproductor, 
        castrado, 
        fecha_castramiento, 
        fallecimiento, 
        id_raza, 
        id_especie, 
        id_color
      );
  
      // Respondemos con la mascota creada
      res.status(201).json({
        message: 'Mascota creada exitosamente.',
        nuevaMascota,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al crear la mascota y sus características.',
        message: error.message,
      });
    }
  });
  

router.put('/actualizar/:id_mascota', async (req, res) => {
    const { id_mascota } = req.params; // Obtenemos el id_mascota desde la URL
    const { 
      nombre_mascota, 
      sexo, 
      fecha_nacimiento, 
      id_cliente, 
      observaciones, 
      reproductor, 
      castrado, 
      fecha_castramiento, 
      fallecimiento, 
      id_raza, 
      id_especie, 
      id_color 
    } = req.body;
  
    // Aseguramos que los datos esenciales de la mascota y las características estén presentes
    if (!nombre_mascota || !id_raza || !id_especie || !id_color) {
      return res.status(400).json({ error: 'Se requieren el nombre de la mascota y las tres características (raza, especie, color).' });
    }
  
    try {
      // Llamamos a la función de actualización, pasando los parámetros por separado
      const mascotaActualizada = await updateMascotaConCaracteristicas(
        id_mascota, // ID de la mascota a actualizar
        nombre_mascota, 
        sexo, 
        fecha_nacimiento, 
        id_cliente, 
        observaciones, 
        reproductor, 
        castrado, 
        fecha_castramiento, 
        fallecimiento, 
        id_raza, 
        id_especie, 
        id_color
      );
  
      // Respondemos con la mascota actualizada
      res.status(200).json({
        message: 'Mascota actualizada exitosamente.',
        mascotaActualizada,
      });
    } catch (error) {
      res.status(500).json({
        error: 'Error al actualizar la mascota y sus características.',
        message: error.message,
      });
    }
  });



router.delete('/eliminar/:id_mascota', async (req, res) => {
  const { id_mascota } = req.params;
    if (!id_mascota) return res.status(400).json({ error: 'Se requiere el id de la mascota.' });
  
    try {
      const result = await deleteMascotaConCaracteristicas(id_mascota);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar la mascota y sus características.', message: error.message });
    }
});

  module.exports = router;