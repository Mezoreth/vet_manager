const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Razas extends Model {}

Razas.init(
  {
    id_raza: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_raza: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Razas',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Razas;