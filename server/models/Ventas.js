const { Model, DataTypes } = require('sequelize');  // Usamos require en lugar de import
const sequelize = require('../database/database');  // Importamos la conexión de sequelize desde database.js

class Ventas extends Model {}

Ventas.init(
  {
    id_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fecha_venta: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    total_venta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,

    },
    estado: {
      type: DataTypes.TEXT,
    },
    tipo_pago: {
      type: DataTypes.TEXT,
    }
  },
  {
    sequelize,  // Usamos la conexión a la base de datos
    modelName: 'Ventas',  // Nombre del modelo
    timestamps: false,  // Desactivamos los campos createdAt y updatedAt
  }
);

// Exportamos el modelo para usarlo en otras partes de la aplicación
module.exports = Ventas;