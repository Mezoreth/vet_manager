const { Op } = require('sequelize');
const Mascotas = require('../models/Mascotas');
const Clientes = require('../models/Clientes');
const Caracteristicas = require('../models/Caracteristicas');
const Medicamentos = require('../models/Medicamentos');
const Tratamientos = require('../models/Tratamientos');
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos');


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
    obtenerTratamientosPorMascota,
  };
  