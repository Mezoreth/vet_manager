const Cliente = require('../models/Clientes');  // Asegúrate de que la ruta sea correcta
const Mascota = require('../models/Mascotas');

// Función para obtener todos los clientes
const getClientes = async () => {
  try {
    const clientes = await Cliente.findAll({ raw: true });
    return clientes; // Devuelve los clientes obtenidos
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado por el llamador
  }
};

// Función para obtener todos los clientes con sus mascotas
const getClientesConMascotas = async () => {
  try {
    const clientes = await Cliente.findAll({
      include: [
        {
          model: Mascota,
          attributes: ['id_mascota', 'nombre_mascota', 'especie', 'raza', 'color'], // Selecciona solo los campos que deseas de Mascota
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
const getClienteConMascotasPorId = async (id_cliente) => {
  try {
    // Buscamos el cliente por su id_cliente, e incluimos sus mascotas con los campos especificados
    const cliente = await Cliente.findOne({
      where: { id_cliente: id_cliente }, // Filtramos por id_cliente
      include: [
        {
          model: Mascota,  // Relacionamos el modelo Mascota
          attributes: ['id_mascota', 'nombre_mascota', 'id_especie', 'id_raza', 'id_color'], // Solo los campos que deseas mostrar de las mascotas
          // required: false, // Esto es para permitir clientes sin mascotas (si lo necesitas)
        },
      ],
    });

    // Si no se encuentra el cliente, lanzamos un error
    if (!cliente) {
      throw new Error('Cliente no encontrado');
    }

    // Retornamos el cliente con las mascotas asociadas (en formato JSON)
    return cliente.toJSON();
  } catch (error) {
    console.error('Error al obtener cliente con mascotas:', error);
    throw error;  // Lanza el error para ser manejado por el llamador
  }
};

// Función para crear un cliente
const createCliente = async (nombre_cliente, telefono, direccion, cumpleanos, observaciones) => {
  try {
    // Intentamos crear un nuevo cliente
    const clientes = await Cliente.create({ nombre_cliente, telefono, direccion, cumpleanos, observaciones });
    
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
    const cliente = await Cliente.findByPk(id_cliente);
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
    const deletedCliente = await Cliente.destroy({
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
  getClienteConMascotasPorId,
  createCliente,
  updateCliente,
  deleteCliente
};