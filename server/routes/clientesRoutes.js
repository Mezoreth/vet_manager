const express = require('express');
const ClienteQueries = require('../queries/queriesCliente');  // Ajusta la ruta según tu estructura

const router = express.Router();

// Ruta para obtener clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await ClienteQueries.getClientes(); // Llama a la función que obtiene los clientes
        res.json(clientes); // Devuelve los clientes en formato JSON
    } catch (error) {
        console.error('Error al obtener clientes:', error);
        res.status(500).json({ error: 'Error al obtener clientes' });
    }
});

// Ruta para obtener un cliente con todas sus mascotas
router.get('/:id_cliente', async (req, res) => {
    const { id_cliente } = req.params;
    try {
      const cliente = await ClienteQueries.obtenerClienteConMascotas(id_cliente);
      if (!cliente) {
        return res.status(404).json({ message: 'Cliente no encontrado' });
      }
      res.status(200).json(cliente);
    } catch (error) {
      console.error('Error al obtener cliente con mascotas:', error);
      res.status(500).json({ message: 'Error al obtener cliente con mascotas', error });
    }
  });

// Ruta para obtener clientes con mascotas
router.get('/con-mascotas', async (req, res) => {
    try {
      const clientes = await ClienteQueries.getClientesConMascotas();
      res.status(200).json(clientes); // Envía los datos de los clientes con mascotas en la respuesta
    } catch (error) {
      console.error('Error al obtener los clientes con mascotas:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los clientes con mascotas' });
    }
  });

// Ruta para buscar clientes por nombre
router.get('/nombre_cliente/:nombre_cliente', async (req, res) => {
    const { nombre_cliente } = req.params;  // Obtenemos el parámetro 'nombre_cliente' de la URL
  
    if (!nombre_cliente) {
      return res.status(400).json({ message: 'El nombre del cliente es requerido.' });
    }
  
    try {
      // Llamamos a la función de la query que busca clientes por nombre
      const clientes = await ClienteQueries.obtenerClientesPorNombre(nombre_cliente);
  
      // Si no encontramos clientes
      if (clientes.length === 0) {
        return res.status(404).json({ message: 'No se encontraron clientes con ese nombre.' });
      }
  
      // Si encontramos clientes, devolvemos los resultados
      res.status(200).json(clientes);
      
    } catch (error) {
      console.error('Error al obtener clientes por nombre:', error);
      res.status(500).json({ message: 'Error al obtener clientes', error });
    }
  });


// Ruta para buscar clientes por telefono
router.get('/telefono/:telefono', async (req, res) => {
    const { telefono } = req.params;  // Obtenemos el teléfono de la URL
  
    if (!telefono) {
      return res.status(400).json({ message: 'El teléfono del cliente es requerido.' });
    }
  
    try {
      // Llamamos a la función de la query que busca clientes por teléfono
      const clientes = await ClienteQueries.obtenerClientesPorTelefono(telefono);
  
      if (clientes.length === 0) {
        return res.status(404).json({ message: 'No se encontraron clientes con ese teléfono.' });
      }
  
      res.status(200).json(clientes);
    } catch (error) {
      console.error('Error al obtener clientes por teléfono:', error.message);  // Agregar error.message
      console.error(error);  // Agregar más detalles del error
      res.status(500).json({ message: 'Error al obtener clientes', error: error.message });
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