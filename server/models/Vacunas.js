const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Vacunas extends Model {}

Vacunas.init(
  {
    id_vacuna: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_vacuna: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha_dosis: {
        type: DataTypes.DATEONLY,
    },
    id_refuerzo: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Vacunas',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Vacunas;