import { Producto } from "./models/productos.model.js";

export default class Canchas {
    constructor() {
        console.log('Working Productos with DB in mongoDB');
    }
    getProductos = async () => {
        const result = await Producto.find().lean();
        return result;
    }

    addProducto = async (producto) => {
        const result = await Producto.create(producto);
        return result;
    }

    getProductoById = async (id) =>{
        const result = await Producto.findOne({_id:id}).lean();
        return result;
    }

    deleteProducto = async (id) => {
        const result = await Producto.deleteOne({_id:id});
        return result;
    }

    updateProducto = async (id, producto) =>{
        const result = await Producto.updateOne({_id:id}, producto);
        return result;
    }
}