import {NextFunction, Request, Response} from "express";
import {filesService} from "./files.service";
import {UploadedFile} from "express-fileupload";


class FilesController {

    async create (req: Request, res: Response, next: NextFunction) {
        try {

            const file = req.files?.file

            if(!file){
                return res.status(400).json({message: 'File not send'})
            }

            const data = await filesService.create(file as UploadedFile)

            res.json(data)

        }catch (e) {
            next(e)
        }
    }

    async getAll (req: Request, res: Response, next: NextFunction) {
        try {

            const list_size = Number(req.query.list_size) || 10
            const page = Number(req.query.page) || 1

            const files = await filesService.getAll(list_size, page)

            res.json(files)

        }catch (e) {
            next(e)
        }
    }

    async delete (req: Request, res: Response, next: NextFunction) {
        try {

            const {id} = req.params

            await filesService.delete(Number(id))

            res.json({message: 'Success'})

        }catch (e) {
            next(e)
        }
    }

    async getOne (req: Request, res: Response, next: NextFunction) {
        try {

            const {id} = req.params

            const file = await filesService.getOne(Number(id))

            if(!file){
                return res.status(404).json({message: 'File not found'})
            }

            res.json(file)

        }catch (e) {
            next(e)
        }
    }

    async download (req: Request, res: Response, next: NextFunction) {
        try {

            const {id} = req.params

            const filePath = await filesService.download(Number(id))

            res.sendFile(filePath)

        }catch (e) {
            next(e)
        }
    }

    async update (req: Request, res: Response, next: NextFunction) {
        try {

            const {id} = req.params

            const file = req.files?.file

            if(!file){
                return res.status(400).json({message: 'File not send'})
            }

            const data = await filesService.update(Number(id), file as UploadedFile)

            res.json(data)

        }catch (e) {
            next(e)
        }
    }
}

export const filesController = new FilesController()