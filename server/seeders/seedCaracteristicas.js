const { faker } = require('@faker-js/faker');  // Importar Faker
const Caracteristicas = require('../models/Caracteristicas');  // Asegúrate de que la ruta sea correcta

// node seeders/seedCaracteristicas.js

const crearCaracteristicasPrueba = async () => {
  try {
    // Crear características de prueba con datos aleatorios usando Faker
    const caracteristicas = [];

    // Listas de colores, especies y razas por especie
    const colores = ['azul', 'rojo', 'verde', 'negro', 'blanco', 'amarillo', 'morado'];
    const especies = ['perro', 'gato', 'conejo', 'hamster', 'loro', 'pez', 'tortuga'];

    // Razas por especie
    const razasPorEspecie = {
      perro: ['golden retriever', 'labrador', 'bulldog', 'pitbull', 'beagle'],
      gato: ['persa', 'siamés', 'bengalí', 'maine coon', 'abisinio'],
      conejo: ['himalayo', 'angora', 'enano', 'californiano', 'holandés'],
      hamster: ['sirio', 'roborovski', 'djungarian'],
      loro: ['cotorra argentina', 'guacamayo', 'amazonas', 'cacatúa'],
      pez: ['betta', 'guppy', 'goldfish', 'neón', 'tilapia'],
      tortuga: ['tortuga de tierra', 'tortuga marina', 'tortuga de agua dulce']
    };

    // Crear 97 características aleatorias
    for (let i = 0; i < 100; i++) {
      // Seleccionar aleatoriamente un tipo de característica
      const tipo = faker.helpers.arrayElement(['color', 'especie', 'raza']);
      
      let descripcion;
      // Asignar una descripción acorde al tipo seleccionado
      if (tipo === 'color') {
        descripcion = faker.helpers.arrayElement(colores);  // Selecciona un color aleatorio
      } else if (tipo === 'especie') {
        descripcion = faker.helpers.arrayElement(especies);  // Selecciona una especie aleatoria
      } else if (tipo === 'raza') {
        // Seleccionamos aleatoriamente una especie
        const especie = faker.helpers.arrayElement(especies);
        // Seleccionamos una raza acorde a la especie
        descripcion = faker.helpers.arrayElement(razasPorEspecie[especie] || []);
      }

      // Asegurarse de que la descripción no supere los 255 caracteres
      descripcion = descripcion.length > 255 ? descripcion.substring(0, 255) : descripcion;

      caracteristicas.push({
        tipo: tipo,
        descripcion: descripcion
      });
    }

    // Insertar todas las características aleatorias en paralelo
    await Caracteristicas.bulkCreate(caracteristicas);

    console.log('Datos de prueba creados correctamente');
  } catch (error) {
    console.error('Error creando datos de prueba:', error);
  }
};

// Ejecutamos la función
crearCaracteristicasPrueba();