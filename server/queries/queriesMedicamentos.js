const { Op } = require('sequelize');
const Medicamentos = require('../models/Medicamentos');  
const moment = require('moment');

// Función para crear un medicamento
const createMedicamento = async (codigo, nombre_medicamento, tipo, composicion, presentacion, fecha_vencimiento, precio_compra, precio_venta, tipo_unidad, cantidad) => {
  try {
    // Intentamos crear un nuevo medicamento
    const medicamento = await Medicamentos.create({
      codigo,
      nombre_medicamento,
      tipo,
      composicion,
      presentacion,
      fecha_vencimiento,
      precio_compra,
      precio_venta,
      tipo_unidad,
      cantidad
    });

    // Retornamos el id_medicamento del medicamento creado
    return { id_medicamento: medicamento.id_medicamento };
  } catch (error) {
    // Si ocurre un error, lo capturamos y lo mostramos
    console.error("Error al crear el medicamento:", error);

    // Opcionalmente, puedes lanzar el error para manejarlo a nivel superior
    throw new Error('No se pudo crear el medicamento');
  }
};


// Función para actualizar un medicamento
const updateMedicamento = async (id_medicamento, codigo, nombre_medicamento, tipo, composicion, presentacion, fecha_vencimiento, precio_compra, precio_venta, tipo_unidad, cantidad) => {
  try {
    const medicamento = await Medicamentos.findByPk(id_medicamento);
    if (!medicamento) {
      throw new Error('Medicamento no encontrado');
    }

    if (codigo) medicamento.codigo = codigo;
    if (nombre_medicamento) medicamento.nombre_medicamento = nombre_medicamento;
    if (tipo) medicamento.tipo = tipo;
    if (composicion) medicamento.composicion = composicion;
    if (presentacion) medicamento.presentacion = presentacion;
    if (fecha_vencimiento) medicamento.fecha_vencimiento = fecha_vencimiento;
    if (precio_compra) medicamento.precio_compra = precio_compra;
    if (precio_venta) medicamento.precio_venta = precio_venta;
    if (tipo_unidad) medicamento.tipo_unidad = tipo_unidad;
    if (cantidad) medicamento.cantidad = cantidad;

    await medicamento.save();
    return { message: 'Medicamento actualizado con éxito', id_medicamento: medicamento.id_medicamento };  // Retornar el id_medicamento
  } catch (error) {
    return { message: 'Error al actualizar el medicamento', error };
  }
};


// Función para eliminar un medicamento
const deleteMedicamento = async (id_medicamento) => {
  try {
    const deletedMedicamento = await Medicamentos.destroy({
      where: { id_medicamento },
    });

    if (deletedMedicamento) {
      return { message: 'Medicamento eliminado con éxito', id_medicamento };  
    } else {
      return { message: 'Medicamento no encontrado' };
    }
  } catch (error) {
    return { message: 'Error al eliminar el medicamento', error };
  }
};


//getAllFarmacia
const getMedicamentosFarmacia = async () => {
  try {
    const medicamentos = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'FARMACIA',
      },
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_medicamento', 'ASC']],  // Ordena por nombre_medicamento en orden ascendente
    });
    return medicamentos; // Devuelve los medicamentos obtenidos
  } catch (error) {
    console.error('Error al obtener medicamentos de farmacia:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado por el llamador
  }
};
//getAllConsultorio
const getMedicamentosConsultorio = async () => {
  try {
    const medicamentos = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'CONSULTORIO',
      },
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_medicamento', 'ASC']],  // Ordena por nombre_medicamento en orden ascendente
    });
    return medicamentos; // Devuelve los medicamentos obtenidos
  } catch (error) {
    console.error('Error al obtener medicamentos de consultorio:', error);
    throw error; // Vuelve a lanzar el error para que pueda ser manejado por el llamador
  }
};
// getMedicamentosFarmaciaPorMesesVencimiento
const getMedicamentosFarmaciaPorFecha = async (meses_restantes) => {
  try {
    const fechaLimite = moment().add(meses_restantes, 'months').format('YYYY-MM-DD');  // Calculamos la fecha límite
    const medicamentos = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'FARMACIA',
        fecha_vencimiento: {
          [Op.lte]: fechaLimite,  // Filtro productos que vencen en los siguientes 'meses_restantes' meses
        },
      },
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_medicamento', 'ASC']],  // Ordena por nombre_medicamento en orden ascendente
    });
    return medicamentos; // Devuelve los medicamentos obtenidos
  } catch (error) {
    console.error('Error al obtener medicamentos de farmacia por meses de vencimiento:', error);
    throw error;
  }
};

/// getMedicamentosConsultorioPorMesesVencimiento
const getMedicamentosConsultorioPorFecha = async (meses_restantes) => {
  try {
    const fechaLimite = moment().add(meses_restantes, 'months').format('YYYY-MM-DD');  // Calculamos la fecha límite
    const medicamentos = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'CONSULTORIO',
        fecha_vencimiento: {
          [Op.lte]: fechaLimite,  // Filtro productos que vencen en los siguientes 'meses_restantes' meses
        },
      },
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_medicamento', 'ASC']],  // Ordena por nombre_medicamento en orden ascendente
    });
    return medicamentos; // Devuelve los medicamentos obtenidos
  } catch (error) {
    console.error('Error al obtener medicamentos de consultorio por meses de vencimiento:', error);
    throw error;
  }
};

