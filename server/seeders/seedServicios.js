const { faker } = require('@faker-js/faker');
const Servicios = require('../models/Servicios');
const Clientes = require('../models/Clientes');

// node seeders/seedServicios.js
// Crear servicios de prueba
const crearServiciosPrueba = async () => {
  try {
    // Obtener todos los clientes disponibles en la base de datos
    const clientes = await Clientes.findAll();

    // Verificar que haya suficientes clientes
    if (clientes.length < 1) {
      console.log('No hay clientes en la base de datos para asignar los servicios');
      return;
    }

    // Crear 100 servicios de prueba con datos reales utilizando Faker
    for (let i = 0; i < 100; i++) {
      const cliente = faker.helpers.arrayElement(clientes); // Selecciona un cliente aleatorio

      // Generar datos reales para el servicio
      const corte = faker.datatype.boolean(); // Servicio de corte
      const bano = faker.datatype.boolean(); // Servicio de baño
      const estetica = faker.datatype.boolean(); // Servicio de estética
      const cepillado = faker.datatype.boolean(); // Servicio de cepillado
      const limp_oidos = faker.datatype.boolean(); // Servicio de limpieza de oídos
      const precio = faker.finance.amount(10, 100, 2); // Precio del servicio con 2 decimales
      const observaciones = faker.datatype.boolean() ? faker.lorem.sentence().toUpperCase() : null; // Observaciones opcionales
      
      // Corregimos el uso de faker.date.between() con el objeto { from, to }
      const fechaServicio = faker.date.between({ from: '2024-01-01', to: '2024-12-31' }); // Fecha del servicio

      // Generar un estado aleatorio para el servicio
      const estado = faker.helpers.arrayElement(['PENDIENTE', 'COMPLETADO', 'CANCELADO']);

      // Generar un tipo de pago aleatorio
      const tipo_pago = faker.helpers.arrayElement(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA']); // Tipos de pago

      // Crear el servicio con los datos generados
      await Servicios.create({
        corte,
        bano,
        estetica,
        cepillado,
        limp_oidos,
        precio,
        observaciones,
        fecha_servicio: fechaServicio,
        estado,  // Añadimos el estado
        tipo_pago, // Añadimos el tipo de pago
      });

      console.log(`Servicio creado para el cliente: ${cliente.nombre_cliente}`);
    }

    console.log('Servicios de prueba creados correctamente.');
  } catch (error) {
    console.error('Error creando los servicios de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearServiciosPrueba;