const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Supresor_Celo extends Model {}

Supresor_Celo.init(
  {
    id_supresor: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_supresor: {
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
    modelName: 'Supresor_Celo',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Supresor_Celo;