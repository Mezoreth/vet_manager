const { Op } = require('sequelize');
const Mascotas = require('../models/Mascotas');
const Clientes = require('../models/Clientes');
const Caracteristicas = require('../models/Caracteristicas');
const Mascotas_Caracteristicas = require('../models/Mascotas_Caracteristicas');
const sequelize = require('../database/database');


// Consulta para obtener mascotas con caracteristicas y datos del cliente
const obtenerMascotasConDetalles = async () => {
  try {
    const mascotas = await Mascotas.findAll({
      attributes: [
        'id_mascota',          // ID de la mascota
        'nombre_mascota',              // Nombre de la mascota
        'sexo',                // Sexo
        'fecha_nacimiento',    // Fecha de nacimiento
        'reproductor',         // Reproductor
        'castrado',            // Castrado
        'fecha_castramiento',  // Fecha de castramiento
        'fallecimiento',       // Fecha de fallecimiento
        'observaciones',       // Observaciones
        'id_cliente',          // ID del cliente
      ],
      include: [
        {
          model: Clientes,
          attributes: ['nombre_cliente', 'telefono'], // Solo los campos que necesitamos del cliente
          required: false,
        },
        {
          model: Caracteristicas,
          attributes: ['id_caracteristica','descripcion', 'tipo'], // Solo los campos de las características
          through: {
            attributes: [] // No incluimos los atributos de la tabla intermedia
          },
          as: 'caracteristicas', // Especificamos el alias para la relación
          required: false, // Especificamos que es opcional
        }
      ],
      order: [['nombre_mascota', 'ASC']],
    });

    // Mapeamos los resultados para combinar especie, raza y color en una sola fila
    const result = mascotas.map(mascota => {
      // Filtramos las características para encontrar cada tipo
      const especie = mascota.caracteristicas.find(c => c.tipo === 'ESPECIE');
      const raza = mascota.caracteristicas.find(c => c.tipo === 'RAZA');
      const color = mascota.caracteristicas.find(c => c.tipo === 'COLOR');

      return {
        id_mascota: mascota.id_mascota,
        nombre_mascota: mascota.nombre_mascota,
        sexo: mascota.sexo,
        fecha_nacimiento: mascota.fecha_nacimiento,
        reproductor: mascota.reproductor,
        castrado: mascota.castrado,
        fecha_castramiento: mascota.fecha_castramiento,
        fallecimiento: mascota.fallecimiento,
        observaciones: mascota.observaciones,
        id_cliente: mascota.id_cliente,
        nombre_cliente: mascota.Cliente ? mascota.Cliente.nombre_cliente : null,
        telefono: mascota.Cliente ? mascota.Cliente.telefono : null,
        especie: especie ? especie.descripcion : null,
        raza: raza ? raza.descripcion : null,
        color: color ? color.descripcion : null,
        id_especie: especie ? especie.id_caracteristica : null,  
        id_raza: raza ? raza.id_caracteristica : null,            
        id_color: color ? color.id_caracteristica : null,         
      };
    });

    return result;

  } catch (error) {
    throw new Error('Error al obtener las mascotas con sus clientes y características: ' + error.message);
  }
};


/* ejemplo de retorno de la funcion obtenerMascotasConDetalles
castrado: false
color: "VERDE"
especie: "PERRO"
fallecimiento: true
fecha_castramiento: null
fecha_nacimiento: "2024-01-14"
id_cliente: 10
id_mascota: 1
nombre_cliente: "ORA ZIEME"
nombre_mascota: "GINGER"
observaciones: "CAPITULUS ADIUVO CARUS SUBIUNGO ASPERIORES THESIS CONSECTETUR."
raza: "PITBULL"
reproductor: false
sexo: "H"
telefono: 72422030*/


