const { Op } = require('sequelize');
const Mascotas = require('../models/Mascotas');
const Clientes = require('../models/Clientes');
const Caracteristicas = require('../models/Caracteristicas');
const Medicamentos = require('../models/Medicamentos');
const Tratamientos = require('../models/Tratamientos');
const Mascotas_Medicamentos = require('../models/Mascotas_Medicamentos');

//Funcion para listar los tratamientos de una mascota
const obtenerTratamientosPorMascota = async (id_mascota) => {
    try {
      const tratamientos = await Tratamientos.findAll({
        where: {
          id_mascota: id_mascota,  
        },
        attributes: ['id_tratamiento','diagnostico', 'd_diferencial', 'fecha_tratamiento'],  
        required: false,    
      });
      if (tratamientos.length === 0) {
        return [];  
      }
      return tratamientos;
    } catch (error) {
      throw new Error('Error al obtener tratamientos para la mascota: ' + error.message);
    }
  };
  
//Funcion para crear un tratamiento
  const createTratamiento = async (fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas, diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos, f_cardiaca, fonendo, pal_abd, f_respiratoria, peso, id_mascota, dosis, via) => {
    try {
      const tratamiento = await Tratamientos.create({
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
        dosis,
        via,
      });
      return tratamiento.toJSON();
    } catch (error) {
      console.error("Error al crear el tratamiento:", error);
      throw new Error('No se pudo crear el tratamiento');
    }
  };


//Funcion para actualizar un tratamiento
  const updateTratamiento = async (id_tratamiento, fecha_tratamiento, comer, diarrea, fecha_vomitos, fecha_diarrea, otros_sintomas, diagnostico, d_diferencial, visual, ganglios, temperatura, mucosas, piel_anexos, f_cardiaca, fonendo, pal_abd, f_respiratoria, peso, id_mascota, dosis, via) => {
    try {
      const tratamiento = await Tratamientos.findByPk(id_tratamiento); 
      if (!tratamiento) {
        throw new Error('Tratamiento no encontrado');
      }
      if (fecha_tratamiento) tratamiento.fecha_tratamiento = fecha_tratamiento;
      if (comer) tratamiento.comer = comer;
      if (diarrea) tratamiento.diarrea = diarrea;
      if (fecha_vomitos) tratamiento.fecha_vomitos = fecha_vomitos;
      if (fecha_diarrea) tratamiento.fecha_diarrea = fecha_diarrea;
      if (otros_sintomas) tratamiento.otros_sintomas = otros_sintomas;
      if (diagnostico) tratamiento.diagnostico = diagnostico;
      if (d_diferencial) tratamiento.d_diferencial = d_diferencial;
      if (visual) tratamiento.visual = visual;
      if (ganglios) tratamiento.ganglios = ganglios;
      if (temperatura) tratamiento.temperatura = temperatura;
      if (mucosas) tratamiento.mucosas = mucosas;
      if (piel_anexos) tratamiento.piel_anexos = piel_anexos;
      if (f_cardiaca) tratamiento.f_cardiaca = f_cardiaca;
      if (fonendo) tratamiento.fonendo = fonendo;
      if (pal_abd) tratamiento.pal_abd = pal_abd;
      if (f_respiratoria) tratamiento.f_respiratoria = f_respiratoria;
      if (peso) tratamiento.peso = peso;
      if (id_mascota) tratamiento.id_mascota = id_mascota;
      if (dosis) tratamiento.dosis = dosis;
      if (via) tratamiento.via = via;
      await tratamiento.save();
      return { message: 'Tratamiento actualizado con éxito' };
    } catch (error) {
      return { message: 'Error al actualizar el tratamiento', error };
    }
  };

//Funcion para borrar un tratamiento
  const deleteTratamiento = async (id_tratamiento) => {
    try {
      const deletedTratamiento = await Tratamientos.destroy({
        where: { id_tratamiento }, 
      });
  
      if (deletedTratamiento) {
        return { message: 'Tratamiento eliminado con éxito' };
      } else {
        return { message: 'Tratamiento no encontrado' };
      }
    } catch (error) {
      return { message: 'Error al eliminar el tratamiento en la query', error };
    }
  };
  module.exports = {
    obtenerTratamientosPorMascota,
    createTratamiento,
    updateTratamiento,
    deleteTratamiento,
  };
  