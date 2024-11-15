const { faker } = require('@faker-js/faker');  // Usamos faker para generar datos aleatorios
const Caracteristicas = require('../models/Caracteristicas');  // Modelo Caracteristicas

// Definir las especies comunes como mascotas
const especies = [
  'PERRO', 'GATO', 'CONEJO', 'HAMSTER', 'LORO', 'PEZ', 'TORTUGA', 'IGUANA', 'CANARIO', 'GUINEA PIG'
];

// Razas por especie
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

// 100 colores aleatorios
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

const crearCaracteristicasPrueba = async () => {
  try {
    const caracteristicas = [];

    // Crear las especies (ahora con 10 especies de mascotas comunes)
    especies.forEach((especie) => {
      caracteristicas.push({
        tipo: 'ESPECIE',
        descripcion: especie.toUpperCase()
      });

      // Crear 5 razas para cada especie
      if (razasPorEspecie[especie]) {
        razasPorEspecie[especie].forEach((raza) => {
          caracteristicas.push({
            tipo: 'RAZA',
            descripcion: raza.toUpperCase()
          });
        });
      }
    });

    // Crear 100 colores
    colores.forEach((color) => {
      caracteristicas.push({
        tipo: 'COLOR',
        descripcion: color.toUpperCase()
      });
    });

    // Insertar todas las características en la base de datos
    await Caracteristicas.bulkCreate(caracteristicas);

    console.log(`Datos de prueba creados correctamente. Se insertaron ${caracteristicas.length} características.`);
  } catch (error) {
    console.error('Error creando datos de prueba:', error);
  }
};

// Ejecutamos la función
module.exports = crearCaracteristicasPrueba;