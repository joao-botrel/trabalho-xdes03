import express from 'express'
import multer from 'multer'
import path from 'path'
import * as usuarioController from '../controllers/usuario.countrollers.js'
import autorizarUsuario from '../Middlewares/auth.middlewares.js'
import autorizarAdmin from '../Middlewares/admin.middlewares.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const router = express.Router()
const upload = multer({storage: storage})

router.post('/usuarios', usuarioController.criarUsuario)
router.post('/usuarios/login', usuarioController.login)
router.put('/usuarios/:usuarioId', upload.single('fotoPerfil'), usuarioController.atualizarUsuario)
router.delete('/usuarios/:usuarioId', autorizarUsuario, usuarioController.deletarUsuario)
router.get('/usuarios', autorizarAdmin, usuarioController.getUsuarios)
router.get('/usuarios/:usuarioId', usuarioController.getUsuarioPorId)
router.post('/usuarios/logout', autorizarUsuario, usuarioController.logout)


export default router