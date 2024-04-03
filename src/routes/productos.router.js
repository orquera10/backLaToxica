import { Router } from 'express';
import { Productos } from '../dao/factory.js';

const router = Router();

router.get('/', async (req, res) => {
    const productosCargados =  await Productos.getProductos();
    res.json(productosCargados);
});

router.get('/:id', async (req, res) => {
    const productoId = req.params.id;
    const producto =  await Productos.getProductoById(productoId);
    res.json(producto);
});

router.post('/', async (req, res) => {
    const nuevoProducto = req.body;

    // Agregar el nuevo cancha al array de eventos
    const result = await Productos.addProducto(nuevoProducto)

    // Responder con el nuevo cancha agregado
    res.status(200).json(result);
});

router.put('/:id', async (req, res) => {
    const producto = req.body;
    const productoId = req.params.id;
    // Agregar el nuevo cancha al array de eventos
    const result = await Productos.updateProducto(productoId, producto);

    // Responder con el nuevo cancha agregado
    res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
    const productoId = req.params.id;
    const result =  await Productos.deleteProducto(productoId);
    res.json(result);
});

export default router;