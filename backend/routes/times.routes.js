import express from 'express'
import * as timeController from '../controllers/times.controllers.js'
import autorizarUsuario from '../Middlewares/auth.middlewares.js'
import autorizarAdmin from '../Middlewares/admin.middlewares.js'

const router = express.Router()

router.post('/times', timeController.criarTime)
router.get('/times/:usuarioId', timeController.getTimePorUsuario)
router.delete('/times/:timeId', timeController.deletarTime)

export default router
