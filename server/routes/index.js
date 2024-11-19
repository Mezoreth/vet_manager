const express = require('express');
const router = express.Router();

// Importar rutas de diferentes archivos
const clientesRoutes = require('./clientesRoutes');
const mascotasRoutes = require('./mascotasRoutes');
const tratamientosRoutes = require('./tratamientosRoutes');
const mascotas_medicamentosRoutes = require('./mascotas_medicamentosRoutes');
//const mascotas_caracteristicasRoutes = require('./mascotas_caracteristicasRoutes');
// Usar las rutas en el router principal
router.use('/clientes', clientesRoutes);
router.use('/mascotas', mascotasRoutes);
router.use('/tratamientos', tratamientosRoutes);
router.use('/mascotas_medicamentos', mascotas_medicamentosRoutes);
//router.use('/mascotas_caracteristicas', mascotas_caracteristicasRoutes);

module.exports = router;