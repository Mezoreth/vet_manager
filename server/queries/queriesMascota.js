const Clientes = require('../models/Clientes.js');  // Usamos require en lugar de import
const Mascotas = require('../models/Mascotas.js');  // Usamos require en lugar de import

// Función para crear Mascotas
const createMascota = async (nombre_mascota, id_especie, id_raza, id_color, sexo, fecha_nacimiento, reproductor, castrado, fecha_castramiento, fallecimiento, observaciones, id_cliente, id_servicio) => {
  try {
    // Intentamos crear una nueva mascota
    const mascotas = await Mascotas.create({ 
      nombre_mascota, 
      id_especie, 
      id_raza, 
      id_color, 
      sexo, 
      fecha_nacimiento, 
      reproductor, 
      castrado, 
      fecha_castramiento, 
      fallecimiento, 
      observaciones, 
      id_cliente,
      id_servicio 
    });
    
    // Retornamos la mascota creada
    return mascotas;
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos en la consola
    console.error("Error al crear la mascota:", error);
    
    // Opcionalmente, puedes lanzar un nuevo error para manejarlo a nivel superior
    throw new Error('No se pudo crear la mascota');
  }
};

// Función para obtener todas las Mascotas
const getMascotas = async () => {
  try {
    // Obtener todas las mascotas, sin ninguna condición
    const mascotas = await Mascotas.findAll({ raw: true });
    return mascotas;
  } catch (error) {
    console.error('Error al obtener todas las mascotas:', error);
    throw error;
  }
};



// Función para actualizar mascota
const updateMascota = async (id_mascota, nombre_mascota, especie, raza, color, sexo, fecha_nacimiento, reproductor, castrado, fecha_castramiento, fallecimiento, observaciones, id_cliente) => {
  try {
    // Intentamos encontrar la mascota por su id
    const mascota = await Mascotas.findOne({
      where: { id_mascota },
    });

    // Si no encontramos la mascota, devolvemos un mensaje de error
    if (!mascota) {
      return { message: 'Mascota no encontrada' };
    }

    // Actualizamos cada campo solo si se recibe un valor
    if (nombre_mascota !== undefined) {
      mascota.nombre_mascota = nombre_mascota;
    }
    if (especie !== undefined) {
      mascota.especie = especie;
    }
    if (raza !== undefined) {
      mascota.raza = raza;
    }
    if (color !== undefined) {
      mascota.color = color;
    }
    if (sexo !== undefined) {
      mascota.sexo = sexo;
    }
    if (fecha_nacimiento !== undefined) {
      mascota.fecha_nacimiento = fecha_nacimiento;
    }
    if (reproductor !== undefined) {
      mascota.reproductor = reproductor;
    }
    if (castrado !== undefined) {
      mascota.castrado = castrado;
    }
    if (fecha_castramiento !== undefined) {
      mascota.fecha_castramiento = fecha_castramiento;
    }
    if (fallecimiento !== undefined) {
      mascota.fallecimiento = fallecimiento;
    }
    if (observaciones !== undefined) {
      mascota.observaciones = observaciones;
    }
    if (id_cliente !== undefined) {
      mascota.id_cliente = id_cliente;
    }

    // Guardamos los cambios en la base de datos
    await mascota.save();

    // Devolvemos el resultado de la actualización
    return { message: 'Mascota actualizada con éxito' };
  } catch (error) {
    return { message: 'Error al actualizar la mascota' };
  }
};

// Función para eliminar mascota
const deleteMascota = async (id_mascota) => {
  try {
    const deletedMascota = await Mascotas.destroy({
      where: { id_mascota },
    });

    if (deletedMascota) {
      return { message: 'Mascota eliminada con éxito' };
    } else {
      return { message: 'Mascota no encontrada' };
    }
  } catch (error) {
    return { message: 'Error al eliminar la mascota en la query', error };
  }
};

// Exportar todas las funciones para usarlas en otros archivos
module.exports = {
  createMascota,
  getMascotas,
  updateMascota,
  deleteMascota,
};









/*
// Función para obtener todas las mascotas de un cliente específico
const getMascotasPorCliente = async (id_cliente) => {
  try {
    // Realizamos la consulta para obtener todas las mascotas asociadas al cliente
    const mascotas = await Mascotas.findAll({
      where: {
        id_cliente: id_cliente  // Filtramos las mascotas por id_cliente
      }
    });

    return mascotas;  // Devuelve las mascotas encontradas
  } catch (error) {
    console.error('Error al obtener las mascotas por cliente:', error);
    throw error;  // Si hay un error, lo lanzamos para que sea capturado por el catch en la ruta
  }
};*/