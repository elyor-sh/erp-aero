import {UploadedFile} from "express-fileupload";
import {v4 as uuidv4} from 'uuid'
import * as fs from 'fs'
import path from "path";
import {QueryBuilder} from "../database/query-builder";
import {FilesModel} from "./files.model";
import {STATIC_FOLDER_PATH} from "../config/vars";
import {HttpException} from "../utils/http-exception";
import {paginationQuery} from "../utils/pagination";


class FilesService {

    constructor(private readonly filesRepository: QueryBuilder) {
    }

    public async create (file: UploadedFile): Promise<FilesModel> {

        if(!fs.existsSync(STATIC_FOLDER_PATH)){
            fs.mkdirSync(STATIC_FOLDER_PATH, {recursive: true})
        }

        const {ext, mime_type, name, size} = this.getFileParams(file)

        const filePath = path.join(STATIC_FOLDER_PATH, `${name}${ext}`)

        await file.mv(filePath)

        await this.filesRepository.create({ext, mime_type, name, size})

        return this.filesRepository.findOne<FilesModel>({name})
    }

    public async getAll (list_size: number, page: number): Promise<FilesModel[]> {

        const {offset} = paginationQuery(list_size, page)

        return this.filesRepository.find<FilesModel[]>(`LIMIT ${list_size} OFFSET ${offset}`)
    }

    public async delete (id: number): Promise<void> {
        const file = await this.filesRepository.findOne<FilesModel>({id})

        if(!file){
            throw new HttpException(404, 'File not found')
        }

        const filePath = path.join(STATIC_FOLDER_PATH, `${file.name}${file.ext}`)

        fs.unlinkSync(filePath)

        await this.filesRepository.delete({id})
    }

    public async getOne (id: number): Promise<FilesModel> {
        return this.filesRepository.findOne({id})
    }

    public async download (id: number): Promise<string> {
        const file = await this.getOne(id)

        if(!file) {
            throw new HttpException(404, 'File not found')
        }

        const filePath = path.join(STATIC_FOLDER_PATH, `${file.name}${file.ext}`)

        if(!fs.existsSync(filePath)){
            throw new HttpException(404, 'File not found on disk')
        }

        return filePath
    }

    public async update (id: number, file: UploadedFile): Promise<FilesModel> {
        const data = await this.getOne(id)

        if(!data) {
            throw new HttpException(404, 'File not found')
        }

        const {ext, mime_type, name, size} = this.getFileParams(file)

        const oldFilePath = path.join(STATIC_FOLDER_PATH, `${data.name}${data.ext}`)

        if(fs.existsSync(oldFilePath)){
            fs.unlinkSync(oldFilePath)
        }

        const newFilePath = path.join(STATIC_FOLDER_PATH, `${name}${ext}`)

        await file.mv(newFilePath)

        await this.filesRepository.update({id: data.id, ext, mime_type, name, size}, `id = ${data.id}`)

        return this.filesRepository.findOne<FilesModel>({name})
    }

    private getFileParams (file: UploadedFile) {
        return {
            ext: path.extname(file.name),
            mime_type : file.mimetype,
            name : uuidv4(),
            size : file.size
        }
    }
}

export const filesService = new FilesService(new QueryBuilder('files'))