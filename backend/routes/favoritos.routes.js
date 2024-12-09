import express from 'express'
import * as favoritosControllers from '../controllers/favoritos.controllers.js'
import autorizarUsuario from '../Middlewares/auth.middlewares.js'
import autorizarAdmin from '../Middlewares/admin.middlewares.js'

const router = express.Router()

router.post('/favoritos', favoritosControllers.criarFavorito)
router.get('/favoritos/:usuarioId', favoritosControllers.getFavoritoPorUsuario)
router.delete('/favoritos/:favoritoId', favoritosControllers.deletarFavorito)

export default router
