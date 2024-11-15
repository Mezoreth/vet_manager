const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Servicios extends Model {}

Servicios.init(
  {
    id_servicio: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    corte: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    bano: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    estetica: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    cepillado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
    fecha_servicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Servicios',
    timestamps: false,
  }
);

module.exports = Servicios;