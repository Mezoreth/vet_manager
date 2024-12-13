const { faker } = require('@faker-js/faker');
const Medicamentos_Tratamientos = require('../models/Medicamentos_Tratamientos');
const Medicamentos = require('../models/Medicamentos');
const Tratamientos = require('../models/Tratamientos');

const crearMedicamentosTratamientosPrueba = async () => {
  try {
    // Obtener todos los medicamentos y tratamientos disponibles en la base de datos
    const medicamentos = await Medicamentos.findAll();
    const tratamientos = await Tratamientos.findAll();

    // Verificar que haya suficientes medicamentos y tratamientos
    if (medicamentos.length < 1) {
      console.log('No hay medicamentos en la base de datos para asignar a tratamientos');
      return;
    }
    if (tratamientos.length < 1) {
      console.log('No hay tratamientos en la base de datos para asignar medicamentos');
      return;
    }

    // Usamos un conjunto para almacenar combinaciones únicas de id_medicamento y id_tratamiento
    const relacionesCreadas = new Set();

    // Crear relaciones entre medicamentos y tratamientos
    const cantidadRelaciones = 100; // Puedes ajustar esta cantidad
    for (let i = 0; i < cantidadRelaciones; i++) {
      let idMedicamento;
      let idTratamiento;

      // Evitar combinaciones duplicadas
      do {
        idMedicamento = faker.helpers.arrayElement(medicamentos).id_medicamento; // Selecciona un medicamento aleatorio
        idTratamiento = faker.helpers.arrayElement(tratamientos).id_tratamiento; // Selecciona un tratamiento aleatorio
      } while (relacionesCreadas.has(`${idMedicamento}-${idTratamiento}`)); // Si ya existe la combinación, volvemos a intentar

      // Almacenamos la relación para evitar duplicados
      relacionesCreadas.add(`${idMedicamento}-${idTratamiento}`);

      // Generamos valores aleatorios para las nuevas columnas
      const dosis = faker.number.int({ min: 1, max: 5 }); // Dosis aleatoria
      const via = faker.helpers.arrayElement(['ORAL', 'INYECCIÓN', 'TOPICAL', 'INTRAVENOSA']); // Vía de administración
      const costo = faker.commerce.price({ min: 10, max: 100 }); // Costo del tratamiento
      const fecha = faker.date.past(1); // Fecha en la que se asignó el medicamento al tratamiento

      // Crear la relación entre el medicamento y el tratamiento
      await Medicamentos_Tratamientos.create({
        id_medicamento: idMedicamento,
        id_tratamiento: idTratamiento,
        dosis,
        via,
        costo: parseFloat(costo), // Convertir el precio a un valor decimal
        fecha, // Asignamos la fecha generada
      });

      console.log(`Relación creada entre el medicamento ID: ${idMedicamento} y el tratamiento ID: ${idTratamiento}`);
    }

    console.log('Relaciones de medicamentos y tratamientos creadas correctamente.');
  } catch (error) {
    console.error('Error creando las relaciones de medicamentos y tratamientos de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearMedicamentosTratamientosPrueba;