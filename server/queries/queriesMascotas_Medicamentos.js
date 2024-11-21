const { Op } = require('sequelize');
const Mascotas = require('../models/Mascotas');
const Clientes = require('../models/Clientes');
const Caracteristicas = require('../models/Caracteristicas');
const Medicamentos = require('../models/Medicamentos');
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos');
const Mascotas_Caracteristicas = require('../models/Mascotas_Caracteristicas');
const sequelize = require('../database/database');

//Funcion para listar las vacunas de una mascota
const obtenerMedicamentosPorMascotaVacuna = async (id_mascota) => {
  try {
    // Realizamos la consulta
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  // Filtramos por id_mascota
        tipo: 'VACUNA',          // Filtramos solo por tipo VACUNA
      },
      include: [
        {
          model: Medicamentos,       // Incluir el modelo Medicamentos
          as: 'Medicamento',         // Alias que definimos en la asociación
          required: true,             // Solo incluir aquellos medicamentos relacionados
          attributes: [
            'id_medicamento',         // Seleccionamos id_medicamento
            'nombre_medicamento'      // Seleccionamos nombre_medicamento
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento',     // Seleccionamos id_mascotaMedicamento
        'id_medicamento',            // Seleccionamos id_medicamento
        'fecha_dosis',               // Seleccionamos fecha_dosis (campo de la tabla Mascotas_Medicamentos)
        'fecha_refuerzo',            // Seleccionamos fecha_refuerzo de la tabla Mascotas_Medicamentos
      ],
    });

    // Aplanar la estructura de la respuesta
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      // Extraemos los datos de Medicamentos
      const medicamentoData = medicamento.Medicamento || {}; // Puede que no haya Medicamento

      // Retornamos una estructura aplanada con todos los campos que deseas
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, // Agregamos fecha_dosis
        fecha_refuerzo: medicamento.fecha_refuerzo, // Agregamos fecha_refuerzo
      };
    });
    
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};

//Funcion para listar los supresores de una mascota
const obtenerMedicamentosPorMascotaSupresor = async (id_mascota) => {
  try {
    // Realizamos la consulta
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  // Filtramos por id_mascota
        tipo: 'SUPRESOR',          // Filtramos solo por tipo VACUNA
      },
      include: [
        {
          model: Medicamentos,       // Incluir el modelo Medicamentos
          as: 'Medicamento',         // Alias que definimos en la asociación
          required: true,             // Solo incluir aquellos medicamentos relacionados
          attributes: [
            'id_medicamento',         // Seleccionamos id_medicamento
            'nombre_medicamento'      // Seleccionamos nombre_medicamento
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento',     // Seleccionamos id_mascotaMedicamento
        'id_medicamento',            // Seleccionamos id_medicamento
        'fecha_dosis',               // Seleccionamos fecha_dosis (campo de la tabla Mascotas_Medicamentos)
        'fecha_refuerzo',            // Seleccionamos fecha_refuerzo de la tabla Mascotas_Medicamentos
      ],
    });

    // Aplanar la estructura de la respuesta
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      // Extraemos los datos de Medicamentos
      const medicamentoData = medicamento.Medicamento || {}; // Puede que no haya Medicamento

      // Retornamos una estructura aplanada con todos los campos que deseas
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, // Agregamos fecha_dosis
        fecha_refuerzo: medicamento.fecha_refuerzo, // Agregamos fecha_refuerzo
      };
    });
    
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};


//Funcion para listar los desparasitantes de una mascota
const obtenerMedicamentosPorMascotaDesparasitante = async (id_mascota) => {
  try {
    // Realizamos la consulta
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  // Filtramos por id_mascota
        tipo: 'DESPARASITANTE',          // Filtramos solo por tipo VACUNA
      },
      include: [
        {
          model: Medicamentos,       // Incluir el modelo Medicamentos
          as: 'Medicamento',         // Alias que definimos en la asociación
          required: true,             // Solo incluir aquellos medicamentos relacionados
          attributes: [
            'id_medicamento',         // Seleccionamos id_medicamento
            'nombre_medicamento'      // Seleccionamos nombre_medicamento
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento',     // Seleccionamos id_mascotaMedicamento
        'id_medicamento',            // Seleccionamos id_medicamento
        'fecha_dosis',               // Seleccionamos fecha_dosis (campo de la tabla Mascotas_Medicamentos)
        'fecha_refuerzo',            // Seleccionamos fecha_refuerzo de la tabla Mascotas_Medicamentos
      ],
    });

    // Aplanar la estructura de la respuesta
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      // Extraemos los datos de Medicamentos
      const medicamentoData = medicamento.Medicamento || {}; // Puede que no haya Medicamento

      // Retornamos una estructura aplanada con todos los campos que deseas
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, // Agregamos fecha_dosis
        fecha_refuerzo: medicamento.fecha_refuerzo, // Agregamos fecha_refuerzo
      };
    });
    
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};

//Funcion para crear Mascota_Medicamento
const createMascotaMedicamento = async (id_mascota, id_medicamento, tipo, cantidad, fecha_dosis, fecha_refuerzo) => {
  try {
    const nuevaMascotaMedicamento = await Mascotas_Medicamentos.create({
      id_mascota,
      id_medicamento,
      tipo,
      cantidad,
      fecha_dosis,
      fecha_refuerzo
    });
    return nuevaMascotaMedicamento.toJSON();
  } catch (error) {
    console.error("Error al crear la relación entre mascota y medicamento:", error);
    throw new Error('No se pudo crear la relación entre mascota y medicamento');
  }
};

//Funcion para actualizar Mascota_Medicamento
const updateMascotaMedicamento = async (id_mascotaMedicamento, id_mascota, id_medicamento, tipo, cantidad, fecha_dosis, fecha_refuerzo) => {
  try {
    const mascotaMedicamento = await Mascotas_Medicamentos.findByPk(id_mascotaMedicamento);
    if (!mascotaMedicamento) {
      throw new Error('Relación entre mascota y medicamento no encontrada');
    }
    if (id_mascota) mascotaMedicamento.id_mascota = id_mascota;
    if (id_medicamento) mascotaMedicamento.id_medicamento = id_medicamento;
    if (tipo) mascotaMedicamento.tipo = tipo;
    if (cantidad) mascotaMedicamento.cantidad = cantidad;
    if (fecha_dosis) mascotaMedicamento.fecha_dosis = fecha_dosis;
    if (fecha_refuerzo) mascotaMedicamento.fecha_refuerzo = fecha_refuerzo;
    await mascotaMedicamento.save();
    return { message: 'Relación entre mascota y medicamento actualizada con éxito' };
  } catch (error) {
    console.error('Error al actualizar la relación entre mascota y medicamento:', error);
    return { message: 'Error al actualizar la relación entre mascota y medicamento' };
  }
};

//Funcion para borrar Mascota_Medicamento
const deleteMascotaMedicamento = async (id_mascotaMedicamento) => {
  try {
    const deletedMascotaMedicamento = await Mascotas_Medicamentos.destroy({
      where: { id_mascotaMedicamento },
    });

    if (deletedMascotaMedicamento) {
      return { message: 'Relación entre mascota y medicamento eliminada con éxito' };
    } else {
      return { message: 'Relación entre mascota y medicamento no encontrada' };
    }
  } catch (error) {
    console.error('Error al eliminar la relación entre mascota y medicamento:', error);
    return { message: 'Error al eliminar la relación entre mascota y medicamento', error };
  }
};

module.exports = {
  obtenerMedicamentosPorMascotaVacuna,
  obtenerMedicamentosPorMascotaSupresor,
  obtenerMedicamentosPorMascotaDesparasitante,
  createMascotaMedicamento,
  updateMascotaMedicamento,
  deleteMascotaMedicamento,
};
  
  