//Obtiene tadas las mascotas con sus caracteristicas de un cliente por su id
const obtenerMascotasPorCliente = async (idCliente) => {
  try {
    const mascotas = await Mascotas.findAll({
      attributes: [
        'id_mascota',          // ID de la mascota
        'nombre_mascota',      // Nombre de la mascota
        'sexo',                // Sexo
        'fecha_nacimiento',    // Fecha de nacimiento
        'reproductor',         // Reproductor
        'castrado',            // Castrado
        'fecha_castramiento',  // Fecha de castramiento
        'fallecimiento',       // Fecha de fallecimiento  
        'observaciones',       // Observaciones
        'id_cliente',          // ID del cliente
      ],
      where: {
        id_cliente: idCliente, // Filtramos por el ID del cliente
      },
      include: [
        {
          model: Clientes,
          attributes: ['nombre_cliente', 'telefono'], // Solo los campos que necesitamos del cliente
          required: false,
        },
        {
          model: Caracteristicas,
          attributes: ['id_caracteristica','descripcion', 'tipo'], // Solo los campos de las características
          through: {
            attributes: [] // No incluimos los atributos de la tabla intermedia
          },
          as: 'caracteristicas', // Especificamos el alias para la relación
          required: false, // Especificamos que es opcional
        }
      ],
      order: [['nombre_mascota', 'ASC']],
    });

    // Mapeamos los resultados para combinar especie, raza y color en una sola fila
    const result = mascotas.map(mascota => {
      // Filtramos las características para encontrar cada tipo
      const especie = mascota.caracteristicas.find(c => c.tipo === 'ESPECIE');
      const raza = mascota.caracteristicas.find(c => c.tipo === 'RAZA');
      const color = mascota.caracteristicas.find(c => c.tipo === 'COLOR');

      return {
        id_mascota: mascota.id_mascota,
        nombre_mascota: mascota.nombre_mascota,
        sexo: mascota.sexo,
        fecha_nacimiento: mascota.fecha_nacimiento,
        reproductor: mascota.reproductor,
        castrado: mascota.castrado,
        fecha_castramiento: mascota.fecha_castramiento,
        fallecimiento: mascota.fallecimiento,
        observaciones: mascota.observaciones,
        id_cliente: mascota.id_cliente,
        nombre_cliente: mascota.Cliente ? mascota.Cliente.nombre_cliente : null,
        telefono: mascota.Cliente ? mascota.Cliente.telefono : null,
        especie: especie ? especie.descripcion : null,
        raza: raza ? raza.descripcion : null,
        color: color ? color.descripcion : null,
        id_especie: especie ? especie.id_caracteristica : null,  
        id_raza: raza ? raza.id_caracteristica : null,            
        id_color: color ? color.id_caracteristica : null, 
      };
    });

    return result;

  } catch (error) {
    throw new Error('Error al obtener las mascotas del cliente con sus características: ' + error.message);
  }
};

// Consulta para obtener mascotas con caracteristicas y datos del cliente de todas las mascotas que tengan el nombre del cliente
const obtenerMascotasPorNombreCliente = async (nombre_cliente) => {
  try {
    // Realizamos la consulta para obtener las mascotas con nombre del cliente filtrado
    const mascotas = await Mascotas.findAll({
      attributes: [
        'id_mascota',          // ID de la mascota
        'nombre_mascota',      // Nombre de la mascota
        'sexo',                // Sexo
        'fecha_nacimiento',    // Fecha de nacimiento
        'reproductor',         // Reproductor
        'castrado',            // Castrado
        'fecha_castramiento',  // Fecha de castramiento
        'fallecimiento',       // Fecha de fallecimiento  
        'observaciones',       // Observaciones
        'id_cliente',          // ID del cliente
      ],
      include: [
        {
          model: Clientes,
          attributes: ['nombre_cliente', 'telefono'], // Solo los campos que necesitamos del cliente
          required: true,
          where: {
            // Usamos el operador 'like' para buscar coincidencias parciales en el nombre del cliente
            nombre_cliente: {
              [Op.like]: `%${nombre_cliente}%`, // El '%' permite hacer una búsqueda que sea "parecida"
            }
          }
        },
        {
          model: Caracteristicas,
          attributes: ['id_caracteristica','descripcion', 'tipo'], // Solo los campos de las características
          through: {
            attributes: [] // No incluimos los atributos de la tabla intermedia
          },
          as: 'caracteristicas', // Especificamos el alias para la relación
          required: false, // Especificamos que es opcional
        }
      ],
      order: [['nombre_mascota', 'ASC']],
    });

    // Mapeamos los resultados para combinar especie, raza y color en una sola fila
    const result = mascotas.map(mascota => {
      // Filtramos las características para encontrar cada tipo
      const especie = mascota.caracteristicas.find(c => c.tipo === 'ESPECIE');
      const raza = mascota.caracteristicas.find(c => c.tipo === 'RAZA');
      const color = mascota.caracteristicas.find(c => c.tipo === 'COLOR');

      return {
        id_mascota: mascota.id_mascota,
        nombre_mascota: mascota.nombre_mascota,
        sexo: mascota.sexo,
        fecha_nacimiento: mascota.fecha_nacimiento,
        reproductor: mascota.reproductor,
        castrado: mascota.castrado,
        fecha_castramiento: mascota.fecha_castramiento,
        fallecimiento: mascota.fallecimiento,
        observaciones: mascota.observaciones,
        id_cliente: mascota.id_cliente,
        nombre_cliente: mascota.Cliente ? mascota.Cliente.nombre_cliente : null,
        telefono: mascota.Cliente ? mascota.Cliente.telefono : null,
        especie: especie ? especie.descripcion : null,
        raza: raza ? raza.descripcion : null,
        color: color ? color.descripcion : null,
        id_especie: especie ? especie.id_caracteristica : null,  
        id_raza: raza ? raza.id_caracteristica : null,            
        id_color: color ? color.id_caracteristica : null, 
      };
    });

    return result;

  } catch (error) {
    throw new Error('Error al obtener las mascotas con sus clientes y características: ' + error.message);
  }
};





