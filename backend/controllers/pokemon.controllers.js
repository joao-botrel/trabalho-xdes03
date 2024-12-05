import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const criarPokemon = async (req, res) => {

    const pokemon = await prisma.pokemon.create({
        data: {
            numero: req.body.numero,
            nome: req.body.nome,
            tipo1: req.body.tipo1,
            tipo2: req.body.tipo2,
            gen: req.body.gen,
            descricao: req.body.descricao,
            foto: req.body.foto,
            categoria: req.body.categoria,
        }
    })


        res.json({
            data: pokemon,
            msg: "Pokémon adicionado com sucesso no banco!"
        })

}

export const getPokemons = async (req, res) => {
    const pokemons = await prisma.pokemon.findMany({
        where: {
            nome: {
                    contains: req.query.nome
             }
        }
    })

    res.json({
        data: pokemons,
        msg: "Pokemons encontrados com sucesso!"
    })
}

export const getPokemonsPorTipo = async (req, res) => {
    const { tipo1, tipo2 } = req.query;

    if (!tipo1) {
        return res.status(400).json({ msg: "O parâmetro 'tipo1' é obrigatório." });
    }

    let pokemons;

    if (!tipo2) {
        
        pokemons = await prisma.pokemon.findMany({
            where: {
                OR: [
                    { tipo1: { contains: tipo1 } }, 
                    { tipo2: { contains: tipo1 } }  
                ]
            }
        })
    } else {

        pokemons = await prisma.pokemon.findMany({
            where: {
                AND: [
                    { tipo1: { contains: tipo1 } },
                    { tipo2: { contains: tipo2 } }  
                ]
            }
        })
    }

    res.json({
        data: pokemons,
        msg: "Pokémons encontrados com sucesso!"
    })
}


export const getPokemonPorId = async (req, res) => {
    const numero = parseInt(req.params.numero);

    // Valida se o número é um inteiro válido
    if (isNaN(numero)) {
        return res.status(400).json({ msg: "O parâmetro 'numero' deve ser um número válido." });
    }

    try {
        const pokemon = await prisma.pokemon.findFirst({
            where: { numero }
        });

        if (!pokemon) {
            return res.status(404).json({ msg: "Pokémon não encontrado!" });
        }

        res.json({
            data: pokemon,
            msg: "Pokémon encontrado com sucesso!"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Erro ao buscar o Pokémon." });
    }
};


export const getPokemonPorGen = async (req, res) => {
    const pokemon = await prisma.pokemon.findMany({
        where: {
            gen: parseInt(req.params.gen)
        }
    });

    if (!pokemon) {
        return res.status(404).json({ msg: "As gerações válidas são da 1 a 9!" });
    }

    res.json({
        data: pokemon,
        msg: "Pokemons encontrados com sucesso!"
    })
}

export const atualizarPokemon = async (req, res) => {
    const pokemon = await prisma.pokemon.update({
        data: {
            update: {
            numero: req.body.numero,
            nome: req.body.nome,
            tipo1: req.body.tipo1,
            tipo2: req.body.tipo2,
            gen: req.body.gen,
            descricao: req.body.descricao,
            foto: req.body.foto,
            categoria: req.body.categoria,
            }
            
        }
    })

        res.json({
            data: pokemon,
            msg: "Pokémon atualizado com sucesso no banco!"
        })

}


export const deletarPokemon = async (req, res) => {
    const pokemonDeletado = await prisma.pokemon.deleteMany({
        where: {
                id: parseInt(req.params.pokemonId)
        }
    })


    res.json({
        msg: "Pokemon deletado com sucesso!"
    })
}

