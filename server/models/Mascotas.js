const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Mascotas extends Model {}

Mascotas.init(
  {
    id_mascota: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_mascota: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    sexo: {
      type: DataTypes.STRING(10),
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
    },
    reproductor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    castrado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fecha_castramiento: {
      type: DataTypes.DATEONLY,
    },
    fallecimiento: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
    },
    id_cliente: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Mascotas',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Mascotas;