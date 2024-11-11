require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const { Sequelize } = require('sequelize');

// Crear una instancia de Sequelize utilizando las variables de entorno
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Nombre de la base de datos
  process.env.DB_USER,   // Usuario de la base de datos
  process.env.DB_PASSWORD,  // Contraseña de la base de datos
  {
    host: process.env.DB_HOST,  // Dirección del host de la base de datos (localhost en este caso)
    dialect: process.env.DB_DIALECT,  // Dialecto de la base de datos (PostgreSQL en este caso)
  }
);

// Probar la conexión con la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

// Exportar la instancia de Sequelize para usarla en otros archivos
module.exports = sequelize;