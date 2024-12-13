const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database');  // Asegúrate de que la ruta sea correcta

class Detalle_Ventas extends Model {}

Detalle_Ventas.init(
  {
    id_detalle: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_item: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_unitario: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Detalle_Ventas',
    timestamps: false,
  }
);

// Exportar el modelo
module.exports = Detalle_Ventas;