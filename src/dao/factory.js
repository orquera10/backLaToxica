import config from "../config/config.js";

let Canchas;
let Detalles;
let Productos;
let Turnos;
const persistence = config.persistence;

switch(persistence) {
    case 'MONGO':
        console.log('Trabajando con BDD');
        const mongoose = await import("mongoose");
        await mongoose.connect(config.mongoUrl);
        const { default: CanchasMongo } = await import('./dbManager/canchas.manager.js');
        const { default: DetallesMongo } = await import('./dbManager/detalles.manager.js');
        const { default: ProductosMongo } = await import('./dbManager/productos.manager.js');
        const { default: TurnosMongo } = await import('./dbManager/turnos.manager.js');
        Canchas = new CanchasMongo();
        Detalles = new DetallesMongo();
        Productos = new ProductosMongo();
        Turnos = new TurnosMongo();
        break;
    case 'FILE':
        // console.log('Trabajando con FILE SYSTEM');
        // const { default: UsersFile } = await import('./fileSystemManagers/user.manager.js');
        // const { default: ProductsFile } = await import('./fileSystemManagers/products.manager.js');
        // const { default: CartsFile } = await import('./fileSystemManagers/carts.manager.js');
        // const { default: TicketsFile } = await import('./fileSystemManagers/tickets.manager.js');
        // Users = new UsersFile();
        // Products = new ProductsFile();
        // Carts = new CartsFile();
        // Tickets = new TicketsFile();
        break;
}

export {
    Canchas,
    Detalles,
    Productos,
    Turnos
}