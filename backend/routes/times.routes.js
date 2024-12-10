import express from 'express'
import * as timeController from '../controllers/times.controllers.js'
import autorizarUsuario from '../Middlewares/auth.middlewares.js'

const router = express.Router()

router.post('/times', autorizarUsuario, timeController.criarTime)
router.get('/times/:usuarioId', autorizarUsuario, timeController.getTimePorUsuario)
router.delete('/times/:timeId', autorizarUsuario, timeController.deletarTime)
router.put('/times/:timeId', autorizarUsuario, timeController.atualizarTime)

export default router
