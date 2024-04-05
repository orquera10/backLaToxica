import { Router } from 'express';
import { Productos, Turnos, Detalles } from '../dao/factory.js';
import moment from 'moment';

const router = Router();

router.get('/', async (req, res) => {
    const turnosCargados = await Turnos.getReservas();
    res.json(turnosCargados);
});

router.get('/:id', async (req, res) => {
    const turnoId = req.params.id;
    const turno = await Turnos.getReservaById(turnoId);
    res.json(turno);
});

router.post('/', async (req, res) => {
    const { nombre_reserva, hora_entrada, hora_salida, cancha } = req.body;
    const nuevoDetalle = await Detalles.addDetalle({})

    const nuevoTurno = {
        nombre_reserva,
        hora_entrada,
        hora_salida,
        cancha,
        detalle: nuevoDetalle._id
    };
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
    const turno = await Turnos.getReservaById(turnoId);
    await Detalles.deleteDetalle(turno.detalle._id);

    const result = await Turnos.deleteReserva(turnoId);
    res.json(result);
});

//agregar producto a turno
router.put('/:did/producto/:pid', async (req, res) => {
    const turnoId = req.params.did;
    const productoId = req.params.pid;
    const { cantidad = 1 } = req.body;

    const turno = await Turnos.getReservaById(turnoId);
    const producto = await Productos.getProductoById(productoId);

    // Convertir las cadenas de fecha a objetos Moment
    const hora_entrada = moment.utc(turno.hora_entrada);
    const hora_salida = moment.utc(turno.hora_salida);
    // Calcular la diferencia en horas
    const diferencia_en_horas = hora_salida.diff(hora_entrada, 'hours');

    const precio_producto = producto.precio_unitario;

    const productoEncontrado = turno.detalle.productos_consumidos.findIndex(item => item.producto._id.toString() === productoId);
    
    let productos_nuevos
    let total_consumido

    if (productoEncontrado !== -1) {
        productos_nuevos = turno.detalle.productos_consumidos;
        productos_nuevos[productoEncontrado].cantidad += cantidad;
        total_consumido = turno.detalle.total_consumido + cantidad * precio_producto;
    } else {
        productos_nuevos = turno.detalle.productos_consumidos;
        productos_nuevos.push({ producto: productoId, cantidad: cantidad });
        total_consumido = turno.detalle.total_consumido + cantidad * precio_producto;
    }

    const total_alquiler = diferencia_en_horas * turno.cancha.precio_alquiler;
    const total = total_alquiler + total_consumido;

    const detalleNuevo = {
        productos_consumidos: productos_nuevos,
        total_alquiler: total_alquiler,
        total_consumido: total_consumido,
        total: total
    }

    const result = await Detalles.updateDetalle(turno.detalle._id, detalleNuevo);
    res.json(result);
});

router.delete('/:did/producto/:pid', async (req, res) => {
    const turnoId = req.params.did;
    const productoId = req.params.pid;

    const turno = await Turnos.getReservaById(turnoId);

    // Verificar si el producto está en el detalle del turno
    const indiceProducto = turno.detalle.productos_consumidos.findIndex(item => item.producto._id.toString() === productoId);

    if (indiceProducto !== -1) {

        const producto = await Productos.getProductoById(productoId);
        const totalProducto = turno.detalle.productos_consumidos[indiceProducto].cantidad * producto.precio_unitario;
        const total_consumido = turno.detalle.total_consumido - totalProducto;
        const total = turno.detalle.total - totalProducto;

        // Si el producto está en el detalle, eliminarlo
        turno.detalle.productos_consumidos.splice(indiceProducto, 1);

        // Actualizar el detalle del turno
        const detalleActualizado = {
            productos_consumidos: turno.detalle.productos_consumidos,
            total_alquiler: turno.detalle.total_alquiler,
            total_consumido: total_consumido,
            total: total
        };

        await Detalles.updateDetalle(turno.detalle._id, detalleActualizado);

        // Responder con éxito
        res.status(200).json({ message: 'Producto eliminado del detalle del turno exitosamente.' });
    } else {
        // Si el producto no está en el detalle, responder con un mensaje de error
        res.status(404).json({ message: 'El producto no está presente en el detalle del turno.' });
    }
});


export default router;