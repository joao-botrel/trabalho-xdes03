import { PrismaClient } from "@prisma/client";
import gerarToken from "../Utils/jwt.js";

const prisma = new PrismaClient();

export const criarUsuario = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                msg: "O corpo da requisição está vazio.",
            });
        }

        const usuario = await prisma.usuario.create({
            data: {
                email: req.body.email,
                senha: req.body.senha,
                role: req.body.role,
                perfil: {
                    create: {
                        nome: req.body.nome,
                        bio: req.body.bio,
                    },
                },
            },
        });

        const token = gerarToken(usuario);

        res.json({
            data: usuario,
            token: token,
            msg: "Usuário e perfil criados com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao criar usuário:", error.message);
        res.status(500).json({
            msg: "Erro ao criar usuário.",
            error: error.message,
        });
    }
};


export const login = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                msg: "O corpo da requisição está vazio.",
            });
        }

        const usuario = await prisma.usuario.findFirst({
            where: {
                AND: {
                    email: req.body.email,
                    senha: req.body.senha,
                },
            },
        });

        if (!usuario) {
            return res.status(401).json({
                msg: "Email ou senha não conferem.",
            });
        }

        const token = gerarToken(usuario);

        res.send({
            data: usuario,
            token: token,
            msg: "Login efetuado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao realizar login:", error.message);
        res.status(500).json({
            msg: "Erro ao realizar login.",
            error: error.message,
        });
    }
};


export const atualizarUsuario = async (req, res) => {
    try {
        const { usuarioId } = req.params;
        const usuarioIdInt = parseInt(usuarioId);

        // Verifica se o usuário existe
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { id: usuarioIdInt },
        });

        if (!usuarioExistente) {
            return res.status(404).json({
                msg: "Usuário não encontrado.",
            });
        }

        // Prepara os objetos de atualização
        const atualizacoesPerfil = {};
        if (req.body.nome) atualizacoesPerfil.nome = req.body.nome;
        if (req.body.bio) atualizacoesPerfil.bio = req.body.bio;
        if (req.file) atualizacoesPerfil.fotoPerfil = req.file.path;

        const atualizacoesUsuario = {};
        if (req.body.email) atualizacoesUsuario.email = req.body.email;

        // Atualiza o usuário e o perfil
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id: usuarioIdInt },
            data: {
                ...atualizacoesUsuario,
                perfil: {
                    update: atualizacoesPerfil,
                },
            },
        });

        res.json({
            data: usuarioAtualizado,
            msg: "Usuário e perfil atualizados com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao atualizar usuário:", error.message);
        res.status(500).json({
            msg: "Erro ao atualizar usuário.",
            error: error.message,
        });
    }
};


export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await prisma.usuario.findMany({
            where: {
                perfil: {
                    nome: {
                        contains: req.query.nome,
                    },
                },
            },
            include: {
                perfil: true,
            },
        });

        res.json({
            data: usuarios,
            msg: "Usuários encontrados com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao buscar usuários:", error.message);
        res.status(500).json({
            msg: "Erro ao buscar usuários.",
            error: error.message,
        });
    }
};

export const getUsuarioPorId = async (req, res) => {
    try {
        const usuario = await prisma.usuario.findUnique({
            where: {
                id: parseInt(req.params.usuarioId),
            },
            include: {
                perfil: true,
            },
        });

        if (!usuario) {
            return res.status(404).json({
                msg: "Usuário não encontrado.",
            });
        }

        res.json({
            data: usuario,
            msg: "Usuário encontrado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao buscar usuário:", error.message);
        res.status(500).json({
            msg: "Erro ao buscar usuário.",
            error: error.message,
        });
    }
};

export const deletarUsuario = async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId);

        // Verifica se o usuário existe antes de deletar
        const usuarioExistente = await prisma.usuario.findUnique({
            where: { id: usuarioId },
        });

        if (!usuarioExistente) {
            return res.status(404).json({
                msg: "Usuário não encontrado.",
            });
        }

        // Deleta o perfil relacionado ao usuário
        await prisma.perfil.deleteMany({
            where: {
                usuario: {
                    id: usuarioId,
                },
            },
        });

        // Deleta o próprio usuário
        await prisma.usuario.delete({
            where: { id: usuarioId },
        });

        res.json({
            msg: "Usuário deletado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao deletar usuário:", error.message);
        res.status(500).json({
            msg: "Erro ao deletar usuário.",
            error: error.message,
        });
    }
};

export const logout = (req, res) => {
    try {
        res.json({
            msg: "Logout realizado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao realizar logout:", error.message);
        res.status(500).json({
            msg: "Erro ao realizar logout.",
            error: error.message,
        });
    }
};
