const { Model, DataTypes } = require('sequelize');  // Usamos require en lugar de import
const sequelize = require('../database/database');  // Importamos la conexión de sequelize desde database.js

class Colores extends Model {}

Colores.init(
  {
    id_color: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_color: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,  // Usamos la conexión a la base de datos
    modelName: 'Colores',  // El nombre del modelo
    timestamps: false,  // Desactivamos los campos createdAt y updatedAt
  }
);

// Exportamos el modelo para usarlo en otras partes de la aplicación
module.exports = Colores;