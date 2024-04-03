import { Router } from 'express';
import { Turnos } from '../dao/factory.js';
import { Detalles } from '../dao/factory.js';

const router = Router();

router.get('/', async (req, res) => {
    const turnosCargados =  await Turnos.getReservas();
    res.json(turnosCargados);
});

router.get('/:id', async (req, res) => {
    const turnoId = req.params.id;
    const turno =  await Turnos.getReservaById(turnoId);
    res.json(turno);
});

router.post('/', async (req, res) => {
    const turno = req.body;
    const nuevoDetalle = await Detalles.addDetalle({})

    const nuevoTurno = {...turno, detalle: nuevoDetalle._id};
    // Agregar el nuevo cancha al array de eventos
    const result = await Turnos.addReserva(nuevoTurno)

    // Responder con el nuevo cancha agregado
    res.status(200).json(result);
});

router.put('/:id', async (req, res) => {
    const turno = req.body;
    const turnoId = req.params.id;
    // Agregar el nuevo cancha al array de eventos
    const result = await Turnos.updateReserva(turnoId, turno);

    // Responder con el nuevo cancha agregado
    res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
    const turnoId = req.params.id;
    const result =  await Turnos.deleteReserva(turnoId);
    res.json(result);
});

export default router;