// Consulta para obtener mascotas con caracteristicas y datos del cliente de todas las mascotas que tengan el telefono del cliente
const obtenerMascotasPorTelefono = async (telefono) => {
  try {
    // Realizamos la consulta para obtener las mascotas con teléfono del cliente filtrado
    const mascotas = await Mascotas.findAll({
      attributes: [
        'id_mascota',          // ID de la mascota
        'nombre_mascota',      // Nombre de la mascota
        'sexo',                // Sexo
        'fecha_nacimiento',    // Fecha de nacimiento
        'reproductor',         // Reproductor
        'castrado',            // Castrado
        'fecha_castramiento',  // Fecha de castramiento
        'fallecimiento',       // Fecha de fallecimiento  
        'observaciones',       // Observaciones
        'id_cliente',          // ID del cliente
      ],
      include: [
        {
          model: Clientes,
          attributes: ['nombre_cliente', 'telefono'], // Solo los campos que necesitamos del cliente
          required: true,
          where: {
            // Buscamos por teléfono usando el operador 'like' o directamente con igualdad
            telefono: telefono, // Asegúrate de pasar el teléfono como número entero
          }
        },
        {
          model: Caracteristicas,
          attributes: ['id_caracteristica','descripcion', 'tipo'], // Solo los campos de las características
          through: {
            attributes: [] // No incluimos los atributos de la tabla intermedia
          },
          as: 'caracteristicas', // Especificamos el alias para la relación
          required: false, // Especificamos que es opcional
        }
      ],
      order: [['nombre_mascota', 'ASC']],
    });

    // Mapeamos los resultados para combinar especie, raza y color en una sola fila
    const result = mascotas.map(mascota => {
      // Filtramos las características para encontrar cada tipo
      const especie = mascota.caracteristicas.find(c => c.tipo === 'ESPECIE');
      const raza = mascota.caracteristicas.find(c => c.tipo === 'RAZA');
      const color = mascota.caracteristicas.find(c => c.tipo === 'COLOR');

      return {
        id_mascota: mascota.id_mascota,
        nombre_mascota: mascota.nombre_mascota,
        sexo: mascota.sexo,
        fecha_nacimiento: mascota.fecha_nacimiento,
        reproductor: mascota.reproductor,
        castrado: mascota.castrado,
        fecha_castramiento: mascota.fecha_castramiento,
        fallecimiento: mascota.fallecimiento,
        observaciones: mascota.observaciones,
        id_cliente: mascota.id_cliente,
        nombre_cliente: mascota.Cliente ? mascota.Cliente.nombre_cliente : null,
        telefono: mascota.Cliente ? mascota.Cliente.telefono : null,
        especie: especie ? especie.descripcion : null,
        raza: raza ? raza.descripcion : null,
        color: color ? color.descripcion : null,
        id_especie: especie ? especie.id_caracteristica : null,  // Incluimos el id de la especie
        id_raza: raza ? raza.id_caracteristica : null,            // Incluimos el id de la raza
        id_color: color ? color.id_caracteristica : null,         // Incluimos el id del color
      };
    });

    return result;

  } catch (error) {
    throw new Error('Error al obtener las mascotas con sus clientes y características: ' + error.message);
  }
};

