const { faker } = require('@faker-js/faker');
const Mascotas_Servicios = require('../models/Mascotas_Servicios');
const Mascotas = require('../models/Mascotas');
const Servicios = require('../models/Servicios');

const crearMascotasServiciosPrueba = async () => {
  try {
    // Obtener todas las mascotas y servicios disponibles en la base de datos
    const mascotas = await Mascotas.findAll();
    const servicios = await Servicios.findAll();

    // Verificar que haya suficientes mascotas y servicios
    if (mascotas.length < 1) {
      console.log('No hay mascotas en la base de datos para asignar servicios');
      return;
    }
    if (servicios.length < 1) {
      console.log('No hay servicios en la base de datos para asignar a las mascotas');
      return;
    }

    // Usamos un conjunto para almacenar combinaciones únicas de id_mascota y id_servicio
    const relacionesCreadas = new Set();

    // Crear relaciones entre mascotas y servicios
    const cantidadRelaciones = 100; // Puedes ajustar esta cantidad
    for (let i = 0; i < cantidadRelaciones; i++) {
      let idMascota;
      let idServicio;
      
      // Evitar combinaciones duplicadas
      do {
        idMascota = faker.helpers.arrayElement(mascotas).id_mascota; // Selecciona una mascota aleatoria
        idServicio = faker.helpers.arrayElement(servicios).id_servicio; // Selecciona un servicio aleatorio
      } while (relacionesCreadas.has(`${idMascota}-${idServicio}`)); // Si ya existe la combinación, volvemos a intentar

      // Almacenamos la relación para evitar duplicados
      relacionesCreadas.add(`${idMascota}-${idServicio}`);

      // Crear la relación entre la mascota y el servicio
      await Mascotas_Servicios.create({
        id_mascota: idMascota,
        id_servicio: idServicio,
      });

      console.log(`Relación creada entre la mascota ID: ${idMascota} y el servicio ID: ${idServicio}`);
    }

    console.log('Relaciones de mascotas y servicios creadas correctamente.');
  } catch (error) {
    console.error('Error creando las relaciones de mascotas y servicios de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearMascotasServiciosPrueba;