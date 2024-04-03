// Importar los módulos necesarios
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from './config/config.js';
import canchasRouter from './routes/canchas.router.js';
import detallesRouter from './routes/detalles.router.js';
import productosRouter from './routes/productos.router.js';
import turnosRouter from './routes/turnos.router.js';


// Crear una instancia de la aplicación Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Rutas
app.use('/api/canchas', canchasRouter);
app.use('/api/detalles', detallesRouter);
app.use('/api/productos', productosRouter);
app.use('/api/turnos', turnosRouter);

// Configurar el puerto en el que la aplicación escuchará las solicitudes
const port = Number(config.port);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
