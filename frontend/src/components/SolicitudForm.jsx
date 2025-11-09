import React, { useState, useEffect } from "react";

export default function SolicitudForm({ onSubmit, solicitudEdit, onCancel }) {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    tipo: "",
    estado: "",
    responsable: "",
  });

  useEffect(() => {
    if (solicitudEdit) setFormData(solicitudEdit);
    else
      setFormData({
        titulo: "",
        descripcion: "",
        tipo: "",
        estado: "",
        responsable: "",
      });
  }, [solicitudEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.descripcion || !formData.tipo) {
      return alert("Por favor completa los campos obligatorios.");
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-200 mb-5 text-center">
        {solicitudEdit ? "Editar Solicitud" : "Crear Nueva Solicitud"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Campo Título */}
        <div>
          <label className="block text-gray-400 text-sm mb-1">Título *</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            placeholder="Ej: Mantenimiento de equipos"
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Campo Descripción */}
        <div>
          <label className="block text-gray-400 text-sm mb-1">Descripción *</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            placeholder="Describe brevemente la solicitud..."
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
          />
        </div>

        {/* Fila con Tipo y Estado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-400 text-sm mb-1">Tipo *</label>
            <select
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Selecciona un tipo</option>
              <option value="mantenimiento">Mantenimiento</option>
              <option value="soporte">Soporte</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-1">Estado *</label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleChange}
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
            >
              <option value="">Selecciona un estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="en_proceso">En Proceso</option>
              <option value="completado">Completado</option>
            </select>
          </div>
        </div>

        {/* Responsable */}
        <div>
          <label className="block text-gray-400 text-sm mb-1">Responsable</label>
          <input
            type="text"
            name="responsable"
            value={formData.responsable}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez"
            className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-3 pt-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-lg transition"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm rounded-lg transition"
          >
            {solicitudEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
