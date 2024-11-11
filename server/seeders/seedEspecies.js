const { faker } = require('@faker-js/faker');  // Usamos require para importar faker
const Especies = require('../models/Especies.js');  // Asegúrate de que la ruta sea correcta

// node seeders/seedEspecies.js

const crearEspeciesPrueba = async () => {
  try {
    // Crear una especie de prueba con un nombre fijo
    await Especies.create({
      nombre_especie: 'Perro',  // Una especie conocida para prueba
    });

    // Crear especies de prueba con nombres aleatorios utilizando Faker
    const especies = [];
    for (let i = 0; i < 99; i++) {
      const nombreEspecie = faker.animal.type(); // Faker genera un nombre aleatorio de especie

      especies.push({
        nombre_especie: nombreEspecie.length > 50 ? nombreEspecie.substring(0, 50) : nombreEspecie,  // Limitar a 50 caracteres
      });
    }

    // Insertar todas las especies en paralelo
    await Especies.bulkCreate(especies);

    console.log('Datos de prueba de especies creados correctamente');
  } catch (error) {
    console.error('Error creando datos de prueba de especies:', error);
  }
};

// Ejecutamos la función
crearEspeciesPrueba();
