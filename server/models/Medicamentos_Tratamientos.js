const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); 

class Medicamentos_Tratamientos extends Model {}

Medicamentos_Tratamientos.init(
  {
    id_mascotaMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_tratamiento: {
      type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_medicamento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Medicamentos_Tratamientos',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Medicamentos_Tratamientos;