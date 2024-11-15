const { faker } = require('@faker-js/faker');
const Mascotas_Caracteristicas = require('../models/Mascotas_Caracteristicas');
const Mascotas = require('../models/Mascotas');
const Caracteristicas = require('../models/Caracteristicas'); // Asegúrate de tener el modelo de Caracteristicas importado
//  node seeders/seedMascotas_Caracteristicas.js
// Crear relaciones de características para las mascotas
const crearMascotasCaracteristicasPrueba = async () => {
  try {
    // Obtener todas las mascotas y todas las características de la base de datos
    const mascotas = await Mascotas.findAll();
    const caracteristicas = await Caracteristicas.findAll();

    // Verificar que haya suficientes datos para asignar características
    if (mascotas.length < 1 || caracteristicas.length < 1) {
      console.log('No hay suficientes datos de mascotas o características en la base de datos.');
      return;
    }

    // Para cada mascota, asignar características coherentes
    for (let i = 0; i < mascotas.length; i++) {
      const mascota = mascotas[i];
      const especie = faker.helpers.arrayElement(caracteristicas.filter(c => c.tipo === 'especie'));
      const color = faker.helpers.arrayElement(caracteristicas.filter(c => c.tipo === 'color'));
      
      // Filtrar las razas disponibles según la especie
      const razasDisponibles = caracteristicas.filter(c => c.tipo === 'raza' && c.descripcion.toLowerCase().includes(especie.descripcion.toLowerCase()));

      // Asegurarse de que haya razas disponibles para la especie
      if (razasDisponibles.length > 0) {
        const raza = faker.helpers.arrayElement(razasDisponibles);

        // Crear la relación entre la mascota y sus características
        await Mascotas_Caracteristicas.create({
          id_mascota: mascota.id_mascota,
          id_caracteristica: especie.id_caracteristica, // Especie
        });

        await Mascotas_Caracteristicas.create({
          id_mascota: mascota.id_mascota,
          id_caracteristica: color.id_caracteristica, // Color
        });

        await Mascotas_Caracteristicas.create({
          id_mascota: mascota.id_mascota,
          id_caracteristica: raza.id_caracteristica, // Raza
        });

        console.log(`Características asignadas a la mascota ${mascota.nombre_mascota}: Especie: ${especie.descripcion}, Color: ${color.descripcion}, Raza: ${raza.descripcion}`);
      }
    }

    console.log('Características de mascotas creadas correctamente.');
  } catch (error) {
    console.error('Error creando las características de las mascotas:', error);
  }
};

// Ejecutamos la función
crearMascotasCaracteristicasPrueba();