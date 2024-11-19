const { faker } = require('@faker-js/faker');
const Refuerzos = require('../models/Refuerzos');
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos'); // Asegúrate de importar Mascotas_Medicamentos

// node seeders/seedRefuerzos.js
const crearRefuerzosPrueba = async () => {
  try {
    // Obtener todos los registros de Mascotas_Medicamentos
    const mascotasMedicamentos = await Mascotas_Medicamentos.findAll();

    // Verificar que haya suficientes registros de Mascotas_Medicamentos
    if (mascotasMedicamentos.length < 1) {
      console.log('No hay registros de Mascotas_Medicamentos para asignar refuerzos');
      return;
    }

    // Crear 50 refuerzos de prueba con datos reales utilizando Faker
    for (let i = 0; i < 100; i++) {
      const mascotaMedicamento = faker.helpers.arrayElement(mascotasMedicamentos); // Selecciona un registro aleatorio

      // Generar datos para el refuerzo
      const fechaRefuerzo = faker.date.past(1); // Fecha de refuerzo en el pasado, por ejemplo, en el último año

      // Crear el refuerzo con los datos generados
      await Refuerzos.create({
        fecha_refuerzo: fechaRefuerzo, // Fecha generada con Faker
        id_mascotaMedicamento: mascotaMedicamento.id_mascotaMedicamento, // Relacionar con un registro de Mascotas_Medicamentos
      });

      console.log(`Refuerzo creado para el medicamento con id_mascotaMedicamento: ${mascotaMedicamento.id_mascotaMedicamento}`);
    }

    console.log('Refuerzos de prueba creados correctamente.');
  } catch (error) {
    console.error('Error creando los refuerzos de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearRefuerzosPrueba;