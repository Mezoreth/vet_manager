const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Productos extends Model {}

Productos.init(
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nombre_producto: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
    fecha_vencimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    precio_compra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    precio_venta: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Productos',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Productos;