//Obtener mascotas por nombre de la mascota 

const obtenerMascotasPorNombre = async (nombre_mascota) => {
  try {
    // Realizamos la consulta para obtener las mascotas filtradas por nombre
    const mascotas = await Mascotas.findAll({
      attributes: [
        'id_mascota',          // ID de la mascota
        'nombre_mascota',      // Nombre de la mascota
        'sexo',                // Sexo
        'fecha_nacimiento',    // Fecha de nacimiento
        'reproductor',         // Reproductor
        'castrado',            // Castrado
        'fecha_castramiento',  // Fecha de castramiento
        'fallecimiento',       // Fecha de fallecimiento  
        'observaciones',       // Observaciones
        'id_cliente',          // ID del cliente
      ],
      include: [
        {
          model: Clientes,
          attributes: ['nombre_cliente', 'telefono'], // Solo los campos que necesitamos del cliente
          required: true,
        },
        {
          model: Caracteristicas,
          attributes: ['id_caracteristica','descripcion', 'tipo'], // Solo los campos de las características
          through: {
            attributes: [] // No incluimos los atributos de la tabla intermedia
          },
          as: 'caracteristicas', // Especificamos el alias para la relación
          required: false, // Especificamos que es opcional
        }
      ],
      where: {
        nombre_mascota: {
          [Op.iLike]: `%${nombre_mascota}%` // Buscamos coincidencias con el nombre de la mascota
        }
      },
      order: [['nombre_mascota', 'ASC']],
    });

    // Mapeamos los resultados para combinar especie, raza y color en una sola fila
    const result = mascotas.map(mascota => {
      // Filtramos las características para encontrar cada tipo
      const especie = mascota.caracteristicas.find(c => c.tipo === 'ESPECIE');
      const raza = mascota.caracteristicas.find(c => c.tipo === 'RAZA');
      const color = mascota.caracteristicas.find(c => c.tipo === 'COLOR');

      return {
        id_mascota: mascota.id_mascota,
        nombre_mascota: mascota.nombre_mascota,
        sexo: mascota.sexo,
        fecha_nacimiento: mascota.fecha_nacimiento,
        reproductor: mascota.reproductor,
        castrado: mascota.castrado,
        fecha_castramiento: mascota.fecha_castramiento,
        fallecimiento: mascota.fallecimiento,
        observaciones: mascota.observaciones,
        id_cliente: mascota.id_cliente,
        nombre_cliente: mascota.Cliente ? mascota.Cliente.nombre_cliente : null,
        telefono: mascota.Cliente ? mascota.Cliente.telefono : null,
        especie: especie ? especie.descripcion : null,
        raza: raza ? raza.descripcion : null,
        color: color ? color.descripcion : null,
        id_especie: especie ? especie.id_caracteristica : null,  // Incluimos el id de la especie
        id_raza: raza ? raza.id_caracteristica : null,            // Incluimos el id de la raza
        id_color: color ? color.id_caracteristica : null,         // Incluimos el id del color
      };
    });

    return result;

  } catch (error) {
    throw new Error('Error al obtener las mascotas con sus clientes y características: ' + error.message);
  }
};


