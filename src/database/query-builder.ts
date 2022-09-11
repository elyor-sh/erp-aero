
// решил создавать простой query builder
import {pool} from "./pool";
import {HttpException} from "../utils/http-exception";

export class QueryBuilder {

    tableName: string = ''

    constructor(tableName: string) {
        this.tableName = tableName
    }

    // Получить данные
    public async find<T>(limit: string = ''): Promise<T> {
        const [rows] = await pool.query(`SELECT * FROM ${this.tableName} ${limit}`)
        return rows as T
    }

    // Получить
    public async findOne<T>(query: Object, columns: string = '*'): Promise<T> {

        const {queryString, values} = this.getQueryData(query)

        if(!values){
            throw new HttpException(400, 'Not found')
        }

        const [rows] = await pool.query(`SELECT ${columns} FROM ${this.tableName} WHERE ${queryString}`, values)
        return JSON.parse(JSON.stringify(rows))[0] as T
    }

    // Создание новой сущности
    public async create ( params: Object) {
        const [row] = await pool.query(`INSERT INTO ${this.tableName} SET ?`, params)
        return row
    }

    // Обновление
    public async update (params: Object, query: string) {
        const [row] = await pool.query(`UPDATE ${this.tableName} SET ?  WHERE ${query}`, params)
        return row
    }

    // Удаление
    public async delete (params: Object) {
        await pool.query(`DELETE FROM ${this.tableName} WHERE ?`, params)
    }

    private  getQueryData (params: Object) {
        const keys = Object.keys(params)
        const values = Object.values(params)

        const queryString =
            keys.length === 1 ?
                keys[0] + ' = ?'
                :
                keys.join(' = ? AND ') + ' = ?'


        return {
            queryString, values
        }
    }

}