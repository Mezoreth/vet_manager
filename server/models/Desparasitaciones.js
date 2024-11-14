const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Desparasitaciones extends Model {}

Desparasitaciones.init(
  {
    id_desparasitacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    nombre_desparasitacion: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha_dosis: {
        type: DataTypes.DATEONLY,
    },
    id_refuerzo: {
        type: DataTypes.DATEONLY,
    },
  },
  {
    sequelize,
    modelName: 'Desparasitaciones',
    timestamps: false,
  }
);

// Exportar el modelo para su uso en otras partes de la aplicación
module.exports = Desparasitaciones;