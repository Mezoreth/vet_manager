const express = require('express');
const ClienteQueries = require('../queries/queriesCliente.js');  // Ajusta la ruta según tu estructura

const router = express.Router();

// Ruta para obtener clientes
router.get('/asd', async (req, res) => {
    try {
        const clientes = await ClienteQueries.getClientes(); // Llama a la función que obtiene los clientes
        res.json(clientes); // Devuelve los clientes en formato JSON
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

// Ruta para obtener clientes con mascotas
router.get('/', async (req, res) => {
    try {
        const clientesConMascotas = await ClienteQueries.getClientesConMascotas(); // Llama a la nueva función
        res.json(clientesConMascotas); // Devuelve los clientes en formato JSON
    } catch (error) {
        console.error('Error al obtener clientes con mascotas:', error);
        res.status(500).json({ error: 'Error al obtener clientes con mascotas' });
    }
});

// Ruta para obtener un cliente con todas sus mascotas
router.get('/por-id/:id_cliente', async (req, res) => {
    const { id_cliente } = req.params; // Obtenemos el id_cliente de los parámetros de la URL

    // Validamos si el id_cliente es un número válido, si no, enviamos un error 400
    if (!id_cliente || isNaN(id_cliente)) {
        return res.status(400).json({ message: 'ID del cliente no es válido.' });
    }

    try {
        // Llamamos a la función para obtener el cliente con sus mascotas
        const cliente = await ClienteQueries.getClienteConMascotasPorId(id_cliente);

        // Si no se encuentra el cliente, se envía un error 404
        if (!cliente) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        // Enviamos la respuesta con los datos del cliente y sus mascotas
        return res.status(200).json(cliente);
    } catch (error) {
        console.error('Error en la ruta de obtener cliente:', error);

        // Si el error es una instancia de Error y contiene un mensaje, lo devolvemos
        const errorMessage = error instanceof Error ? error.message : 'Hubo un problema al obtener el cliente';

        return res.status(500).json({
            message: errorMessage,
            error: error.stack || errorMessage,  // Enviar la traza de error completa si es posible
        });
    }
});

// Ruta para crear cliente
router.post('/', async (req, res) => {
    const { nombre_cliente, telefono, direccion, cumpleanos, observaciones } = req.body;

    try {
        const nuevoCliente = await ClienteQueries.createCliente(nombre_cliente, telefono, direccion, cumpleanos, observaciones);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error al crear el cliente:', error);
        res.status(500).json({ error: 'Error al crear el cliente' });
    }
});

// Ruta para actualizar un cliente
router.put('/:id_cliente', async (req, res) => {
    const { id_cliente } = req.params; // Obtenemos el id_cliente desde los parámetros de la URL
    const { nombre_cliente, telefono, direccion, cumpleanos, observaciones } = req.body; // Obtenemos los datos desde el cuerpo de la solicitud
  
    try {
        // Llamamos a la función updateCliente para actualizar los datos del cliente
        const clienteActualizado = await ClienteQueries.updateCliente(id_cliente, nombre_cliente, telefono, direccion, cumpleanos, observaciones);
  
        // Respondemos con los datos actualizados
        res.json(clienteActualizado);
    } catch (error) {
        // En caso de error, respondemos con un error y un mensaje adecuado
        console.error('Error al actualizar cliente:', error);
        res.status(500).json({ error: 'Error al actualizar los datos del cliente' });
    }
});

// Ruta para eliminar un cliente
router.delete('/:id_cliente', async (req, res) => {
    const { id_cliente } = req.params;  // Obtener el id_cliente desde los parámetros de la URL
    
    try {
        const result = await ClienteQueries.deleteCliente(id_cliente);  // Llamar a la función deleteCliente
  
        if (result.message === 'Cliente eliminado con éxito') {
            return res.status(200).json(result);  // Si el cliente fue eliminado, devolver mensaje de éxito
        } else {
            return res.status(404).json(result);  // Si no se encontró el cliente, devolver mensaje de error
        }
    } catch (error) {
        console.error('Error al eliminar el cliente en ruta:', error);
        return res.status(500).json({ message: 'Error al eliminar el cliente', error: error.message });
    }
});

module.exports = router;