// Función para crear una nueva mascota y asociar las características
const createMascotaConCaracteristicas = async (nombre_mascota, sexo, fecha_nacimiento, id_cliente, observaciones, reproductor, castrado, fecha_castramiento, fallecimiento, id_raza, id_especie, id_color) => {
  const transaction = await sequelize.transaction(); // Comienza una transacción

  try {
    // Paso 1: Crear la nueva mascota
    const nuevaMascota = await Mascotas.create({
      nombre_mascota,
      sexo,
      fecha_nacimiento,
      id_cliente,
      observaciones,
      reproductor,
      castrado,
      fecha_castramiento,
      fallecimiento,
    }, { transaction });

    // Paso 2: Asociar las características con la mascota (id_raza, id_especie, id_color)
    const relaciones = [
      { id_mascota: nuevaMascota.id_mascota, id_caracteristica: id_raza },
      { id_mascota: nuevaMascota.id_mascota, id_caracteristica: id_especie },
      { id_mascota: nuevaMascota.id_mascota, id_caracteristica: id_color }
    ];

    // Paso 3: Crear las relaciones en la tabla Mascotas_Caracteristicas
    await Mascotas_Caracteristicas.bulkCreate(relaciones, { transaction });

    // Hacer commit de la transacción
    await transaction.commit();

    return nuevaMascota; // Retorna la mascota creada
  } catch (error) {
    // Si ocurre un error, hace rollback de la transacción
    await transaction.rollback();
    throw new Error('Error al crear la mascota y sus características: ' + error.message);
  }
};


const updateMascotaConCaracteristicas = async (id_mascota, nombre_mascota, sexo, fecha_nacimiento, id_cliente, observaciones, reproductor, castrado, fecha_castramiento, fallecimiento, id_raza, id_especie, id_color) => {
  const transaction = await sequelize.transaction(); // Comienza una transacción

  try {
    // Paso 1: Actualizar los datos de la mascota
    const [numUpdated] = await Mascotas.update({
      nombre_mascota,
      sexo,
      fecha_nacimiento,
      id_cliente,
      observaciones,
      reproductor,
      castrado,
      fecha_castramiento,
      fallecimiento
    }, {
      where: { id_mascota },
      transaction
    });

    if (numUpdated === 0) {
      throw new Error('No se encontró la mascota para actualizar.');
    }

    // Paso 2: Eliminar las características anteriores de la mascota
    await Mascotas_Caracteristicas.destroy({
      where: { id_mascota },
      transaction
    });

    // Paso 3: Asociar las nuevas características con la mascota (id_raza, id_especie, id_color)
    const relaciones = [
      { id_mascota, id_caracteristica: id_raza },
      { id_mascota, id_caracteristica: id_especie },
      { id_mascota, id_caracteristica: id_color }
    ];

    // Paso 4: Crear las nuevas relaciones en la tabla Mascotas_Caracteristicas
    await Mascotas_Caracteristicas.bulkCreate(relaciones, { transaction });

    // Hacer commit de la transacción
    await transaction.commit();

    // Retorna la mascota actualizada
    const mascotaActualizada = await Mascotas.findByPk(id_mascota);
    return mascotaActualizada;

  } catch (error) {
    // Si ocurre un error, hacer rollback de la transacción
    await transaction.rollback();
    throw new Error('Error al actualizar la mascota y sus características: ' + error.message);
  }
};



const deleteMascotaConCaracteristicas = async (id_mascota) => {
  const transaction = await sequelize.transaction(); // Comienza una transacción

  try {
    // Paso 1: Eliminar las características asociadas a la mascota
    await Mascotas_Caracteristicas.destroy({
      where: { id_mascota },
      transaction, // Ejecutar dentro de la transacción
    });

    // Paso 2: Eliminar la mascota
    const numDeleted = await Mascotas.destroy({
      where: { id_mascota },
      transaction, // Ejecutar dentro de la transacción
    });

    if (numDeleted === 0) {
      throw new Error('No se encontró la mascota para eliminar.');
    }

    // Hacer commit de la transacción si ambas eliminaciones fueron exitosas
    await transaction.commit();

    return { message: 'Mascota y sus características eliminadas exitosamente.' };

  } catch (error) {
    // Si ocurre un error, se hace un rollback
    await transaction.rollback();
    throw new Error('Error al eliminar la mascota y sus características: ' + error.message);
  }
};





// Exportar todas las funciones para usarlas en otros archivos
module.exports = {
  obtenerMascotasConDetalles,
  obtenerMascotasPorCliente,
  obtenerMascotasPorNombreCliente,
  obtenerMascotasPorTelefono,
  createMascotaConCaracteristicas,
  updateMascotaConCaracteristicas,
  deleteMascotaConCaracteristicas,
  obtenerMascotasPorNombre,

};