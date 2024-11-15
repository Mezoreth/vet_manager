const { faker } = require('@faker-js/faker');
const Mascotas = require('../models/Mascotas');
const Clientes = require('../models/Clientes'); // Asegúrate de tener los modelos correctos importados

//node seeders/seedMascotas.js
// Crear mascotas de prueba
const crearMascotasPrueba = async () => {
  try {
    // Obtener todos los clientes disponibles en la base de datos
    const clientes = await Clientes.findAll();

    // Verificar que haya suficientes clientes
    if (clientes.length < 1) {
      console.log('No hay clientes en la base de datos para asignar a las mascotas');
      return;
    }

    // Crear 50 mascotas con datos reales utilizando Faker
    for (let i = 0; i < 100; i++) {
      const cliente = faker.helpers.arrayElement(clientes); // Selecciona un cliente aleatorio

      // Generar datos reales para la mascota
      const nombreMascota = faker.animal.petName(); // Nombre de la mascota
      const sexo = faker.helpers.arrayElement(['Macho', 'Hembra']); // Sexo de la mascota
      const fechaNacimiento = faker.date.past(5, new Date()); // Fecha de nacimiento (hace 5 años o menos)
      const castrado = faker.datatype.boolean(); // Castrado o no
      const reproductor = !castrado && faker.datatype.boolean(); // Si no está castrado, puede ser reproductor

      // Si la mascota está castrada, asignar una fecha de castramiento
      const fechaCastramiento = castrado ? faker.date.past(3, fechaNacimiento) : null;

      // Fallecimiento alterna entre true y false
      const fallecimiento = faker.datatype.boolean();

      // Observaciones: 70% de probabilidades de tener observaciones reales, 30% null
      const observaciones = Math.random() < 0.7 ? faker.lorem.sentence() : null;

      // Crear la mascota
      await Mascotas.create({
        nombre_mascota: nombreMascota,
        sexo: sexo,
        fecha_nacimiento: fechaNacimiento,
        castrado: castrado,
        reproductor: reproductor,
        fecha_castramiento: fechaCastramiento,
        fallecimiento: fallecimiento,
        observaciones: observaciones,
        id_cliente: cliente.id_cliente, // Asocia la mascota con el cliente
      });

      console.log(`Mascota creada: ${nombreMascota} (Cliente: ${cliente.nombre_cliente})`);
    }

    console.log('Mascotas de prueba creadas correctamente.');
  } catch (error) {
    console.error('Error creando las mascotas de prueba:', error);
  }
};

// Ejecutamos la función
crearMascotasPrueba();