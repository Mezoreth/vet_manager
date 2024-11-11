const express = require('express');
const router = express.Router();

// Importar rutas de diferentes archivos
const clientesRoutes = require('./clientesRoutes');
const mascotasRoutes = require('./mascotasRoutes');

// Usar las rutas en el router principal
router.use('/clientes', clientesRoutes);
router.use('/mascotas', mascotasRoutes);

module.exports = router;