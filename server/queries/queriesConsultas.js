const { Op } = require('sequelize');
const Consultas = require('../models/Consultas');  // Asegúrate de que la ruta sea correcta

// Función para obtener todas las consultas
const getConsultas = async () => {
  try {
    const consultas = await Consultas.findAll({
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['fecha', 'ASC']],  // Ordena por fecha en orden ascendente
    });
    return consultas; // Devuelve las consultas obtenidas
  } catch (error) {
    console.error('Error al obtener las consultas:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado por el llamador
  }
};

// Función para crear una nueva consulta
const createConsulta = async (precio, descripcion, fecha, tipo_pago) => {
  try {
    // Intentamos crear una nueva consulta
    const consulta = await Consultas.create({ precio, descripcion, fecha, tipo_pago });
    
    // Retornamos la consulta creada en formato JSON
    return consulta.toJSON();
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos
    console.error("Error al crear la consulta:", error);
    throw new Error('No se pudo crear la consulta');
  }
};

// Función para actualizar una consulta
const updateConsulta = async (id_consulta, precio, descripcion, fecha, tipo_pago) => {
  try {
    const consulta = await Consultas.findByPk(id_consulta);
    if (!consulta) {
      throw new Error('Consulta no encontrada');
    }
    if (precio) consulta.precio = precio;
    if (descripcion) consulta.descripcion = descripcion;
    if (fecha) consulta.fecha = fecha;
    if (tipo_pago) consulta.tipo_pago = tipo_pago;
    await consulta.save();
    return { message: 'Consulta actualizada con éxito' };
  } catch (error) {
    console.error('Error al actualizar la consulta:', error);
    return { message: 'Error al actualizar la consulta' };
  }
};

// Función para eliminar una consulta
const deleteConsulta = async (id_consulta) => {
  try {
    const deletedConsulta = await Consultas.destroy({
      where: { id_consulta },
    });

    if (deletedConsulta) {
      return { message: 'Consulta eliminada con éxito' };
    } else {
      return { message: 'Consulta no encontrada' };
    }
  } catch (error) {
    console.error('Error al eliminar la consulta:', error);
    return { message: 'Error al eliminar la consulta', error };
  }
};

module.exports = {
  getConsultas,
  createConsulta,
  updateConsulta,
  deleteConsulta,
};