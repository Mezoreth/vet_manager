const { Op } = require('sequelize');
const Mascotas = require('../models/Mascotas');
const Clientes = require('../models/Clientes');
const Caracteristicas = require('../models/Caracteristicas');
const Medicamentos = require('../models/Medicamentos');
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos');
const Mascotas_Caracteristicas = require('../models/Mascotas_Caracteristicas');
const sequelize = require('../database/database');

//Funcion para listar las vacunas de una mascota
const obtenerVacunas = async (id_mascota) => {
  try {
    // Realizamos la consulta
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  
        tipo: 'VACUNA',          
      },
      include: [
        {
          model: Medicamentos,       
          as: 'Medicamento',         
          required: true,             
          attributes: [         
            'nombre_medicamento',      
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento', 
        'id_mascota', 
        'id_medicamento',                 
        'fecha_dosis',               
        'fecha_refuerzo', 
        'cantidad',
        'precio',
        'estado',   
        'tipo_pago',   
      ],
    });
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      const medicamentoData = medicamento.Medicamento || {}; 
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, 
        fecha_refuerzo: medicamento.fecha_refuerzo, 
        tipo_pago: medicamento.tipo_pago,
      };
    });
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};

//Funcion para listar los supresores de una mascota
const obtenerSupresores = async (id_mascota) => {
  try {
    // Realizamos la consulta
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  
        tipo: 'SUPRESOR',          
      },
      include: [
        {
          model: Medicamentos,       
          as: 'Medicamento',         
          required: true,             
          attributes: [       
            'nombre_medicamento'      
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento', 
        'id_mascota', 
        'id_medicamento',                 
        'fecha_dosis',               
        'fecha_refuerzo', 
        'cantidad',
        'precio',
        'estado', 
        'tipo_pago',             
      ],
    });
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      const medicamentoData = medicamento.Medicamento || {}; 
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, 
        fecha_refuerzo: medicamento.fecha_refuerzo, 
        tipo_pago: medicamento.tipo_pago,
      };
    }); 
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};


//Funcion para listar los desparasitantes de una mascota
const obtenerDesparasitantes = async (id_mascota) => {
  try {
    // Realizamos la consulta
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  
        tipo: 'DESPARASITANTE',          
      },
      include: [
        {
          model: Medicamentos,       
          as: 'Medicamento',        
          required: true,             
          attributes: [         
            'nombre_medicamento'     
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento', 
        'id_mascota', 
        'id_medicamento',                 
        'fecha_dosis',               
        'fecha_refuerzo', 
        'cantidad',
        'precio',
        'estado',      
        'tipo_pago',        
      ],
    });
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      const medicamentoData = medicamento.Medicamento || {};
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, 
        fecha_refuerzo: medicamento.fecha_refuerzo, 
        tipo_pago: medicamento.tipo_pago,
      };
    });
    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener medicamentos:', error);
    throw error;
  }
};

//Funcion para crear Mascota_Medicamento
const createMascotaMedicamento = async (id_mascota, id_medicamento, tipo, cantidad, precio, fecha_dosis, fecha_refuerzo, estado, tipo_pago) => {
  try {
    const nuevaMascotaMedicamento = await Mascotas_Medicamentos.create({
      id_mascota,
      id_medicamento,
      tipo,
      cantidad,
      precio,
      fecha_dosis,
      fecha_refuerzo,
      estado,
      tipo_pago,
    });
    // Regresamos el id_mascotaMedicamento junto con los datos
    return { id_mascotaMedicamento: nuevaMascotaMedicamento.id_mascotaMedicamento };
  } catch (error) {
    console.error("Error al crear la relación entre mascota y medicamento:", error);
    throw new Error('No se pudo crear la relación entre mascota y medicamento');
  }
};

//Funcion para actualizar Mascota_Medicamento
const updateMascotaMedicamento = async (id_mascotaMedicamento, id_mascota, id_medicamento, tipo, cantidad, precio, fecha_dosis, fecha_refuerzo, estado, tipo_pago) => {
  try {
    const mascotaMedicamento = await Mascotas_Medicamentos.findByPk(id_mascotaMedicamento);
    if (!mascotaMedicamento) {
      throw new Error('Relación entre mascota y medicamento no encontrada');
    }

    if (id_mascota) mascotaMedicamento.id_mascota = id_mascota;
    if (id_medicamento) mascotaMedicamento.id_medicamento = id_medicamento;
    if (tipo) mascotaMedicamento.tipo = tipo;
    if (cantidad) mascotaMedicamento.cantidad = cantidad;
    if (precio) mascotaMedicamento.precio = precio;  
    if (fecha_dosis) mascotaMedicamento.fecha_dosis = fecha_dosis;
    if (fecha_refuerzo) mascotaMedicamento.fecha_refuerzo = fecha_refuerzo;
    if (estado) mascotaMedicamento.estado = estado;
    if (tipo_pago) mascotaMedicamento.tipo_pago = tipo_pago; 


    await mascotaMedicamento.save();
    // Regresamos el id_mascotaMedicamento junto con el mensaje de éxito
    return { id_mascotaMedicamento: mascotaMedicamento.id_mascotaMedicamento, message: 'Relación entre mascota y medicamento actualizada con éxito' };
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
      return { id_mascotaMedicamento, message: 'Relación entre mascota y medicamento eliminada con éxito' };
    } else {
      return { message: 'Relación entre mascota y medicamento no encontrada' };
    }
  } catch (error) {
    console.error('Error al eliminar la relación entre mascota y medicamento:', error);
    return { message: 'Error al eliminar la relación entre mascota y medicamento', error };
  }
};

//GetMascota_Medicamento por id
const obtenerMascotaMedicamentoPorId = async (id_mascotaMedicamento) => {
  try {
    // Realizamos la consulta buscando el id_mascotaMedicamento sin importar el tipo
    const medicamentoMascota = await Mascotas_Medicamentos.findOne({
      where: {
        id_mascotaMedicamento: id_mascotaMedicamento,  // Buscamos por id_mascotaMedicamento
      },
      include: [
        {
          model: Medicamentos,       // Incluimos la información del medicamento
          as: 'Medicamento',         
          required: true,             
          attributes: [
            'nombre_medicamento',   // Solo incluimos el nombre del medicamento
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento', 
        'id_mascota', 
        'id_medicamento',                 
        'fecha_dosis',                
        'fecha_refuerzo', 
        'cantidad',
        'precio',
        'estado', 
        'tipo_pago',     
      ],
    });

    // Si no se encuentra el medicamento, retornamos null
    if (!medicamentoMascota) {
      return null;
    }

    // Aplanamos la respuesta y la devolvemos
    const medicamentoData = medicamentoMascota.Medicamento || {}; 
    return {
      id_mascotaMedicamento: medicamentoMascota.id_mascotaMedicamento,
      id_mascota: medicamentoMascota.id_mascota,
      id_medicamento: medicamentoMascota.id_medicamento,
      nombre_medicamento: medicamentoData.nombre_medicamento,
      fecha_dosis: medicamentoMascota.fecha_dosis, 
      fecha_refuerzo: medicamentoMascota.fecha_refuerzo, 
      cantidad: medicamentoMascota.cantidad,
      precio: medicamentoMascota.precio,
      estado: medicamentoMascota.estado,
      tipo_pago: medicamentoMascota.tipo_pago,
    };
  } catch (error) {
    console.error('Error al obtener el medicamento de la mascota por id:', error);
    throw new Error('No se pudo obtener el medicamento de la mascota por el ID');
  }
};

//Get Vacunas pendientes
const obtenerVacunasPendientes = async (id_mascota) => {
  try {
    // Realizamos la consulta filtrando por estado 'PENDIENTE'
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  
        tipo: 'VACUNA',          
        estado: 'PENDIENTE',  // Filtrar por estado 'PENDIENTE'
      },
      include: [
        {
          model: Medicamentos,       
          as: 'Medicamento',         
          required: true,             
          attributes: [         
            'nombre_medicamento',      
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento', 
        'id_mascota', 
        'id_medicamento',                 
        'fecha_dosis',               
        'fecha_refuerzo', 
        'cantidad',
        'precio',
        'estado',
        'tipo_pago',      
      ],
    });

    // Aplanar la respuesta y devolverla
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      const medicamentoData = medicamento.Medicamento || {}; 
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_mascota: medicamento.id_mascota,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, 
        cantidad: medicamento.cantidad, 
        precio: medicamento.precio, 
        estado: medicamento.estado, 
        fecha_refuerzo: medicamento.fecha_refuerzo, 
        tipo_pago: medicamento.tipo_pago, 
      };
    });

    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener vacunas pendientes:', error);
    throw error;
  }
};



