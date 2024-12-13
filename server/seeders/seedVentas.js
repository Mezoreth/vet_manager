const { faker } = require('@faker-js/faker');
const Ventas = require('../models/Ventas');
const Clientes = require('../models/Clientes');

// Crear ventas de prueba
const crearVentasPrueba = async () => {
  try {
    // Obtener todos los clientes disponibles en la base de datos
    const clientes = await Clientes.findAll();

    // Verificar que haya suficientes clientes
    if (clientes.length < 1) {
      console.log('No hay clientes en la base de datos para asignar ventas');
      return;
    }

    // Crear 100 ventas de prueba con datos generados por Faker
    for (let i = 0; i < 100; i++) {
      const cliente = faker.helpers.arrayElement(clientes); // Selecciona un cliente aleatorio

      // Generar datos reales para la venta
      const totalVenta = faker.finance.amount(50, 500, 2); // Total de la venta, entre 50 y 500
      const fechaVenta = faker.date.past(1); // Fecha de la venta (hace 1 año o menos)
      
      // Alternar entre observación nula o una generada
      const observaciones = faker.datatype.boolean() ? faker.lorem.sentence().toUpperCase() : null; // Genera texto en mayúsculas o null

      // Generar un estado aleatorio para la venta (pendiente, completado, cancelado)
      const estado = faker.helpers.arrayElement(['PENDIENTE', 'COMPLETADO', 'CANCELADO']); 

      // Generar un tipo de pago aleatorio (Efectivo, Tarjeta, Transferencia)
      const tipoPago = faker.helpers.arrayElement(['EFECTIVO', 'TARJETA', 'TRANSFERENCIA', 'CHEQUE', 'OTRO']);

      // Crear la venta con los datos generados
      await Ventas.create({
        fecha_venta: fechaVenta,
        total_venta: totalVenta,
        observaciones: observaciones,
        id_cliente: cliente.id_cliente, // Asignamos un cliente aleatorio
        estado: estado, // Estado aleatorio (pendiente, completado, cancelado)
        tipo_pago: tipoPago, // Tipo de pago aleatorio (Efectivo, Tarjeta, Transferencia, etc.)
      });

      console.log(`Venta creada para el cliente: ${cliente.nombre_cliente}`);
    }

    console.log('Ventas de prueba creadas correctamente.');
  } catch (error) {
    console.error('Error creando las ventas de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearVentasPrueba;