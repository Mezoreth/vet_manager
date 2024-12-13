const { faker } = require('@faker-js/faker');
const Detalle_Ventas = require('../models/Detalle_Ventas');
const Ventas = require('../models/Ventas');
const Productos = require('../models/Productos');
const Tratamientos = require('../models/Tratamientos');
const Servicios = require('../models/Servicios');
const Medicamentos = require('../models/Medicamentos');

const crearDetalleVentasPrueba = async () => {
  try {
    // Obtener todas las ventas disponibles en la base de datos
    const ventas = await Ventas.findAll();

    // Verificar que haya suficientes ventas
    if (ventas.length < 1) {
      console.log('No hay ventas en la base de datos para asignar detalles');
      return;
    }

    // Crear detalles de venta para cada venta existente
    for (let i = 0; i < ventas.length; i++) {
      const venta = ventas[i]; // Obtiene una venta

      // Selecciona un tipo de ítem aleatorio (ahora con los nuevos tipos)
      const tipoItem = faker.helpers.arrayElement(['CONSULTA', 'TRATAMIENTO', 'VENTA', 'SERVICIO']);

      let idItem;
      let precioUnitario;
      let tipoUnidad;

      // Asignar un ítem dependiendo del tipo
      switch (tipoItem) {
        case 'VENTA':
          const producto = await Productos.findOne(); // Obtener un producto aleatorio
          idItem = producto.id_producto;
          precioUnitario = producto.precio_venta;
          break;
        case 'TRATAMIENTO':
          const tratamiento = await Tratamientos.findOne(); // Obtener un tratamiento aleatorio
          idItem = tratamiento.id_tratamiento;
          precioUnitario = faker.finance.amount(10, 100, 2); // Generar un precio aleatorio para el tratamiento
          break;
        case 'SERVICIO':
          const servicio = await Servicios.findOne(); // Obtener un servicio aleatorio
          idItem = servicio.id_servicio;
          precioUnitario = servicio.precio;
          break;
        case 'CONSULTA':
          // Aquí podemos asignar medicamentos o servicios para consulta, dependiendo de tu lógica de negocio
          const medicamento = await Medicamentos.findOne(); // Obtener un medicamento aleatorio
          if (medicamento) {
            idItem = medicamento.id_medicamento;
            precioUnitario = medicamento.precio_venta;
            tipoUnidad = medicamento.tipo_unidad; // Guardamos el tipo de unidad
          } else {
            continue; // Si no se encuentra el medicamento, pasamos al siguiente ítem
          }
          break;
      }

      // Generar una cantidad aleatoria entre 1 y 5
      const cantidad = faker.number.int({ min: 1, max: 5 });
      // Calcular el subtotal (cantidad * precio unitario)
      const subtotal = cantidad * parseFloat(precioUnitario);

      // Crear 4 detalles de venta para esta venta con el mismo tipo_item
      for (let j = 0; j < 4; j++) {
        await Detalle_Ventas.create({
          id_venta: venta.id_venta,
          tipo_item: tipoItem,
          id_item: idItem,
          cantidad: cantidad,
          precio_unitario: precioUnitario,
          subtotal: subtotal,
        });
        console.log(`Detalle de venta creado para la venta ID: ${venta.id_venta}, Tipo de ítem: ${tipoItem}`);
      }
    }

    console.log('Detalles de ventas creados correctamente.');
  } catch (error) {
    console.error('Error creando los detalles de ventas de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearDetalleVentasPrueba;