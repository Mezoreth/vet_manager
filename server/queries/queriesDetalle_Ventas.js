const { Op } = require('sequelize');
const Clientes = require('../models/Detalle_Ventas');  


// Función para crear un detalle de venta
const createDetalleVenta = async (id_venta, tipo_item, id_item, cantidad, precio_unitario, subtotal) => {
    try {
      const detalleVenta = await Detalle_Ventas.create({
        id_venta,
        tipo_item,
        id_item,
        cantidad,
        precio_unitario,
        subtotal
      });
  
      // Retorna el detalle de venta creado en formato JSON
      return detalleVenta.toJSON();
    } catch (error) {
      console.error("Error al crear el detalle de venta:", error);
      throw new Error('No se pudo crear el detalle de venta');
    }
  };


  // Función para actualizar un detalle de venta
const updateDetalleVenta = async (id_detalle, id_venta, tipo_item, id_item, cantidad, precio_unitario, subtotal) => {
    try {
      const detalleVenta = await Detalle_Ventas.findByPk(id_detalle);
  
      if (!detalleVenta) {
        throw new Error('Detalle de venta no encontrado');
      }
  
      // Actualizamos los valores si fueron proporcionados
      if (id_venta) detalleVenta.id_venta = id_venta;
      if (tipo_item) detalleVenta.tipo_item = tipo_item;
      if (id_item) detalleVenta.id_item = id_item;
      if (cantidad) detalleVenta.cantidad = cantidad;
      if (precio_unitario) detalleVenta.precio_unitario = precio_unitario;
      if (subtotal) detalleVenta.subtotal = subtotal;
  
      // Guardamos los cambios
      await detalleVenta.save();
  
      return { message: 'Detalle de venta actualizado con éxito' };
    } catch (error) {
      console.error("Error al actualizar el detalle de venta:", error);
      return { message: 'Error al actualizar el detalle de venta' };
    }
  };


  // Función para eliminar un detalle de venta
const deleteDetalleVenta = async (id_detalle) => {
    try {
      const deletedDetalleVenta = await Detalle_Ventas.destroy({
        where: { id_detalle }
      });
  
      if (deletedDetalleVenta) {
        return { message: 'Detalle de venta eliminado con éxito' };
      } else {
        return { message: 'Detalle de venta no encontrado' };
      }
    } catch (error) {
      console.error("Error al eliminar el detalle de venta:", error);
      return { message: 'Error al eliminar el detalle de venta', error };
    }
  };

  module.exports = {
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta,
  };