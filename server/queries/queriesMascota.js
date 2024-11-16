const { Op } = require('sequelize');
const Mascotas = require('../models/Mascotas');
const Clientes = require('../models/Clientes');
const Caracteristicas = require('../models/Caracteristicas');
const Medicamentos = require('../models/Medicamentos');
const Tratamientos = require('../models/Tratamientos');
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos');

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
          attributes: ['descripcion', 'tipo'], // Solo los campos de las características
          through: {
            attributes: [] // No incluimos los atributos de la tabla intermedia
          },
          as: 'caracteristicas', // Especificamos el alias para la relación
          required: false, // Especificamos que es opcional
        }
      ],
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

const obtenerTratamientosPorMascota = async (id_mascota) => {
  try {
    // Realizamos la consulta de tratamientos asociados a una mascota específica
    const tratamientos = await Tratamientos.findAll({
      where: {
        id_mascota: id_mascota,  // Filtramos por la mascota por su ID
      },
      attributes: ['id_tratamiento','diagnostico', 'd_diferencial', 'fecha_tratamiento'],  // Seleccionamos solo los campos deseados
      required: false,    
    });
    if (tratamientos.length === 0) {
      return [];  // Si no tiene tratamientos, devolvemos un arreglo vacío
    }
    return tratamientos;
  } catch (error) {
    throw new Error('Error al obtener tratamientos para la mascota: ' + error.message);
  }
};

// Exportar todas las funciones para usarlas en otros archivos
module.exports = {
  obtenerMascotasConDetalles,
  obtenerTratamientosPorMascota,
};








