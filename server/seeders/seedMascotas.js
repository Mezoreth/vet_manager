const { faker } = require('@faker-js/faker');  // Usamos Faker para generar datos aleatorios
const Mascota = require('../models/Mascotas.js');  // Asegúrate de que la ruta sea correcta
const Cliente = require('../models/Clientes.js');  // Importamos el modelo Cliente para asociarlo
const Especies = require('../models/Especies.js');
const Razas = require('../models/Razas.js');
const Colores = require('../models/Colores.js');  // Asegúrate de que la ruta sea correcta

// node seeders/seedMascotas.js

const crearMascotasPrueba = async () => {
  try {
    // Obtener todos los clientes (para asociar una mascota a un cliente)
    const clientes = await Cliente.findAll();
    const especies = await Especies.findAll();
    const razas = await Razas.findAll();
    const colores = await Colores.findAll();

    if (clientes.length === 0) {
      console.log('No hay clientes en la base de datos.');
      return;
    }

    // Crear mascotas de prueba con datos aleatorios utilizando Faker
    const mascotas = [];
    const sexos = ['M', 'F'];
    for (let i = 0; i < 100; i++) {
      const nombre_mascota = faker.animal.petName();  // Nombre de la mascota
      const id_especie = especies[faker.number.int({ min: 0, max: especies.length - 1 })].id_especie;  // Especie de la mascota (perro, gato, etc.)
      const id_raza = razas[faker.number.int({ min: 0, max: razas.length - 1 })].id_raza;  // Raza de la mascota (podemos cambiarlo si es otro tipo de animal)
      const id_color = colores[faker.number.int({ min: 0, max: colores.length - 1 })].id_color;  // Color de la mascota
      const sexo = faker.helpers.arrayElement(sexos);  // Sexo de la mascota (M para macho, F para hembra)
      const fecha_nacimiento = faker.date.past(5).toISOString().split('T')[0];  // Fecha de nacimiento aleatoria en los últimos 5 años
      const fecha_castramiento = faker.datatype.boolean() ? faker.date.past(2).toISOString().split('T')[0] : null;  // Fecha de castración, si aplica
      const observaciones = faker.lorem.sentence();  // Observaciones aleatorias
      const id_cliente = clientes[faker.number.int({ min: 0, max: clientes.length - 1 })].id_cliente;  // Asignamos un cliente aleatorio a la mascota

      mascotas.push({
        nombre_mascota: nombre_mascota.length > 100 ? nombre_mascota.substring(0, 100) : nombre_mascota,  // Limita el nombre de la mascota a 100 caracteres
        id_especie: id_especie,  // Especie
        id_raza: id_raza,  // Raza
        id_color: id_color,  // Color
        sexo: sexo.length > 10 ? sexo.substring(0, 10) : sexo,  // Limita el sexo a 10 caracteres
        fecha_nacimiento: fecha_nacimiento,  // Fecha en formato YYYY-MM-DD
        reproductor: faker.datatype.boolean(),  // Genera un valor aleatorio (true/false)
        castrado: faker.datatype.boolean(),  // Genera un valor aleatorio (true/false)
        fecha_castramiento: fecha_castramiento,  // Fecha de castración (si aplica)
        fallecimiento: faker.datatype.boolean(),  // Genera un valor aleatorio (true/false)
        observaciones: observaciones.length > 255 ? observaciones.substring(0, 255) : observaciones,  // Limita las observaciones a 255 caracteres
        id_cliente: id_cliente  // Asociamos una mascota a un cliente
      });
    }

    // Insertar todas las mascotas en paralelo
    await Mascota.bulkCreate(mascotas);

    console.log('Datos de prueba para mascotas creados correctamente');
  } catch (error) {
    console.error('Error creando datos de prueba para mascotas:', error);
  }
};

// Ejecutamos la función
crearMascotasPrueba();