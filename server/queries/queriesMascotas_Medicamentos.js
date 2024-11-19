const { Op } = require('sequelize');
const Mascotas = require('../models/Mascotas');
const Clientes = require('../models/Clientes');
const Caracteristicas = require('../models/Caracteristicas');
const Medicamentos = require('../models/Medicamentos');
const Refuerzos = require('../models/Refuerzos');
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos');
const Mascotas_Caracteristicas = require('../models/Mascotas_Caracteristicas');
const sequelize = require('../database/database');

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
        {
          model: Refuerzos,          // Incluir el modelo Refuerzos
          as: 'Refuerzos',           // Alias que definimos en la asociación
          required: false,            // No es obligatorio tener refuerzos
          attributes: [
            'id_refuerzo',            // Seleccionamos id_refuerzo
            'fecha_refuerzo',         // Seleccionamos fecha_refuerzo
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento',     // Seleccionamos id_mascotaMedicamento
        'id_medicamento',            // Seleccionamos id_medicamento
        'fecha_dosis',               // Seleccionamos fecha_dosis (campo de la tabla Mascotas_Medicamentos)
      ],
    });

    // Aplanar la estructura de la respuesta
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      // Extraemos los datos de Medicamentos
      const medicamentoData = medicamento.Medicamento || {}; // Puede que no haya Medicamento
      // Extraemos los refuerzos, y si no hay, se devuelve un array vacío
      const refuerzosData = medicamento.Refuerzos || [];

      // Retornamos una estructura aplanada con todos los campos que deseas
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, // Agregamos fecha_dosis
        refuerzos: refuerzosData.map(refuerzo => ({
          id_refuerzo: refuerzo.id_refuerzo,
          fecha_refuerzo: refuerzo.fecha_refuerzo,
        })),
      };
    });
    
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};
/* EJEMPLO DE RETORNO obtenerMedicamentosPorMascotaVacuna

0:
 fecha_dosis: "2025-03-01"
id_mascotaMedicamento: 85
id_medicamento: 82
nombre_medicamento: "UNBRANDED METAL CHICKEN"
refuerzos: 
Array(2)
0: {id_refuerzo: 44, fecha_refuerzo: '2024-05-27'}
1: {id_refuerzo: 48, fecha_refuerzo: '2024-01-27'}
length: 2
[[Prototype]]: Array(0)
[[Prototype]]: Object
1: {id_mascotaMedicamento: 16, id_medicamento: 3, nombre_medicamento: 'SMALL PLASTIC PIZZA', fecha_dosis: '2025-10-11', refuerzos: Array(1)}
2: {id_mascotaMedicamento: 11, id_medicamento: 10, nombre_medicamento: 'HANDMADE PLASTIC CAR', fecha_dosis: '2025-06-05', refuerzos: Array(0)}
3: {id_mascotaMedicamento: 150, id_medicamento: 116, nombre_medicamento: 'PRACTICAL CONCRETE SALAD', fecha

*/ 


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
        {
          model: Refuerzos,          // Incluir el modelo Refuerzos
          as: 'Refuerzos',           // Alias que definimos en la asociación
          required: false,            // No es obligatorio tener refuerzos
          attributes: [
            'id_refuerzo',            // Seleccionamos id_refuerzo
            'fecha_refuerzo',         // Seleccionamos fecha_refuerzo
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento',     // Seleccionamos id_mascotaMedicamento
        'id_medicamento',            // Seleccionamos id_medicamento
        'fecha_dosis',               // Seleccionamos fecha_dosis (campo de la tabla Mascotas_Medicamentos)
      ],
    });

    // Aplanar la estructura de la respuesta
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      // Extraemos los datos de Medicamentos
      const medicamentoData = medicamento.Medicamento || {}; // Puede que no haya Medicamento
      // Extraemos los refuerzos, y si no hay, se devuelve un array vacío
      const refuerzosData = medicamento.Refuerzos || [];

      // Retornamos una estructura aplanada con todos los campos que deseas
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, // Agregamos fecha_dosis
        refuerzos: refuerzosData.map(refuerzo => ({
          id_refuerzo: refuerzo.id_refuerzo,
          fecha_refuerzo: refuerzo.fecha_refuerzo,
        })),
      };
    });
    
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};



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
        {
          model: Refuerzos,          // Incluir el modelo Refuerzos
          as: 'Refuerzos',           // Alias que definimos en la asociación
          required: false,            // No es obligatorio tener refuerzos
          attributes: [
            'id_refuerzo',            // Seleccionamos id_refuerzo
            'fecha_refuerzo',         // Seleccionamos fecha_refuerzo
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento',     // Seleccionamos id_mascotaMedicamento
        'id_medicamento',            // Seleccionamos id_medicamento
        'fecha_dosis',               // Seleccionamos fecha_dosis (campo de la tabla Mascotas_Medicamentos)
      ],
    });

    // Aplanar la estructura de la respuesta
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      // Extraemos los datos de Medicamentos
      const medicamentoData = medicamento.Medicamento || {}; // Puede que no haya Medicamento
      // Extraemos los refuerzos, y si no hay, se devuelve un array vacío
      const refuerzosData = medicamento.Refuerzos || [];

      // Retornamos una estructura aplanada con todos los campos que deseas
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, // Agregamos fecha_dosis
        refuerzos: refuerzosData.map(refuerzo => ({
          id_refuerzo: refuerzo.id_refuerzo,
          fecha_refuerzo: refuerzo.fecha_refuerzo,
        })),
      };
    });
    
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};












/*
const obtenerMedicamentosPorMascota = async (id_mascota) => {
    try {
      // Realizamos la consulta
      const medicamentosMascota = await Mascotas_Medicamentos.findAll({
        where: {
          id_mascota: id_mascota,  // Filtramos por id_mascota
          tipo: 'VACUNA',
        },
        include: [
          {
            model: Medicamentos,         // Incluir el modelo Medicamentos
            as: 'Medicamento',          // Alias que definimos en la asociación
            required: true,              // Solo incluir aquellos medicamentos relacionados
          },
          {
            model: Refuerzos,           // Incluir el modelo Refuerzos
            as: 'Refuerzos',            // Alias que definimos en la asociación (si no lo tienes, cámbialo según la asociación)
            required: false,            // No es obligatorio tener refuerzos, por lo que 'false' es adecuado
          },
        ],
      });
  
      return medicamentosMascota;
    } catch (error) {
      console.error('Error al obtener medicamentos:', error);
      throw error;
    }
  };
*/
module.exports = {
  obtenerMedicamentosPorMascotaVacuna,
  obtenerMedicamentosPorMascotaSupresor,
  obtenerMedicamentosPorMascotaDesparasitante,
};
  
  