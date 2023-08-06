import {config} from 'dotenv'

config()

export const PORT = process.env.API_PORT || 9000;
export const API_HOST = process.env.API_HOST || 'http://localhost';

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_PORT = process.env.DB_PORT || 3306
export const DB_USER = process.env.DB_USER || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || '_karezooB3'
export const DB_DATABASE = process.env.DB_DATABASE || 'centro_adopcion'