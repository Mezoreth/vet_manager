const { faker } = require('@faker-js/faker');  // Cambiado de import a require
const Cliente = require('../models/Clientes');  // Cambiado de import a require

// node seeders/seedClientes.js

const crearClientesPrueba = async () => {
  try {

    // Crear clientes de prueba con datos aleatorios utilizando Faker
    const clientes = [];
    
    for (let i = 0; i < 100; i++) {
      const nombre = faker.person.fullName().toUpperCase();
      const telefono = faker.number.int({ min: 69600000, max: 99999999 });
      const direccion = faker.location.streetAddress().toUpperCase();
      const cumpleanos = faker.date.past(30).toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
      const asignarObservaciones = Math.random() < 0.7;
      const observaciones = asignarObservaciones ? faker.lorem.sentence().toUpperCase() : null;
      
      clientes.push({
        nombre_cliente: nombre.length > 100 ? nombre.substring(0, 100) : nombre,  // Limita a 100 caracteres
        telefono: telefono.length > 15 ? telefono.substring(0, 15) : telefono,  // Limita a 15 caracteres
        direccion: direccion.length > 100 ? direccion.substring(0, 100) : direccion,  // Limita a 100 caracteres
        cumpleanos: cumpleanos,
        observaciones: observaciones, // Limita a 100 caracteres
      });
    }

    // Insertar todos los clientes en paralelo
    await Cliente.bulkCreate(clientes);

    console.log('Datos de prueba creados correctamente');
  } catch (error) {
    console.error('Error creando datos de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearClientesPrueba;