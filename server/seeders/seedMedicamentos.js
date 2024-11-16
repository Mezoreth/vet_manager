const { faker } = require('@faker-js/faker');
const Medicamentos = require('../models/Medicamentos');  // Asegúrate de que la ruta sea correcta

// node seeders/seedMedicamentos.js
// Crear medicamentos de prueba
const crearMedicamentosPrueba = async () => {
  try {
    // Crear 100 medicamentos con datos generados por Faker
    for (let i = 0; i < 100; i++) {
      // Generar datos aleatorios para el medicamento
      const codigo = faker.string.alphanumeric(10).toUpperCase(); // Código único (ahora utilizando el método correcto)
      const nombreMedicamento = faker.commerce.productName().toUpperCase(); // Nombre del medicamento

      // Tipo: el tipo de medicamento, por ejemplo, tabletas, líquido, inyección, polvo, etc.
      const tipo = faker.helpers.arrayElement(['TABLETAS', 'LÍQUIDO', 'INYECCIÓN', 'POLVO', 'CREMA', 'GEL', 'SUERO', 'SUSPENSIÓN']);

      // Composición: la vía de administración del medicamento (oral, subcutánea, externo, etc.)
      const composicion = faker.helpers.arrayElement(['ORAL', 'SUBCUTÁNEA', 'INTRAVENOSA', 'TÓPICA', 'INTRAMUSCULAR', 'RECTAL']);

      // Presentación: el tipo de empaque o presentación del medicamento (botes, blisters, tubos, ampolletas, etc.)
      const presentacion = faker.helpers.arrayElement(['BOTE', 'BLISTER', 'AMPOLETTA', 'FRASCO', 'CAJA', 'TUBO', 'JERINGA', 'SOBRE']);

      // Generar la fecha de vencimiento entre 1 mes y 2 años a partir de hoy
      const fechaInicio = new Date();
      const fechaFin = new Date(fechaInicio.getFullYear() + 2, fechaInicio.getMonth(), fechaInicio.getDate()); // 2 años desde hoy
      const fechaVencimiento = faker.date.between({
        from: new Date(fechaInicio.setMonth(fechaInicio.getMonth() + 1)),  // 1 mes a partir de hoy
        to: fechaFin, // hasta 2 años
      });

      const precioCompra = faker.number.int({ min: 50, max: 200 }).toFixed(2); // Precio de compra
      const precioVenta = (parseFloat(precioCompra) * 1.5).toFixed(2); // Precio de venta (por ejemplo, un 50% más caro)
      const tipoUnidad = faker.helpers.arrayElement(['CAJA', 'FRASCO', 'BOTELLA', 'LOTE']); // Tipo de unidad
      const cantidad = faker.number.int({ min: 10, max: 100 }); // Cantidad disponible

      // Crear el medicamento en la base de datos
      await Medicamentos.create({
        codigo: codigo,
        nombre_medicamento: nombreMedicamento,
        tipo: tipo,
        composicion: composicion,
        presentacion: presentacion,
        fecha_vencimiento: fechaVencimiento,
        precio_compra: precioCompra,
        precio_venta: precioVenta,
        tipo_unidad: tipoUnidad,
        cantidad: cantidad,
      });

      console.log(`MEDICAMENTO CREADO: ${nombreMedicamento} - CÓDIGO: ${codigo}`);
    }

    console.log('Medicamentos de prueba creados correctamente.');
  } catch (error) {
    console.error('Error creando los medicamentos de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearMedicamentosPrueba;