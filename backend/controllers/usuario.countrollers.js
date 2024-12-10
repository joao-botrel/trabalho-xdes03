import { PrismaClient } from "@prisma/client";
import gerarToken from "../Utils/jwt.js";

const prisma = new PrismaClient()


export const criarUsuario = async (req, res) => {

    const usuario = await prisma.usuario.create({
        data: {
            email: req.body.email,
            senha: req.body.senha,
            role: req.body.role,
            perfil: {
                create: {
                    nome: req.body.nome,
                    bio: req.body.bio
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
    try {
        const { usuarioId } = req.params;

        // Cria um objeto de atualização dinâmica
        const atualizacoesPerfil = {};
        if (req.body.nome) atualizacoesPerfil.nome = req.body.nome;
        if (req.body.bio) atualizacoesPerfil.bio = req.body.bio;
        if (req.file) atualizacoesPerfil.fotoPerfil = req.file.path;

        const atualizacoesUsuario = {};
        if (req.body.email) atualizacoesUsuario.email = req.body.email;

        // Realiza a atualização no banco
        const usuario = await prisma.usuario.update({
            where: {
                id: parseInt(usuarioId),
            },
            data: {
                ...atualizacoesUsuario,
                perfil: {
                    update: {
                        ...atualizacoesPerfil,
                    },
                },
            },
        });

        res.json({
            data: usuario,
            msg: "Usuário e perfil atualizados com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao atualizar o usuário:", error.message);
        res.status(500).json({
            msg: "Erro ao atualizar o usuário.",
            error: error.message,
        });
    }
};


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
        msg: "Usuario deletado com sucesso!"
    })
}