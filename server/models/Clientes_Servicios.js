const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Clientes_Servicios extends Model {}

Clientes_Servicios.init(
  {
    id_clienteServicio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    id_servicio: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
  },
  {
    sequelize,
    modelName: 'Clientes_Servicios',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Clientes_Servicios;