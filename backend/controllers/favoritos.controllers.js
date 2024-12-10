import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criarFavorito = async (req, res) => {
    try {
        if (!req.body.nome || !req.body.usuario) {
            return res.status(400).json({ msg: "Nome do Pokémon e ID do usuário são obrigatórios." });
        }

        const favorito = await prisma.favoritos.create({
            data: {
                nome: req.body.nome,
                usuario: {
                    connect: {
                        id: req.body.usuario
                    }
                }
            }
        });

        res.json({
            data: favorito,
            msg: "Pokémon favoritado com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao criar favorito:", error.message);
        res.status(500).json({
            msg: "Erro ao criar favorito.",
            error: error.message
        });
    }
};

export const getFavoritoPorUsuario = async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId);

        if (isNaN(usuarioId)) {
            return res.status(400).json({ msg: "O ID do usuário deve ser um número válido." });
        }

        const usuarioExistente = await prisma.usuario.findUnique({
            where: {
                id: usuarioId
            }
        });

        if (!usuarioExistente) {
            return res.status(404).json({ msg: "Usuário não encontrado." });
        }   

        const favoritos = await prisma.favoritos.findMany({
            where: {
                usuarioId: usuarioId
            }
        });

        if (favoritos.length === 0) {
            return res.status(404).json({ msg: "Nenhum favorito encontrado para este usuário." });
        }

        res.json({
            data: favoritos,
            msg: "Favoritos encontrados com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao buscar favoritos:", error.message);
        res.status(500).json({ msg: "Erro ao buscar favoritos.", error: error.message });
    }
};

export const deletarFavorito = async (req, res) => {
    try {
        const favoritoId = parseInt(req.params.favoritoId);

        if (isNaN(favoritoId)) {
            return res.status(400).json({ msg: "O ID do favorito deve ser um número válido." });
        }

        const favoritoExistente = await prisma.favoritos.findUnique({
            where: {
                id: favoritoId
            }
        });

        if (!favoritoExistente) {
            return res.status(404).json({ msg: "Favorito não encontrado." });
        }

        await prisma.favoritos.delete({
            where: {
                id: favoritoId
            }
        });

        res.json({
            msg: "Pokémon desfavoritado com sucesso!"
        });

    } catch (error) {
        console.error("Erro ao deletar favorito:", error.message);
        res.status(500).json({
            msg: "Erro ao desfavoritar Pokémon.",
            error: error.message
        });
    }
};
