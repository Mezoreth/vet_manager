const express = require('express');
const MascotaQueries = require('../queries/queriesMascota'); // Ajusta la ruta según tu estructura

const router = express.Router();

// Ruta para crear mascota
router.post('/', async (req, res) => {
    const { nombre_mascota, especie, raza, color, sexo, fecha_nacimiento, reproductor, castrado, fecha_castramiento, fallecimiento, observaciones, id_cliente } = req.body;

    try {
        const nuevaMascota = await MascotaQueries.createMascota(nombre_mascota, especie, raza, color, sexo, fecha_nacimiento, reproductor, castrado, fecha_castramiento, fallecimiento, observaciones, id_cliente);
        res.status(201).json(nuevaMascota);
    } catch (error) {
        console.error('Error al crear mascota:', error);
        res.status(500).json({ error: 'Error al crear mascota' });
    }
});

// Ruta para obtener mascotas
router.get('/', async (req, res) => {
    try {
        const mascotas = await MascotaQueries.getMascotas(); // Llama a la función que obtiene las mascotas
        res.json(mascotas); // Devuelve las mascotas en formato JSON
    } catch (error) {
        console.error('Error al obtener mascotas:', error);
        res.status(500).json({ error: 'Error al obtener mascotas' });
    }
});

// Ruta para obtener las mascotas de un cliente
router.get('/por-cliente/:id_cliente', async (req, res) => {
    const { id_cliente } = req.params;  // Obtener el id_cliente desde los parámetros de la URL
  
    try {
        // Llamar a la función que obtiene las mascotas del cliente con id_cliente
        const mascotas = await MascotaQueries.getMascotasPorCliente(id_cliente);
    
        // Verificar si se encontraron mascotas para ese cliente
        if (mascotas.length === 0) {
            return res.status(404).json({ message: `El cliente con id ${id_cliente} no tiene mascotas` });
        }
    
        // Si se encontraron mascotas, devolverlas en formato JSON
        res.json(mascotas);
    } catch (error) {
        console.error('Error al obtener las mascotas:', error);
        res.status(500).json({ error: 'Error al obtener las mascotas del cliente' });
    }
});

// Ruta para actualizar una mascota
router.put('/:id_mascota', async (req, res) => {
    const { id_mascota } = req.params; // Obtener el id_mascota de los parámetros de la URL
    const {
        nombre_mascota,
        especie,
        raza,
        color,
        sexo,
        fecha_nacimiento,
        reproductor,
        castrado,
        fecha_castramiento,
        fallecimiento,
        observaciones,
        id_cliente
    } = req.body; // Obtener los datos del cuerpo de la solicitud (que queremos actualizar)

    try {
        // Llamamos al controlador que maneja la actualización de la mascota
        const result = await MascotaQueries.updateMascota(
            id_mascota,
            nombre_mascota,
            especie,
            raza,
            color,
            sexo,
            fecha_nacimiento,
            reproductor,
            castrado,
            fecha_castramiento,
            fallecimiento,
            observaciones,
            id_cliente
        );

        // Enviamos la respuesta según el resultado
        if (result.message === 'Mascota actualizada con éxito') {
            return res.status(200).json(result); // Código 200 para éxito
        } else {
            return res.status(404).json(result); // Código 404 si no se encontró la mascota
        }
    } catch (error) {
        // En caso de error, enviamos un mensaje de error
        return res.status(500).json({ message: 'Error al actualizar la mascota', error: error.message });
    }
});

// Ruta para eliminar una mascota
router.delete('/:id_mascota', async (req, res) => {
    const { id_mascota } = req.params;  // Obtener el id_mascota desde los parámetros de la URL
  
    try {
        const result = await MascotaQueries.deleteMascota(id_mascota); 

        if (result.message === 'Mascota eliminada con éxito') {
            return res.status(200).json(result);  // Si la mascota fue eliminada, devolver mensaje de éxito
        } else {
            return res.status(404).json(result);  // Si no se encontró la mascota, devolver mensaje de error
        }
    } catch (error) {
        console.error('Error al eliminar la mascota en ruta:', error);
        return res.status(500).json({ message: 'Error al eliminar la mascota', error: error.message });
    }
});

// Exportar el router
module.exports = router;