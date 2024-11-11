const { faker } = require('@faker-js/faker');  // Usamos require para importar faker
const Colores = require('../models/Colores.js');  // Asegúrate de que la ruta sea correcta

// node seeders/seedColores.js

const crearColoresPrueba = async () => {
  try {
    // Crear un color de prueba con un nombre fijo
    await Colores.create({
      nombre_color: 'Azul',  // Un color conocido para prueba
    });

    // Crear colores de prueba con nombres aleatorios utilizando Faker
    const colores = [];
    for (let i = 0; i < 99; i++) {
      const nombreColor = faker.color.human();  // Faker genera un nombre aleatorio de color

      colores.push({
        nombre_color: nombreColor.length > 50 ? nombreColor.substring(0, 50) : nombreColor,  // Limitar a 50 caracteres
      });
    }

    // Insertar todos los colores en paralelo
    await Colores.bulkCreate(colores);

    console.log('Datos de prueba de colores creados correctamente');
  } catch (error) {
    console.error('Error creando datos de prueba de colores:', error);
  }
};

// Ejecutamos la función
crearColoresPrueba();