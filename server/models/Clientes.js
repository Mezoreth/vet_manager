const { Model, DataTypes } = require('sequelize');  // Usamos require en lugar de import
const sequelize = require('../database/database');  // Importar la instancia de sequelize desde database.js

class Clientes extends Model {}

Clientes.init(
  {
    id_cliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_cliente: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    telefono: {
      type: DataTypes.INTEGER,
    },
    direccion: {
      type: DataTypes.TEXT,
    },
    cumpleanos: {
      type: DataTypes.DATEONLY,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,  // Usamos la conexión de sequelize
    modelName: 'Clientes',  // Definimos el nombre del modelo en singular
    timestamps: false,  // Desactivamos los timestamps (createdAt, updatedAt)
  }
);

// Exportar el modelo Clientes para usarlo en otras partes de la aplicación
module.exports = Clientes;