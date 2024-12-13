const seedClientes = require('./seedClientes');
const seedCaracteristicas = require('./seedCaracteristicas');
const seedMascotas = require('./seedMascotas');
const seedMascotas_Caracteristicas = require('./seedMascotas_Caracteristicas');
const seedServicios = require('./seedServicios');
const seedTratamientos = require('./seedTratamientos');
const seedMedicamentos = require('./seedMedicamentos');
const seedMascotas_Medicamentos = require('./seedMascotas_Medicamentos');
const seedClientes_Servicios = require('./seedClientes_Servicios');
const seedMascotas_Servicios = require('./seedMascotas_Servicios');
const seedProductos = require('./seedProductos');
const seedVentas = require('./seedVentas');
const seedDetalle_Ventas = require('./seedDetalle_Ventas');
const seedMedicamentos_Tratamientos = require('./seedMedicamentos_Tratamientos');
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

    await seedMedicamentos();  
    console.log("Medicamentos insertados correctamente.");

    await seedMedicamentos_Tratamientos();  
    console.log("Medicamentos_Tratamientos insertados correctamente.");

    await seedMascotas_Medicamentos();  
    console.log("Mascotas_Medicamentos insertados correctamente.");

    await seedMascotas_Servicios();  
    console.log("Mascotas_Servicios insertados correctamente.");

    await seedClientes_Servicios();  
    console.log("Clientes_Servicios insertados correctamente.");

    await seedVentas();  
    console.log("Ventas insertadas correctamente.");

    await seedProductos();  
    console.log("Productos insertados correctamente.");

    await seedDetalle_Ventas();  
    console.log("Detalle_Ventas insertados correctamente.");

    console.log("Todos los datos de prueba se han insertado correctamente.");
  } catch (error) {
    console.error("Error ejecutando los seeds:", error);
  }
};

runSeeds();
