const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Consultas extends Model {}

Consultas.init(
  {
    id_consulta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fecha_consulta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    diagnostico: {
      type: DataTypes.TEXT,
    },
    tratamiento_recomendado: {
      type: DataTypes.TEXT,
    },
    archivo_resultado: {
      type: DataTypes.STRING(255),
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_mascota: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Consultas',
    timestamps: false,
  }
);

module.exports = Consultas;