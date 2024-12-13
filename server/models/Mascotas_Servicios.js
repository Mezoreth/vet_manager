const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Mascotas_Servicios extends Model {}

Mascotas_Servicios.init(
  {
    id_mascotaServicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_mascota: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Mascotas_Servicios',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Mascotas_Servicios;