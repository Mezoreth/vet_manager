const { faker } = require('@faker-js/faker');
const Clientes_Servicios = require('../models/Clientes_Servicios');
const Clientes = require('../models/Clientes');
const Servicios = require('../models/Servicios');

// Crear clientes_servicios de prueba
const crearClientesServiciosPrueba = async () => {
  try {
    // Obtener todos los clientes y servicios disponibles en la base de datos
    const clientes = await Clientes.findAll();
    const servicios = await Servicios.findAll();

    // Verificar que haya suficientes clientes y servicios
    if (clientes.length < 1) {
      console.log('No hay clientes en la base de datos para asignar servicios');
      return;
    }

    if (servicios.length < 1) {
      console.log('No hay servicios disponibles en la base de datos');
      return;
    }

    // Usamos un conjunto para almacenar combinaciones únicas de id_cliente y id_servicio
    const combinacionesCreadas = new Set();

    // Crear 100 registros de clientes_servicios de prueba
    for (let i = 0; i < 100; i++) {
      let idCliente;
      let idServicio;

      // Evitar combinaciones duplicadas
      do {
        idCliente = faker.helpers.arrayElement(clientes).id_cliente; // Selecciona un cliente aleatorio
        idServicio = faker.helpers.arrayElement(servicios).id_servicio; // Selecciona un servicio aleatorio
      } while (combinacionesCreadas.has(`${idCliente}-${idServicio}`)); // Si ya existe la combinación, volvemos a intentar

      // Almacenamos la combinación para evitar duplicados
      combinacionesCreadas.add(`${idCliente}-${idServicio}`);

      // Crear el cliente_servicio
      await Clientes_Servicios.create({
        id_cliente: idCliente, // ID del cliente
        id_servicio: idServicio, // ID del servicio
      });

      console.log(`Cliente ID: ${idCliente} asignado al servicio ID: ${idServicio}`);
    }

    console.log('Clientes_Servicios de prueba creados correctamente.');
  } catch (error) {
    console.error('Error creando los registros de Clientes_Servicios de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearClientesServiciosPrueba;