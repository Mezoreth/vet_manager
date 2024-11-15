const seedClientes = require('./seedClientes');
const seedCaracteristicas = require('./seedCaracteristicas');
const seedMascotas = require('./seedMascotas');
const seedMascotas_Caracteristicas = require('./seedMascotas_Caracteristicas');
const seedServicios = require('./seedServicios');
const seedTratamientos = require('./seedTratamientos');

// node seeders/seedAll.js
const runSeeds = async () => {
  try {
    console.log("Iniciando los seeds...");

    // Ejecutar los seeders secuencialmente
    await seedClientes();  // Primero, insertar los clientes
    console.log("Clientes insertados correctamente.");

    await seedCaracteristicas();  // Luego, insertar las características
    console.log("Características insertadas correctamente.");

    await seedMascotas();  // Después, insertar las mascotas
    console.log("Mascotas insertadas correctamente.");

    await seedMascotas_Caracteristicas();  // Finalmente, insertar las características de las mascotas
    console.log("Características de mascotas insertadas correctamente.");

    await seedServicios();  
    console.log("Servicios insertados correctamente.");

    await seedTratamientos();  
    console.log("Tratamientos insertados correctamente.");

    console.log("Todos los datos de prueba se han insertado correctamente.");
  } catch (error) {
    console.error("Error ejecutando los seeds:", error);
  }
};

runSeeds();
