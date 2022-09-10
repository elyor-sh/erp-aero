
// решил создавать простой query builder
import {pool} from "./pool";
import {RowDataPacket} from "mysql2";

class QueryBuilder {

    // Получить данные
    public async find<T>(tableName: string): Promise<T> {
        const [rows] = await pool.query(`SELECT * FROM ${tableName}`)
        return rows as T
    }

    // Получить
    public async findOne<T>(tableName: string, query: Object): Promise<T | null> {

        const {queryString, values} = this.getQueryData(query)

        if(!values){
            return null
        }

        const [rows] = await pool.query(`SELECT * FROM ${tableName} WHERE ${queryString}`, values)
        return JSON.parse(JSON.stringify(rows))[0] as T
    }

    // Создание новой сущности
    public async create (tableName: string, params: Object) {
        const [row] = await pool.query(`INSERT INTO ${tableName} SET ?`, params)
        return row
    }

    // Обновление
    public async update (tableName: string, params: Object, query: string) {
        const [row] = await pool.query(`UPDATE ${tableName} SET ? WHERE ${query}`, params)
        return row
    }

    private  getQueryData (params: Object) {
        const keys = Object.keys(params)
        const values = Object.values(params)

        const queryString =
            keys.length === 1 ?
                keys[0]
                :
                keys.join(' = ? AND ') + ' = ?'


        return {
            queryString, values
        }
    }

}

export const queryBuilder = new QueryBuilder()