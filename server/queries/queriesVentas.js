const Ventas = require('../models/Ventas');
const Detalle_Ventas = require('../models/Detalle_Ventas');
const { Op, Sequelize } = require('sequelize');
const sequelize = require('../database/database');
//create venta
const crearVenta = async (fecha_venta, total_venta, observaciones, id_cliente, estado, tipo_pago) => {
    try {
      const nuevaVenta = await Ventas.create({
        fecha_venta,
        total_venta,
        observaciones,
        id_cliente,
        estado,
        tipo_pago,
      });
  
      return nuevaVenta;  // Retorna la venta creada
    } catch (error) {
      console.error("Error al crear la venta:", error);
      throw new Error('No se pudo crear la venta');
    }
};


//actualizar venta
const actualizarVenta = async (id_venta, fecha_venta, total_venta, observaciones, id_cliente, estado, tipo_pago) => {
    try {
      const venta = await Ventas.findByPk(id_venta);
      if (!venta) {
        throw new Error('Venta no encontrada');
      }
  
      // Actualiza los campos que se hayan proporcionado
      if (fecha_venta) venta.fecha_venta = fecha_venta;
      if (total_venta) venta.total_venta = total_venta;
      if (observaciones) venta.observaciones = observaciones;
      if (id_cliente) venta.id_cliente = id_cliente;
      if (estado) venta.estado = estado;
      if (tipo_pago) venta.tipo_pago = tipo_pago;
  
      await venta.save();  // Guarda los cambios
      return venta;
    } catch (error) {
      console.error("Error al actualizar la venta:", error);
      throw new Error('No se pudo actualizar la venta');
    }
  };

//Eliminar venta
const eliminarVenta = async (id_venta) => {
    try {
      const ventaEliminada = await Ventas.destroy({
        where: { id_venta },
      });
  
      if (!ventaEliminada) {
        throw new Error('Venta no encontrada');
      }
  
      return { message: 'Venta eliminada con éxito' };
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
      throw new Error('No se pudo eliminar la venta');
    }
  };

//get all 
const obtenerTodasLasVentas = async () => {
  try {
    const ventas = await Ventas.findAll({
      include: [{
        model: Detalle_Ventas,  // Asumiendo que "DetalleVentas" es el modelo relacionado
        as: 'Detalle_Ventas'  // Si tienes una asociación definida con un alias, usa ese alias
      }]
    });
    return ventas;
  } catch (error) {
    console.error("Error al obtener las ventas:", error);
    throw new Error('No se pudo obtener las ventas');
  }
};

//get pendientes 
const obtenerVentasPendientes = async () => {
  try {
    const ventasPendientes = await Ventas.findAll({
      where: {
        estado: 'PENDIENTE',
      },
      include: [{
        model: Detalle_Ventas,  // De nuevo, asegurarse de que "DetalleVentas" es el modelo adecuado
        as: 'Detalle_Ventas'  // Aquí también usar el alias correcto si es necesario
      }]
    });
    return ventasPendientes;
  } catch (error) {
    console.error("Error al obtener las ventas pendientes:", error);
    throw new Error('No se pudieron obtener las ventas pendientes');
  }
};



//get reporte diario, mensual o anual DE VENTAS
const reporteVentasPeriodo = async (cantidad, tipoPeriodo) => {
  try {
    let fechaLimite;

    // Validar que 'cantidad' sea un número
    cantidad = parseInt(cantidad, 10);
    if (isNaN(cantidad)) {
      throw new Error('La cantidad debe ser un número válido');
    }

    // Crear un rango de fechas según el tipo de periodo (DIARIO, MENSUAL, ANUAL)
    if (tipoPeriodo === 'DIARIO') {
      fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - cantidad);  // Restar los días a la fecha actual
    } else if (tipoPeriodo === 'MENSUAL') {
      fechaLimite = new Date();
      fechaLimite.setMonth(fechaLimite.getMonth() - cantidad);  // Restar los meses a la fecha actual
    } else if (tipoPeriodo === 'ANUAL') {
      fechaLimite = new Date();
      fechaLimite.setFullYear(fechaLimite.getFullYear() - cantidad);  // Restar los años a la fecha actual
    } else {
      throw new Error('Tipo de periodo no válido. Debe ser DIARIO, MENSUAL o ANUAL.');
    }

    // Realiza la consulta con un filtro para el rango de fechas
    const ventasReporte = await Ventas.findAll({
      where: {
        fecha_venta: {
          [Op.gte]: fechaLimite,  // Filtra las ventas cuya fecha_venta sea mayor o igual a la fecha límite calculada
        },
      },
      include: {
        model: Detalle_Ventas,
        where: {
          tipo_item: 'VENTA',  // Filtra solo los detalles con tipo_item = 'VENTA'
        },
        required: true,  // Asegura que solo se traigan ventas que tengan detalles
      },
    });

    return ventasReporte;
  } catch (error) {
    console.error('Error al obtener el reporte de ventas con detalles:', error);
    throw new Error('No se pudo obtener el reporte de ventas con detalles');
  }
};

// get reporte de VENTAS por intervalos de fechas
const reporteVentasFechas = async (fechaInicio, fechaFin) => {
  try {
    // Realiza la consulta de ventas dentro del rango de fechas y filtra los detalles por tipo_item = 'VENTA'
    const ventasReporte = await Ventas.findAll({
      where: {
        fecha_venta: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
      include: {
        model: Detalle_Ventas,
        where: {
          tipo_item: 'VENTA',  // Filtra solo los detalles con tipo_item = 'VENTA'
        },
        required: true,  // Asegura que solo se traigan ventas que tengan detalles
      },
    });

    return ventasReporte;
  } catch (error) {
    console.error("Error al obtener el reporte de ventas con detalles por rango de fechas:", error);
    throw new Error('No se pudo obtener el reporte de ventas con detalles por rango de fechas');
  }
};





//reporte por periodos tipo TRATAMIENTO
const reporteTratamientosPeriodo = async (cantidad, tipoPeriodo) => {
  try {
    let fechaLimite;

    // Validar que 'cantidad' sea un número
    cantidad = parseInt(cantidad, 10);
    if (isNaN(cantidad)) {
      throw new Error('La cantidad debe ser un número válido');
    }

    // Crear un rango de fechas según el tipo de periodo (DIARIO, MENSUAL, ANUAL)
    if (tipoPeriodo === 'DIARIO') {
      fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - cantidad);  // Restar los días a la fecha actual
    } else if (tipoPeriodo === 'MENSUAL') {
      fechaLimite = new Date();
      fechaLimite.setMonth(fechaLimite.getMonth() - cantidad);  // Restar los meses a la fecha actual
    } else if (tipoPeriodo === 'ANUAL') {
      fechaLimite = new Date();
      fechaLimite.setFullYear(fechaLimite.getFullYear() - cantidad);  // Restar los años a la fecha actual
    } else {
      throw new Error('Tipo de periodo no válido. Debe ser DIARIO, MENSUAL o ANUAL.');
    }

    // Realiza la consulta con un filtro para el rango de fechas
    const ventasReporte = await Ventas.findAll({
      where: {
        fecha_venta: {
          [Op.gte]: fechaLimite,  // Filtra las ventas cuya fecha_venta sea mayor o igual a la fecha límite calculada
        },
      },
      include: {
        model: Detalle_Ventas,
        where: {
          tipo_item: 'TRATAMIENTO',  // Filtra solo los detalles con tipo_item = 'TRATAMIENTO'
        },
        required: true,  // Asegura que solo se traigan ventas que tengan detalles
      },
    });

    return ventasReporte;
  } catch (error) {
    console.error('Error al obtener el reporte de tratamientos con detalles:', error);
    throw new Error('No se pudo obtener el reporte de tratamientos con detalles');
  }
};

// get reporte de TRATAMIENTOS por intervalos de fechas
const reporteTratamientosFechas = async (fechaInicio, fechaFin) => {
  try {
    // Realiza la consulta de ventas dentro del rango de fechas y filtra los detalles por tipo_item = 'TRATAMIENTO'
    const ventasReporte = await Ventas.findAll({
      where: {
        fecha_venta: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
      include: {
        model: Detalle_Ventas,
        where: {
          tipo_item: 'TRATAMIENTO',  // Filtra solo los detalles con tipo_item = 'TRATAMIENTO'
        },
        required: true,  // Asegura que solo se traigan ventas que tengan detalles
      },
    });

    return ventasReporte;
  } catch (error) {
    console.error("Error al obtener el reporte de tratamientos con detalles por rango de fechas:", error);
    throw new Error('No se pudo obtener el reporte de tratamientos con detalles por rango de fechas');
  }
};




//reporte por periodos tipo SERVICIO
const reporteServiciosPeriodo = async (cantidad, tipoPeriodo) => {
  try {
    let fechaLimite;

    // Validar que 'cantidad' sea un número
    cantidad = parseInt(cantidad, 10);
    if (isNaN(cantidad)) {
      throw new Error('La cantidad debe ser un número válido');
    }

    // Crear un rango de fechas según el tipo de periodo (DIARIO, MENSUAL, ANUAL)
    if (tipoPeriodo === 'DIARIO') {
      fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - cantidad);  // Restar los días a la fecha actual
    } else if (tipoPeriodo === 'MENSUAL') {
      fechaLimite = new Date();
      fechaLimite.setMonth(fechaLimite.getMonth() - cantidad);  // Restar los meses a la fecha actual
    } else if (tipoPeriodo === 'ANUAL') {
      fechaLimite = new Date();
      fechaLimite.setFullYear(fechaLimite.getFullYear() - cantidad);  // Restar los años a la fecha actual
    } else {
      throw new Error('Tipo de periodo no válido. Debe ser DIARIO, MENSUAL o ANUAL.');
    }

    // Realiza la consulta con un filtro para el rango de fechas
    const ventasReporte = await Ventas.findAll({
      where: {
        fecha_venta: {
          [Op.gte]: fechaLimite,  // Filtra las ventas cuya fecha_venta sea mayor o igual a la fecha límite calculada
        },
      },
      include: {
        model: Detalle_Ventas,
        where: {
          tipo_item: 'SERVICIO',  // Filtra solo los detalles con tipo_item = 'SERVICIO'
        },
        required: true,  // Asegura que solo se traigan ventas que tengan detalles
      },
    });

    return ventasReporte;
  } catch (error) {
    console.error('Error al obtener el reporte de ventas con detalles:', error);
    throw new Error('No se pudo obtener el reporte de ventas con detalles');
  }
};


