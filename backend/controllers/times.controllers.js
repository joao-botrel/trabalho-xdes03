import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const criarTime = async (req, res) => {
    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                msg: "O corpo da requisição está vazio.",
            });
        }

        const usuarioExistente = await prisma.usuario.findUnique({
            where: { id: req.body.usuario },
        });

        if (!usuarioExistente) {
            return res.status(404).json({
                msg: "Usuário não encontrado.",
            });
        }

        // Cria o time
        const time = await prisma.times.create({
            data: {
                nomeTime: req.body.nomeTime,
                nome1: req.body.nome1,
                nome2: req.body.nome2,
                nome3: req.body.nome3,
                nome4: req.body.nome4,
                nome5: req.body.nome5,
                nome6: req.body.nome6,
                usuario: {
                    connect: {
                        id: req.body.usuario,
                    },
                },
            },
        });

        res.json({
            data: time,
            msg: "Time criado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao criar time:", error.message);
        res.status(500).json({
            msg: "Erro ao criar time.",
            error: error.message,
        });
    }
};

export const getTimePorUsuario = async (req, res) => {
    try {
        const usuarioId = parseInt(req.params.usuarioId);

        if (isNaN(usuarioId)) {
            return res.status(400).json({ msg: "O ID do usuário deve ser um número válido." });
        }

        const times = await prisma.times.findMany({
            where: {
                usuarioId: usuarioId,
            },
        });

        if (times.length === 0) {
            return res.status(404).json({ msg: "Nenhum time encontrado para este usuário." });
        }

        res.json({
            data: times,
            msg: "Times encontrados com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao buscar times:", error.message);
        res.status(500).json({
            msg: "Erro ao buscar times.",
            error: error.message,
        });
    }
};

export const getTimesPorId = async (req, res) => {
    try {
        const timeId = parseInt(req.params.timeId);

        if (isNaN(timeId)) {
            return res.status(400).json({ msg: "O ID do time deve ser um número válido." });
        }

        const time = await prisma.times.findUnique({
            where: { id: timeId },
        });

        res.json({
            data: time,
            msg: "Time encontrado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao buscar time:", error.message);
        res.status(500).json({
            msg: "Erro ao buscar time.",
            error: error.message,
        });
    }
}

export const deletarTime = async (req, res) => {
    try {
        const timeId = parseInt(req.params.timeId);

        if (isNaN(timeId)) {
            return res.status(400).json({ msg: "O ID do time deve ser um número válido." });
        }

        const timeExistente = await prisma.times.findUnique({
            where: { id: timeId },
        });

        if (!timeExistente) {
            return res.status(404).json({ msg: "Time não encontrado." });
        }

        await prisma.times.delete({
            where: {
                id: timeId,
            },
        });

        res.json({
            msg: "Time deletado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao deletar time:", error.message);
        res.status(500).json({
            msg: "Erro ao deletar time.",
            error: error.message,
        });
    }
};

export const atualizarTime = async (req, res) => {
    try {
        const timeId = parseInt(req.params.timeId);

        if (isNaN(timeId)) {
            return res.status(400).json({ msg: "O ID do time deve ser um número válido." });
        }

        const timeExistente = await prisma.times.findUnique({
            where: { id: timeId },
        });

        if (!timeExistente) {
            return res.status(404).json({ msg: "Time não encontrado." });
        }

        const timeAtualizado = await prisma.times.update({
            where: {
                id: timeId,
            },
            data: {
                nomeTime: req.body.nomeTime,
                nome1: req.body.nome1,
                nome2: req.body.nome2,
                nome3: req.body.nome3,
                nome4: req.body.nome4,
                nome5: req.body.nome5,
                nome6: req.body.nome6,
            },
        });

        res.json({
            data: timeAtualizado,
            msg: "Time atualizado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao atualizar time:", error.message);
        res.status(500).json({
            msg: "Erro ao atualizar time.",
            error: error.message,
        });
    }
};
