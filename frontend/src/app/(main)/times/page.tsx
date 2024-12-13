'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Time from '@/components/Time';
import PokemonType from '@/types/pokemonType';
import api from '@/server/api';
import Link from 'next/link';
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
	const [update, setUpdate] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [teamToDelete, setTeamToDelete] = useState<number | null>(null);

	useEffect(() => {
		const fetchTeams = async () => {
			try {
				// Assuming you have user authentication and can get the user ID
				const userId = 1; // Replace with actual user ID retrieval

				const response = await axios.get('http://localhost:3005/times/' + userId, {
					params: { usuario: userId },
					headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') }
				});

				setTeams(response.data.data);
				setIsLoading(false);
				response.data.data.map((team: Team) => {
					pokemonsId.push(team.nome1!, team.nome2!, team.nome3!, team.nome4!, team.nome5!, team.nome6!);
				});
				console.log(pokemonsId);
				var pokemonsList: Pokemon[] = [];
				for (var i = 0; i < pokemonsId.length; i++) {
					console.log(pokemonsId[i]);
					const pokemon = await axios.get(`http://localhost:3005/pokemon/numero/${pokemonsId[i]}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
					pokemonsList.push(pokemon.data.data);
				}
				setPokemons(pokemonsList);
			} catch (error) {
				if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
					window.location.href = '/splash'; // Redireciona para a página inicial
				}
				console.error('Erro ao buscar Times:', error);
				setIsLoading(false);
			}
		};

		fetchTeams();
	}, [update]);

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(`http://localhost:3005/times/${id}`, { headers: { "Authorization": "Bearer " + (localStorage.getItem('token') || '') } });
			setUpdate(prev => !prev); // Toggle the update state to trigger useEffect
			setIsModalOpen(false);
		} catch (error) {
			if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
				window.location.href = '/splash'; // Redireciona para a página inicial
			}
			console.error('Erro ao deletar time:', error);
		}
	};

	const openModal = (id: number) => {
		setTeamToDelete(id);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setTeamToDelete(null);
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<p>Carregando times...</p>
			</div>
		);
	}

	return (
		<div className='h-screen'>
			<div className="flex flex-col items-center h-fit w-fit max-w-6xl m-auto p-8 bg-orange-100/75 border-2 border-slate-300 rounded-xl">
				<div className="flex flex-col items-start gap-10">
					<div className='flex flex-row justify-between w-full'>
						<h1 className="text-3xl font-bold">Times</h1>
						<Link href={"/novo-time"} className='bg-orange-400 hover:bg-orange-500 transition duration-200 w-fit py-1 px-2 rounded-lg font-semibold'>Criar novo time</Link>
					</div>
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
									id={team.id}
									onDelete={() => openModal(team.id)}
								/>
							))}
						</div>
					)}
				</div>
			</div>
			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h2 className="text-xl font-semibold mb-4">Deseja mesmo excluir?</h2>
						<div className="flex justify-end gap-4">
							<button
								className="bg-red-500 text-white px-4 py-2 rounded"
								onClick={() => handleDelete(teamToDelete!)}
							>
								Excluir
							</button>
							<button
								className="bg-gray-300 text-black px-4 py-2 rounded"
								onClick={closeModal}
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}	