import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const criarTime = async (req, res) => {
    const time = await prisma.times.create(
        {
            data:
            {
                nome1: req.body.nome1,
                nome2: req.body.nome2,
                nome3: req.body.nome3,
                nome4: req.body.nome4,
                nome5: req.body.nome5,
                nome6: req.body.nome6,
                usuario: {
                    connect: {
                        id: req.body.usuario
                    }
                }
            }
        }
    )

    res.json({
        data: time,
        msg: "Time criado com sucesso!"
    })

}

export const getTimePorUsuario = async (req, res) => {
    const usuarioId = parseInt(req.params.usuarioId)

    if (isNaN(usuarioId)) {
        return res.status(400).json({ msg: "O ID do usuário deve ser um número válido." })
    }

    try {
       
        const times = await prisma.times.findMany({
            where: {
                usuarioId: usuarioId 
            }
        });

        if (times.length === 0) {
            return res.status(404).json({ msg: "Nenhum time encontrado para este usuário." });
        }

        res.json({
            data: times,
            msg: "Times encontrados com sucesso!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao buscar times." });
    }
}

export const deletarTime = async (req, res) => {
    const timeDeletado = await prisma.times.delete({
        where: {
            id: parseInt(req.params.timeId)
        }
    })

    res.json({
        msg: "Time deletado com sucesso!"
    })
}
