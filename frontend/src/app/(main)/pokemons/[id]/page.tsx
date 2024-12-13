'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import PokemonTipo from '@/components/PokemonTipo';
import { useParams } from 'next/navigation';

import StarEmpty from '/public/img/star.svg';
import StarFilled from '/public/img/star-filled.svg';
import router from 'next/router';
import { set } from 'zod';

type PokemonType =
	| 'fire'
	| 'water'
	| 'grass'
	| 'poison'
	| 'electric'
	| 'psychic'
	| 'normal'
	| 'ground'
	| 'rock'
	| 'bug'
	| 'fairy'
	| 'dragon'
	| 'dark'
	| 'steel'
	| 'ice'
	| 'fighting'
	| 'ghost'
	| 'flying';

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
					console.log(localStorage.getItem('token'));
	const { id } = useParams();
	const [pokemon, setPokemon] = useState<Pokemon | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		const fetchPokemon = async () => {
			try {
				// Requisição para pegar os dados do Pokémon
				const response = await axios.get<{ data: Pokemon }>(
					`http://localhost:3005/pokemon/numero/${id}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } }
				);
				setPokemon(response.data.data);
				setLoading(false);
			} catch (err: any) {
				if (axios.isAxiosError(err) && err.response && err.response.status === 401) {
					window.location.href = '/splash'; // Redireciona para a página inicial
				}
				setError(err.message);
				setLoading(false);
			}
		};

		const checkIfFavorite = async () => {
			const perfilId = localStorage.getItem('userId'); // Recupera o ID do usuário do localStorage
				try {
					// Faz a requisição para pegar a lista de favoritos
					const response = await axios.get(
						`http://localhost:3005/favoritos/${perfilId}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } }
					);
					const favoritos = response.data.data;
					// Verifica se o Pokémon está na lista de favoritos
					for(let favorito in favoritos){
						if(favoritos[favorito].nome == id){
							setIsFavorite(true);
							break;
					}
				}
				} catch (err: any) {
					if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
						window.location.href = '/splash'; // Redireciona para a página inicial
						}
				}
			
		};

		// Chama as duas funções após o componente ser montado
		fetchPokemon();
		checkIfFavorite();
	}, [id]);

	const toggleFavorite = async () => {
		const perfilId = localStorage.getItem('userId'); // Recupera o ID do usuário do localStorage
		//localStorage.getItem('usuarioId');
			try {
				if (isFavorite) {
					const response = await axios.get(
						`http://localhost:3005/favoritos/${perfilId}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } }
					);
					const favoritos = response.data.data;
					// Encontra o favoritoId do Pokémon
					const favorite = favoritos.find(
						(favorite: { nome: number }) => favorite.nome === parseInt(id as string)
					);
					if (favorite) {
						// Deleta o Pokémon da lista de favoritos usando o favoritoId
						await axios.delete(
							`http://localhost:3005/favoritos/${favorite.id}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } }
						);
						setIsFavorite(false);
					} else {
						setError('Favorito não encontrado para remoção.');
					}
				} else {
					// Se o Pokémon não estiver favoritado, favoritar
					await axios.post('http://localhost:3005/favoritos', {
						nome: parseInt(id as string),
						usuario: parseInt(perfilId as string),
					}, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
					setIsFavorite(true);
				}
			} catch (err: any) {
				if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
					window.location.href = '/splash'; // Redireciona para a página inicial
					}
				setError(err.message);
			}
	};

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
							className="flex flex-col ml-8 w-[60%] relative"
						>
							<button
								className="absolute top-0 right-0"
								onClick={toggleFavorite}
							>
								{!isFavorite && (
									<Image
										src={StarEmpty}
										alt="Favoritar Pokémon"
										width={24}
									/>
								)}
								{isFavorite && (
									<Image
										src={StarFilled}
										alt="Desfavoritar Pokémon"
										width={24}
									/>
								)}
							</button>
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
								{pokemon.nome.charAt(0).toUpperCase() +
									pokemon.nome.slice(1)}
							</h1>
							<p className="text-xl mt-1 mb-1">Tipo</p>
							<div className="flex flex-row gap-2">
								<PokemonTipo
									tipo={pokemon.tipo1}
									variant="lg"
								/>
								{pokemon.tipo2 && (
									<PokemonTipo
										tipo={pokemon.tipo2}
										variant="lg"
									/>
								)}
							</div>
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
