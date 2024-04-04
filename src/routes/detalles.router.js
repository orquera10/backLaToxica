import { Router } from 'express';
import { Detalles } from '../dao/factory.js';

const router = Router();

router.get('/', async (req, res) => {
    const detallesCargados =  await Detalles.getDetalles();
    res.json(detallesCargados);
});

router.get('/:id', async (req, res) => {
    const detalleId = req.params.id;
    const detalle =  await Detalles.getDetalleById(detalleId);
    res.json(detalle);
});

router.post('/', async (req, res) => {
    const detalleNuevo = req.body;

    // Agregar el nuevo cancha al array de eventos
    const result = await Detalles.addDetalle(detalleNuevo)

    // Responder con el nuevo cancha agregado
    res.status(200).json(result);
});

router.put('/:id', async (req, res) => {
    const {productos_consumidos} = req.body;
    const detalleId = req.params.id;

    // Calcular el total consumido sumando el producto de la cantidad y el precio unitario de cada producto_consumido
    let total_consumido = 0;
    productos_consumidos.forEach(producto => {
        total_consumido += producto.cantidad * producto.producto.precio_unitario;
    });

    //

    const total = total_consumido + total_alquiler;

    // Agregar el nuevo cancha al array de eventos
    const detalleNuevo = {
        productos_consumidos: productos_consumidos,
        total_consumido: total_consumido,
        total_alquiler: total_alquiler,
        total: total
    }
    const result = await Detalles.updateDetalle(detalleId, detalleNuevo);

    // Responder con el nuevo cancha agregado
    res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
    const detalleId = req.params.id;
    const detalle =  await Detalles.deleteDetalle(detalleId);
    res.json(detalle);
});

export default router;