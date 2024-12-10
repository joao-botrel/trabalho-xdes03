import express from 'express'
import * as favoritosControllers from '../controllers/favoritos.controllers.js'
import autorizarUsuario from '../Middlewares/auth.middlewares.js'


const router = express.Router()

router.post('/favoritos', autorizarUsuario, favoritosControllers.criarFavorito)
router.get('/favoritos/:usuarioId', autorizarUsuario, favoritosControllers.getFavoritoPorUsuario)
router.delete('/favoritos/:favoritoId', autorizarUsuario, favoritosControllers.deletarFavorito)

export default router