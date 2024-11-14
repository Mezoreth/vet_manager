const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Mascotas_Caracteristicas extends Model {}

Mascotas_Caracteristicas.init(
  {
    id_mascotaCaracteristica: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_mascota: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_caracteristica: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Mascotas_Caracteristicas',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Mascotas_Caracteristicas;