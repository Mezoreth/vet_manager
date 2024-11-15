const { faker } = require('@faker-js/faker');  // Usamos faker para generar datos aleatorios
const Mascotas = require('../models/Mascotas');  // Modelo Mascotas
const Caracteristicas = require('../models/Caracteristicas');  // Modelo Caracteristicas
const Mascotas_Caracteristicas = require('../models/Mascotas_Caracteristicas');  // Modelo Mascotas_Caracteristicas

// Especies y razas (ya definidas)
const especies = [
  'PERRO', 'GATO', 'CONEJO', 'HAMSTER', 'LORO', 'PEZ', 'TORTUGA', 'IGUANA', 'CANARIO', 'GUINEA PIG'
];

const razasPorEspecie = {
  PERRO: ['GOLDEN RETRIEVER', 'LABRADOR', 'BULLDOG', 'PITBULL', 'BEAGLE'],
  GATO: ['PERSA', 'SIAMÉS', 'BENGALÍ', 'MAINE COON', 'ABISINIO'],
  CONEJO: ['HIMALAYO', 'ANGORA', 'ENANO', 'CALIFORNIANO', 'HOLANDÉS'],
  HAMSTER: ['SIRIO', 'ROBOROVSKI', 'DJUNGARIAN'],
  LORO: ['COTORRA ARGENTINA', 'GUACAMAYO', 'AMAZONAS', 'CACATÚA'],
  PEZ: ['BETTA', 'GUPPY', 'GOLDFISH', 'NEÓN', 'TILAPIA'],
  TORTUGA: ['TORTUGA DE TIERRA', 'TORTUGA MARINA', 'TORTUGA DE AGUA DULCE'],
  IGUANA: ['VERDE', 'ROJA', 'NEGRA', 'MEXICANA', 'CUBANA'],
  CANARIO: ['AMARILLO', 'BLANCO', 'ROJO', 'VERDE', 'NEGRO'],
  GUINEA_PIG: ['PERUANO', 'ABISINIO', 'TEXEL', 'CORONET', 'CRESTADO']
};

const colores = [
  'AZUL', 'ROJO', 'VERDE', 'NEGRO', 'BLANCO', 'AMARILLO', 'MORADO', 'NARANJA', 'GRIS', 'MARRÓN', 
  'PINK', 'CREMA', 'DORADO', 'PLATEADO', 'VIOLETA', 'ROSA', 'INDIGO', 'AZUL MARINO', 'LIMA', 'TURQUESA',
  'BEIGE', 'AMBAR', 'CIAN', 'FUCHSIA', 'OLIVA', 'CARAMEL', 'MOSTAZA', 'LILA', 'MINT', 'CIELO', 
  'AZUL CLARO', 'TOMATE', 'JÁSPER', 'PESCA', 'SÁNDALO', 'CORAL', 'BERMELLÓN', 'COBRE', 'CIELO AZUL', 
  'PAPAYA', 'MELON', 'TURQUESA OSCURO', 'PLOMO', 'TAN', 'ARÁNDANO', 'LAVANDA', 'ALMENDRA', 'PERLA',
  'LIMA VERDE', 'PEACH', 'TÉ', 'CAFE', 'AMARILLO SUAVE', 'VERDE MENTA', 'AMARILLO DULCE', 'LIMÓN', 
  'CHOCOLATE', 'CUERO', 'CARAMELIZADO', 'CÍTRICO', 'COCO', 'MANDARINA', 'VINO', 'MAÍZ', 'CORCHO', 
  'CHAMPÁN', 'HIERBA', 'VERDE OLMO', 'BOLSA', 'ALHELÍ', 'CAOLÍN', 'CELESTE', 'VINO TINTO', 'FRAMBUESA',
  'FRESA', 'ALBA', 'BLOOM', 'ARÁNDANO AZUL', 'CAFÉ CON LECHE', 'NUBE', 'LAURISILVA', 'PEZ KHALI', 
  'KERMES', 'VANILLA', 'ROJIZA', 'TIZA', 'NÍVEA', 'TERRA', 'CALIZA', 'MOGNO', 'VUELTA AL MUNDO', 'PANTONE'
];

const crearMascotasCaracteristicas = async () => {
  try {
    // Obtener todas las mascotas de la base de datos
    const mascotas = await Mascotas.findAll();

    const mascotasCaracteristicas = [];

    for (const mascota of mascotas) {
      // Asignar especie aleatoria
      const especie = faker.helpers.arrayElement(especies);

      // Asignar raza según la especie (si es necesario)
      let raza = null;
      if (razasPorEspecie[especie]) {
        raza = faker.helpers.arrayElement(razasPorEspecie[especie]);
      }

      // Asignar color aleatorio
      const color = faker.helpers.arrayElement(colores);

      // Crear características para la mascota
      mascotasCaracteristicas.push({
        id_mascota: mascota.id_mascota,
        id_caracteristica: (await Caracteristicas.findOne({ where: { descripcion: especie, tipo: 'ESPECIE' } })).id_caracteristica,
      });

      if (raza) {
        mascotasCaracteristicas.push({
          id_mascota: mascota.id_mascota,
          id_caracteristica: (await Caracteristicas.findOne({ where: { descripcion: raza, tipo: 'RAZA' } })).id_caracteristica,
        });
      }

      mascotasCaracteristicas.push({
        id_mascota: mascota.id_mascota,
        id_caracteristica: (await Caracteristicas.findOne({ where: { descripcion: color, tipo: 'COLOR' } })).id_caracteristica,
      });
    }

    // Insertar todas las características en la tabla de relación
    await Mascotas_Caracteristicas.bulkCreate(mascotasCaracteristicas);

    console.log(`Datos de características para mascotas creados correctamente. Se insertaron ${mascotasCaracteristicas.length} registros.`);
  } catch (error) {
    console.error('Error creando datos de prueba para MascotasCaracteristicas:', error);
  }
};

// Ejecutar el seeder
module.exports = crearMascotasCaracteristicas;