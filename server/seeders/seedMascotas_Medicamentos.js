const { faker } = require('@faker-js/faker');  // Usamos faker para generar datos aleatorios
const Mascotas = require('../models/Mascotas');  // Modelo Mascotas
const Medicamentos = require('../models/Medicamentos');  // Modelo Medicamentos
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos');  // Modelo Mascotas_Medicamentos

// Tipos permitidos para los medicamentos
const tiposMedicamentos = ['VACUNA', 'DESPARASITANTE', 'SUPRESOR'];
const estados = ['PENDIENTE', 'CANCELADO', 'FINALIZADO'];  // Nuevos estados para la relación

// Tipos de pago permitidos
const tiposPago = ['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'CHEQUE', 'OTRO']; // Puedes personalizar los tipos de pago

// Crear relaciones entre mascotas y medicamentos de prueba
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

    // Conjunto para asegurar combinaciones únicas entre mascota y medicamento
    const combinacionesCreadas = new Set();

    // Crear 100 relaciones entre mascotas y medicamentos
    for (let i = 0; i < 100; i++) {
      // Seleccionar una mascota y un medicamento aleatorio
      const mascota = faker.helpers.arrayElement(mascotas);
      const medicamento = faker.helpers.arrayElement(medicamentos);

      // Verificar si esta combinación de mascota y medicamento ya fue asignada
      const combinacionId = `${mascota.id_mascota}-${medicamento.id_medicamento}`;
      if (combinacionesCreadas.has(combinacionId)) {
        // Si la combinación ya existe, saltar al siguiente ciclo
        continue;
      }

      // Añadir la combinación al conjunto de combinaciones ya creadas
      combinacionesCreadas.add(combinacionId);

      // Generar un tipo aleatorio de los tres tipos predefinidos
      const tipo = faker.helpers.arrayElement(tiposMedicamentos);

      // Generar cantidad aleatoria (por ejemplo, entre 1 y 10)
      const cantidad = faker.number.int({ min: 1, max: 10 });

      // Generar precio aleatorio (por ejemplo, entre 5 y 100)
      const precio = faker.commerce.price(5, 100, 2);

      // Generar fecha de dosis (por ejemplo, hoy o en el futuro cercano)
      const fechaDosis = faker.date.future(0.1); // 0.1 años, es decir, unos pocos días

      // Generar fecha de refuerzo (puede ser entre 1 y 6 meses después de la fecha de dosis)
      const fechaRefuerzo = faker.date.soon(180, { refDate: fechaDosis }); // 180 días (6 meses)

      // Generar estado aleatorio
      const estado = faker.helpers.arrayElement(estados);

      // Generar un tipo de pago aleatorio
      const tipoPago = faker.helpers.arrayElement(tiposPago);

      // Crear la relación en la tabla Mascotas_Medicamentos
      await Mascotas_Medicamentos.create({
        id_mascota: mascota.id_mascota,           // ID de la mascota
        id_medicamento: medicamento.id_medicamento, // ID del medicamento
        tipo: tipo,                               // Tipo de medicamento (VACUNA, DESPARASITANTE, SUPRESOR)
        cantidad: cantidad,                       // Cantidad de dosis
        precio: precio,                           // Precio del medicamento
        fecha_dosis: fechaDosis.toISOString().split('T')[0],  // Solo la parte de la fecha
        fecha_refuerzo: fechaRefuerzo.toISOString().split('T')[0], // Fecha de refuerzo
        estado: estado,                           // Estado de la relación (PENDIENTE, CANCELADO, FINALIZADO)
        tipo_pago: tipoPago,                      // Tipo de pago aleatorio (Efectivo, Tarjeta, Transferencia, etc.)
      });

      console.log(`Medicamento asignado a la mascota: ${mascota.nombre_mascota} - Medicamento: ${medicamento.nombre_medicamento} - Tipo de pago: ${tipoPago}`);
    }

    console.log('Relaciones entre mascotas y medicamentos creadas correctamente.');
  } catch (error) {
    console.error('Error creando relaciones entre mascotas y medicamentos:', error);
  }
};

// Ejecutar el seeder
module.exports = crearMascotasMedicamentos;