//getAllFarmaciaByNombre
const getMedicamentosFarmaciaPorNombre = async (nombre) => {
  try {
    const medicamentos = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'FARMACIA',
        nombre_medicamento: {
          [Sequelize.Op.like]: `%${nombre}%`,  // Filtro por nombre (parcial)
        },
      },
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_medicamento', 'ASC']],  // Ordena por nombre_medicamento en orden ascendente
    });
    return medicamentos; // Devuelve los medicamentos obtenidos
  } catch (error) {
    console.error('Error al obtener medicamentos de farmacia por nombre:', error);
    throw error;
  }
};
//getAllConsultorioByNombre
const getMedicamentosConsultorioPorNombre = async (nombre) => {
  try {
    const medicamentos = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'CONSULTORIO',
        nombre_medicamento: {
          [Sequelize.Op.like]: `%${nombre}%`,  // Filtro por nombre (parcial)
        },
      },
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_medicamento', 'ASC']],  // Ordena por nombre_medicamento en orden ascendente
    });
    return medicamentos; // Devuelve los medicamentos obtenidos
  } catch (error) {
    console.error('Error al obtener medicamentos de consultorio por nombre:', error);
    throw error;
  }
};

//getAllFarmaciaByCodigo
const getMedicamentosFarmaciaPorCodigo = async (codigo) => {
  try {
    const medicamentos = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'FARMACIA',
        codigo: {
          [Sequelize.Op.like]: `%${codigo}%`,  // Filtro por código (parcial)
        },
      },
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_medicamento', 'ASC']],  // Ordena por nombre_medicamento en orden ascendente
    });
    return medicamentos; // Devuelve los medicamentos obtenidos
  } catch (error) {
    console.error('Error al obtener medicamentos de farmacia por código:', error);
    throw error;
  }
};
//getAllConsultorioByCodigo
const getMedicamentosConsultorioPorCodigo = async (codigo) => {
  try {
    const medicamentos = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'CONSULTORIO',
        codigo: {
          [Sequelize.Op.like]: `%${codigo}%`,  // Filtro por código (parcial)
        },
      },
      raw: true,  // Devuelve los resultados como objetos planos
      order: [['nombre_medicamento', 'ASC']],  // Ordena por nombre_medicamento en orden ascendente
    });
    return medicamentos; // Devuelve los medicamentos obtenidos
  } catch (error) {
    console.error('Error al obtener medicamentos de consultorio por código:', error);
    throw error;
  }
};





// Obtener medicamentos de tipo FARMACIA cuya fecha de vencimiento es menor o igual a 3 meses
const getMedFarmaciaVencimiento = async () => {
  try {
    // Obtenemos la fecha actual
    const fechaActual = new Date();
    
    // Calculamos la fecha límite (3 meses hacia adelante)
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaActual.getMonth() + 3);

    // Realizamos la consulta
    const medicamentosFarmacia = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'FARMACIA',  // Filtramos por tipo FARMACIA
        fecha_vencimiento: {
          [Op.lte]: fechaLimite,  // Filtramos por fecha de vencimiento menor o igual a 3 meses
        }
      },
      order: [['fecha_vencimiento', 'ASC']]  // Ordenamos por fecha_vencimiento de la más antigua a la más reciente
    });

    return medicamentosFarmacia;
  } catch (error) {
    console.error('Error al obtener medicamentos FARMACIA con vencimiento en 3 meses o menos:', error);
    throw error;
  }
};

// Obtener medicamentos de tipo CONSULTORIO cuya fecha de vencimiento es menor o igual a 3 meses
const getMedConsultorioVencimiento = async () => {
  try {
    // Obtenemos la fecha actual
    const fechaActual = new Date();
    
    // Calculamos la fecha límite (3 meses hacia adelante)
    const fechaLimite = new Date();
    fechaLimite.setMonth(fechaActual.getMonth() + 3);

    // Realizamos la consulta
    const medicamentosConsultorio = await Medicamentos.findAll({
      where: {
        tipo_unidad: 'CONSULTORIO',  // Filtramos por tipo CONSULTORIO
        fecha_vencimiento: {
          [Op.lte]: fechaLimite,  // Filtramos por fecha de vencimiento menor o igual a 3 meses
        }
      },
      order: [['fecha_vencimiento', 'ASC']]  // Ordenamos por fecha_vencimiento de la más antigua a la más reciente
    });

    return medicamentosConsultorio;
  } catch (error) {
    console.error('Error al obtener medicamentos CONSULTORIO con vencimiento en 3 meses o menos:', error);
    throw error;
  }
};



module.exports = {
    createMedicamento,
    updateMedicamento,
    deleteMedicamento,
    getMedicamentosFarmacia,
    getMedicamentosConsultorio,
    getMedicamentosFarmaciaPorFecha,
    getMedicamentosConsultorioPorFecha,
    getMedicamentosFarmaciaPorNombre,
    getMedicamentosConsultorioPorNombre,
    getMedicamentosFarmaciaPorCodigo,
    getMedicamentosConsultorioPorCodigo,
    getMedFarmaciaVencimiento,
    getMedConsultorioVencimiento,
};