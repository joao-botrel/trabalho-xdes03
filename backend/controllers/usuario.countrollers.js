import { PrismaClient } from "@prisma/client";
import gerarToken from "../Utils/jwt.js";

const prisma = new PrismaClient()


export const criarUsuario = async (req, res) => {

    const role = req.body.role == 'true' ? true : false


    const usuario = await prisma.usuario.create({
        data: {
            email: req.body.email,
            senha: req.body.senha,
            role: role,
            perfil: {
                create: {
                    nome: req.body.nome,
                    bio: req.body.bio,
                    fotoPerfil: req.file.path
                }
            }
        }
    })


        const token = gerarToken(usuario)

        res.json({
            data: usuario,
            token: token,
            msg: "Usuario e perfil criados com sucesso!"
        })

}


export const login = async (req, res) => {
    const usuario = await prisma.usuario.findFirst({
        where: {
            AND: {
                email: req.body.email,
                senha: req.body.senha
            }
        }
    })

    if (usuario == null) {
        res.status(401).json({
            msg: "Email ou senha não conferem"
        })
    }
    const token = gerarToken(usuario)

    res.send({
        data: usuario,
        token: token,
        msg: "Login efetuado com sucesso!"
    })
}

export const atualizarUsuario = async (req, res) => {
    const usuario = await prisma.usuario.update({
        where: {
            id: parseInt(req.params.usuarioId)
        },

        data: {
            email: req.body.email,
            perfil: {
                update: {
                    nome: req.body.nome,
                    bio: req.body.bio
                }
            },
        }
    })
        
    res.json({
        data: usuario,
        msg: "Usuario e perfil atualizados com sucesso!"
    })

}


export const getUsuarios = async (req, res) => {
    const usuarios = await prisma.usuario.findMany({
        where: {
            perfil: {
                nome: {
                    contains: req.query.nome
                }
            }
        },
        include: {
            perfil: true
        }
    })


    res.json({
        data: usuarios,
        msg: "Usuarios encontrados com sucesso!"
    })
}

export const getUsuarioPorId = async (req, res) => {
    const usuario = await prisma.usuario.findUnique({
        where: {
            id: parseInt(req.params.usuarioId)
        },
        include: {
            perfil: true
        }
    })

    res.json({
        data: usuario,
        msg: "Usuario encontrado com sucesso!"
    })
}

export const deletarUsuario = async (req, res) => {
    const perfilDeletado = await prisma.perfil.deleteMany({
        where: {
            usuario: {
                id: parseInt(req.params.usuarioId)
            }
        }
    })


    res.json({
        data: usuario,
        msg: "Usuario deletado com sucesso!"
    })
}