const { faker } = require('@faker-js/faker');
const Tratamientos = require('../models/Tratamientos');
const Mascotas = require('../models/Mascotas');

// node seeders/seedTratamientos.js
// Crear tratamientos de prueba
const crearTratamientosPrueba = async () => {
  try {
    // Obtener todas las mascotas disponibles en la base de datos
    const mascotas = await Mascotas.findAll();

    // Verificar que haya suficientes mascotas
    if (mascotas.length < 1) {
      console.log('No hay mascotas en la base de datos para asignar tratamientos');
      return;
    }

    // Crear 50 tratamientos de prueba con datos reales utilizando Faker
    for (let i = 0; i < 100; i++) {
      const mascota = faker.helpers.arrayElement(mascotas); // Selecciona una mascota aleatoria

      // Generar datos reales para el tratamiento
      const comer = Math.random() < 0.7 ? faker.lorem.sentence().toUpperCase() : null; // Comer: 70% texto, 30% null
      const vomitos = Math.random() < 0.7 ? faker.lorem.sentence().toUpperCase() : null; // Vómitos: 70% texto, 30% null
      const diarrea = Math.random() < 0.7 ? faker.lorem.sentence().toUpperCase() : null; // Diarrea: 70% texto, 30% null

      // Solo generar fechas si vomitos o diarrea tienen valores
      const fechaVomitos = vomitos ? faker.date.past(1) : null; // Fecha de vómitos, si existe el valor
      const fechaDiarrea = diarrea ? faker.date.past(1) : null; // Fecha de diarrea, si existe el valor
      const fechaTratamiento = faker.date.past(1);
      const otrosSintomas = faker.lorem.sentence().toUpperCase(); // Otros síntomas
      const diagnostico = faker.lorem.sentence().toUpperCase(); // Diagnóstico
      const dDiferencial = faker.lorem.sentence().toUpperCase(); // Diagnóstico diferencial
      const visual = faker.lorem.sentence().toUpperCase(); // Examen visual
      const ganglios = faker.lorem.sentence().toUpperCase(); // Ganglios
      const temperatura = `${faker.number.int({ min: 36, max: 42 })}°C`; // Temperatura
      const mucosas = faker.lorem.sentence().toUpperCase(); // Descripción de mucosas
      const pielAnexos = faker.lorem.sentence().toUpperCase(); // Descripción de piel y anexos
      const fCardiaca = faker.lorem.sentence().toUpperCase(); // Frecuencia cardiaca
      const fonendo = faker.lorem.sentence().toUpperCase(); // Examen con fonendoscopio
      const palAbd = faker.lorem.sentence().toUpperCase(); // Palpación abdominal
      const fRespiratoria = faker.lorem.sentence().toUpperCase(); // Frecuencia respiratoria
      const peso = `${faker.number.int({ min: 1, max: 10 })} KG`; // Peso

      // Crear el tratamiento con los datos generados
      await Tratamientos.create({
        fecha_tratamiento: fechaTratamiento,
        comer,
        vomitos,
        diarrea,
        fecha_vomitos: fechaVomitos,
        fecha_diarrea: fechaDiarrea,
        otros_sintomas: otrosSintomas,
        daignostico: diagnostico,
        d_diferencial: dDiferencial,
        visual,
        ganglios,
        temperatura,
        mucosas,
        piel_anexos: pielAnexos,
        f_cardiaca: fCardiaca,
        fonendo,
        pal_abd: palAbd,
        f_respiratoria: fRespiratoria,
        peso,
        id_mascota: mascota.id_mascota, // Asociamos el tratamiento con una mascota
      });

      console.log(`Tratamiento creado para la mascota: ${mascota.nombre_mascota}`);
    }

    console.log('Tratamientos de prueba creados correctamente.');
  } catch (error) {
    console.error('Error creando los tratamientos de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearTratamientosPrueba;