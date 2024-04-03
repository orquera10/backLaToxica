import { Router } from 'express';
import { Canchas } from '../dao/factory.js';

const router = Router();

router.get('/', async (req, res) => {
    const canchasCargadas =  await Canchas.getCanchas();
    res.json(canchasCargadas);
});

router.get('/:id', async (req, res) => {
    const canchaId = req.params.id;
    const cancha =  await Canchas.getCanchaById(canchaId);
    res.json(cancha);
});

router.post('/', async (req, res) => {
    const nuevaCancha = req.body;

    // Agregar el nuevo cancha al array de eventos
    const result = await Canchas.addCancha(nuevaCancha)

    // Responder con el nuevo cancha agregado
    res.status(200).json(result);
});

router.put('/:id', async (req, res) => {
    const nuevaCancha = req.body;
    const canchaId = req.params.id;
    // Agregar el nuevo cancha al array de eventos
    const result = await Canchas.updateCancha(canchaId, nuevaCancha);

    // Responder con el nuevo cancha agregado
    res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
    const canchaId = req.params.id;
    const cancha =  await Canchas.deleteCancha(canchaId);
    res.json(cancha);
});

export default router;