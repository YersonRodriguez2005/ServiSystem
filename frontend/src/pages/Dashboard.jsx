import React, { useEffect, useState } from "react";
import { getAllSolicitudes, createSolicitud, updateSolicitud, deleteSolicitud } from '../api/solicitudesApi';
import SolicitudesTable from '../components/SolicitudesTable';
import SolicitudForm from '../components/SolicitudForm';
import { toast } from 'react-toastify';

export default function Dashboard() {
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const res = await getAllSolicitudes();
            setSolicitudes(res.data);
        } catch {
            toast.error('Error cargando las solicitudes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const handleCreate = async (payload) => {
        console.log('Creating solicitud with payload:', payload);
        try {
            await createSolicitud(payload);
            toast.success('Solicitud creada');
            setShowForm(false);
            load();
        } catch {
            toast.error('Error creando la solicitud');
        }
    };

    const handleUpdate = async (payload) => {
        try {
            await updateSolicitud(editing.id, payload);
            toast.success('Solicitud actualizada');
            setEditing(null);
            setShowForm(false);
            load();
        } catch {
            toast.error('Error actualizando la solicitud');
        }
    };

    const handleDelete = async (s) => {
        if (!confirm(`Eliminar solicitud #${s.id}?`)) return;
        try {
            await deleteSolicitud(s.id);
            toast.success('Solicitud eliminada');
            load();
        } catch {
            toast.error('Error eliminando la solicitud');
        }
    };

    const onSubmitForm = (data) => {
        if (editing) handleUpdate(data);
        else handleCreate(data);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-indigo-400 tracking-wide">
            Gestor de Solicitudes
          </h1>
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 transition-colors duration-200 rounded-lg text-white font-medium shadow-md"
          >
            + Nueva Solicitud
          </button>
        </div>

        {/* Contenido */}
        <div className="bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700">
          {loading ? (
            <div className="text-center text-gray-400 py-6">Cargando solicitudes...</div>
          ) : (
            <SolicitudesTable
              solicitudes={solicitudes}
              onEdit={(s) => { setEditing(s); setShowForm(true); }}
              onDelete={handleDelete}
            />
          )}
        </div>

        {/* Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 w-full max-w-2xl rounded-2xl shadow-xl border border-gray-700">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-indigo-300">
                  {editing ? `Editar solicitud #${editing.id}` : "Crear nueva solicitud"}
                </h2>
                <button
                  onClick={() => { setShowForm(false); setEditing(null); }}
                  className="text-gray-400 hover:text-gray-200 transition"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <SolicitudForm
                  initialData={editing}
                  onSubmit={onSubmitForm}
                  onCancel={() => { setShowForm(false); setEditing(null); }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    );
}