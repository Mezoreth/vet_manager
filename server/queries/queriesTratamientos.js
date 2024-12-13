const Tratamientos = require('../models/Tratamientos');

//Crear tratamiento con su medicamento_tratamiento
const createTratamiento = async (fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas, diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos, f_cardiaca, fonendo, pal_abd, f_respiratoria, peso, id_mascota, estado, tipo_pago) => {
  try {
    // Intentamos crear un nuevo tratamiento con los parámetros proporcionados
    const tratamiento = await Tratamientos.create({
      fecha_tratamiento,      // Fecha del tratamiento
      comer,                  // Comer: Descripción del comportamiento alimentario
      diarrea,                // Diarrea: Descripción de diarrea, si la hay
      fecha_vomitos,          // Fecha de vómitos, si existe
      fecha_diarrea,          // Fecha de diarrea, si existe
      otros_sintomas,         // Otros síntomas descritos
      diagnostico,            // Diagnóstico realizado
      d_diferencial,          // Diagnóstico diferencial
      visual,                 // Descripción del examen visual
      ganglios,               // Descripción de ganglios
      temperatura,            // Temperatura corporal
      mucosas,                // Descripción de mucosas
      piel_anexos,            // Descripción de la piel y anexos
      f_cardiaca,             // Frecuencia cardiaca
      fonendo,                // Examen con fonendoscopio
      pal_abd,                // Palpación abdominal
      f_respiratoria,         // Frecuencia respiratoria
      peso,                   // Peso del paciente
      id_mascota,             // ID de la mascota a la que se le asigna el tratamiento
      estado,                 // Estado del tratamiento (pendiente, completado, cancelado)
      tipo_pago,                  // Costo del tratamiento (nuevo campo obligatorio)
    });

    // Retornamos el id_tratamiento del tratamiento creado
    return tratamiento.id_tratamiento;
  } catch (error) {
    console.error("Error al crear el tratamiento:", error);
    throw new Error('No se pudo crear el tratamiento');
  }
};


//Actualizar tratamiento 
const updateTratamiento = async (id_tratamiento, fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas, diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos, f_cardiaca, fonendo, pal_abd, f_respiratoria, peso, id_mascota, estado, tipo_pago) => {
  try {
    // Buscamos el tratamiento por su id_tratamiento
    const tratamiento = await Tratamientos.findByPk(id_tratamiento);

    if (!tratamiento) {
      throw new Error('Tratamiento no encontrado');
    }

    // Actualizamos los campos del tratamiento, incluyendo el campo 'costo'
    await tratamiento.update({
      fecha_tratamiento,
      comer,
      diarrea,
      fecha_vomitos,
      fecha_diarrea,
      otros_sintomas,
      diagnostico,
      d_diferencial,
      visual,
      ganglios,
      temperatura,
      mucosas,
      piel_anexos,
      f_cardiaca,
      fonendo,
      pal_abd,
      f_respiratoria,
      peso,
      id_mascota,
      estado,
      tipo_pago,  // Asegúrate de actualizar también el costo
    });

    // Retornamos el id del tratamiento actualizado
    return tratamiento.id_tratamiento;
  } catch (error) {
    console.error("Error al actualizar el tratamiento:", error);
    throw new Error('No se pudo actualizar el tratamiento');
  }
};

//Eliminar tratamiento
const deleteTratamiento = async (id_tratamiento) => {
  try {
    // Buscamos el tratamiento por su id_tratamiento
    const tratamiento = await Tratamientos.findByPk(id_tratamiento);

    if (!tratamiento) {
      throw new Error('Tratamiento no encontrado');
    }

    // Eliminar el tratamiento
    await tratamiento.destroy();

    // Retornamos el id del tratamiento eliminado
    return id_tratamiento;
  } catch (error) {
    console.error("Error al eliminar el tratamiento:", error);
    throw new Error('No se pudo eliminar el tratamiento');
  }
};


//Buscar un tratamiento por id
const getTratamiento = async (id_tratamiento) => {
  try {
    // Realizamos la consulta para obtener el tratamiento filtrado por id_tratamiento
    const tratamiento = await Tratamientos.findOne({
      attributes: [
        'id_tratamiento',
        'fecha_tratamiento',
        'comer',
        'diarrea',
        'fecha_vomitos',
        'fecha_diarrea',
        'otros_sintomas',
        'diagnostico',
        'd_diferencial',
        'visual',
        'ganglios',
        'temperatura',
        'mucosas',
        'piel_anexos',
        'f_cardiaca',
        'fonendo',
        'pal_abd',
        'f_respiratoria',
        'peso',
        'id_mascota',
        'estado',
        'tipo_pago',  // Incluir el campo costo al obtener el tratamiento
      ],
      where: {
        id_tratamiento: id_tratamiento,
      },
    });

    if (!tratamiento) {
      throw new Error('Tratamiento no encontrado');
    }

    return tratamiento;
  } catch (error) {
    throw new Error('Error al obtener el tratamiento: ' + error.message);
  }
};


//Funcion para listar los tratamientos de una mascota
const obtenerTratamientosPorMascota = async (id_mascota) => {
  try {
    const tratamientos = await Tratamientos.findAll({
      where: {
        id_mascota: id_mascota,
      },
      attributes: ['id_tratamiento', 'diagnostico', 'd_diferencial', 'fecha_tratamiento', 'tipo_pago'],  // Incluir costo
      required: false,
      order: [['fecha_tratamiento', 'ASC']],  // Ordenar por fecha_tratamiento en orden ascendente
    });

    if (tratamientos.length === 0) {
      return [];
    }

    return tratamientos;
  } catch (error) {
    throw new Error('Error al obtener tratamientos para la mascota: ' + error.message);
  }
};

//Listar tratamientos con estado pendiente
const obtenerTratamientosPendientes = async () => {
  try {
    const tratamientos = await Tratamientos.findAll({
      where: {
        estado: 'PENDIENTE',
      },
      attributes: [
        'id_tratamiento',
        'diagnostico',
        'd_diferencial',
        'fecha_tratamiento',
        'id_mascota',
        'tipo_pago',  // Incluir el campo costo al listar los tratamientos pendientes
      ],
      order: [['fecha_tratamiento', 'ASC']],  // Ordenar por fecha_tratamiento en orden ascendente
    });

    if (tratamientos.length === 0) {
      return [];
    }
    return tratamientos;
  } catch (error) {
    throw new Error('Error al obtener tratamientos pendientes: ' + error.message);
  }
};

  module.exports = {
    createTratamiento,
    updateTratamiento,
    deleteTratamiento,
    getTratamiento,
    obtenerTratamientosPorMascota,
    obtenerTratamientosPendientes,
  };
  