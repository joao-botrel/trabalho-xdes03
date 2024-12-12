'use client';  // Adicione esta linha no topo do arquivo para marcar o componente como do lado do cliente

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import bulbasaur from '/public/img/bulbasaur.png';

import PokemonCard from '@/components/PokemonCard';
import Time from '@/components/Time';

// Importe a função que você já criou
import adicionarPokemons from '@/services/pokemonServices'

export default function Inicio() {

    const [pokemons, setPokemons] = useState<any[]>([]);

    useEffect(() => {
     
  const fetchPokemons = async () => {
    try {
      // Gerar 3 números aleatórios entre 1 e 1008
      const randomNumbers = Array.from({ length: 3 }, () =>
        Math.floor(Math.random() * 1025) + 1
      );

      // Fazer as requisições para pegar os Pokémons
      const pokemonRequests = randomNumbers.map((numero) =>
        axios.get(`http://localhost:3005/pokemon/numero/${numero}`)
      );

      // Esperar todas as requisições
      const responses = await Promise.all(pokemonRequests);
      const data = responses.map((response) => response.data); // Extrair os dados
      setPokemons(data); // Atualizar o estado com os dados dos Pokémons
    } catch (error) {
      console.error('Erro ao buscar os Pokémons:', error);
    }
  };

  fetchPokemons(); // Chamada da função
}, []); // O array vazio impede loops infinitos

    

    return (
        <div className="flex flex-row h-fit w-5/6 max-w-6xl m-auto gap-20 p-8">
           <section className="flex flex-col h-fit bg-green-100/75 border-2 border-slate-300 rounded-xl p-8 items-center">
        <div className="flex flex-col gap-4 items-start">
          <h2 className="text-xl font-bold">Lista de Pokemons</h2>
          <div className="flex flex-col gap-2 items-end">
            <div className="flex flex-col gap-4">
              {/* Renderiza os Pokémons puxados do backend */}
              {pokemons.length > 0 ? (
                pokemons.map((pokemon) => (
                  <PokemonCard
                    key={pokemon.data.id} // A chave única pode ser o número do Pokémon
                    nome={pokemon.data.nome.charAt(0).toUpperCase() + pokemon.data.nome.slice(1)} // Capitaliza a primeira letra do nome
                    img={pokemon.data.foto} // Foto do Pokémon
                    tipos={[pokemon.data.tipo1, pokemon.data.tipo2].filter(Boolean)} // Tipos, incluindo tipo2 caso exista
                  />
                ))
              ) : (
                <p>Carregando Pokémons...</p>
              )}
            </div>
            <Link
              className="bg-green-400 hover:bg-green-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
              href="/pokemons"
            >
              Ver Todos {'>>'}
            </Link>
          </div>
        </div>
      </section>
            <div className="flex flex-col grow justify-between">
                <section className="flex flex-col bg-blue-100/75 border-2 border-slate-300 rounded-xl p-8 items-center">
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-col h-full justify-between gap-6">
                            <div>
                                <h2 className="text-xl font-bold">Meu Nome</h2>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-lg font-semibold">
                                        Pokemons Favoritos
                                    </h3>
                                    <div className="grid grid-rows-2 grid-flow-col gap-x-2 gap-y-1">
                                        <Image
                                            src={bulbasaur}
                                            alt={''}
                                            width={75}
                                        />
                                        <Image
                                            src={bulbasaur}
                                            alt={''}
                                            width={75}
                                        />
                                        <Image
                                            src={bulbasaur}
                                            alt={''}
                                            width={75}
                                        />
                                        <Image
                                            src={bulbasaur}
                                            alt={''}
                                            width={75}
                                        />
                                        <Image
                                            src={bulbasaur}
                                            alt={''}
                                            width={75}
                                        />
                                        <Image
                                            src={bulbasaur}
                                            alt={''}
                                            width={75}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    className="bg-blue-400 hover:bg-blue-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
                                    href={'/times'}
                                >
                                    Times
                                </Link>
                                <Link
                                    className="bg-transparent border border-blue-400 hover:bg-blue-200 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
                                    href={'/perfil'}
                                >
                                    Editar Perfil
                                </Link>
                            </div>
                        </div>
                        <div className="bg-amber-300 w-64 h-64 rounded-full"></div>
                    </div>
                </section>
                <section className="flex flex-col items-center bg-orange-100/75 border-2 border-slate-300 rounded-xl p-6">
                    <div className="flex flex-col gap-4 items-start">
                        <h2 className="text-xl font-bold">Meus Times</h2>
                        <div className="flex flex-col gap-2 items-end">
                            <Time variant="grid" />
                            <Link
                                className="bg-orange-400 hover:bg-orange-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold"
                                href={'/times'}
                            >
                                Ver Todos {'>>'}
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
