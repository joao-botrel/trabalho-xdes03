'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import PokemonTipo from '@/components/PokemonTipo';
import { useParams } from 'next/navigation';

type PokemonType = 'fire' | 'water' | 'grass' | 'poison' | 'electric' | 'psychic' | 'normal' | 'ground' | 'rock' | 'bug' | 'fairy' | 'dragon' | 'dark' | 'steel' | 'ice' | 'fighting' | 'ghost' | 'flying';

interface Pokemon {
    numero: number;
    nome: string;
    tipo1: PokemonType;
    tipo2?: PokemonType; // Tipo 2 é opcional
    gen: number;
    descricao: string;
    foto: string;
    categoria: string;
}

export default function Pokemon() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await axios.get<{ data: Pokemon }>(
                    `http://localhost:3005/pokemon/numero/${id}`
                );
                setPokemon(response.data.data); // Acessa a propriedade `data` do response
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [id]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>Erro: {error}</p>;
    }

    if (!pokemon) {
        return <p>Nenhum Pokémon encontrado.</p>;
    }

    return (
        <div className="h-screen">
            <section className="flex items-center h-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl w-fit">
                <div className="flex flex-col place-items-center">
                    <div className="flex mt-2">
                        <div
                            id="imagemPokemon"
                            className="w-[70%] place-items-center flex"
                        >
                            <Image
                                src={pokemon.foto}
                                alt={pokemon.nome}
                                width={420}
                                height={420}
                            />
                        </div>
                        <div
                            id="infoPokemon"
                            className="flex flex-col ml-8 w-[60%]"
                        >
                            <p id="numPokemon" className="text-bold text-xl">
                                N° {pokemon.numero}
                            </p>
                            <div className="flex">
                                <p
                                    id="genPokemon"
                                    className="mt-1 mb-1 text-xl text-white text-center rounded-xl bg-orange-400 border border-orange-700 px-4 py-1"
                                >
                                    Gen {pokemon.gen}
                                </p>
                                <p
                                    id="catPokemon"
                                    className="mt-1 mb-1 ml-2 text-xl text-white text-center rounded-xl bg-orange-400 border border-orange-700 px-4 py-1"
                                >
                                    {pokemon.categoria}
                                </p>
                            </div>
                            <h1 className="text-4xl font-semibold mb-1 mt-1">
                                {pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1)}
                            </h1>
                            <p className="text-xl mt-1 mb-1">Tipo</p>
                            <PokemonTipo tipo={pokemon.tipo1} variant="lg" />
                            {pokemon.tipo2 && <PokemonTipo tipo={pokemon.tipo2} variant="lg" />}
                            <div className="bg-orange-200 mt-4 text-xl text-semibold h-[50%] pl-4 pt-4 rounded-xl">
                                <p id="descricaoPokemon">{pokemon.descricao}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
