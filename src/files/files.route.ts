import {Router} from 'express'
import {filesController} from "./files.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router()

router.post('/upload', authMiddleware, filesController.create)
router.get('/list', authMiddleware, filesController.getAll)
router.delete('/delete/:id', authMiddleware, filesController.delete)
router.get('/:id', authMiddleware, filesController.getOne)
router.get('/download/:id', authMiddleware, filesController.download)
router.put('/update/:id', authMiddleware, filesController.update)


export {router as fileRouter}