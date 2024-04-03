// Importar el módulo mongoose para interactuar con MongoDB
import mongoose from 'mongoose';

// Definir el esquema para el detalle
const detallesSchema = new mongoose.Schema({
    productos_consumidos: {
        type: [{
            producto: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto'
            },
            cantidad: {
                type: Number,
                required: true
            }
        }],
        default: [] // Inicializar como un array vacío
    },
    total_consumido: {
        type: Number,
        default: 0 // Inicializar como 0
    },
    total_alquiler: {
        type: Number,
        default: 0 // Inicializar como 0
    },
    total: {
        type: Number,
        default: 0 // Inicializar como 0
    }
});

// Definir el modelo para el detalle
export const Detalle = mongoose.model('Detalle', detallesSchema);
