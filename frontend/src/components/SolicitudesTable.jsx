import React from "react";

export default function SolicitudesTable({ solicitudes, onEdit, onDelete }) {
  if (!solicitudes || solicitudes.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No hay solicitudes registradas.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-800 border-b border-gray-700">
          <tr className="text-left text-sm uppercase tracking-wide text-gray-400">
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Título</th>
            <th className="px-4 py-3">Descripción</th>
            <th className="px-4 py-3">Tipo</th>
            <th className="px-4 py-3">Estado</th>
            <th className="px-4 py-3">Responsable</th>
            <th className="px-4 py-3 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-700 bg-gray-900">
          {solicitudes.map((s) => (
            <tr
              key={s.id}
              className="hover:bg-gray-800 transition-colors duration-150 text-sm text-gray-300"
            >
              <td className="px-4 py-3 font-mono text-gray-400">{s.id}</td>
              <td className="px-4 py-3">{s.titulo}</td>
              <td className="px-4 py-3 text-gray-400 truncate max-w-[250px]">{s.descripcion}</td>
              <td className="px-4 py-3 capitalize">
                <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded-lg">
                  {s.tipo}
                </span>
              </td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 text-xs rounded-lg ${
                    s.estado === "pendiente"
                      ? "bg-yellow-700/40 text-yellow-300"
                      : s.estado === "en_proceso"
                      ? "bg-blue-700/40 text-blue-300"
                      : "bg-green-700/40 text-green-300"
                  }`}
                >
                  {s.estado.replace("_", " ")}
                </span>
              </td>
              <td className="px-4 py-3">{s.responsable || "—"}</td>
              <td className="px-4 py-3 flex gap-2 justify-center">
                <button
                  onClick={() => onEdit(s)}
                  className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs rounded-lg transition"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(s)}
                  className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs rounded-lg transition"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
