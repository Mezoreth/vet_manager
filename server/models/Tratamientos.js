const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Asegúrate de que la ruta sea correcta

class Tratamientos extends Model {}

Tratamientos.init(
  {
    id_tratamiento: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    fecha_tratamiento: {
      type: DataTypes.DATEONLY,
    },
    comer: {
      type: DataTypes.TEXT,
    },
    diarrea: {      
      type: DataTypes.TEXT,
    },
    fecha_vomitos: {
      type: DataTypes.DATEONLY,
    },
    fecha_diarrea: {
      type: DataTypes.DATEONLY,
    },
    otros_sintomas: {
      type: DataTypes.TEXT,
    },
    diagnostico: {
      type: DataTypes.TEXT,
    },
    d_diferencial: {
      type: DataTypes.TEXT,
    },
    visual: {
      type: DataTypes.TEXT,
    },
    ganglios: {
      type: DataTypes.TEXT,
    },
    temperatura: {
      type: DataTypes.TEXT,
    },
    mucosas: {
      type: DataTypes.TEXT,
    },
    piel_anexos: {
      type: DataTypes.TEXT,
    },
    f_cardiaca: {
      type: DataTypes.TEXT,
    },
    fonendo: {
      type: DataTypes.TEXT,
    },
    pal_abd: {
      type: DataTypes.TEXT,
    },
    f_respiratoria: {
      type: DataTypes.TEXT,
    },
    peso: {
      type: DataTypes.TEXT,
    },
    id_mascota: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    estado: {
      type: DataTypes.TEXT,
    },
    tipo_pago: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: 'Tratamientos',
    timestamps: false,
  }
);

module.exports = Tratamientos;