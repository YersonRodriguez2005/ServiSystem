import db from './db.js';

// Obtener todas las solicitudes
export const getSolicitudes = (req, res) => {
    const query = 'SELECT * FROM solicitudes ORDER BY fecha_creacion DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener las solicitudes'});
        res.json(results);
    });
};

// Obtener una solicitud por id
export const getSolicitudById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM solicitudes WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener la solicitud'});
        if (results.length === 0) return res.status(400).json({ message: 'Solicitud no encontrada'});
        res.json(results[0]);
    });
};

// Crear una solicitud
export const createSolicitud = (req, res) => {
    const { titulo, descripcion, tipo, estado, responsable } = req.body;
    const query = 'INSERT INTO solicitudes (titulo, descripcion, tipo, estado, responsable) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [titulo, descripcion, tipo, estado, responsable], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear la solicitud'});
        res.status(201).json({ message: 'Solicitud creada correctamente', id: result.insertId });
    });
};

// Actualizar una solicitud
export const updateSolicitud = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, tipo, estado, responsable } = req.body;
    const query = 'UPDATE solicitudes SET titulo = ?, descripcion = ?, tipo = ?, estado = ?, responsable = ?';
    db.query(query, [titulo, descripcion, tipo, estado, responsable, id], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar la solicitud'});
        res.json({ message: 'Solicitud creada correctamente' });
    });
};

// Eliminar una solicitud
export const deleteSolicitud = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM solicitudes WHERE id = ?';
    db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar la solicitud' });
    res.json({ message: 'Solicitud eliminada correctamente' });
  });
}