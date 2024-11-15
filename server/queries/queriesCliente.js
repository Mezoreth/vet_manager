const { Op } = require('sequelize');
const Clientes = require('../models/Clientes');  // Asegúrate de que la ruta sea correcta
const Mascotas = require('../models/Mascotas');

// Función para obtener todos los clientes
const getClientes = async () => {
  try {
    const clientes = await Clientes.findAll({
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_cliente', 'ASC']],  // Ordena por nombre_cliente en orden ascendente
    });
    return clientes; // Devuelve los clientes obtenidos
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener todos los clientes con sus mascotas
const getClientesConMascotas = async () => {
  try {
    const clientes = await Clientes.findAll({
      include: [
        {
          model: Mascotas,
          attributes: ['id_mascota', 'nombre_mascota', 'id_especie', 'id_raza', 'id_color'], // Selecciona solo los campos que deseas de Mascota
          required: false,
        },
      ],
    });
    return clientes.map(cliente => cliente.toJSON()); // Devuelve los clientes con sus respectivas mascotas
  } catch (error) {
    console.error('Error al obtener clientes con mascotas:', error);
    throw error; // Lanza el error para que sea manejado por el llamador
  }
};

// Función para obtener un solo cliente con todas sus mascotas
const obtenerClienteConMascotas = async (id_cliente) => {
  try {
    // Buscar el cliente por id_cliente e incluir todas las mascotas asociadas
    const cliente = await Clientes.findOne({
      where: { id_cliente },
      include: [{
        model: Mascotas,
        as: 'Mascotas',  // Este 'as' es opcional si es el nombre de la asociación en associations.js
        required: false,  // Esto asegura que si no hay mascotas, el cliente aún se devuelve
      }],
    });

    if (!cliente) {
      return { mensaje: 'Cliente no encontrado' };
    }

    return cliente; // Devuelve el cliente con sus mascotas asociadas
  } catch (error) {
    console.error('Error al obtener cliente con mascotas:', error);
    throw new Error('Error al obtener cliente con mascotas');
  }
};

// Función para buscar clientes por su nombre
const obtenerClientesPorNombre = async (nombre_cliente) => {
  try {
    const clientes = await Clientes.findAll({
      where: {
        nombre_cliente: {
          [Op.like]: `%${nombre_cliente}%`,  // Usamos el operador LIKE para búsqueda parcial
        },
      },
      include: [
        {
          model: Mascotas,  // Incluimos las mascotas asociadas
          required: false,   // Queremos que los clientes sin mascotas también se incluyan
        },
      ],
    });

    return clientes;  // Devolvemos los clientes encontrados
  } catch (error) {
    console.error('Error al obtener clientes por nombre:', error);
    throw new Error('Error al obtener clientes');
  }
};


// Función para buscar clientes por su telefono
const obtenerClientesPorTelefono = async (telefono) => {
  try {
    const clientes = await Clientes.findAll({
      where: {
        telefono: {
          [Op.like]: `%${telefono}%`,  // Usamos el operador LIKE para búsqueda parcial por teléfono
        },
      },
      include: [
        {
          model: Mascotas,  // Incluimos las mascotas asociadas
          required: false,   // Queremos que los clientes sin mascotas también se incluyan
        },
      ],
    });

    return clientes;  // Devolvemos los clientes encontrados
  } catch (error) {
    console.error('Error al obtener clientes por teléfono:', error);
    throw new Error('Error al obtener clientes');
  }
};




// Función para crear un cliente
const createCliente = async (nombre_cliente, telefono, direccion, cumpleanos, observaciones) => {
  try {
    // Intentamos crear un nuevo cliente
    const clientes = await Clientes.create({ nombre_cliente, telefono, direccion, cumpleanos, observaciones });
    
    // Retornamos el cliente creado en formato JSON
    return clientes.toJSON();
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos
    console.error("Error al crear el cliente:", error);
    
    // Opcionalmente, puedes lanzar el error para manejarlo a nivel superior
    throw new Error('No se pudo crear el cliente');
  }
};

// Función para actualizar un cliente
const updateCliente = async (id_cliente, nombre_cliente, telefono, direccion, cumpleanos, observaciones) => {
  try {
    const cliente = await Clientes.findByPk(id_cliente);
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }
    if (nombre_cliente) cliente.nombre_cliente = nombre_cliente;
    if (telefono) cliente.telefono = telefono;
    if (direccion) cliente.direccion = direccion;
    if (cumpleanos) cliente.cumpleanos = cumpleanos;
    if (observaciones) cliente.observaciones = observaciones;
    await cliente.save();
    return { message: 'Cliente actualizado con éxito' };
  } catch (error) {
    return { message: 'Error al actualizar el cliente' };
  }
};

// Función para eliminar un cliente
const deleteCliente = async (id_cliente) => {
  try {
    const deletedCliente = await Clientes.destroy({
      where: { id_cliente },
    });

    if (deletedCliente) {
      return { message: 'Cliente eliminado con éxito' };
    } else {
      return { message: 'Cliente no encontrado' };
    }
  } catch (error) {
    return { message: 'Error al eliminar el cliente en la query', error };
  }
};

module.exports = {
  getClientes,
  getClientesConMascotas,
  obtenerClienteConMascotas,
  createCliente,
  updateCliente,
  deleteCliente,
  obtenerClientesPorNombre,
  obtenerClientesPorTelefono
};