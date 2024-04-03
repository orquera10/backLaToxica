// Importar el módulo mongoose para interactuar con MongoDB
import mongoose from 'mongoose';

// Definir el esquema para el producto
const productosSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    detalle: {
        type: String,
        required: true
    },
    precio_unitario: {
        type: Number,
        required: true
    }
});

// Definir el modelo para el producto
export const Producto = mongoose.model('Producto', productosSchema);