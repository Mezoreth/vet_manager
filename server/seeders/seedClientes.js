const { faker } = require('@faker-js/faker');  // Cambiado de import a require
const Cliente = require('../models/Clientes');  // Cambiado de import a require

// node seeders/seedClientes.js

const crearClientesPrueba = async () => {
  try {
    // Crear un cliente de prueba con datos fijos
    await Cliente.create({
      nombre_cliente: 'Juan Pérez',
      telefono: '123456789',
      direccion: 'Calle Falsa 123, Ciudad',
      cumpleanos: '1990-05-15',
      observaciones: 'Cliente frecuente'
    });

    // Crear clientes de prueba con datos aleatorios utilizando Faker
    const clientes = [];
    
    for (let i = 0; i < 99; i++) {
      const nombre = faker.person.fullName();
      const telefono = faker.phone.number().replace(/\D/g, '');;
      const direccion = faker.location.streetAddress();
      const cumpleanos = faker.date.past(30).toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
      const asignarObservaciones = Math.random() < 0.7;
      const observaciones = asignarObservaciones ? faker.lorem.sentence() : null;
      
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
crearClientesPrueba();