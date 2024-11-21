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


module.exports = {
  obtenerMedicamentosPorMascotaVacuna,
  obtenerMedicamentosPorMascotaSupresor,
  obtenerMedicamentosPorMascotaDesparasitante,
};
  
  