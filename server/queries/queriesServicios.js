const { Op } = require('sequelize');
const Servicios = require('../models/Servicios');  
const moment = require('moment');
//create
const createServicio = async (corte, bano, estetica, cepillado, limp_oidos, precio, observaciones, fecha_servicio, estado, tipo_pago) => {
    try {
      const servicio = await Servicios.create({
        corte,
        bano,
        estetica,
        cepillado,
        limp_oidos,
        precio,
        observaciones,
        fecha_servicio,
        estado,
        tipo_pago,
      });
  
      return servicio.id_servicio;
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      throw new Error('No se pudo crear el servicio');
    }
  };

//update
const updateServicio = async (id_servicio, corte, bano, estetica, cepillado, limp_oidos, precio, observaciones, fecha_servicio, estado, tipo_pago) => {
    try {
      const servicio = await Servicios.findByPk(id_servicio);
  
      if (!servicio) {
        throw new Error('Servicio no encontrado');
      }
  
      await servicio.update({
        corte,
        bano,
        estetica,
        cepillado,
        limp_oidos,
        precio,
        observaciones,
        fecha_servicio,
        estado,
        tipo_pago,
      });
  
      return servicio.id_servicio;
    } catch (error) {
      console.error("Error al actualizar el servicio:", error);
      throw new Error('No se pudo actualizar el servicio');
    }
  };


//delete
const deleteServicio = async (id_servicio) => {
    try {
      const servicio = await Servicios.findByPk(id_servicio);
  
      if (!servicio) {
        throw new Error('Servicio no encontrado');
      }
  
      await servicio.destroy();
      return id_servicio;
    } catch (error) {
      console.error("Error al eliminar el servicio:", error);
      throw new Error('No se pudo eliminar el servicio');
    }
  };

//getById
const getServicio = async (id_servicio) => {
  try {
    const servicio = await Servicios.findByPk(id_servicio);

    if (!servicio) {
      return null;  // Si no se encuentra el servicio, devolvemos null
    }

    return servicio;  // Si se encuentra el servicio, lo devolvemos
  } catch (error) {
    console.error("Error al obtener el servicio por id:", error);
    throw new Error('No se pudo obtener el servicio por el ID');
  }
};

//getAll
const obtenerServicios = async () => {
    try {
      const servicios = await Servicios.findAll();
  
      if (servicios.length === 0) {
        return [];
      }
  
      return servicios;
    } catch (error) {
      console.error("Error al obtener los servicios:", error);
      throw new Error('No se pudo obtener los servicios');
    }
  };

//getPendientes
const obtenerServiciosPendientes = async () => {
    try {
      const servicios = await Servicios.findAll({
        where: {
          estado: 'PENDIENTE',
        },
        order: [['fecha_servicio', 'ASC']]  // Ordenar por fecha_servicio en orden ascendente
      });
  
      if (servicios.length === 0) {
        return [];
      }
  
      return servicios;
    } catch (error) {
      console.error("Error al obtener los servicios pendientes:", error);
      throw new Error('No se pudo obtener los servicios pendientes');
    }
  };

module.exports = {
  createServicio,
  updateServicio,
  deleteServicio,
  obtenerServicios,
  obtenerServiciosPendientes,
  getServicio,
};