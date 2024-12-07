const Clientes = require('./Clientes');
const Mascotas = require('./Mascotas');
const Medicamentos = require('./Medicamentos');
const Servicios = require('./Servicios');
const Tratamientos = require('./Tratamientos');
const Ventas = require('./Ventas');
const Detalle_Ventas = require('./Detalle_Ventas');
const Productos = require('./Productos');
const Usuarios = require('./Usuarios');
const Mascotas_Medicamentos = require('./Mascotas_Medicamentos');
const Mascotas_Caracteristicas = require('./Mascotas_Caracteristicas');
const Mascotas_Servicios = require('./Mascotas_Servicios');
const Clientes_Servicios = require('./Clientes_Servicios');
const Caracteristicas = require('./Caracteristicas');



// CLIENTES
Clientes.hasMany(Mascotas, { foreignKey: 'id_cliente' });

Clientes.hasMany(Ventas, { foreignKey: 'id_cliente' });

Clientes.belongsToMany(Servicios, {
  through: Clientes_Servicios,
  as: 'servicios',
  foreignKey: 'id_cliente',
  onDelete: 'SET NULL',
});

// MASCOTAS
Mascotas.hasMany(Tratamientos, { foreignKey: 'id_mascota' });

Mascotas.belongsToMany(Medicamentos, {
  through: Mascotas_Medicamentos,
  as: 'medicamentos',
  foreignKey: 'id_mascota',
  onDelete: 'SET NULL',
});

Mascotas.belongsTo(Clientes, { 
  foreignKey: 'id_cliente',
  onDelete: 'SET NULL',
});

Mascotas.belongsToMany(Servicios, {
  through: Mascotas_Servicios,
  as: 'servicios',
  foreignKey: 'id_mascota',
  onDelete: 'SET NULL',
});

Mascotas.belongsToMany(Caracteristicas, {
  through: Mascotas_Caracteristicas,
  as: 'caracteristicas',
  foreignKey: 'id_mascota',
  onDelete: 'SET NULL',
});

//Caracteristicas
Caracteristicas.belongsToMany(Mascotas, {
  through: Mascotas_Caracteristicas,
  as: 'mascotas',
  foreignKey: 'id_caracteristica',
  onDelete: 'SET NULL',
});

//MEDICAMENTOS   
Medicamentos.belongsToMany(Mascotas, {
  through: Mascotas_Medicamentos,
  as: 'mascotas',
  foreignKey: 'id_medicamento',
  onDelete: 'SET NULL',
})

//MASCOTAS MEDICAMENTOS

Mascotas_Medicamentos.belongsTo(Mascotas, {
  foreignKey: 'id_mascota',
  onDelete: 'SET NULL',
});

Mascotas_Medicamentos.belongsTo(Medicamentos, {
  foreignKey: 'id_medicamento',
  onDelete: 'SET NULL',
});

// SERVICIOS
Servicios.belongsToMany(Mascotas, {
  through: Mascotas_Servicios,
  as: 'mascotas',
  foreignKey: 'id_servicio',
  onDelete: 'SET NULL',
});

Servicios.belongsToMany(Clientes, {
  through: Clientes_Servicios,
  as: 'clientes',
  foreignKey: 'id_servicios',
  onDelete: 'SET NULL',
});

// TRATAMIENTOS
Tratamientos.belongsTo(Mascotas, { 
  foreignKey: 'id_mascota',
  onDelete: 'SET NULL',
});


// VENTAS
Ventas.belongsTo(Clientes, { 
  foreignKey: 'id_cliente',
  onDelete: 'SET NULL',
});

//MASCOTAS CARACTERISTICAS 
Mascotas_Caracteristicas.belongsTo(Mascotas, {
  foreignKey: 'id_mascota',
  onDelete: 'SET NULL',
});

Mascotas_Caracteristicas.belongsTo(Caracteristicas, {
  foreignKey: 'id_caracteristica',
  onDelete: 'SET NULL',
});

