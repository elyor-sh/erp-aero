import {PoolOptions} from "mysql2";
import * as path from 'path'


export const PORT = process.env.PORT || 8080

export const dbConfig: PoolOptions = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

export const JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || 'jwt_secret_187_appv3'
export const JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || 'jwt_secret_187_mntYui'

export const STATIC_FOLDER_PATH = path.resolve(__dirname, '..', 'static')