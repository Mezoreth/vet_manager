const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Mascotas_Medicamentos extends Model {}

Mascotas_Medicamentos.init(
  {
    id_mascotaMedicamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    id_mascota: {
      type: DataTypes.INTEGER,
        allowNull: true,
    },
    id_medicamento: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    tipo: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    /*catidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },*/
    fecha_dosis: {
        type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: 'Mascotas_Medicamentos',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Mascotas_Medicamentos;