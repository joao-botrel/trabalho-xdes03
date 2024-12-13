'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Time from '@/components/Time';
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
	nome1: string | null;
	nome2: string | null;
	nome3: string | null;
	nome4: string | null;
	nome5: string | null;
	nome6: string | null;
};

export default function Times() {
	var pokemonsId: string[] = [];
	const [pokemons, setPokemons] = useState<Pokemon[]>([]);
	const [teams, setTeams] = useState<Team[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				// Assuming you have user authentication and can get the user ID
				const userId = 1; // Replace with actual user ID retrieval

				const response = await axios.get('http://localhost:3005/times/'+userId, {
					params: { usuario: userId }
				});

				setTeams(response.data.data);
				setIsLoading(false);
				response.data.data.map((team: Team) => {
					pokemonsId.push(team.nome1!, team.nome2!, team.nome3!, team.nome4!, team.nome5!, team.nome6!);
				});
				console.log(pokemonsId);
				var pokemonsList: Pokemon[] = [];
				for(var i = 0; i < pokemonsId.length; i++){
					console.log(pokemonsId[i]);
					const pokemon = await axios.get(`http://localhost:3005/pokemon/numero/${pokemonsId[i]}`);
					pokemonsList.push(pokemon.data.data);
				}
				setPokemons(pokemonsList);
			} catch (error) {
				console.error('Erro ao buscar Times:', error);
				setError('Não foi possível carregar os times');
				setIsLoading(false);
			}
		};

		fetchTeams();
	}, []);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Carregando times...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center h-screen text-red-500">
				<p>{error}</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center h-fit w-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl">
			<div className="flex flex-col items-start gap-10">
				<h1 className="text-3xl font-bold">Times</h1>
				{teams.length === 0 ? (
					<p className="text-gray-600">Você ainda não criou nenhum time</p>
				) : (
					<div className="flex flex-col gap-8">
						{teams.map((team, index) => (
						  <Time
							key={team.id}
							variant="horizontal"
							teamName={team.nomeTime}
							pokemons={pokemons.slice(index * 6, (index + 1) * 6)}
						  />
						))}
					</div>
				)}
			</div>
		</div>
	);
}	