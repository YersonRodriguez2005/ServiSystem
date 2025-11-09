import express from 'express';
import {
    getSolicitudes,
    getSolicitudById,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud
} from './controller.js'

const router = express.Router();

router.get('/solicitudes', getSolicitudes);
router.get('/solicitudes/:id', getSolicitudById);
router.post('/solicitudes', createSolicitud);
router.put('/solicitudes/:id', updateSolicitud);
router.delete('/solicitudes/:id', deleteSolicitud);

export default router;