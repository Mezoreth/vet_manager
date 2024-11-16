const { faker } = require('@faker-js/faker');  // Usamos faker para generar datos aleatorios
const Mascotas = require('../models/Mascotas');  // Modelo Mascotas
const Medicamentos = require('../models/Medicamentos');  // Modelo Medicamentos
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos');  // Modelo Mascotas_Medicamentos

// Tipos permitidos para los medicamentos
const tiposMedicamentos = ['VACUNA', 'DESPARASITANTE', 'SUPRESOR'];

// Crear medicamentos de prueba
const crearMascotasMedicamentos = async () => {
  try {
    // Obtener todas las mascotas y medicamentos disponibles en la base de datos
    const mascotas = await Mascotas.findAll();
    const medicamentos = await Medicamentos.findAll();

    // Verificar que haya suficientes mascotas y medicamentos
    if (mascotas.length < 1 || medicamentos.length < 1) {
      console.log('No hay suficientes mascotas o medicamentos en la base de datos.');
      return;
    }

    // Crear 100 relaciones entre mascotas y medicamentos
    for (let i = 0; i < 100; i++) {
      // Seleccionar una mascota y un medicamento aleatorio
      const mascota = faker.helpers.arrayElement(mascotas);
      const medicamento = faker.helpers.arrayElement(medicamentos);

      // Generar un tipo aleatorio de los tres tipos predefinidos
      const tipo = faker.helpers.arrayElement(tiposMedicamentos);

      // Generar cantidad aleatoria (por ejemplo, entre 1 y 10)
      const cantidad = faker.number.int({ min: 1, max: 10 });

      // Generar fecha de dosis (por ejemplo, hoy o en el futuro cercano)
      const fechaDosis = faker.date.future(0.1); // 0.1 años, es decir, unos pocos días

      // Crear la relación en la tabla Mascotas_Medicamentos
      await Mascotas_Medicamentos.create({
        id_mascota: mascota.id_mascota,
        id_medicamento: medicamento.id_medicamento,
        tipo: tipo,
        cantidad: cantidad,
        fecha_dosis: fechaDosis.toISOString().split('T')[0],  // Solo la parte de la fecha
      });

      console.log(`Medicamento asignado a la mascota: ${mascota.nombre_mascota} - Medicamento: ${medicamento.nombre_medicamento}`);
    }

    console.log('Relaciones entre mascotas y medicamentos creadas correctamente.');
  } catch (error) {
    console.error('Error creando relaciones entre mascotas y medicamentos:', error);
  }
};

// Ejecutar el seeder
module.exports = crearMascotasMedicamentos;