//reporte por intervalos de fechas SERVICIOS
const reporteServiciosFechas = async (fechaInicio, fechaFin) => {
  try {
    // Realiza la consulta de ventas dentro del rango de fechas y filtra los detalles por tipo_item = 'SERVICIO'
    const ventasReporte = await Ventas.findAll({
      where: {
        fecha_venta: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
      include: {
        model: Detalle_Ventas,
        where: {
          tipo_item: 'SERVICIO',  // Filtra solo los detalles con tipo_item = 'SERVICIO'
        },
        required: true,  // Asegura que solo se traigan ventas que tengan detalles
      },
    });

    return ventasReporte;
  } catch (error) {
    console.error("Error al obtener el reporte de servicios con detalles por rango de fechas:", error);
    throw new Error('No se pudo obtener el reporte de servicios con detalles por rango de fechas');
  }
};







//reporte por periodos tipo CONSULTAS
const reporteConsultasPeriodo = async (cantidad, tipoPeriodo) => {
  try {
    let fechaLimite;

    // Validar que 'cantidad' sea un número
    cantidad = parseInt(cantidad, 10);
    if (isNaN(cantidad)) {
      throw new Error('La cantidad debe ser un número válido');
    }

    // Crear un rango de fechas según el tipo de periodo (DIARIO, MENSUAL, ANUAL)
    if (tipoPeriodo === 'DIARIO') {
      fechaLimite = new Date();
      fechaLimite.setDate(fechaLimite.getDate() - cantidad);  // Restar los días a la fecha actual
    } else if (tipoPeriodo === 'MENSUAL') {
      fechaLimite = new Date();
      fechaLimite.setMonth(fechaLimite.getMonth() - cantidad);  // Restar los meses a la fecha actual
    } else if (tipoPeriodo === 'ANUAL') {
      fechaLimite = new Date();
      fechaLimite.setFullYear(fechaLimite.getFullYear() - cantidad);  // Restar los años a la fecha actual
    } else {
      throw new Error('Tipo de periodo no válido. Debe ser DIARIO, MENSUAL o ANUAL.');
    }

    // Realiza la consulta con un filtro para el rango de fechas
    const ventasReporte = await Ventas.findAll({
      where: {
        fecha_venta: {
          [Op.gte]: fechaLimite,  // Filtra las ventas cuya fecha_venta sea mayor o igual a la fecha límite calculada
        },
      },
      include: {
        model: Detalle_Ventas,
        where: {
          tipo_item: 'CONSULTA',  // Filtra solo los detalles con tipo_item = 'CONSULTA'
        },
        required: true,  // Asegura que solo se traigan ventas que tengan detalles
      },
    });

    return ventasReporte;
  } catch (error) {
    console.error('Error al obtener el reporte de consultas con detalles:', error);
    throw new Error('No se pudo obtener el reporte de consultas con detalles');
  }
};

//reporte por intervalos de fechas CONUSLTA
const reporteConsultasFechas = async (fechaInicio, fechaFin) => {
  try {
    // Realiza la consulta de ventas dentro del rango de fechas y filtra los detalles por tipo_item = 'CONSULTA'
    const ventasReporte = await Ventas.findAll({
      where: {
        fecha_venta: {
          [Op.between]: [fechaInicio, fechaFin],
        },
      },
      include: {
        model: Detalle_Ventas,
        where: {
          tipo_item: 'CONSULTA',  // Filtra solo los detalles con tipo_item = 'CONSULTA'
        },
        required: true,  // Asegura que solo se traigan ventas que tengan detalles
      },
    });

    return ventasReporte;
  } catch (error) {
    console.error("Error al obtener el reporte de consultas con detalles por rango de fechas:", error);
    throw new Error('No se pudo obtener el reporte de consultas con detalles por rango de fechas');
  }
};

module.exports = {
    crearVenta,
    actualizarVenta,
    eliminarVenta,
    obtenerTodasLasVentas,
    obtenerVentasPendientes,
    reporteVentasPeriodo,
    reporteVentasFechas,
    reporteTratamientosPeriodo,
    reporteTratamientosFechas,
    reporteServiciosPeriodo,
    reporteServiciosFechas,
    reporteConsultasPeriodo,
    reporteConsultasFechas,
};
  