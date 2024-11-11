const Clientes = require('./Clientes');
const Mascotas = require('./Mascotas');
const Colores = require('./Colores');
const Razas = require('./Razas');
const Especies = require('./Especies');
const Medicamentos = require('./Medicamentos');
const Servicios = require('./Servicios');
const Tratamientos = require('./Tratamientos');
const Consultas = require('./Consultas');
const Ventas = require('./Ventas');
const Detalle_Ventas = require('./Detalle_Ventas');
const ProductosPetshop = require('./ProductosPetshop');
const Usuarios = require('./Usuarios');

// CLIENTES
Clientes.hasMany(Mascotas, { foreignKey: 'id_cliente' });
Clientes.hasMany(Ventas, { foreignKey: 'id_cliente' });

// MASCOTAS
Mascotas.hasMany(Tratamientos, { foreignKey: 'id_mascota' });
Mascotas.hasMany(Consultas, { foreignKey: 'id_mascota' });

Mascotas.belongsTo(Clientes, { 
  foreignKey: 'id_cliente',
  onDelete: 'SET NULL',
});

Mascotas.belongsTo(Razas, { 
  foreignKey: 'id_raza',
  onDelete: 'SET NULL',
});

Mascotas.belongsTo(Especies, { 
  foreignKey: 'id_especie',
  onDelete: 'SET NULL',
});

Mascotas.belongsTo(Colores, { 
  foreignKey: 'id_color',
  onDelete: 'SET NULL',
});

Mascotas.belongsTo(Servicios, { 
  foreignKey: 'id_servicio',
  onDelete: 'SET NULL',
});

// SERVICIOS
Servicios.hasMany(Mascotas, { foreignKey: 'id_servicio' });

// ESPECIES
Especies.hasMany(Mascotas, { foreignKey: 'id_especie' });

// COLORES
Colores.hasMany(Mascotas, { foreignKey: 'id_color' });

// RAZAS
Razas.hasMany(Mascotas, { foreignKey: 'id_raza' });

// CONSULTAS
Consultas.belongsTo(Usuarios, { 
  foreignKey: 'id_usuario',
  onDelete: 'SET NULL',
});

Consultas.belongsTo(Mascotas, { 
  foreignKey: 'id_mascota',
  onDelete: 'SET NULL',
});

Consultas.belongsTo(Ventas, { 
  foreignKey: 'id_venta',
  onDelete: 'SET NULL',
});

// TRATAMIENTOS
Tratamientos.belongsTo(Mascotas, { 
  foreignKey: 'id_mascota',
  onDelete: 'SET NULL',
});

Tratamientos.belongsTo(Consultas, { 
  foreignKey: 'id_consulta',
  onDelete: 'SET NULL',
});

// VENTAS
Ventas.belongsTo(Clientes, { 
  foreignKey: 'id_cliente',
  onDelete: 'SET NULL',
});

// USUARIOS
Usuarios.hasMany(Consultas, { foreignKey: 'id_usuario' });