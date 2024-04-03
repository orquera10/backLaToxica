import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();

program.option('--persistence <persistence>', 'variable de ambiente', 'MONGO')
    .option('--mode <mode>', 'modo de trabajo', 'develop')

program.parse();
const persistence = program.opts().persistence;
const mode = program.opts().mode;

dotenv.config();

export default {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    persistence,
    mode
}