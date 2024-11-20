const { Op } = require('sequelize');
const Caracteristicas = require('../models/Caracteristicas');  

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
    createCaracteristicas,
    updateCaracteristicas,
    deleteCaracteristicas
};