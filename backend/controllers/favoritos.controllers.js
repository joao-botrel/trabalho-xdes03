import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const criarFavorito = async (req, res) => {
    const favorito = await prisma.favoritos.create(
        {
            data:
            {
                nome: req.body.nome,
                usuario: {
                    connect: {
                        id: req.body.usuario
                    }
                }
            }
        }
    )

    res.json({
        data: favorito,
        msg: "Pokémon favoritado com sucesso!"
    })

}

export const getFavoritoPorUsuario = async (req, res) => {
    const usuarioId = parseInt(req.params.usuarioId)

    // Valida se o ID do usuário é válido
    if (isNaN(usuarioId)) {
        return res.status(400).json({ msg: "O ID do usuário deve ser um número válido." })
    }

    try {
        // Busca todos os favoritos relacionados ao ID do usuário
        const favoritos = await prisma.favoritos.findMany({
            where: {
                usuarioId: usuarioId // Assumindo que "usuarioId" é a chave estrangeira no modelo de favoritos
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
        console.error(error);
        res.status(500).json({ msg: "Erro ao buscar favoritos." });
    }
}

export const deletarFavorito = async (req, res) => {
    const favoritoDeletado = await prisma.favoritos.delete({
        where: {
            id: parseInt(req.params.favoritoId)
        }
    })

    res.json({
        msg: "Pokémon desfavoritado com sucesso!"
    })
}
