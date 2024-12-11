import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const criarPokemon = async (req, res) => {
    try {
        if (!req.body || !Array.isArray(req.body) || req.body.length === 0) {
            return res.status(400).json({
                msg: "O corpo da requisição está vazio ou não é uma lista de Pokémon.",
            });
        }

        const listaPokemons = req.body;

        // Obter todos os números de Pokémon já existentes no banco
        const pokemonsExistentes = await prisma.pokemon.findMany({
            select: { numero: true },
        });
        const numerosExistentes = pokemonsExistentes.map((p) => p.numero);

        // Filtrar a lista para evitar duplicação
        const novosPokemons = listaPokemons.filter(
            (pokemon) => !numerosExistentes.includes(pokemon.numero)
        );

        if (novosPokemons.length === 0) {
            return res.status(400).json({
                msg: "Todos os Pokémon enviados já existem no banco.",
            });
        }

        // Adicionar os novos Pokémon ao banco
        const pokemonsCriados = await prisma.pokemon.createMany({
            data: novosPokemons,
            skipDuplicates: true, // Proteção adicional contra duplicação
        });

        res.json({
            msg: `${pokemonsCriados.count} Pokémon adicionados com sucesso!`,
        });
    } catch (error) {
        console.error("Erro ao adicionar Pokémon em massa:", error.message);
        res.status(500).json({
            msg: "Erro ao adicionar Pokémon em massa.",
            error: error.message,
        });
    }
}


export const getPokemons = async (req, res) => {
    try {
        const pokemons = await prisma.pokemon.findMany({
            where: {
                nome: {
                    contains: req.query.nome,
                },
            },
        });

        if (pokemons.length === 0) {
            return res.status(404).json({
                msg: "Nenhum Pokemon cadastrado.",
            });
        }

        res.json({
            data: pokemons,
            msg: "Pokémons encontrados com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao buscar Pokémons:", error.message);
        res.status(500).json({
            msg: "Erro ao buscar Pokémons.",
            error: error.message,
        });
    }
};


export const getPokemonsPorTipo = async (req, res) => {
    try {
        const { tipo1, tipo2 } = req.query;

        if (!tipo1 || typeof tipo1 !== 'string') {
            return res.status(400).json({
                msg: "O parâmetro 'tipo1' é obrigatório e deve ser uma string.",
            });
        }

        if (tipo2 && typeof tipo2 !== 'string') {
            return res.status(400).json({
                msg: "O parâmetro 'tipo2' deve ser uma string.",
            });
        }

        let pokemons;

        if (!tipo2) {
            pokemons = await prisma.pokemon.findMany({
                where: {
                    OR: [
                        { tipo1: { contains: tipo1 } },
                        { tipo2: { contains: tipo1 } },
                    ],
                },
            });
        } else {
            pokemons = await prisma.pokemon.findMany({
                where: {
                    AND: [
                        { tipo1: { contains: tipo1 } },
                        { tipo2: { contains: tipo2 } },
                    ],
                },
            });
        }

        if (pokemons.length === 0) {
            return res.status(404).json({
                msg: "Pokémons não encontrados.",
            });
        }

        res.json({
            data: pokemons,
            msg: "Pokémons encontrados com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao buscar Pokémons por tipo:", error.message);
        res.status(500).json({
            msg: "Erro ao buscar Pokémons por tipo.",
            error: error.message,
        });
    }
};

export const getPokemonPorId = async (req, res) => {
    try {
        const numero = parseInt(req.params.numero);

        
        if (isNaN(numero)) {
            return res.status(400).json({
                msg: "O parâmetro 'numero' deve ser um número válido.",
            });
        }

        const pokemon = await prisma.pokemon.findFirst({
            where: { numero },
        });

        if (!pokemon) {
            return res.status(404).json({
                msg: "Pokémon não encontrado!",
            });
        }

        res.json({
            data: pokemon,
            msg: "Pokémon encontrado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao buscar Pokémon por ID:", error.message);
        res.status(500).json({
            msg: "Erro ao buscar Pokémon por ID.",
            error: error.message,
        });
    }
};

export const getPokemonPorGen = async (req, res) => {
    try {
        const gen = parseInt(req.params.gen);

        if (isNaN(gen) || gen < 1 || gen > 9) {
            return res.status(400).json({
                msg: "As gerações válidas são de 1 a 9.",
            });
        }

        const pokemons = await prisma.pokemon.findMany({
            where: { gen },
        });

        if (pokemons.length === 0) {
            return res.status(404).json({
                msg: "Pokémons não encontrados para esta geração.",
            });
        }

        res.json({
            data: pokemons,
            msg: "Pokémons encontrados com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao buscar Pokémons por geração:", error.message);
        res.status(500).json({
            msg: "Erro ao buscar Pokémons por geração.",
            error: error.message,
        });
    }
};


export const atualizarPokemon = async (req, res) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({
                msg: "O corpo da requisição está vazio.",
            });
        }

        const { pokemonId } = req.params;

        const pokemonExistente = await prisma.pokemon.findUnique({
            where: { id: parseInt(pokemonId) },
        });

        if (!pokemonExistente) {
            return res.status(404).json({
                msg: "Pokémon não encontrado.",
            });
        }

        const pokemonComMesmoNumero = await prisma.pokemon.findFirst({
            where: {
                numero: req.body.numero,
                NOT: { id: parseInt(pokemonId) },
            },
        });

        if (pokemonComMesmoNumero) {
            return res.status(400).json({
                msg: "Já existe um Pokémon com esse número.",
            });
        }

        const pokemonComMesmoNome = await prisma.pokemon.findFirst({
            where: {
                nome: req.body.nome,
                NOT: { id: parseInt(pokemonId) }, 
            },
        });

        if (pokemonComMesmoNome) {
            return res.status(400).json({
                msg: "Já existe um Pokémon com esse nome.",
            });
        }

        const pokemonAtualizado = await prisma.pokemon.update({
            where: { id: parseInt(pokemonId) },
            data: {
                numero: req.body.numero,
                nome: req.body.nome,
                tipo1: req.body.tipo1,
                tipo2: req.body.tipo2,
                gen: req.body.gen,
                descricao: req.body.descricao,
                foto: req.body.foto,
                categoria: req.body.categoria,
            },
        });

        res.json({
            data: pokemonAtualizado,
            msg: "Pokémon atualizado com sucesso no banco!",
        });
    } catch (error) {
        console.error("Erro ao atualizar Pokémon:", error.message);
        res.status(500).json({
            msg: "Erro ao atualizar Pokémon.",
            error: error.message,
        });
    }
};



export const deletarPokemon = async (req, res) => {
    try {
        const { pokemonId } = req.params;

        const pokemonExistente = await prisma.pokemon.findUnique({
            where: { id: parseInt(pokemonId) },
        });

        if (!pokemonExistente) {
            return res.status(404).json({
                msg: "Pokémon não encontrado.",
            });
        }

        await prisma.pokemon.delete({
            where: { id: parseInt(pokemonId) },
        });

        res.json({
            msg: "Pokémon deletado com sucesso!",
        });
    } catch (error) {
        console.error("Erro ao deletar Pokémon:", error.message);
        res.status(500).json({
            msg: "Erro ao deletar Pokémon.",
            error: error.message,
        });
    }
};


