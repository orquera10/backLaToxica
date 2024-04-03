import { Detalle } from "./models/detalles.model.js";

export default class Detalles {
    constructor() {
        console.log('Working Detalle with DB in mongoDB');
    }
    getDetalles = async () => {
        const result = await Detalle.find().lean();
        return result;
    }

    addDetalle = async (detalle) => {
        const result = await Detalle.create(detalle);
        return result;
    }

    getDetalleById = async (id) =>{
        const result = await Detalle.findOne({_id:id}).lean();
        return result;
    }

    deleteDetalle = async (id) => {
        const result = await Detalle.deleteOne({_id:id});
        return result;
    }

    updateDetalle = async (id, detalle) =>{
        const result = await Detalle.updateOne({_id:id}, detalle);
        return result;
    }
}