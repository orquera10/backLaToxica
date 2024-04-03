// Importar el módulo mongoose para interactuar con MongoDB
import mongoose from 'mongoose';

// Definir el esquema para la cancha
const canchasSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    precio_alquiler: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }
});

// Definir el modelo para la cancha
export const Cancha = mongoose.model('Cancha', canchasSchema);

