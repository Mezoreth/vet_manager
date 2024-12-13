const { Model, DataTypes } = require('sequelize');  // Usamos require en lugar de import
const sequelize = require('../database/database');  // Importar la instancia de sequelize desde database.js

class Consultas extends Model {}

Consultas.init(
  {
    id_consulta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    precio: {
      type: DataTypes.DECIMAL(10, 2),  
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    fecha: {
      type: DataTypes.DATEONLY,  
    },
    tipo_pago: {
      type: DataTypes.TEXT,  
    },
  },
  {
    sequelize,  
    modelName: 'Consultas',  
    timestamps: false,  
  }
);


module.exports = Consultas;