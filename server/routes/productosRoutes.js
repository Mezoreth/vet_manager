const express = require('express');
const ProductoQueries = require('../queries/queriesProductos'); // Ajusta la ruta según tu estructura
const router = express.Router();

// Ruta para obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await ProductoQueries.getAllProductos(); 
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Ruta para crear un producto
router.post('/', async (req, res) => {
  const { codigo, nombre_producto, tipo, descripcion, fecha_vencimiento, precio_compra, precio_venta, cantidad } = req.body;
  try {
    const result = await ProductoQueries.createProducto(
      codigo,
      nombre_producto,
      tipo,
      descripcion,
      fecha_vencimiento,
      precio_compra,
      precio_venta,
      cantidad
    );
    res.status(201).json(result);  // Retorna el id del producto creado
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'No se pudo crear el producto' });
  }
});

// Ruta para actualizar un producto
router.put('/:id_producto', async (req, res) => {
  const { id_producto } = req.params;
  const { codigo, nombre_producto, tipo, descripcion, fecha_vencimiento, precio_compra, precio_venta, cantidad } = req.body;
  try {
    const result = await ProductoQueries.updateProducto(
      id_producto,
      codigo,
      nombre_producto,
      tipo,
      descripcion,
      fecha_vencimiento,
      precio_compra,
      precio_venta,
      cantidad
    );
    res.json(result);  // Retorna el mensaje de éxito y el id_producto
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ message: 'Error al actualizar el producto', error });
  }
});

// Ruta para eliminar un producto
router.delete('/:id_producto', async (req, res) => {
  const { id_producto } = req.params;
  try {
    const result = await ProductoQueries.deleteProducto(id_producto);
    res.json(result);  // Retorna el mensaje de eliminación
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
});

// Ruta para obtener productos por nombre (parcial)
router.get('/nombre/:nombre', async (req, res) => {
  const { nombre } = req.params;
  try {
    const productos = await ProductoQueries.getProductosPorNombre(nombre);
    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos con ese nombre.' });
    }
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos por nombre:', error);
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
});

// Ruta para obtener productos por código (parcial)
router.get('/codigo/:codigo', async (req, res) => {
  const { codigo } = req.params;
  try {
    const productos = await ProductoQueries.getProductosPorCodigo(codigo);
    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos con ese código.' });
    }
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos por código:', error);
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
});

// Ruta para obtener productos por fecha de vencimiento (parcial)
router.get('/vencimiento/:fecha_vencimiento', async (req, res) => {
  const { fecha_vencimiento } = req.params;
  try {
    const productos = await ProductoQueries.getProductosPorFechaVencimiento(fecha_vencimiento);
    if (productos.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos con esa fecha de vencimiento.' });
    }
    res.status(200).json(productos);
  } catch (error) {
    console.error('Error al obtener productos por fecha de vencimiento:', error);
    res.status(500).json({ message: 'Error al obtener productos', error });
  }
});

module.exports = router;