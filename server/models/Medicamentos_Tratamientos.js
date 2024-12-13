const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); 

class Medicamentos_Tratamientos extends Model {}

Medicamentos_Tratamientos.init(
  {
    id_medicamentoTratamiento: {
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
    dosis: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    via: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    costo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
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