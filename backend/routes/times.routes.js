import express from 'express'
import * as timeController from '../controllers/times.controllers.js'
import autorizarUsuario from '../Middlewares/auth.middlewares.js'

const router = express.Router()

router.post('/times', timeController.criarTime)
router.get('/times/:usuarioId', timeController.getTimePorUsuario)
router.delete('/times/:timeId', timeController.deletarTime)
router.put('/times/:timeId', timeController.atualizarTime)

export default router
