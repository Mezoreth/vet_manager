const { Op } = require('sequelize');
const Productos = require('../models/Productos'); 
const moment = require('moment');
//create
const createProducto = async (codigo, nombre_producto, tipo, descripcion, fecha_vencimiento, precio_compra, precio_venta, cantidad) => {
    try {
      // Intentamos crear un nuevo producto
      const producto = await Productos.create({
        codigo,
        nombre_producto,
        tipo,
        descripcion,
        fecha_vencimiento,
        precio_compra,
        precio_venta,
        cantidad,
      });
  
      // Retornamos el id_producto del producto creado
      return { id_producto: producto.id_producto };
    } catch (error) {
      console.error("Error al crear el producto:", error);
      throw new Error('No se pudo crear el producto');
    }
  };

//update
const updateProducto = async (id_producto, codigo, nombre_producto, tipo, descripcion, fecha_vencimiento, precio_compra, precio_venta, cantidad) => {
    try {
      const producto = await Productos.findByPk(id_producto);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
  
      if (codigo) producto.codigo = codigo;
      if (nombre_producto) producto.nombre_producto = nombre_producto;
      if (tipo) producto.tipo = tipo;
      if (descripcion) producto.descripcion = descripcion;
      if (fecha_vencimiento) producto.fecha_vencimiento = fecha_vencimiento;
      if (precio_compra) producto.precio_compra = precio_compra;
      if (precio_venta) producto.precio_venta = precio_venta;
      if (cantidad) producto.cantidad = cantidad;
  
      await producto.save();
      return { message: 'Producto actualizado con éxito', id_producto: producto.id_producto };  // Retornar el id_producto
    } catch (error) {
      return { message: 'Error al actualizar el producto', error };
    }
  };

//delete
const deleteProducto = async (id_producto) => {
    try {
      const deletedProducto = await Productos.destroy({
        where: { id_producto },
      });
  
      if (deletedProducto) {
        return { message: 'Producto eliminado con éxito', id_producto };  
      } else {
        return { message: 'Producto no encontrado' };
      }
    } catch (error) {
      return { message: 'Error al eliminar el producto', error };
    }
  };

//getAll
const getAllProductos = async () => {
    try {
      const productos = await Productos.findAll({
        order: [['nombre_producto', 'ASC']],  // Ordena por nombre_producto en orden ascendente
      });
      return productos; // Devuelve los productos obtenidos
    } catch (error) {
      console.error('Error al obtener todos los productos:', error);
      throw error;
    }
  };

//getByVencimiento
const getProductosPorFechaVencimiento = async (meses_restantes) => {
  try {
    const fechaLimite = moment().add(meses_restantes, 'months').format('YYYY-MM-DD');  
    const productos = await Productos.findAll({
      where: {
        fecha_vencimiento: {
          [Op.lte]: fechaLimite,  
        },
      },
      order: [['nombre_producto', 'ASC']],  
    });
    return productos; 
  } catch (error) {
    console.error('Error al obtener productos por meses de vencimiento:', error);
    throw error;
  }
};

//getByNombre
const getProductosPorNombre = async (nombre) => {
    try {
      const productos = await Productos.findAll({
        where: {
          nombre_producto: {
            [Op.like]: `%${nombre}%`,  // Filtro por nombre (parcial)
          },
        },
        order: [['nombre_producto', 'ASC']],  // Ordena por nombre_producto en orden ascendente
      });
      return productos; // Devuelve los productos obtenidos
    } catch (error) {
      console.error('Error al obtener productos por nombre:', error);
      throw error;
    }
  };

//getByCodigo
const getProductosPorCodigo = async (codigo) => {
    try {
      const productos = await Productos.findAll({
        where: {
          codigo: {
            [Op.like]: `%${codigo}%`,  // Filtro por código (parcial)
          },
        },
        order: [['nombre_producto', 'ASC']],  // Ordena por nombre_producto en orden ascendente
      });
      return productos; // Devuelve los productos obtenidos
    } catch (error) {
      console.error('Error al obtener productos por código:', error);
      throw error;
    }
  };


module.exports = {
  createProducto,
  updateProducto,
  deleteProducto,
  getAllProductos,
  getProductosPorNombre,
  getProductosPorCodigo,
  getProductosPorFechaVencimiento,
};