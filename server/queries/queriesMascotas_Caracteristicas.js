const { Op } = require('sequelize');
const Mascotas = require('../models/Mascotas');
const Caracteristicas = require('../models/Caracteristicas');
const Mascotas_Caracteristicas = require('../models/Mascotas_Caracteristicas'); 

const createMascotasCaracteristicas = async (id_mascota, id_caracteristica) => {
    try {
      // Verificamos que la mascota y la característica existan en la base de datos
      const mascota = await Mascotas.findByPk(id_mascota);
      const caracteristica = await Caracteristicas.findByPk(id_caracteristica);
  
      if (!mascota) {
        throw new Error(`La mascota con ID ${id_mascota} no existe.`);
      }
  
      if (!caracteristica) {
        throw new Error(`La característica con ID ${id_caracteristica} no existe.`);
      }
  
      // Creamos la relación entre la mascota y la característica
      const nuevaMascotaCaracteristica = await Mascotas_Caracteristicas.create({
        id_mascota,          // ID de la mascota
        id_caracteristica,    // ID de la característica
      });
  
      return nuevaMascotaCaracteristica;
    } catch (error) {
      throw new Error('Error al crear la relación entre la mascota y la característica: ' + error.message);
    }
  };
  

module.exports = {
    createMascotasCaracteristicas,
  };