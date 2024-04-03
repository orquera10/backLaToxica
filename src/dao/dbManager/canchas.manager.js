import { Cancha } from "./models/canchas.model.js";

export default class Canchas {
    constructor() {
        console.log('Working Canchas with DB in mongoDB');
    }
    getCanchas = async () => {
        const result = await Cancha.find().lean();
        return result;
    }

    addCancha = async (cancha) => {
        const result = await Cancha.create(cancha);
        return result;
    }

    getCanchaById = async (id) =>{
        const result = await Cancha.findOne({_id:id}).lean();
        return result;
    }

    deleteCancha = async (id) => {
        const result = await Cancha.deleteOne({_id:id});
        return result;
    }

    updateCancha = async (id, cancha) =>{
        const result = await Cancha.updateOne({_id:id}, cancha);
        return result;
    }
}