'use client';  // Adicione esta linha no topo do arquivo para marcar o componente como do lado do cliente

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import bulbasaur from '/public/img/bulbasaur.png';  // Imagem estática de fallback

import PokemonCard from '@/components/PokemonCard';
import Time from '@/components/Time';
import adicionarPokemons from '@/services/pokemonServices'
import PokemonType from '@/types/pokemonType';

type Pokemon = {
  id: number;
  nome: string;
  tipo1: PokemonType;
  tipo2: PokemonType;
  foto: string;
  numero: number;
};

type Team = {
  id: number;
  nomeTime: string;
  nome1?: string;
  nome2?: string;
  nome3?: string;
  nome4?: string;
  nome5?: string;
  nome6?: string;
  pokemons: Pokemon[];
};

export default function Inicio() {

  var pokemonsId: string[] = [];
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokemonsTimes, setPokemonsTimes] = useState<Pokemon[]>([]);
  const [times, setTimes] = useState<Team[]>([]);
  const [favoritos, setFavoritos] = useState<any[]>([]);

  const usuarioId = 2;  // Substitua pelo ID do usuário real

  useEffect(() => {
    adicionarPokemons();
    
    const fetchPokemons = async () => {
      try {
        // Gerar 3 números aleatórios entre 1 e 1008
        const randomNumbers = Array.from({ length: 3 }, () =>
          Math.floor(Math.random() * 999) + 1
        );

        // Fazer as requisições para pegar os Pokémons
        const pokemonRequests = randomNumbers.map((numero) =>
          axios.get(`http://localhost:3005/pokemon/numero/${numero}`)
        );
        const userId = 1; // Replace with actual user ID retrieval

        const response = await axios.get('http://localhost:3005/times/' + userId, {
          params: { usuario: userId }
        });

        var timePrincipal = [];
        timePrincipal.push(response.data.data[0]);
        setTimes(timePrincipal);
        response.data.data.map((team: Team) => {
          pokemonsId.push(team.nome1!, team.nome2!, team.nome3!, team.nome4!, team.nome5!, team.nome6!);
        });

        var pokemonsList: Pokemon[] = [];
        for (var i = 0; i < 6; i++) {
          const pokemon = await axios.get(`http://localhost:3005/pokemon/numero/${pokemonsId[i]}`);
          pokemonsList.push(pokemon.data.data);
        }
        setPokemonsTimes(pokemonsList);

        // Esperar todas as requisições dos pokémons aleatórios
        const responses = await Promise.all(pokemonRequests);
        const data = responses.map((response) => response.data); // Extrair os dados
        setPokemons(data); // Atualizar o estado com os dados dos Pokémons
      } catch (error) {
        console.error('Erro ao buscar os Pokémons ou Times:', error);
      }
    };

    fetchPokemons(); // Chamada da função para buscar Pokémons e Times

    // Buscar favoritos do usuário
    const fetchFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/favoritos/${usuarioId}`);
        const favoritosData = response.data.data;

        // Buscar os detalhes dos Pokémons favoritos
        const pokemonRequests = favoritosData.map((favorito: any) => 
          axios.get(`http://localhost:3005/pokemon/numero/${favorito.nome}`)
        );

        // Esperar pelas respostas
        const pokemonResponses = await Promise.all(pokemonRequests);
        const pokemonsFavoritos = pokemonResponses.map((response) => response.data.data);

        setFavoritos(pokemonsFavoritos);  // Atualiza o estado com os Pokémons favoritos
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      }
    };

    fetchFavoritos(); // Chama a função para buscar os favoritos

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
                    numero={pokemon.data.numero}
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
                    {favoritos.length > 0 ? (
                      favoritos.slice(0, 6).map((pokemon: any, index: number) => (
                        <Image
                          key={pokemon.numero}  // Usar um identificador único (número do Pokémon)
                          src={pokemon.foto || bulbasaur}  // Foto do Pokémon ou imagem estática se não houver foto
                          alt={pokemon.nome}
                          width={75}
                          height={75}
                        />
                      ))
                    ) : (
                      <p>Sem favoritos</p>  // Mensagem caso não haja favoritos
                    )}
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
              {times.map((team, index) => (
                <Time
                  key={team.id}
                  variant="grid"
                  teamName={team.nomeTime}
                  pokemons={pokemonsTimes.slice(index * 6, (index + 1) * 6)}
                />
              ))}
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
