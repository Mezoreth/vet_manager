const { Op } = require('sequelize');
const Caracteristicas = require('../models/Caracteristicas');  

//Funcion para obterner caracteristicas de tipo ESPECIE 
const getCaracteristicasEspecie = async () => {
  try {
    const caracteristicas = await Caracteristicas.findAll({
      raw: true,  
      where: { tipo: 'ESPECIE' },  
      order: [['descripcion', 'ASC']],  
    });
    return caracteristicas; 
  } catch (error) {
    console.error('Error al obtener las características:', error);
    throw error; 
  }
};

//Funcion para obterner caracteristicas de tipo RAZA
const getCaracteristicasRaza = async () => {
  try {
    const caracteristicas = await Caracteristicas.findAll({
      raw: true,  
      where: { tipo: 'RAZA' },  
      order: [['descripcion', 'ASC']],  
    });
    return caracteristicas; 
  } catch (error) {
    console.error('Error al obtener las características de raza:', error);
    throw error; 
  }
};

//Funcion para obterner caracteristicas de tipo COLOR
const getCaracteristicasColor = async () => {
  try {
    const caracteristicas = await Caracteristicas.findAll({
      raw: true,  
      where: { tipo: 'COLOR' },  
      order: [['descripcion', 'ASC']],  
    });
    return caracteristicas; 
  } catch (error) {
    console.error('Error al obtener las características de color:', error);
    throw error; 
  }
};

const createCaracteristicas = async (tipo, descripcion) => {
    try {
      const caracteristica = await Caracteristicas.create({ tipo, descripcion });
      return caracteristica.toJSON();
    } catch (error) {
      console.error("Error al crear la característica:", error);
      throw new Error('No se pudo crear la característica');
    }
};

const updateCaracteristicas = async (id_caracteristica, tipo, descripcion) => {
    try {
      const [updated] = await Caracteristicas.update(
        { tipo, descripcion },  
        { where: { id_caracteristica } }  
      );
      if (updated) {
        const updatedCaracteristica = await Caracteristicas.findByPk(id_caracteristica);
        return updatedCaracteristica.toJSON();
      } else {
        throw new Error('No se encontró la característica con ese ID');
      }
    } catch (error) {
      console.error("Error al actualizar la característica:", error);
      throw new Error('No se pudo actualizar la característica');
    }
};

const deleteCaracteristicas = async (id_caracteristica) => {
    try {
      const deleted = await Caracteristicas.destroy({
        where: { id_caracteristica }  
      });
      if (deleted) {
        return { message: 'Característica eliminada con éxito' };
      } else {
        throw new Error('No se encontró la característica con ese ID');
      }
    } catch (error) {
      console.error("Error al eliminar la característica:", error);
      throw new Error('No se pudo eliminar la característica');
    }
  };

module.exports = {
    getCaracteristicasEspecie,
    getCaracteristicasRaza,
    getCaracteristicasColor,
    createCaracteristicas,
    updateCaracteristicas,
    deleteCaracteristicas
};