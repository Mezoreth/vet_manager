const { faker } = require('@faker-js/faker');  // Usamos require para importar faker
const Razas = require('../models/Razas.js');  // Asegúrate de que la ruta sea correcta

// node seeders/seedRazas.js

const crearRazasPrueba = async () => {
  try {
    // Crear una raza de prueba con un nombre fijo
    await Razas.create({
      nombre_raza: 'Labrador',  // Una raza conocida para prueba
    });

    // Crear razas de prueba con nombres aleatorios utilizando Faker
    const razas = [];
    for (let i = 0; i < 99; i++) {
      const nombreRaza = faker.animal.dog();  // Faker genera una raza de perro aleatoria

      razas.push({
        nombre_raza: nombreRaza.length > 50 ? nombreRaza.substring(0, 50) : nombreRaza,  // Limitar a 50 caracteres
      });
    }

    // Insertar todas las razas en paralelo
    await Razas.bulkCreate(razas);

    console.log('Datos de prueba de razas creados correctamente');
  } catch (error) {
    console.error('Error creando datos de prueba de razas:', error);
  }
};

// Ejecutamos la función
crearRazasPrueba();