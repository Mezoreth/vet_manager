const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Refuerzos extends Model {}

Refuerzos.init(
  {
    id_refuerzo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fecha_refuerzo: {
        type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: 'Refuerzos',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Refuerzos;