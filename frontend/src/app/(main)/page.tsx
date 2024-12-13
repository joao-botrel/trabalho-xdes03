'use client';

import { use, useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

import bulbasaur from '/public/img/bulbasaur.png';
import Foto from '/public/img/profile-photo.jpg';

import PokemonCard from '@/components/PokemonCard';
import Time from '@/components/TimeUnico';
import adicionarPokemons from '@/services/pokemonServices'
import PokemonType from '@/types/pokemonType';
import router from 'next/router';

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

let TimeEmpty = false;

export default function Inicio() {

  var pokemonsId: string[] = [];
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [pokemonsTimes, setPokemonsTimes] = useState<Pokemon[]>([]);
  const [times, setTimes] = useState<Team[]>([]);
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [usuario, setUsuario] = useState<any>({});

  useEffect(() => {
    adicionarPokemons();
    const fetchPokemons = async () => {
      try {
        // Gerar 3 números aleatórios entre 1 e 1008
        const randomNumbers = Array.from(
          { length: 3 },
          () => Math.floor(Math.random() * 999) + 1
        );

        // Fazer as requisições para pegar os Pokémons
        const pokemonRequests = randomNumbers.map((numero) =>
          axios.get(`http://localhost:3005/pokemon/numero/${numero}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } })
        );

        // Esperar todas as requisições
        const responses = await Promise.all(pokemonRequests);
        const data = responses.map((response) => response.data); // Extrair os dados
        setPokemons(data); // Atualizar o estado com os dados dos Pokémons
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          window.location.href = '/splash'; // Redireciona para a página inicial
        }
      }
    };

    const fetchTimes = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Replace with actual user ID retrieval

        const response = await axios.get(
          'http://localhost:3005/times/' + userId,
          {
            params: { usuario: userId },
            headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') }
          }
        );
        var timePrincipal = [];
        timePrincipal.push(response.data.data[0]);
        if(timePrincipal.length > 0){
          TimeEmpty = true;
        }else{
          TimeEmpty = false;
        }
        setTimes(timePrincipal);
        response.data.data.map((team: Team) => {
          pokemonsId.push(
            team.nome1!,
            team.nome2!,
            team.nome3!,
            team.nome4!,
            team.nome5!,
            team.nome6!
          );
        });

        if (pokemonsId.length > 0) {
          var pokemonsList: Pokemon[] = [];
          for (var i = 0; i < 6; i++) {
            const pokemon = await axios.get(
              `http://localhost:3005/pokemon/numero/${pokemonsId[i]}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } }
            );
            pokemonsList.push(pokemon.data.data);
          }
          setPokemonsTimes(pokemonsList);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          window.location.href = '/splash'; // Redireciona para a página inicial
        }
      }
    };

    const fetchFavoritos = async () => {
      try {
        const response = await axios.get(`http://localhost:3005/favoritos/${valor}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
        const favoritosData = response.data.data;

        // Buscar os detalhes dos Pokémons favoritos
        const pokemonRequests = favoritosData.map((favorito: any) =>
          axios.get(`http://localhost:3005/pokemon/numero/${favorito.nome}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } })
        );

        // Esperar pelas respostas
        const pokemonResponses = await Promise.all(pokemonRequests);
        const pokemonsFavoritos = pokemonResponses.map((response) => response.data.data);

        setFavoritos(pokemonsFavoritos);  // Atualiza o estado com os Pokémons favoritos
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          window.location.href = '/splash'; // Redireciona para a página inicial
        }
      }
    };

    fetchPokemons(); // Chamada da função para buscar Pokémons e Times
    fetchTimes();
    fetchFavoritos(); // Chama a função para buscar os favoritos

  }, []); // O array vazio impede loops infinitos

  const valor = localStorage.getItem('userId');
  console.log(valor);
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/usuarios/${valor}`, { headers: { Authorization: `Bearer ${localStorage.getItem('token') || ''}` } }
        );
        setUsuario(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          window.location.href = '/splash'; // Redireciona para a página inicial
        }
        console.error('Erro ao buscar o usuario:', error);
      }
    }
    fetchUsuarios();
  }, []);
  const user = usuario.perfil;
  const userName = user?.nome || 'Usuário';
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
                    nome={
                      pokemon.data.nome
                        .charAt(0)
                        .toUpperCase() +
                      pokemon.data.nome.slice(1)
                    } // Capitaliza a primeira letra do nome
                    img={pokemon.data.foto} // Foto do Pokémon
                    tipos={[
                      pokemon.data.tipo1,
                      pokemon.data.tipo2,
                    ].filter(Boolean)} // Tipos, incluindo tipo2 caso exista
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
      <div className="flex flex-col grow gap-4 justify-between">
        <section className="flex flex-col bg-blue-100/75 border-2 border-slate-300 rounded-xl p-8 items-center">
          <div className="flex flex-row w-full justify-between">
            <div className="flex flex-col h-full justify-between gap-6">
              <div>
                <h2 className="text-xl font-bold">{userName}</h2>
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
            <Image
              src={Foto}
              alt="Foto de perfil do usuário"
              width={256}
              className="rounded-full"
            />
          </div>
        </section>
        <section className="flex flex-col items-center bg-orange-100/75 border-2 border-slate-300 rounded-xl p-6 h-full">
          <div className="flex flex-col gap-4 items-start">
            <h2 className="text-xl font-bold">Meus Times</h2>
            <div className="flex flex-col gap-2 items-end">
              {TimeEmpty ? times.map((team, index) => (
                <Time
                  key={team.id}
                  variant="grid"
                  teamName={team.nomeTime}
                  pokemons={pokemonsTimes.slice(
                    index * 6,
                    (index + 1) * 6
                  )} onDelete={function (id: number): void {

                  }} />
              )): <p>Você ainda não criou nenhum time</p>}
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