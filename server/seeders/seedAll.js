const fs = require('fs');
const path = require('path');

// Directorio donde se encuentran los archivos de seeders
const seedersDir = path.join(__dirname, 'seeders');

// Lista con el orden específico de los archivos
const seedersOrdenados = [
  'seedClientes.js',  // Primero ejecutar el seeder de clientes
  'seedEspecies.js',  
  'seedColores.js',
  'seedRazas.js',
  'seedMascotas.js',     
];

// Función que ejecuta los seeders en el orden especificado
const ejecutarSeeders = async () => {
  try {
    for (const seederFile of seedersOrdenados) {
      const rutaSeeder = path.join(seedersDir, seederFile);
      if (fs.existsSync(rutaSeeder)) {
        console.log(`Ejecutando el seeder: ${seederFile}`);
        const { crearClientesPrueba } = require(rutaSeeder);  // Asegúrate de que cada archivo exporte una función
        await crearClientesPrueba();  // Ejecuta la función correspondiente
      } else {
        console.warn(`El archivo ${seederFile} no existe en el directorio de seeders.`);
      }
    }

    console.log('Todos los seeders han sido ejecutados con éxito');
  } catch (error) {
    console.error('Error al ejecutar los seeders:', error);
  }
};

// Ejecutar los seeders
ejecutarSeeders();