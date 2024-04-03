import { Reserva } from "./models/turnos.model.js";

export default class Reservas {
    constructor() {
        console.log('Working Turnos with DB in mongoDB');
    }
    getReservas = async () => {
        const result = await Reserva.find().lean();
        return result;
    }

    addReserva = async (reserva) => {
        const result = await Reserva.create(reserva);
        return result;
    }

    getReservaById = async (id) =>{
        const result = await Reserva.findOne({_id:id}).lean();
        return result;
    }
    
    deleteReserva = async (id) => {
        const result = await Reserva.deleteOne({_id:id});
        return result;
    }

    updateReserva = async (id, reserva) =>{
        const result = await Reserva.updateOne({_id:id}, reserva);
        return result;
    }
}