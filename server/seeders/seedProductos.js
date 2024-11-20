const { faker } = require('@faker-js/faker');
const Productos = require('../models/Productos');  // Asegúrate de que la ruta sea correcta

// node seeders/seedProductos.js
// Crear productos de prueba
const crearProductosPrueba = async () => {
  try {
    // Crear 100 productos con datos generados por Faker
    for (let i = 0; i < 100; i++) {
      // Generar datos aleatorios para el producto
      const codigo = faker.string.alphanumeric(10).toUpperCase(); // Código único
      const nombreProducto = faker.commerce.productName().toUpperCase(); // Nombre del producto

      // Tipo: el tipo de producto, por ejemplo, alimento, herramienta, electrodoméstico, etc.
      const tipo = faker.helpers.arrayElement(['ALIMENTO', 'HERRAMIENTA', 'ELECTRODOMÉSTICO', 'ROPA', 'MUEBLE', 'JUGUETE', 'COSMÉTICO', 'TECNOLOGÍA']);

      // Descripción: una breve descripción del producto
      const descripcion = faker.commerce.productDescription();

      // Fecha de vencimiento: generamos una fecha entre 1 mes y 2 años a partir de hoy (por ejemplo, para productos perecederos)
      const fechaInicio = new Date();
      const fechaFin = new Date(fechaInicio.getFullYear() + 2, fechaInicio.getMonth(), fechaInicio.getDate()); // 2 años desde hoy
      const fechaVencimiento = faker.date.between({
        from: new Date(fechaInicio.setMonth(fechaInicio.getMonth() + 1)),  // 1 mes a partir de hoy
        to: fechaFin, // hasta 2 años
      });

      // Precios: generamos precios de compra y venta
      const precioCompra = faker.number.int({ min: 50, max: 500 }).toFixed(2); // Precio de compra
      const precioVenta = (parseFloat(precioCompra) * 1.5).toFixed(2); // Precio de venta (por ejemplo, un 50% más caro)

      // Cantidad: la cantidad disponible del producto en inventario
      const cantidad = faker.number.int({ min: 10, max: 100 });

      // Crear el producto en la base de datos
      await Productos.create({
        codigo: codigo,
        nombre_producto: nombreProducto,
        tipo: tipo,
        descripcion: descripcion,
        fecha_vencimiento: fechaVencimiento,
        precio_compra: precioCompra,
        precio_venta: precioVenta,
        cantidad: cantidad,
      });

      console.log(`PRODUCTO CREADO: ${nombreProducto} - CÓDIGO: ${codigo}`);
    }

    console.log('Productos de prueba creados correctamente.');
  } catch (error) {
    console.error('Error creando los productos de prueba:', error);
  }
};

// Ejecutamos la función
crearProductosPrueba();