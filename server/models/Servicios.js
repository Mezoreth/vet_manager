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
    limp_oidos: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
    fecha_servicio: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado: {
      type: DataTypes.TEXT,
    },
    tipo_pago: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Servicios',
    timestamps: false,
  }
);

module.exports = Servicios;