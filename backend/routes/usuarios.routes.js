import express from 'express'
import multer from 'multer'
import path from 'path'
import * as usuarioController from '../controllers/usuario.controllers.js'
import autorizarUsuario from '../Middlewares/auth.middlewares.js'
import autorizarAdmin from '../Middlewares/admin.middlewares.js'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file))
    }
})

const router = express.Router()
const upload = multer({storage: storage})

router.post('/usuarios', upload.single('fotoPerfil'), usuarioController.criarUsuario)
router.post('/usuarios/login', usuarioController.login)
router.put('/usuarios/:usuarioId', usuarioController.atualizarUsuario)
router.delete('/usuarios/:usuarioId', usuarioController.deletarUsuario)
router.get('/usuarios', usuarioController.getUsuarios)
router.get('/usuarios/:usuarioId', usuarioController.getUsuarioPorId)







export default router