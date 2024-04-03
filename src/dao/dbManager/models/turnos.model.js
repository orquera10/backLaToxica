// Importar el módulo mongoose para interactuar con MongoDB
import mongoose from 'mongoose';

// Definir el esquema para la reserva
const reservasSchema = new mongoose.Schema({
    nombre_reserva: {
        type: String,
        required: true
    },
    hora_entrada: {
        type: Date,
        required: true
    },
    hora_salida: {
        type: Date,
        required: true
    },
    cancha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cancha',
        required: true
    },
    detalle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Detalle',
        required: true
    }
});

reservasSchema.pre("findOne", function () {
    this.populate('cancha')
})

reservasSchema.pre("find", function () {
    this.populate('cancha')
})

reservasSchema.pre("findOne", function () {
    this.populate('detalle')
})

reservasSchema.pre("find", function () {
    this.populate('detalle')
})

// Definir el modelo para la reserva
export const Reserva = mongoose.model('Reservas', reservasSchema);
