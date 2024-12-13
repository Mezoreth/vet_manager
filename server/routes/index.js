const express = require('express');
const router = express.Router();

// Importar rutas de diferentes archivos
const clientesRoutes = require('./clientesRoutes');
const consultasRoutes = require('./consultasRoutes');
const mascotasRoutes = require('./mascotasRoutes');
const caracteristicasRoutes = require('./caracteristicasRoutes');
const tratamientosRoutes = require('./tratamientosRoutes');
const medicamentosRoutes = require('./medicamentosRoutes');
const productosRoutes = require('./productosRoutes');
const serviciosRoutes = require('./serviciosRoutes');
const ventasRoutes = require('./ventasRoutes');
const mascotas_medicamentosRoutes = require('./mascotas_medicamentosRoutes');
const detalle_ventasRoutes = require('./detalle_ventasRoutes');
const medicamentos_tratamientosRoutes = require('./medicamentos_tratamientosRoutes');
//const mascotas_caracteristicasRoutes = require('./mascotas_caracteristicasRoutes');
// Usar las rutas en el router principal
router.use('/clientes', clientesRoutes);
router.use('/consultas', consultasRoutes);
router.use('/mascotas', mascotasRoutes);
router.use('/caracteristicas', caracteristicasRoutes);
router.use('/tratamientos', tratamientosRoutes);
router.use('/productos', productosRoutes);
router.use('/servicios', serviciosRoutes);
router.use('/ventas', ventasRoutes);
router.use('/medicamentos', medicamentosRoutes);
router.use('/mascotas_medicamentos', mascotas_medicamentosRoutes);
router.use('/detalle_ventas', detalle_ventasRoutes);
router.use('/medicamentos_tratamientos', medicamentos_tratamientosRoutes);
//router.use('/mascotas_caracteristicas', mascotas_caracteristicasRoutes);

module.exports = router;