//obtener supresores pendientes 
const obtenerSupresoresPendientes = async (id_mascota) => {
  try {
    // Realizamos la consulta filtrando por estado 'PENDIENTE'
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  
        tipo: 'SUPRESOR',          
        estado: 'PENDIENTE',  // Filtrar por estado 'PENDIENTE'
      },
      include: [
        {
          model: Medicamentos,       
          as: 'Medicamento',         
          required: true,             
          attributes: [       
            'nombre_medicamento'      
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento', 
        'id_mascota', 
        'id_medicamento',                 
        'fecha_dosis',               
        'fecha_refuerzo', 
        'cantidad',
        'precio',
        'estado',              
      ],
    });

    // Aplanar la respuesta y devolverla
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      const medicamentoData = medicamento.Medicamento || {}; 
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_mascota: medicamento.id_mascota,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, 
        cantidad: medicamento.cantidad, 
        precio: medicamento.precio, 
        estado: medicamento.estado, 
        fecha_refuerzo: medicamento.fecha_refuerzo, 
        tipo_pago: medicamento.tipo_pago, 
      };
    });

    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener supresores pendientes:', error);
    throw error;
  }
};


const obtenerDesparasitantesPendientes = async (id_mascota) => {
  try {
    // Realizamos la consulta filtrando por estado 'PENDIENTE'
    const medicamentosMascota = await Mascotas_Medicamentos.findAll({
      where: {
        id_mascota: id_mascota,  
        tipo: 'DESPARASITANTE',          
        estado: 'PENDIENTE',  // Filtrar por estado 'PENDIENTE'
      },
      include: [
        {
          model: Medicamentos,       
          as: 'Medicamento',        
          required: true,             
          attributes: [         
            'nombre_medicamento'     
          ],
        },
      ],
      attributes: [
        'id_mascotaMedicamento', 
        'id_mascota', 
        'id_medicamento',                 
        'fecha_dosis',               
        'fecha_refuerzo', 
        'cantidad',
        'precio',
        'estado',      
        'tipo_pago',      
      ],
    });

    // Aplanar la respuesta y devolverla
    const resultadoAplanado = medicamentosMascota.map((medicamento) => {
      const medicamentoData = medicamento.Medicamento || {};
      return {
        id_mascotaMedicamento: medicamento.id_mascotaMedicamento,
        id_mascota: medicamento.id_mascota,
        id_medicamento: medicamento.id_medicamento,
        nombre_medicamento: medicamentoData.nombre_medicamento,
        fecha_dosis: medicamento.fecha_dosis, 
        cantidad: medicamento.cantidad, 
        precio: medicamento.precio, 
        estado: medicamento.estado, 
        fecha_refuerzo: medicamento.fecha_refuerzo, 
        tipo_pago: medicamento.tipo_pago,  
      };
    });

    return resultadoAplanado;
  } catch (error) {
    console.error('Error al obtener desparasitantes pendientes:', error);
    throw error;
  }
};

module.exports = {
  obtenerVacunas,
  obtenerSupresores,
  obtenerDesparasitantes,
  createMascotaMedicamento,
  updateMascotaMedicamento,
  deleteMascotaMedicamento,
  obtenerVacunasPendientes,
  obtenerSupresoresPendientes,
  obtenerDesparasitantesPendientes,
  obtenerMascotaMedicamentoPorId,
};
  
  