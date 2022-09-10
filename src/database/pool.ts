import mysql from 'mysql2'
import {dbConfig} from "../config/vars";

export const pool = mysql.createPool(dbConfig).promise()