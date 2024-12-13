const Medicamentos_Tratamientos = require('../models/Medicamentos_Tratamientos');

// Crear medicamento_tratamiento
const createMedicamentoTratamiento = async (id_tratamiento, id_medicamento, dosis, via, costo, fecha) => {
    try {
      // Intentamos crear un nuevo medicamento_tratamiento con los parámetros proporcionados
      const medicamentoTratamiento = await Medicamentos_Tratamientos.create({
        id_tratamiento,    // ID del tratamiento
        id_medicamento,    // ID del medicamento
        dosis,             // Dosis del medicamento
        via,               // Vía de administración
        costo,             // Costo del medicamento
        fecha,             // Fecha del tratamiento
      });
  
      // Retornamos el id_medicamentoTratamiento del medicamento tratado creado
      return medicamentoTratamiento.id_medicamentoTratamiento;
    } catch (error) {
      // Si ocurre un error, lo capturamos y lo mostramos
      console.error("Error al crear el medicamento tratamiento:", error);
      
      throw new Error('No se pudo crear el medicamento tratamiento');
    }
  };
  
  // Actualizar medicamento_tratamiento
  const updateMedicamentoTratamiento = async (id_medicamentoTratamiento, id_tratamiento, id_medicamento, dosis, via, costo, fecha) => {
    try {
      // Buscamos el medicamento_tratamiento por su id_medicamentoTratamiento
      const medicamentoTratamiento = await Medicamentos_Tratamientos.findByPk(id_medicamentoTratamiento);
  
      if (!medicamentoTratamiento) {
        // Si no se encuentra el medicamento_tratamiento, lanzamos un error
        throw new Error('Medicamento tratamiento no encontrado');
      }
  
      // Actualizamos los campos del medicamento_tratamiento
      await medicamentoTratamiento.update({
        id_tratamiento,    // ID del tratamiento
        id_medicamento,    // ID del medicamento
        dosis,             // Dosis del medicamento
        via,               // Vía de administración
        costo,             // Costo del medicamento
        fecha,             // Fecha del tratamiento
      });
  
      // Retornamos el id del medicamento tratamiento actualizado
      return medicamentoTratamiento.id_medicamentoTratamiento;
    } catch (error) {
      console.error("Error al actualizar el medicamento tratamiento:", error);
      throw new Error('No se pudo actualizar el medicamento tratamiento');
    }
  };
  
  // Eliminar medicamento_tratamiento
  const deleteMedicamentoTratamiento = async (id_medicamentoTratamiento) => {
    try {
      // Buscamos el medicamento_tratamiento por su id_medicamentoTratamiento
      const medicamentoTratamiento = await Medicamentos_Tratamientos.findByPk(id_medicamentoTratamiento);
  
      if (!medicamentoTratamiento) {
        // Si no se encuentra el medicamento_tratamiento, retornamos un mensaje de error
        throw new Error('Medicamento tratamiento no encontrado');
      }
  
      // Eliminar el medicamento_tratamiento
      await medicamentoTratamiento.destroy();
  
      // Retornamos el id del medicamento tratamiento eliminado
      return id_medicamentoTratamiento;
    } catch (error) {
      console.error("Error al eliminar el medicamento tratamiento:", error);
      throw new Error('No se pudo eliminar el medicamento tratamiento');
    }
  };
  
  // Buscar medicamento_tratamiento por id_tratamiento
  const getMedicamentosTratamientoByTratamiento = async (id_tratamiento) => {
    try {
      // Realizamos la consulta para obtener todos los medicamentos asociados al tratamiento filtrado por id_tratamiento
      const medicamentosTratamiento = await Medicamentos_Tratamientos.findAll({
        where: {
          id_tratamiento: id_tratamiento,  // Filtramos por el ID del tratamiento
        },
      });
  
      if (medicamentosTratamiento.length === 0) {
        throw new Error('No se encontraron medicamentos asociados al tratamiento');
      }
  
      return medicamentosTratamiento;
    } catch (error) {
      throw new Error('Error al obtener los medicamentos asociados al tratamiento: ' + error.message);
    }
  };
module.exports = {
    createMedicamentoTratamiento,
    updateMedicamentoTratamiento,
    deleteMedicamentoTratamiento,
    getMedicamentosTratamientoByTratamiento,
};
  